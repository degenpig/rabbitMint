import React from 'react'
import TeamOne from '../components/Team'

function Team() {
  return (
    <div id="team" className="">
        <div className="relative h-full mt-20 pb-[60px]">
            <div className='w-full md:h-[400px] h-[1200px] absolute bottom-0'>
              <img src="/img/team.png" alt="" className='w-[100%] md:min-h-[400px] md:max-h-[400px] min-h-[1200px] max-h-[1200px]'/>
            </div>
            <h1 className="text-center font-irish text-[10vw] md:text-[60px] tracking-wide mb-12  text-white uppercase">Meet the team</h1>
            <div className='md:max-w-[75%] mx-auto w-full flex md:flex-row flex-col items-center md:space-x-4 justify-between'>
                <TeamOne img="/img/team1.png" background='/img/teamBg2.png' name="Chief Bunny" desc="Founder & Marketing" />
                <TeamOne img="/img/team2.png" background='/img/teamBg2.png' name="Astro Bunny" desc="Admin & Community engagement specialist" />
                <TeamOne img="/img/logo.png" background='/img/teamBg3.png' name="Ninja Bun" desc="Marketing & Socials" />
            </div>
        </div>
    </div>
  )
}

export default Team