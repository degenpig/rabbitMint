import React, { useState } from 'react'


const Question = ({ question, description }) => {
    const [show, setShow] = useState(false);
    return (
        <div
            data-aos='fade-up'  data-aos-duration='800'
            className={`py-4 rounded-[16px] leading-3 hover:cursor-pointer border-none bg-[#DBEAFF] mx-auto w-full px-8 mb-6`}
            onClick={() => setShow(!show)}
        >
            <div
                className={`flex w-full justify-between duration-200   ${show && "mb-4"
                    }  items-center`}
            >

                <h1
                    className={`font-heebo leading-[22px] font-irish text-[15.5px] text-[#415DA7] md:text-[19.3px]`}
                >
                    {question}
                </h1>

                <i
                    onClick={() => setShow(!show)}
                    className={`${show ? "ri-subtract-line" : "ri-add-line"} text-lg text-[#415DA7] text-2xl`}
                >
                    {" "}
                </i>
            </div>
            {show && (
                <div
                    className={`text-[19px]  text-gray-600 font-irish`}
                >
                    {description}
                </div>
            )}
        </div>
    );
};

export default Question