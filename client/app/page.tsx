'use client'
import React, { FC, useEffect, useState } from "react";
import Heading from "./utils/Heading";
import Header from './components/Header';
import { TextGenerateEffect } from "./components/ui/text-generate-effect";
import { TextHoverEffect } from "./components/ui/text-hover-effect";
import { SparklesCore } from "./components/ui/sparkles";
import { useTheme } from "next-themes";
import { TypewriterEffect } from "./components/ui/typewriter-effect";
import MarqueeComponent, { DirectionEnum } from "./components/reuseable/marquee";
import rabbitMq from './../assests/rabbitmq-logo.webp'

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
      text: `"`,
      className: "text-blue-500 dark:text-yellow-500",
    },
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
    {
      text: `"`,
      className: "text-blue-500 dark:text-yellow-500",
    }
  ];


  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("Login")
  const title = "A Full Stack Developer"
  const gradientColor = theme === "dark" ? "#000000" : "#fafafa";
  return (
    <div>
      <Heading
        title="Shreyanshi Kushwaha"
        description="Learn Your Way!"
        keywords="MERN,MEAN,REDUX"
      />
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
        <div className="flex flex-col lg:flex-row justify-between md:justify-around items-center w-[95%] bg-neutral-50 dark:bg-black rounded-3xl  py-5 px-10 ">
          <div className="w-full lg:w-[30%] min-h-64">
            <TypewriterEffect words={words} />
          </div>
          <div className=" w-full lg:w-[50%] bg-neutral-50 dark:bg-black">
            <MarqueeComponent
              direction={DirectionEnum.Left}
              speed={100}
              gradient={true}
              gradientColor={gradientColor} // ✅ single string
              gradientWidth={200}
              icons={[
                <img width="100" height="100" src="https://img.icons8.com/color/100/html-5--v1.png" alt="html-5--v1"/>,
                <img width="100" height="100" src="https://img.icons8.com/color/100/javascript--v1.png" alt="javascript--v1" />,
                <img width="100" height="100" src="https://img.icons8.com/color/100/awslambda.png" alt="awslambda" />,
                <img width="100" height="100" src="https://img.icons8.com/fluency/100/bootstrap.png" alt="bootstrap" />,
                <img width="100" height="100" src="https://img.icons8.com/arcade/100/sql.png" alt="sql" />,
                <img width="100" height="100" src="https://img.icons8.com/external-tal-revivo-color-tal-revivo/100/external-postgre-sql-a-free-and-open-source-relational-database-management-system-logo-color-tal-revivo.png" alt="postgre-sql" />,
                <img width="100" height="100" src="https://img.icons8.com/external-tal-revivo-color-tal-revivo/100/external-mongodb-a-cross-platform-document-oriented-database-program-logo-color-tal-revivo.png" alt="mongodb" />,
                <img width="100" height="100" src="https://img.icons8.com/nolan/100/amazon-s3.png" alt="amazon-s3" />,
                <img width="100" height="100" src="https://img.icons8.com/external-tal-revivo-color-tal-revivo/100/external-amazon-web-services-a-subsidiary-of-amazon-that-provides-on-demand-cloud-computing-logo-color-tal-revivo.png" alt="AWS" />,
              ]}
            />
            <MarqueeComponent
              direction={DirectionEnum.Right}
              speed={100}
              gradient={true}
              gradientColor={gradientColor} // ✅ single string
              gradientWidth={350}
              icons={[
                <img width="100" height="100" src="https://img.icons8.com/external-tal-revivo-color-tal-revivo/100/external-data-visualization-and-monitoring-with-support-for-graphite-and-influxdb-logo-color-tal-revivo.png" alt="grafna" />,
                <img width="100" height="100" src="https://img.icons8.com/fluency/100/visual-studio.png" alt="visual-studio" />,
                <img width="100" height="100" src="https://img.icons8.com/external-tal-revivo-color-tal-revivo/100/external-postman-is-the-only-complete-api-development-environment-logo-color-tal-revivo.png" alt="postman" />,
                <img width="100" height="100" src="https://img.icons8.com/nolan/100/nextjs.png" alt="nextjs" />,
                <img width={220} height={220} src={rabbitMq.src} alt="rabbitmq" />,
                <img width="100" height="100" src="https://img.icons8.com/fluency/100/python.png" alt="python" />,
                <img width="100" height="100" src="https://img.icons8.com/color/100/kubernetes.png" alt="kubernetes" />,
              ]}
            />
            <MarqueeComponent
              direction={DirectionEnum.Left}
              speed={100}
              gradient={true}
              gradientColor={gradientColor} // ✅ single string
              gradientWidth={250}
              icons={[
                <img width="100" height="100" src="https://img.icons8.com/color/100/css3.png" alt="css3" />,
                <img width="100" height="100" src="https://img.icons8.com/fluency/100/typescript--v2.png" alt="typescript--v2" />,
                <img width="100" height="100" src="https://img.icons8.com/color/100/tailwindcss.png" alt="tailwindcss" />,
                <img width="100" height="100" src="https://img.icons8.com/external-tal-revivo-shadow-tal-revivo/100/external-redis-an-in-memory-data-structure-project-implementing-a-distributed-logo-shadow-tal-revivo.png" alt="redis" />,
                <img width="94" height="94" src="https://img.icons8.com/3d-fluency/94/github.png" alt="github" />,
                <img width="100" height="100" src="https://img.icons8.com/external-tal-revivo-color-tal-revivo/100/external-docker-a-set-of-coupled-software-as-a-service-logo-color-tal-revivo.png" alt="docker" />,
                <img width="100" height="100" src="https://img.icons8.com/color/100/nodejs.png" alt="nodejs" />,
                <img width="100" height="100" src="https://img.icons8.com/external-tal-revivo-color-tal-revivo/100/external-react-a-javascript-library-for-building-user-interfaces-logo-color-tal-revivo.png" alt="react" />
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page;