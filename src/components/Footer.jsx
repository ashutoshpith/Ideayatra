"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, Power4 } from "gsap";
import Image from "next/image";
import logo from "../../public/ideayatra.png";
import Facebook from "./Icons/Footer/FacebookIcon";
import Instagram from "./Icons/Footer/Instagram";
import LinkedIn from "./Icons/Footer/Linkedin";
import SocialIcon from "../components/SocialIcon";
import { useRouter } from "next/navigation";
import { notFound } from "next/navigation";
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
  const isAnimatedPlayed = useRef(false);
  const linkRefs = useRef([]);
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
      console.log("e coming ", e);
      
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
    <div
      className="flex flex-col justify-center items-center border-t bg-[#252641] w-full"
    >
      <div className="w-[300px] md:w-full flex gap-3 md:gap-5 justify-between p-[5vw] md:px-[10vw] flex-col md:flex-row">
        <div className="flex justify-center">
          <div className="flex flex-col gap-2 md:gap-4 items-center">
            <div
              className="h-[30px] aspect-[36/9] relative lg:h-[40px] cursor-pointer"
              onClick={() => router.push("/")}
            >
              <Image src={logo} fill alt="logo" />
            </div>
            <div className="flex flex-col gap-4 p-0 md:p-5">
              <div className="flex flex-col">
                <p className="text-white text-[18px] md:text-[24px] font-semibold">
                  Contact Us
                </p>
                <p className="text-white text-[14px] md:text-[16px] cursor-pointer ">
                  Call:
                  <a href="tel://7700969697" className="hover:text-[#F48C06]">
                    &nbsp; 7700969697
                  </a>
                </p>
                <p className="text-white text-[14px] md:text-[16px]">
                  Gurugram
                </p>
                <p className="text-white hover:text-[#F48C06] text-[14px] md:text-[16px]">
                  <a href="mailto:ideayatra@gmail.com">ideayatra@gmail.com</a>
                </p>
              </div>
              <div className="flex gap-2">
                {footerSocialIcon.map((val, i) => {
                  return <SocialIcon icon={val.icon} link={val.link} key={i} />;
                })}
              </div>
            </div>
          </div>
          <div className="md:hidden flex flex-col items-center justify-center gap-4 p-5">
            <div className="flex flex-col gap-2">
              <p className="text-[18px] md:text-[24px] text-white font-semibold">
                Explore
              </p>
              <p
                className="text-white cursor-pointer hover:text-[#F48C06] mt-0 text-[16px]"
                onClick={() => {
                  router.push("/");
                }}
              >
                Home
              </p>
              <p
                className="text-white cursor-pointer hover:text-[#F48C06] text-[16px]"
                onClick={() => router.push("/contact-us")}
              >
                Contact Us
              </p>
            </div>
          </div>
        </div>
        <div className="flex gap-5 md:gap-20 flex-row md:w-full justify-end">
          <div className="md:block flex flex-col gap-4 p-5">
            <div className="flex flex-col gap-2">
              <p className="text-[18px] md:text-[24px] text-white font-semibold">
                Explore
              </p>
              <p
                className="text-white cursor-pointer hover:text-[#F48C06] mt-0 text-[16px]"
                onClick={() => {
                  router.push("/");
                }}
              >
                Home
              </p>
              <p
                className="text-white cursor-pointer hover:text-[#F48C06] text-[16px]"
                onClick={() => router.push("/contact-us")}
              >
                Contact Us
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2 !pr-0 md:p-5 w-[300px]">
            <p className="text-[18px] md:text-[24px] text-white font-semibold">
              Subscribe
            </p>
            <p
              className="text-white cursor-pointer"
              onClick={() => {
                router.push("/");
              }}
            >
              Connect With Us
            </p>
            <div className="w-full">
              <form
                className="flex flex-col gap-3"
                autoComplete="off"
                onSubmit={handleSubmit(onFormSubmit)}
              >
                <input
                  className={clsx("p-2 md:p-4 rounded-md w-full border-white border focus:outline-none placeholder:text-grey", {
                    "!border-rose-500 border-2": errors.email
                  })}
                  placeholder="Email Address"
                  type="email"
                  value={watch("email")}
                  {...register("email", { required: true })}
                  error={!!errors.email}
                />
                <button
                  className="p-2 md:p-4 bg-[#F48C06] rounded-md hover:text-white text-[16px] w-full flex justify-center items-center"
                  type="submit"
                >
                  {!loading ? "Submit" : <Spinner width={"20px"} height={"20px"} />}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="text-white mb-4">© IdeaYatra Private Limited 2024</div>
    </div>
  );
};
export default Footer;
