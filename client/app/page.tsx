'use client'
import React,{FC,useState} from  "react";
import Heading from "./utils/Heading";
import Header from './components/Header';
import { useAuth } from '../app/hooks/auth/useAuth';

interface Props {}

const Page : FC<Props> = (props) => {
  const [open,setOpen] = useState(false);
  const[activeItem,setActiveItem] = useState(0);
  const[route,setRoute] = useState("Login")
  const {user} = useAuth();

  return (
    <div>
      <Heading
       title = "Elearning"
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
      <div className="flex min-h-screen items-center justify-center">
      <h1 className="text-3xl font-bold">
        {user ? `Welcome ${user.name}! 👋` : 'Loading...'}
      </h1>
    </div>
     </div>
  )
}

export default Page;