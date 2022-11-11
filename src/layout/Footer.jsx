import React from 'react'
import Icon from '../components/Icon'

function Footer() {
    return (
        <div className='flex flex-col items-center relative  justify-center pt-[65px] pb-20 md:pb-20'>
            <div className='flex flex-col items-center mb-12 relative justify-center'>
                <h1 className='font-irish text-[10vw] md:text-[60px] text-center leading-[70px] text-white mb-3 uppercase'>Join us</h1>
                <div className='mx-auto flex items-center  justify-between gap-8 pt-10'>
                    <Icon note icon="/img/iconsT.png" />
                    <Icon note icon="/img/icong.png" />
                    <Icon note icon="/img/iconD.png" />

                </div>
            </div>
            <div className='bg-[#889FDC] flex items-center justify-center py-3 absolute bottom-0 w-full max-w-[1920px] pb-6'>
                <span className="text-white text-center font-irish md:text-base text-sm  ">© Copyright 2022 • Droplets • All rights reserved</span>
            </div>
        </div>
    )
}

export default Footer