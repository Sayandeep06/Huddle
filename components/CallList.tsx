'use client'

import { useGetCalls } from "@/hooks/useGetCalls"
import { Call, CallRecording } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import Alert from "./Alert";
import { useRouter } from "next/navigation";
import MeetingCard from "./MeetingCard";

const CallList = ({ type }: { type: 'ended' | 'upcoming' | 'recordings' }) => {
    const router = useRouter(); 
    const { endedCalls, upcomingCalls, callRecordings, isLoading } = useGetCalls() 
    const [recordings, setRecordings] = useState<CallRecording[]>([]); 

    const getCalls = () => {
        switch (type) {
          case 'ended':
            return endedCalls; 
          case 'recordings':
            return recordings; 
          case 'upcoming':
            return upcomingCalls; 
          default:
            return []; 
        }
      };

    useEffect(() => {
        const fetchRecordings = async () => {
            const callData = await Promise.all(
              callRecordings?.map((meeting) => meeting.queryRecordings()) ?? [],
            );
      
            const recordings = callData
              .filter((call) => call.recordings.length > 0)
              .flatMap((call) => call.recordings);
      
            setRecordings(recordings);
          };

        if (type === 'recordings') {
            fetchRecordings();
        }
    }, [type, callRecordings]);

    if (isLoading) return <Loading />;

    const calls = getCalls();

    if (calls && calls.length > 0) return (
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
          {
            calls.map((meeting: Call | CallRecording) => {
              return (
                <MeetingCard
                  call={meeting as Call}
                  key={(meeting as Call).id}
                  type={type}
                  icon={
                    type === 'ended'
                      ? '/assets/previous.svg'
                      : type === 'recordings'
                      ? '/assets/recordings2.svg'
                      : '/assets/call.svg'
                  }
                  title={
                    (meeting as Call).state?.custom?.description ||
                    (meeting as CallRecording).filename?.substring(0, 20) ||
                    'No Description'
                  }
                  date={
                    (meeting as Call).state?.startsAt?.toLocaleString() ||
                    (meeting as CallRecording).start_time?.toLocaleString()
                  }
                  isPreviousMeeting={type === 'ended'}
                  link={
                    type === 'recordings'
                      ? (meeting as CallRecording).url
                      : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${(meeting as Call).id}`
                  }
                  buttonIcon1={type === 'recordings' ? '/assets/play.svg' : undefined}
                  buttonText={type === 'recordings' ? 'Play' : 'Start'}
                  handleClick={
                    type === 'recordings'
                      ? () => router.push(`${(meeting as CallRecording).url}`)
                      : () => router.push(`/meeting/${(meeting as Call).id}`)
                  }
                />
              )
            })
          }
        </div>
      );

    return (
        <Alert
          title='No calls available'
          iconUrl='/assets/no-calls.svg'
        />
      );
}

export default CallList