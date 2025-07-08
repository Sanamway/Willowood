import React, { useState, useEffect } from "react";
import Navbar from "@/components/Sales_Portal_Home/SalesNavbar";
import Hero from "@/components/Sales_Portal_Home/SalesHero";
import { useRouter } from "next/router";
const index = () => {

  const router = useRouter()
  const [mode, setMode] = useState(null)

  useEffect(() => {
    if (window.localStorage) {
      const mode = localStorage.getItem("mode");
      const uid = localStorage.getItem("uid");
      setMode(mode)
      if (!uid) {
        router.push("/login");
      }
      router.push("/Sales_App/Home")

    }
  }, []);
  const ab = new Promise((res, rej) => {
    setTimeout(() => {
      res("! ")
    }, 404)
  }
  )
  ab.then((res, rej) => console.log("promises", res, rej))



  return (
    <>
      <main className="w-full overflow-hidden h-screen ">
        <Navbar></Navbar>
        <Hero></Hero>
      </main>
    </>
  );
};

export default index;
