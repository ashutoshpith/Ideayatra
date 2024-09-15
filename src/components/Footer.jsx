"use client";

import { useState } from "react";
import Image from "next/image";
import logo from "../../public/ideayatra.png";
import Facebook from "./Icons/Footer/FacebookIcon";
import Instagram from "./Icons/Footer/Instagram";
import LinkedIn from "./Icons/Footer/Linkedin";
import SocialIcon from "../components/SocialIcon";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Spinner from "./Icons/Spinner";
import { toast } from "react-toastify";
import axios from "axios";
import clsx from "clsx";

const footerSocialIcon = [
  {
    id: 1,
    icon: Facebook,
    link: "https://www.facebook.com/profile.php?id=61564388724498",
  },
  {
    id: 2,
    icon: LinkedIn,
    link: "https://www.linkedin.com/company/ideayatra/posts/?feedView=all",
  },
  {
    id: 2,
    icon: Instagram,
    link: "https://www.instagram.com/ideayatra/",
  },
];

const Footer = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    clearErrors,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const onFormSubmit = async (e) => {
    setLoading(true);
    try {
      await axios.post("/api/save-lead", e, {
        headers: {
          "content-type": "application/json",
        },
      });
      await axios.post("/api/send-mail", e, {
        headers: {
          "content-type": "application/json",
        },
      });
      toast.success(
        "We have received your message. We will reach out to you in next 24 hours.",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
      reset();
      clearErrors();
    } catch (error) {
      console.log("Error From Footer ", error)
      toast.error("Something went wrong, Please try again.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center border-t bg-[#252641] w-full py-8 md:py-12">
    <div className="w-full max-w-7xl flex flex-col md:flex-row gap-8 md:gap-16 justify-between px-6 md:px-12">
      
      {/* Logo and Contact Section */}
      <div className="flex flex-col gap-6 items-center md:items-start">
        <div
          className="h-[30px] lg:h-[40px] aspect-[36/9] relative cursor-pointer"
          onClick={() => router.push("/")}
        >
          <Image src={logo} sizes="" fill alt="logo" />
        </div>
        <div className="text-center md:text-left">
          <p className="text-white text-lg md:text-xl font-semibold">Contact Us</p>
          <p className="text-white text-sm md:text-base">
            Call: <a href="tel://7700969697" className="hover:text-[#F48C06]">7700969697</a>
          </p>
          <p className="text-white text-sm md:text-base">Gurugram</p>
          <p className="text-white text-sm md:text-base hover:text-[#F48C06]">
            <a href="mailto:ideayatra@gmail.com">ideayatra@gmail.com</a>
          </p>
        </div>
        <div className="flex gap-2 justify-center md:justify-start">
          {footerSocialIcon.map((val, i) => (
            <SocialIcon icon={val.icon} link={val.link} key={i} />
          ))}
        </div>
      </div>
  
      {/* Explore Section */}
      <div className="flex flex-col gap-4 items-center md:items-start">
        <p className="text-white text-lg md:text-xl font-semibold">Explore</p>
        <p
          className="text-white cursor-pointer hover:text-[#F48C06] text-base"
          onClick={() => router.push("/")}
        >
          Home
        </p>
        <p
          className="text-white cursor-pointer hover:text-[#F48C06] text-base"
          onClick={() => router.push("/about")}
        >
          About
        </p>
        <p
          className="text-white cursor-pointer hover:text-[#F48C06] text-base"
          onClick={() => router.push("/blogs")}
        >
          Blogs
        </p>
        <p
          className="text-white cursor-pointer hover:text-[#F48C06] text-base"
          onClick={() => router.push("/contact-us")}
        >
          Contact Us
        </p>
      </div>
  
      {/* Subscribe Section */}
      <div className="flex flex-col gap-4 w-full max-w-md">
        <p className="text-white text-lg md:text-xl font-semibold">Subscribe</p>
        <p className="text-white text-base cursor-pointer" onClick={() => router.push("/")}>
          Connect With Us
        </p>
        <form className="flex flex-col gap-3" autoComplete="off" onSubmit={handleSubmit(onFormSubmit)}>
          <input
            className={clsx("p-3 md:p-4 rounded-md w-full border border-white bg-transparent focus:outline-none placeholder:text-gray-400 text-white", {
              "border-rose-500 border-2": errors.email
            })}
            placeholder="Email Address"
            type="email"
            {...register("email", { required: true })}
          />
          <button
            className="p-3 md:p-4 bg-[#F48C06] text-white rounded-md hover:bg-[#f68d20] transition-colors text-base"
            type="submit"
          >
            {!loading ? "Submit" : <Spinner width={"20px"} height={"20px"} />}
          </button>
        </form>
      </div>
    </div>
  
    {/* Footer Bottom */}
    <div className="text-white text-center mt-6">
      © IdeaYatra Private Limited 2024
    </div>
  </div>
  
  );
};
export default Footer;
