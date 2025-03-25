'use client'

import Image from "next/image"

import DateAndTime from "@/components/DateAndTime";

import { useGetCalls } from "@/hooks/useGetCalls";


const StatusBar = () => {

  const { upcomingCalls } = useGetCalls() || { upcomingCalls: [] };


  const nearestUpcomingCall = upcomingCalls
    ?.filter(call => call?.state?.startsAt)
    .sort((a, b) => new Date(a.state.startsAt!).getTime() - new Date(b.state.startsAt!).getTime())[0];

  const startsAt = nearestUpcomingCall?.state?.startsAt;

 
  const formattedDate = startsAt ? new Date(startsAt).toLocaleString() : "No upcoming meetings"


  if (formattedDate === "No upcoming meetings") {
    return (
      <section className="flex flex-col gap-5 text-black items-center md:items-start">
          {}
          <h2 className="bg-blue-100 max-w-[273px] rounded-2xl p-4 text-center text-base font-light">
          No Upcoming Meetings
          </h2>
          <DateAndTime/>
          <Image 
            src='/assets/bluezoom.jpg' 
            width={400} 
            height={400} 
            alt="home image" 
            className="max-md:hidden -ml-16"
          />
      </section>
    )
  }
  
  
  return (
    <section className="flex flex-col gap-5 text-black items-center md:items-start">
      <h2 className="bg-blue-100 max-w-[273px] rounded-2xl p-4 text-center text-base font-light">
        Upcoming Meeting at:
        <p className="text-lg font-semibold text-gray-800">{formattedDate}</p>
      </h2>

      <DateAndTime/>

      <Image 
        src='/bluezoom.jpg' 
        width={400} 
        height={400} 
        alt="home image" 
        className="max-md:hidden -ml-16"
      />
    </section>
  )
}


export default StatusBar
