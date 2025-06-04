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
import women from './../assests/women.png';
import Button from "./components/reuseable/Button";
import { Timeline } from "./components/ui/timeline";
import ChipButton from "./components/ui/chips";
import { ContainerScroll } from "./components/ui/container-scroll";
import { Vortex } from "./components/ui/vortex";
import { FaEnvelope, FaLinkedin } from "react-icons/fa";


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

  const data = [
    {
      title: "Nov 24 - Present",
      content: (
        <div>
          <h3 className="text-sm underline underline-offset-4 font-normal text-neutral-800 md:text-xl dark:text-neutral-200">
            Full Stack Developer At Zevo360 Technologies
          </h3>
          <p className="mb-8 mt-1 text-xs font-normal text-neutral-800 md:text-base dark:text-neutral-200">
            Building Zevo a product for parenting with new a prespective.
          </p>
          <ol className=" text-neutral-800 text-xs md:text-base dark:text-neutral-200">
            <li className="mb-2">
              ◦ Backend : Working on Distributed system with multiple Microservices, handled synhcronisation using RabbitMq, implemented client-side
              field-level encryption on mongodb, managed user sessions using Refresh Tokens and Access tokens, and enhanced API security using Anti-forgery
              tokens.
            </li>
            <li>
              ◦ Frontend : Optimized microservice API call structure for performance and version compatibility. Built a responsive
              admin panel, integrated secure image delivery via AWS CloudFront, and added payment gateway SDKs for
              seamless transactions.
            </li>
          </ol>
          <div className="mt-3 sm:mt-4">
            <ChipButton label="RabbitMQ" />
            <ChipButton label="Mircoservices" />
            <ChipButton label="API Gateway" />
            <ChipButton label="CI/CD" />
            <ChipButton label="Typescript" />
            <ChipButton label="NextJS" />
            <ChipButton label="SCSS" />
            <ChipButton label="CloudFront" />
            <ChipButton label="Tailwind" />
            <ChipButton label="Jest" />
            <ChipButton label="Grafana" />
          </div>
        </div>
      ),
    },
    {
      title: "Mid 2024",
      content: (
        <div>
          <h3 className="text-sm underline underline-offset-4 font-normal text-neutral-800 md:text-xl dark:text-neutral-200">
            Full Stack Developer At Starworks Prime
          </h3>
          <p className="mb-8 mt-1 text-xs font-normal text-neutral-800 md:text-base dark:text-neutral-200">
            Worked as a Freelancer on ERP system for Incubators and accelerator.
          </p>
          <ol className=" text-neutral-800 text-xs md:text-base dark:text-neutral-200">
            <li className="mb-2">
              ◦ ERP Module Development: Built custom modules including Programs Library, Mentor-Startup Association,
              and Startup Application Management using Node.js, TypeScript, SQL, and Hasura. Integrated real-time chat
              using Server-Sent Events (SSE).
            </li>
            <li>
              ◦ Access Control & Security: Implemented Role-Based Access Control (RBAC) to manage permissions for
              startups, mentors, and incubator staff, ensuring secure and role-specific access.
            </li>
          </ol>
          <div className="mt-3 sm:mt-4">
            <ChipButton label="AWS Incognito" />
            <ChipButton label="AWS Lambda" />
            <ChipButton label="AWS S3" />
            <ChipButton label="Load Balancer" />
            <ChipButton label="Amplify" />
            <ChipButton label="VueJS" />
            <ChipButton label="Hasura" />
            <ChipButton label="SQL" />
            <ChipButton label="GraphQL" />
            <ChipButton label="Server Sent Events" />
            <ChipButton label="Push Notification" />
          </div>
        </div>
      ),
    },
    {
      title: "Jan 24 - Nov 24",
      content: (
        <div>
          <h3 className="text-sm underline underline-offset-4 font-normal text-neutral-800 md:text-xl dark:text-neutral-200">
            Junior Full Stack Developer At Varlyq Technologies
          </h3>
          <p className="mb-8 mt-1 text-xs font-normal text-neutral-800 md:text-base dark:text-neutral-200">
            Delivered 2+ full-stack projects From development to deployment.
          </p>
          <ol className=" text-neutral-800 text-xs md:text-base dark:text-neutral-200">
            <li className="mb-2">
              ◦ DevOps Execution: Managed DevOps tasks, including CI/CD automation, Deployments on Amplify, used
              AWS Cognito and Secrets Manager, and containerization using Docker to streamline company operations.
            </li>
            <li>
              ◦ UX Optimization: Improved UX for 5+ websites, through responsive design and modern UI frameworks and
              libraries. Worked on state management using Redux
            </li>
          </ol>
          <div className="mt-3 sm:mt-4">
            <ChipButton label="NodeJS" />
            <ChipButton label="ReactJS" />
            <ChipButton label="ExpressJS" />
            <ChipButton label="MongoDB" />
            <ChipButton label="No SQL" />
            <ChipButton label="Redux" />
            <ChipButton label="Tailwind" />
            <ChipButton label="MUI" />
            <ChipButton label="Bootstarp" />
            <ChipButton label="HTML" />
            <ChipButton label="CSS" />
            <ChipButton label="Javascript" />
            <ChipButton label="Nginx" />
            <ChipButton label="proxy servers" />
          </div>
        </div>
      ),
    },
  ];

  const heading = {
    title: 'Changelog from journey',
    description: `I have been working as a developer from over 1.5 years , here's a time line of my journey so far`
  }

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
        {/* Middle Section - (Marquee effect)  */}
        <div className="flex flex-col lg:flex-row justify-between md:justify-around items-center w-[95%] bg-neutral-50 dark:bg-black rounded-3xl  py-5 px-4 sm:px-10 ">
          <div className="w-full lg:w-[30%] min-h-40 sm:min-h-64 max-h-full">
            <TypewriterEffect words={words} />
            <div className=" text-black dark:text-white flex justify-self-auto gap-8 sm:gap-2 pt-6">
              <Button label="See Resume" onClick={() => window.open('https://drive.google.com/file/d/1D5PsE2jwyTl4Qno-rukpxdkR2bumlLxb/view?usp=drive_link', '_blank')} width="w-28 sm:w-48" height="py-2" textSize=" text-xs sm:text-md" gradient="bg-gradient-to-r from-indigo-500 to-sky-500" />
              <Button label="Contact Me" onClick={() => {
                const section = document.getElementById('connect');
                if (section) {
                  section.scrollIntoView({ behavior: 'smooth' });
                }
              }} width="w-28 sm:w-48" height="py-2" textSize=" text-xs sm:text-md" gradient="bg-gradient-to-r from-indigo-500 to-sky-500" />
            </div>
          </div>
          <div className=" w-full lg:w-[50%] bg-neutral-50 dark:bg-black">
            <MarqueeComponent
              direction={DirectionEnum.Left}
              speed={100}
              gradient={true}
              gradientColor={gradientColor} // ✅ single string
              gradientWidth={200}
              icons={[
                <img className="w-12 h-12 sm:w-full sm:h-full" src="https://img.icons8.com/color/100/html-5--v1.png" alt="html-5--v1" />,
                <img className="w-12 h-12  sm:w-full sm:h-full" src="https://img.icons8.com/color/100/javascript--v1.png" alt="javascript--v1" />,
                <img className="w-12 h-12  sm:w-full sm:h-full" src="https://img.icons8.com/color/100/awslambda.png" alt="awslambda" />,
                <img className="w-12 h-12  sm:w-full sm:h-full" src="https://img.icons8.com/fluency/100/bootstrap.png" alt="bootstrap" />,
                <img className="w-12 h-12  sm:w-full sm:h-full" src="https://img.icons8.com/arcade/100/sql.png" alt="sql" />,
                <img className="w-12 h-12  sm:w-full sm:h-full" src="https://img.icons8.com/external-tal-revivo-color-tal-revivo/100/external-postgre-sql-a-free-and-open-source-relational-database-management-system-logo-color-tal-revivo.png" alt="postgre-sql" />,
                <img className="w-12 h-12  sm:w-full sm:h-full" src="https://img.icons8.com/external-tal-revivo-color-tal-revivo/100/external-mongodb-a-cross-platform-document-oriented-database-program-logo-color-tal-revivo.png" alt="mongodb" />,
                <img className="w-12 h-12  sm:w-full sm:h-full" src="https://img.icons8.com/nolan/100/amazon-s3.png" alt="amazon-s3" />,
                <img className="w-12 h-12  sm:w-full sm:h-full" src="https://img.icons8.com/external-tal-revivo-color-tal-revivo/100/external-amazon-web-services-a-subsidiary-of-amazon-that-provides-on-demand-cloud-computing-logo-color-tal-revivo.png" alt="AWS" />,
              ]}
            />
            <MarqueeComponent
              direction={DirectionEnum.Right}
              speed={100}
              gradient={true}
              gradientColor={gradientColor} // ✅ single string
              gradientWidth={350}
              icons={[
                <img className="w-12 h-12  sm:w-full sm:h-full" src="https://img.icons8.com/external-tal-revivo-color-tal-revivo/100/external-data-visualization-and-monitoring-with-support-for-graphite-and-influxdb-logo-color-tal-revivo.png" alt="grafna" />,
                <img className="w-12 h-12  sm:w-full sm:h-full" src="https://img.icons8.com/fluency/100/visual-studio.png" alt="visual-studio" />,
                <img className="w-12 h-12  sm:w-full sm:h-full" src="https://img.icons8.com/external-tal-revivo-color-tal-revivo/100/external-postman-is-the-only-complete-api-development-environment-logo-color-tal-revivo.png" alt="postman" />,
                <img className="w-12 h-12  sm:w-full sm:h-full" src="https://img.icons8.com/nolan/100/nextjs.png" alt="nextjs" />,
                <img className="w-12 h-16  sm:w-44 sm:h-44" src={rabbitMq.src} alt="rabbitmq" />,
                <img className="w-12 h-12  sm:w-full sm:h-full" src="https://img.icons8.com/fluency/100/python.png" alt="python" />,
                <img className="w-12 h-12  sm:w-full sm:h-full" src="https://img.icons8.com/color/100/kubernetes.png" alt="kubernetes" />,
              ]}
            />
            <MarqueeComponent
              direction={DirectionEnum.Left}
              speed={100}
              gradient={true}
              gradientColor={gradientColor} // ✅ single string
              gradientWidth={250}
              icons={[
                <img className="w-12 h-12  sm:w-full sm:h-full" src="https://img.icons8.com/color/100/css3.png" alt="css3" />,
                <img className="w-12 h-12  sm:w-full sm:h-full" src="https://img.icons8.com/fluency/100/typescript--v2.png" alt="typescript--v2" />,
                <img className="w-12 h-12  sm:w-full sm:h-full" src="https://img.icons8.com/color/100/tailwindcss.png" alt="tailwindcss" />,
                <img className="w-12 h-12  sm:w-full sm:h-full" src="https://img.icons8.com/external-tal-revivo-shadow-tal-revivo/100/external-redis-an-in-memory-data-structure-project-implementing-a-distributed-logo-shadow-tal-revivo.png" alt="redis" />,
                <img className="w-12 h-12  sm:w-full sm:h-full" src="https://img.icons8.com/3d-fluency/94/github.png" alt="github" />,
                <img className="w-12 h-12  sm:w-full sm:h-full" src="https://img.icons8.com/external-tal-revivo-color-tal-revivo/100/external-docker-a-set-of-coupled-software-as-a-service-logo-color-tal-revivo.png" alt="docker" />,
                <img className="w-12 h-12  sm:w-full sm:h-full" src="https://img.icons8.com/color/100/nodejs.png" alt="nodejs" />,
                <img className="w-12 h-12  sm:w-full sm:h-full" src="https://img.icons8.com/external-tal-revivo-color-tal-revivo/100/external-react-a-javascript-library-for-building-user-interfaces-logo-color-tal-revivo.png" alt="react" />
              ]}
            />
          </div>
        </div>
        {/* Experience section */}
        <div className="w-[95%] bg-neutral-50 dark:bg-black rounded-3xl  py-5 px-10">
          <Timeline data={data} Heading={heading} />
        </div>

        {/* About Me section */}
        <div className=" py-20 sm:py-48 w-[95%] sm:w-[95%] bg-neutral-50 dark:bg-black rounded-3xl sm:px-1">
          <ContainerScroll
            titleComponent={
              <h1 className="text-4xl font-semibold text-black dark:text-white">
                Learn More <br />
                <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                  ABOUT ME
                </span>
              </h1>
            }
          >
            <div className="flex justify-center sm:justify-between items-center">
              <p className=" w-full p-4 sm:p-0 sm:w-[50%] text-xs sm:text-base font-Poppins">
                <span className="text-yellow-500 text-lg">"</span> I'm a Full Stack Developer with 15 months of experience crafting scalable, high-performance web apps using the MERN stack, PostgreSQL, and MongoDB. I build sleek, responsive UIs with Next.js, React.js, Tailwind CSS, and MUI, and engineer secure, efficient backends with Node.js, Express.js, TypeScript & javascript, and both SQL & NoSQL databases.<br /><br />

                From using distributed microservices architecture, Synchronoization using RabbitMQ, User Session managment ,Real-time features (SSE & socket.IO) to Role Based Access Control, and payment integrations till securing your app of vulnerabilities using encryptions, I’ve delivered full-stack solutions that perform in production. On the DevOps side, I handle CI/CD, Docker, and AWS deployments using Amplify, Cognito, S3, Secrets Manager, and more.<br /><br />

                I'm certified as an AWS Cloud Practitioner and Solutions Architect, and I'm fluent with tools like GitHub, Postman, Sonar, and Grafana.<span className="text-yellow-500 text-xl">"</span><br />

                <br /><span className="text-yellow-500 text-sm sm:text-xl">My Motto: Discover, Develop, & Deploy </span>
                <p className="block sm:hidden w-full text-start">- SHREYANSHI KUSHWAHA</p></p>
              <div className="w-[50%] hidden sm:block ">
                <img src={women.src} className="w-full h-full">
                </img>
                <p className="w-full text-center">SHREYANSHI KUSHWAHA</p>
              </div>
            </div>
          </ContainerScroll>
        </div>
        {/*  Contect */}
        <div className="w-full bg-neutral-50 dark:bg-black border-t-2">
          <section className=" pb-10 w-full" id="connect">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className=" mt-6 text-xl sm:text-3xl font-bold mb-4 text-gray-800 dark:text-white">Let's Connect</h2>
              <p className="text-gray-600 dark:text-gray-50 mb-6 text-sm sm:text-xl">
                Feel free to reach out through LinkedIn or send me an email!
              </p>
              <div className="flex justify-center  gap-4 sm:gap-8">
                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/shreyanshi-kushwaha-0137b4265/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 transition duration-300 text-2xl sm:text-4xl"
                >
                  <FaLinkedin />
                </a>

                {/* Email */}
                <a
                  href="mailto:shreyanshikushwaha79@gmail.com"
                  className="text-red-500 hover:text-red-700 transition duration-300 text-2xl sm:text-4xl"
                >
                  <FaEnvelope />
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Page;