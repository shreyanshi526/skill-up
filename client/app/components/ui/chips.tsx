import React from "react";
import { cn } from "@/lib/utils";

type ChipButtonProps = {
  label: string;
  className?: string;
  onClick?: () => void;
};

const ChipButton = ({ label, className, onClick }: ChipButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative mr-1 mt-1 sm:mr-2 sm:mt-2 inline-flex h-6 sm:h-8 xl:h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50",
        className
      )}
    >
      <span className={`absolute inset-[-1000%] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]`} />
      <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-[11px] sm:text-sm font-medium text-white backdrop-blur-3xl">
        {label}
      </span>
    </button>
  );
};

export default ChipButton;
