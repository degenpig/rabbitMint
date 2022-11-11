import React, { useEffect, useState } from "react";
import Web3 from "web3";
import CloudBunnyABI from "../const/abi.json";
import { createMerkleProof } from "../util";
import { toast } from "react-toastify";

let web3;
let contract;

function Mint() {
  const netID = 0x4; //rinkeby
  // const netID = 0x1 // mainnet

  const [num, setNum] = useState(1);

  const [walletAddress, setWalletAddress] = useState("");
  const [connectStatus, setConnectStatus] = useState(false);
  const [correctNet, setCorrectNet] = useState(false);
  const [maxAmount, setMaxAmount] = useState(2);
  const [mintPrice, setMintPrice] = useState(0);
  const [isPublic, setIsPublic] = useState(false);
  const [balance, setBalance] = useState(0);

  const handleChange = (value) => {
    console.log(value);
    if (value > maxAmount) {
      setNum(maxAmount);
    } else if (value < 1) {
      setNum(1);
    } else {
      setNum(value);
    }
  };

  const countAmount = (isUp) => {
    if (isUp) {
      handleChange(+num + 1);
    } else {
      handleChange(+num - 1);
    }
  };

  const connectWallet = async () => {
    if (!window.ethereum) {
      toast.error("Please install Metamask!");
    } else {
      try {
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        const chainId = await ethereum.request({ method: "eth_chainId" });

        setWalletAddress(accounts[0]);
        setConnectStatus(true);
        setCorrectNet(chainId == netID);

        toast.success("Wallet Connected Successfully!");

        window.ethereum.on("accountsChanged", (accounts) => {
          setWalletAddress(accounts[0]);
        });

        window.ethereum.on("chainChanged", async (chainId) => {
          setCorrectNet(chainId == netID);
        });
      } catch (e) {
        console.error(e);
        toast.error("User denied wallet connection!");
      }
    }
  };

  const switchNetwork = async () => {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x4" }],
      });
      setCorrectNet(true);
    } catch (e) {
      console.error(e);
      toast.error("User denied wallet connection!");
    }
  };

  const checkMintable = async () => {
    if (isPublic) return balance + num <= 3;
    else return balance + num <= 2;
  };

  const mint = async () => {
    if (checkMintable) {
      try {
        if (isPublic) {
          await contract.methods.PMint(num).send({
            from: walletAddress,
            value: web3.utils.toBN(num * mintPrice * 10 ** 18),
          });
        } else {
          const proof = await createMerkleProof(walletAddress);
          if (proof.result) {
            await contract.methods.WLMint(num, proof.merkleProof).send({
              from: walletAddress,
              value: web3.utils.toBN(num * mintPrice * 10 ** 18),
            });
          } else {
            toast.error("Invalid Merkle Proof!");
            return;
          }
          toast.success("Success!");
        }
        updateState();
      } catch (e) {
        console.log(e);
        toast.error("Failed to Mint!");
      }
    } else {
      toast.warning("Exceeeds max allowance!");
    }
  };

  const updateState = async () => {
    if (correctNet) {
      web3 = new Web3(window.ethereum);
      contract = new web3.eth.Contract(
        CloudBunnyABI.abi,
        CloudBunnyABI.contractAddress
      );
      setBalance(await contract.methods.balanceOf(walletAddress).call());
      const publicSale = await contract.methods.isPublicSale().call();
      setIsPublic(publicSale);
      if (publicSale) {
        setMaxAmount(3);
        setMintPrice(0.02);
      } else {
        setMaxAmount(2);
        setMintPrice(0.01);
      }
    }
  };

  useEffect(() => {
    updateState();
  }, [correctNet, walletAddress]);

  useEffect(() => {
    const onLoad = async () => {
      await connectWallet();
    };
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);
  return (
    <div className="absolute -translate-y-[140px] w-full font-lemon">
      <div className="flex justify-center overflow-hidden">
        <img
          src="/img/bg_mint.png"
          alt=""
          className="md:min-h-[900px] md:max-h-[900px] min-h-[570px] max-h-[570px] min-w-[1400px] w-[100%] max-w-[1920px]"
        />
      </div>
      <div className="absolute top-0 w-full md:mt-[200px] mt-[100px] z-30">
        <div
          id="mint"
          className="md:max-w-[1200px] max-w-[280px] w-[85%] flex md:flex-row flex-col bg-white rounded-3xl shadow-xl mx-auto md:h-[600px] h-[440px]"
        >
          <div className="md:w-[45%] md:p-0 p-[4px] md:h-full w-full h-[40%]">
            <img
              src="/img/mint.jpeg"
              className="w-full h-full rounded-3xl object-cover"
            />
          </div>
          <div className="md:w-[70%] h-full w-full flex flex-col md:m-0 mt-[10px] md:py-6 justify-center items-center">
            <h1 className="md:text-[48px] text-[20px] text-[#415DA7] font-semibold mb-1 font-irish text-center uppercase">
              {isPublic ? "Public Sale is Live" : "Presale is Live"}
            </h1>
            <span className="md:text-[24px] text-[15px] font-irish text-[#415DA7] mb-1 text-center ">
              {walletAddress ? (
                <>
                  your wallet <br />{" "}
                  {walletAddress.slice(0, 8) +
                    "........." +
                    walletAddress.slice(-8)}
                </>
              ) : (
                <>
                  please <br /> connect wallet to mint
                </>
              )}
            </span>
            {correctNet && (
              <>
                <div className="md:w-[70%] w-[90%] flex mx-auto mt-2 md:text-[36px] text-[17.74px]">
                  <div className="md:w-[70%] w-[60%] bg-[#B0C8EF] rounded-l-[15px] md:p-[30px] p-[15px] flex flex-col">
                    <div className="relative">
                      <input
                        type="number"
                        value={num}
                        min={1}
                        max={maxAmount}
                        step={1}
                        onChange={(e) => handleChange(e.target.value)}
                        className="border-none h-full focus-visible:none focus:ring-2 w-full focus:border-none rounded-full pl-[13%] md:py-[6px] py-[2px]"
                      />
                      <div className="absolute flex flex-col w-[40%] max-w-[100px] h-full top-0 right-0 rounded-full overflow-hidden p-0">
                        <button
                          className="bg-[#F2F9FF] w-full h-[49%] font-[600] mb-[1px]"
                          onClick={() => countAmount(true)}
                        >
                          <img
                            src="/img/up.png"
                            className="w-5 h-auto m-auto"
                          />
                        </button>
                        <button
                          className="bg-[#F2F9FF] w-full h-[49%] mt-[2%] font-[600]"
                          onClick={() => countAmount(false)}
                        >
                          <img
                            src="/img/down.png"
                            className="w-5 h-auto m-auto"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="md:w-[30%] w-[40%] bg-[#7387D0] py-2 flex rounded-r-[15px] justify-center items-center">
                    <span className="text-white font-semibold font-irish w-full text-center">
                      {(num * mintPrice).toLocaleString()} Eth
                    </span>
                  </div>
                </div>
                <div className="md:w-[69%] w-[90%] mx-auto flex items-center justify-between md:text-[20px] text-[12px] md:mt-[18px] mt-[7px]">
                  <span className="font-irish text-[#415DA7] uppercase">
                    My Bunnies: {balance}
                  </span>
                  <div className="bg-[#B3CBF1] md:px-[25px] md:py-[10px] px-[12px] py-[5px] flex justify-center items-center">
                    <span className="text-white font-irish uppercase">
                      Max Mint {maxAmount}
                    </span>
                  </div>
                </div>
              </>
            )}
            <div className="md:max-w-[70%] px-[15px] w-full flex items-center mx-auto md:mt-[29px] mt-[10px]">
              {connectStatus && !correctNet && (
                <button
                  className="bg-button bg-centershadow-xl bg-cover w-full text-white uppercase md:text-[36px] text-[17px] font-irish border-none rounded-full md:py-[30px] py-[15px] md:px-0 px-[88px]"
                  onClick={switchNetwork}
                >
                  Switch Network
                </button>
              )}

              {correctNet && (
                <button
                  className="bg-button bg-centershadow-xl bg-cover w-full text-white uppercase md:text-[36px] text-[17px] font-irish border-none rounded-full md:py-[30px] py-[15px] md:px-0 px-[88px]"
                  onClick={mint}
                >
                  Mint
                </button>
              )}

              {!connectStatus && (
                <button
                  className="bg-button bg-centershadow-xl bg-cover w-full text-white uppercase md:text-[36px] text-[17px] font-irish border-none rounded-full md:py-[30px] py-[15px] md:px-0 "
                  onClick={connectWallet}
                >
                  Connect Wallet
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mint;
