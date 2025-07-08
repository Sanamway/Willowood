import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

const Cooming_Soon = (props) => {
    const router = useRouter();
    const headers = {
        "Content-Type": "application/json",
        secret: "fsdhfgsfuiweifiowefjewcewcebjw",
    };

    const [localStorageItems, setLocalStorageItems] = useState({
        uId: "",
        cId: "",
        bgId: "",
        buId: "",
        rId: "",
        zId: "",
        tId: "",
        roleId: "",
        empCode: "",
        reportingManager: "",
        developmentManager: "",
        hrManager: "",
        reportingHQ: ""
    });
    useEffect(() => {
        setLocalStorageItems({
            uId: JSON.parse(window.localStorage.getItem("uid")),
            cId: JSON.parse(window.localStorage.getItem("userinfo"))?.c_id,
            bgId: JSON.parse(window.localStorage.getItem("userinfo")).bg_id,
            buId: JSON.parse(window.localStorage.getItem("userinfo")).bu_id,
            rId: JSON.parse(window.localStorage.getItem("userinfo")).r_id,
            zId: JSON.parse(window.localStorage.getItem("userinfo")).z_id,
            tId: JSON.parse(window.localStorage.getItem("userinfo")).t_id,
            clName: window.localStorage.getItem("user_name"),
            ulName: window.localStorage.getItem("phone_number"),
            empCode: window.localStorage.getItem("emp_code"),
            roleId: JSON.parse(window.localStorage.getItem("userinfo")).role_id,
            reportingManager: JSON.parse(window.localStorage.getItem("userinfo")).rp_manager,
            developmentManager: JSON.parse(window.localStorage.getItem("userinfo")).functional_mgr,
            hrManager: JSON.parse(window.localStorage.getItem("userinfo")).hr_name,
            reportingHQ: JSON.parse(window.localStorage.getItem("userinfo")).reporting_hq
        });
    }, []);

    const getUserItem = () => {
        let role = localStorageItems.roleId
        switch (role) {
            case 1: return <div className="flex w-full  w-28">
                <div className="flex">
                    <p className=" font-bold text-sm text-blue-800 w-24">
                        Business Segment
                    </p>
                    <span>:</span>
                </div>
                <span className="w-32 ml-3">{JSON.parse(window.localStorage.getItem("userinfo"))?.business_segment
                }</span>
            </div>

            case 3: return <div className="flex w-full  w-28">
                <div className="flex">
                    <p className=" font-bold text-sm text-blue-800 w-24">
                        Business Unit
                    </p>
                    <span>:</span>
                </div>
                <span className="w-32 ml-3">{JSON.parse(window.localStorage.getItem("userinfo"))?.business_unit_name}</span>
            </div>

            case 4: return <div className="flex w-full  w-28">
                <div className="flex">
                    <p className=" font-bold text-sm text-blue-800 w-24">
                        Zone
                    </p>
                    <span>:</span>
                </div>
                <span className="w-32 ml-3">{JSON.parse(window.localStorage.getItem("userinfo"))?.zone_name}</span>
            </div>

            case 5: return <div className="flex w-full  w-28">
                <div className="flex">
                    <p className=" font-bold text-sm text-blue-800 w-24">
                        Region
                    </p>
                    <span>:</span>
                </div>
                <span className="w-32 ml-3">{JSON.parse(window.localStorage.getItem("userinfo"))?.region_name
                }</span>
            </div>

            case 6: return <div className="flex w-full  w-28">
                <div className="flex">
                    <p className=" font-bold text-sm text-blue-800 w-24">
                        Territory
                    </p>
                    <span>:</span>
                </div>
                <span className="w-32 ml-3">{localStorageItems.tDes}</span>
            </div>
            case 10: return <div className="flex w-full  w-28">
                <div className="flex">
                    <p className=" font-bold text-sm text-blue-800 w-24">
                        Business Segment
                    </p>
                    <span>:</span>
                </div>
                <span className="w-32 ml-3">{JSON.parse(window.localStorage.getItem("userinfo"))?.business_segment
                }</span>
            </div>


        }
    }


    const [userImg, setUserImg] = useState(null);
    useEffect(() => {
        // Ensure this runs only on the client
        if (typeof window === "undefined") return;
        setUserImg(localStorage.getItem("ImageLink"));
    }, []);



    return (
        <div>
            <Head>
                <title>Comming Soon!</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>

            <div className="flex mb-4 mt-2 mb-8">

                <div className="w-40 h-30 flex justify-center items-center">
                    <img src={userImg} className="h-20 w-20 rounded-full text-orange-500 mt-4" size={80}></img>
                </div>


                <div className="flex  flex-col  w-full mt-4 md:hidden">
                    <div className="flex w-full  w-28">
                        <div className="flex">
                            <p className=" font-bold text-sm text-blue-800 w-24">
                                Emp Code
                            </p>
                            <span>:</span>
                        </div>
                        <span className="w-32 ml-3">{localStorageItems.empCode}</span>
                    </div>
                    <div className="flex   w-full  w-28 ">
                        <div className="flex">
                            <p className=" font-bold text-sm text-blue-800 w-24">Name</p>
                            <span>:</span>
                        </div>
                        <span className="w-32 ml-3 whitespace-nowrap"> {localStorageItems.clName}</span>
                    </div>
                    {getUserItem()}
                </div>
            </div>




            <div className="h-screen bg-gradient-to-br  flex items-start justify-start relative">

                {/* Animated Circle Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-white to-transparent opacity-30 rounded-full w-96 h-96 md:w-[500px] md:h-[500px] blur-3xl"></div>


                <div className="relative z-10 text-center p-8 space-y-8 md:hidden">
                    <h1 className="text-5xl font-bold text-green-900 animate-pulse">Coming Soon</h1>
                    <p className="text-lg  font-medium">
                        We're working on this page! Stay tuned for updates.
                    </p>
                    <div onClick={() =>
                        router.push({
                            pathname: "/Sales_App/Home",
                        })
                    }>
                        <p className="bg-blue-500 text-white py-3 px-8 rounded-full text-lg shadow-lg transform transition-all hover:scale-105 hover:bg-orange-600">
                            Go to Home
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cooming_Soon;

// Hydration  Issue
