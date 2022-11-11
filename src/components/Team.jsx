import React from 'react'

function TeamOne({ name, desc, img}) {
    return (
        <div data-aos='fade-down' data-aos-duration='800'  className='md:flex-1 md:w-full md:min-w-0 max-w-[350px]  md:mx-0 mx-auto mb-12 px-3'>
            <h1 className="text-center text-lg font-irish text-white w-full">{name}</h1>
            <div className='relative mt-8'>
                <img src={img} className="w-20 absolute left-[38%] -top-2 " />
                <div className='h-[200px] w-full flex items-center justify-center relativee px-6 bg-teamTwo bg-center bg-cover'>
                    <i className="ri-twitter-fill bg-blue-500 w-6 h-6 flex absolute left-[22%] top-[27%] justify-center items-center p-1 rounded-[50%] text-white text-sm"></i>
                    <span className="text-[#82A5EF] w-[80%] mx-auto text-center mt-2 font-irish text-[0.95rem]">{desc}</span>
                </div>
            </div>
        </div>
    )
}

export default TeamOne;