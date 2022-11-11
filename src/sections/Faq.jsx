import React from 'react'
import Question from '../components/Question'
import { Questions } from '../util/questions'

function Faq() {
    return (
        <div id="faq" className="relative py-16 bg-faq  bg-cover faqBackground bg-center" >
            <div className='w-full absolute top-0 -translate-y-[45%]'>
              <img src="/img/connection.png" alt="" className='w-full' />
            </div>
            <img src="/img/dummy.png" className="object-fit absolute hidden md:block bottom-4 left-4 w-28 " />
            <img src="/img/dummyright.png" className="object-fit  hidden md:block absolute top-8  right-12 w-28 " />
            <h1 className='font-irish text-[10vw] md:text-[50px]  text-center leading-[70px] text-white mb-4 md:mb-12 tracking-wider'>FAQ</h1>
            <div className='mx-auto max-w-[90%] md:max-w-[55%] flex flex-col items-center justify-center'>
                {
                    Questions.map((x, i) => (
                        <Question key={i} question={x.question} description={x.desc} />
                    ))
                }
            </div>
        </div>
    )
}

export default Faq