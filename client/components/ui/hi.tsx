'use client'
import React, { FC, useEffect, useState } from "react";
import Heading from "./utils/Heading";
import Header from './components/Header';
import { TextGenerateEffect } from "./components/ui/text-generate-effect";
import { TextHoverEffect } from "./components/ui/text-hover-effect";
import { SparklesCore } from "./components/ui/sparkles";
import { useTheme } from "next-themes";
import { TypewriterEffect } from "./components/ui/typewriter-effect";

interface Props { }

const Page: FC<Props> = (props) => {
  const { theme } = useTheme();
  const [particleColor, setParticleColor] = useState("#000000");

  useEffect(() => {
    if (theme === "dark") {
      setParticleColor("#ffffff"); // white in dark mode
    } else {
      setParticleColor("#6366f1"); // black in light mode
    }
  }, [theme]);

  const words = [
    {
      text: "I",
      className: "text-blue-500 dark:text-blue-500",
    },
    {
      text: "develop",
      className: "text-blue-500 dark:text-blue-500",
    },
    {
      text: "fullstack",
    },
    {
      text: "applications",
    },
    {
      text: "from",
    },
    {
      text: "concept",
    },
    {
      text: "to",
    },
    {
      text: "deployment",
    },
    {
      text: "using",
    },
    {
      text: "modern",
    },
    {
      text: "web",
    },
    {
      text: "technologies",
    },
    {
      text: "and",
    },
    {
      text: "best",
    },
    {
      text: "practices.",
    },
  ];


  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("Login")

  const title = "A Full Stack Developer"
  return (
    <div>
      <Heading
        title="Elearning"
        description="Learn Your Way!"
        keywords="MERN,MEAN,REDUX"
      />
      {/* we can call this heading comjponent on every page to change the name of page acrrodingl ex- from signup to welcome etc*/}
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        setRoute={setRoute}
        route={route}
      />
      <div className="min-h-screen max-h-full relative w-full flex flex-col gap-5 md:gap-y-10 items-center mt-5 md:mt-10 justify-start overflow-hidden ">
        {/* Top Section */}
        <div className=" flex flex-col justify-center items-center w-[95%] bg-neutral-50 dark:bg-black rounded-3xl">
          <div className="flex flex-col items-center justify-center w-full">
            <TextHoverEffect text="Hi I'm Shreyanshi" />
            <div className=" -mt-10 sm:-mt-20 md:-mt-30 lg:-mt-44 xl:-mt-52">
              <TextGenerateEffect
                words={title}
                size="text-base sm:text-lg md:text-xl lg:text-3xl xl:text-5xl"
              />
            </div>
          </div>

          <div className="relative w-full max-w-[40rem] h-20 md:h-40 mx-auto">
            {/* Line 1 - Gradient glow + blur */}
            <div className="absolute left-5 right-5 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[1px] md:h-[2px] w-3/4 mx-auto blur-sm" />
            <div className="absolute left-5 right-5 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4 mx-auto" />

            {/* Line 2 - Accent line */}
            <div className="absolute left-20 right-20 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[1px] md:h-[3px] w-1/4 mx-auto blur-sm" />
            <div className="absolute left-20 right-20 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4 mx-auto" />

            {/* Sparkles animation layer */}
            <SparklesCore
              background="transparent"
              minSize={0.4}
              maxSize={1.6}
              particleDensity={1200}
              className="w-full h-full"
              particleColor={particleColor}
            />

            {/* Radial mask overlay */}
            <div className="absolute inset-0 w-full h-full bg-neutral-50 dark:bg-black [mask-image:radial-gradient(300px_150px_at_top,transparent_20%,white)] md:[mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]" />
          </div>

        </div>
        {/* Middle Section  */}
        <div className=" flex flex-col lg:flex-row justify-between md:justify-around items-center w-[95%]  border border-white bg-neutral-50 dark:bg-black rounded-3xl  py-5 px-10 ">
          <div className="w-full lg:w-[30%]">
            <TypewriterEffect words={words} />
          </div>
          <div className=" w-full lg:w-[50%] border border-red-400"></div>
        </div>
      </div>
    </div>
  )
}

export default Page;