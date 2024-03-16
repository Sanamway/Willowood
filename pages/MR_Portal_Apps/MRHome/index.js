import React, { useState, useEffect } from "react";
import Navbar from "@/components/MR_Portal_Apps/Navbar";
import Hero from "@/components/MR_Portal_Apps/Hero";
import { useRouter } from "next/router";
const index = () => {
  const router = useRouter();
  useEffect(() => {
    if (!localStorage.getItem("uid")) {
      router.push("/login");
    }
  }, []);

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
