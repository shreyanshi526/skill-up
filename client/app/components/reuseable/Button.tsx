import React from 'react';

interface FancyButtonProps {
  label: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  className?: string;
  width?: string;
  height?: string;
  textSize?: string;
  gradient?: string; // New prop for the hover gradient background
}

const FancyButton: React.FC<FancyButtonProps> = ({
  label,
  onClick,
  icon,
  className = '',
  width = '',
  height = 'py-0.5',
  textSize = 'text-xs',
  gradient = 'bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)]',
}) => {
  return (
    <button
      onClick={onClick}
      className={`bg-neutral-50 dark:bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px font-semibold leading-6 text-black dark:text-white inline-block ${textSize} ${className}`}
    >
      <span className="absolute inset-0 overflow-hidden rounded-full">
        <span
          className={`absolute inset-0 rounded-full ${gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
        ></span>
      </span>

      <div
        className={`relative flex space-x-2 items-center z-10 rounded-full bg-neutral-50 dark:bg-zinc-950 px-4 ring-1 ring-white/10 ${height} ${width}`}
      >
        <span>{label}</span>
        {icon}
      </div>

      <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-sky-400/0 via-indigo-400/90 to-sky-400/0 transition-opacity duration-500 group-hover:opacity-40"></span>
    </button>
  );
};

export default FancyButton;
