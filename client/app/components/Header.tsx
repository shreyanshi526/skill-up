// 'use client'
// import Link from 'next/link';
// import React, { FC, useState, } from 'react';
// import NavItems from '../utils/NavItems'
// import ThemeSwitcher from "../utils/ThemeSwitcher"
// import customModal from '../utils/customModal';
// import { HiOutlineMenuAlt3, HiOutlineUserCircle } from 'react-icons/hi'


// type Props = {
//   open: boolean;
//   setOpen: (open: boolean) => void;
//   activeItem: number;
//   route: string;
//   setRoute: (route: string) => void;
// }

// const Header: FC<Props> = ({ activeItem, setOpen, open, route }) => {
//   const [active, setActive] = useState(false);
//   const [openSidebar, setOpenSidebar] = useState(false)


//   if (typeof window !== "undefined") {
//     window.addEventListener("scroll", () => {
//       if (window.scrollY > 85) {
//         setActive(true);
//       } else {
//         setActive(false);
//       }
//     })
//   }

//   const handleClose = (e: any) => {
//     if (e.target.id === "screen") {
//       setOpenSidebar(false)
//     }
//   }

//   return (
//     <div className='w-full-relative'>
//       <div className={`${active ? "dark:bg-opacity-50 dark:bg-gradient-to-b dark:from-gray-900  dark:to-black fixed top-0 left-0 w-full h-[80px] border-b dark:border-[#ffffff1c] shadow-xl transition duration-500" : " w-full- border-b dark:border-[#ffffff1c] h-[80px] z-[80] dark:shadow"}`}>

//         {/* header content */}
//         <div className="w-[95%] 800px : w-[92%] m-auto py-2 h-full">
//           <div className="w-full h-[80px] flex items-center justify-between p-3">

//             {/* header name on left side */}
//             <div>
//               <Link href={"/"} className={`text-[25px] font-Poppins font-[500] text-black dark:text-white`}>
//                 Shreyanshi Kushwaha {/* Elearning */}
//               </Link>
//             </div>

//             {/* Calling an Navbar function.*/}
//             <div className="flex items-center">
//               {/* <NavItems
//                 activeItem={activeItem}
//                 isMobile={false}
//               /> */}
//               {/*its toggle for light and dark mode*/}
//               <ThemeSwitcher />


//               {/* only for mobile */}

//               {/* <div className="800px:hidden">
//                 <HiOutlineMenuAlt3
//                   size={25}
//                   className="cursor-pointer dark:text-white text-black"
//                   onClick={() => setOpenSidebar(true)}
//                 />
//               </div> */}

//               {/* profileICon*/}
//               {/* <HiOutlineUserCircle
//                 size={25}
//                 className="hidden 800px:block cursor-pointer dark:text-white text-black"
//                 onClick={() => setOpen(true)}
//               /> */}
//             </div>

//           </div>
//         </div>

//         {/* mobile sidebar  class*/}
//         {/* {
//           openSidebar && (
//             // <div className="fixed w-full h-screen top-0 left-0 z-[99999] dark:bg-[unset] bg-[#00000024]"
//             //   onClick={handleClose}
//             //   id="screen"
//             // >
//             //   <div className="w-[70%] fixed z-[999999999] h-screen bg-white dark:bg-slate-900 dark:bg-opacity-90 top-0 right-0">
//             //     {/* <NavItems activeItem={activeItem} isMobile={true} /> 
//             //     <HiOutlineUserCircle
//             //       size={25}
//             //       // className="cursor-pointer ml-5 my-2 text:black dark:text-white"
//             //       className={`cursor-pointer ml-5 my-2 ${openSidebar ? 'text-black dark:text-white' : 'text-black dark:text-white'}`}
//             //       onClick={() => setOpen(true)} />
//             //     <br />
//             //     <br />
//             //     <p className="text-[16px] px-2 pl-5 text-black dark:text-white">
//             //       Copyright © 2023 ELearning
//             //     </p>
//             //   </div>
//             // </div>

//           )
//         } */}

//       </div>
//       {route === "Sign-Up" && (
//         <>
//         </>
//       )}
//       {/* {
//         route === "Login" && (
//           <>
//             {
//               open && (
//                 // <customModal/>
//               )
//             }
//           </>
//         )
//       } */}
//     </div>
//   )
// }

// export default Header;



'use client'
import Link from 'next/link';
import React, { FC, useEffect, useState } from 'react';
import NavItems from '../utils/NavItems'
import ThemeSwitcher from "../utils/ThemeSwitcher"
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from 'react-icons/hi'

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: number;
  route: string;
  setRoute: (route: string) => void;
}

const Header: FC<Props> = ({ activeItem, setOpen, open, route }) => {
  const [active, setActive] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);

  // 🛠️ Use useEffect to add scroll listener with cleanup
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 85) {
        setActive(true);
      } else {
        setActive(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Cleanup on unmount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClose = (e: any) => {
    if (e.target.id === "screen") {
      setOpenSidebar(false);
    }
  }

  return (
    <div className='w-full'>
      <div className={`${active 
        ? "fixed top-0 left-0 w-full h-[80px] bg-white dark:bg-gray-900 border-b dark:border-[#ffffff1c] shadow-xl transition duration-500 z-50" 
        : "w-full h-[80px] border-b dark:border-[#ffffff1c] z-50"
      }`}>

        {/* header content */}
        <div className="w-[95%] 800px:w-[92%] m-auto py-2 h-full">
          <div className="w-full h-[80px] flex items-center justify-between p-3">

            {/* header name on left side */}
            <div>
              <Link href={"/"} className="text-[25px] font-Poppins font-[500] text-black dark:text-white">
                Shreyanshi Kushwaha
              </Link>
            </div>

            {/* Navbar function */}
            <div className="flex items-center">
              <ThemeSwitcher />
              {/* Add icons or menu here */}
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}

export default Header;










