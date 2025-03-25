"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Call } from "@stream-io/video-react-sdk";
import { toast } from "sonner";
import Members from "./Members";

interface MeetingCardProps {
  title: string;
  date: string;
  icon: string;
  isPreviousMeeting?: boolean;
  buttonIcon1?: string;
  buttonText?: string;
  call: Call;
  type: string;
  handleClick: () => void;
  link: string;
}

const MeetingCard = ({
  icon,
  title,
  date,
  isPreviousMeeting,
  buttonIcon1,
  handleClick,
  link,
  type,
  call,
  buttonText,
}: MeetingCardProps) => {
  return (
    <section className="flex min-h-[258px] w-full flex-col justify-between rounded-3xl bg-blue-200 px-5 py-8 xl:max-w-[568px] text-black scale-90 shadow-2xl">
      <article className="flex flex-col gap-5">
        <Image src={icon} alt="upcoming" width={28} height={28} />
        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold">{title}</h1>
            <p className="text-base font-normal">{date}</p>
          </div>
        </div>
      </article>
      <article className={cn("flex justify-center relative flex-col gap-3", {})}>
        <div>{type === 'ended' && <Members call={call}/>}</div>
        {!isPreviousMeeting && (
          <div className="flex gap-5">
            <Button onClick={handleClick} className="rounded bg-blue-700 p-4 hover:bg-blue-400 px-6">
              {buttonIcon1 && <Image src={buttonIcon1} alt="feature" width={20} height={20} />}
              &nbsp; {buttonText}
            </Button>
            <Button
              className="bg-gray-700"
              onClick={() => {
                navigator.clipboard.writeText(link);
                toast("Link Copied",{
                  duration: 3000,
                  className: '!bg-gray-300 !rounded-3xl !py-8 !px-5 !justify-center'
                });
              }}
            >
              <Image src="/assets/copy.svg" alt="copy" width={20} height={20} />
              &nbsp; Copy Link
            </Button>
          </div>
        )}
      </article>
    </section>
  );
};

export default MeetingCard;
