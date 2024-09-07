"use client";

import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import clsx from "clsx";
import { gsap, Power4 } from "gsap";
import { getLandingPage } from "@studio/lib/queries";
import Category from "../components/Category";
import Spinner from "../components/Icons/Spinner";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Image from "next/image";
import robot from "../../public/home_hero_4.jpg";
import { sendGAEvent } from "@next/third-parties/google";
import HeroSection from '@/components/Home/Hero'

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [landingPageData, setLandingPageData] = useState([]);
  const router = useRouter();
  const isAnimatedPlayed = useRef(false);
  const linkRefs = useRef([]);

  useEffect(() => {
    if (!isAnimatedPlayed.current) {
      const tl = gsap.timeline({ delay: 0.1 });
      linkRefs.current.map((target) => {
        tl.fromTo(
          target,
          {
            y: 100,
            opacity: 0,
            duration: 0.2,
            ease: Power4.easeIn,
          },
          {
            y: 0,
            opacity: 1,
          },
          "<+0.05"
        );
      });
      isAnimatedPlayed.current = true;
    }

    (async () => {
      const landingPage = await getLandingPage();
      setLandingPageData(landingPage);
    })();
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    clearErrors,
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      contactNumber: "",
      inquiryType: "Enrollment",
      pagePath: 'Home'
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
      sendGAEvent('event', 'EnquriySubmitted', { value: 'xyz' })
    } catch (error) {
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
      className="flex flex-col px-[5vw] xl:px-[10vw] lg:px-[5vw] py-28 w-full z-0 bg-[url('../../public/landingPage/backgroundBanner.png')] bg-no-repeat"
      ref={(e) => {
        linkRefs.current[0] = e;
      }}
    >

      <HeroSection />

      <div className="w-full h-[80px] md:h-[180px] bg-[url('../../public/landingPage/enrollBackground.png')] bg-no-repeat mt-16"></div>
      {/* <div>
        <div className="w-full bg-[url('../../public/landingPage/enrollFormImage1.png')]"></div> */}
      <div className="w-full flex justify-center items-center bg-white rounded-md relative md:form-bg">
        <div className="flex flex-col items-center gap-4 w-full  p-4 md:p-5">
          <p className="text-2xl md:text-[36px] text-[#2F327D] lg:text-[44px] font-semibold">
            Enroll <span className="text-mainTheme2">Now</span>
          </p>
          <form
            autoComplete="off"
            onSubmit={handleSubmit(onFormSubmit)}
            className="flex flex-col items-center gap-4 w-full lg:w-[70%] xl:w-[50%]"
          >
            <div
              className={clsx(
                "w-full flex items-center rounded-md border border-[#DDDDDD]",
                {
                  "border-rose-500 border-2 ": errors.firstName,
                }
              )}
            >
             <div className="p-4 border-r-[1px] border-r-[#DDDDDD]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="27"
                  viewBox="0 0 22 27"
                  fill="none"
                >
                  <path
                    d="M16.0779 26.8283H5.94571C3.91009 26.8353 2.01338 25.797 0.922976 24.0789C-0.168334 22.3608 -0.300044 20.2028 0.571348 18.3649C1.44391 16.5257 3.1985 15.2626 5.21988 15.0205C7.14143 14.7912 9.07604 14.676 11.0115 14.6748H11.0562C12.9789 14.6772 14.8982 14.7924 16.8069 15.0205C18.2427 15.1993 19.5633 15.8967 20.5194 16.9809C21.4767 18.0663 22.0023 19.4634 22 20.9099C21.9976 22.4786 21.3732 23.9839 20.2631 25.093C19.153 26.2031 17.6477 26.8264 16.0779 26.8287L16.0779 26.8283ZM11.0118 16.1798C9.1361 16.1798 7.26281 16.2915 5.39991 16.5138C3.90169 16.7067 2.60579 17.651 1.9625 19.0175C1.31925 20.384 1.41802 21.9845 2.22475 23.2617C3.03147 24.5388 4.4344 25.3161 5.94544 25.3232H16.0776C17.5887 25.3173 18.9929 24.5411 19.7995 23.2641C20.6074 21.9869 20.7074 20.3864 20.0641 19.0186C19.4208 17.651 18.1249 16.7067 16.6255 16.5138C14.7769 16.2939 12.9165 16.1822 11.0536 16.1798H11.0118Z"
                    fill="#F48C06"
                  />
                  <path
                    d="M11.0118 12.6747C9.32896 12.6783 7.71437 12.0138 6.52311 10.8261C5.33185 9.63719 4.66153 8.02491 4.65918 6.34194C4.65801 4.6603 5.32595 3.04573 6.51606 1.85688C7.70497 0.6668 9.3196 -0.00117255 11.0011 1.54517e-06C12.6839 0.00117775 14.2973 0.671496 15.4853 1.86393C16.673 3.05519 17.3374 4.66982 17.3339 6.3526C17.328 8.0272 16.6589 9.63135 15.4747 10.8154C14.2905 11.9996 12.6863 12.6677 11.0118 12.6747ZM11.0118 1.50514C9.72996 1.50161 8.49752 2.00729 7.58853 2.91162C6.67951 3.81594 6.16793 5.04483 6.16441 6.32674C6.16205 7.60973 6.66891 8.841 7.57441 9.74879C8.47991 10.6566 9.7088 11.1682 10.9919 11.1694C12.2738 11.1706 13.505 10.6625 14.4116 9.75586C15.3194 8.84919 15.8286 7.61909 15.8286 6.33743C15.8274 5.05913 15.3194 3.83377 14.4174 2.92832C13.5143 2.02282 12.2899 1.51104 11.0118 1.50514Z"
                    fill="#F48C06"
                  />
                </svg>
              </div>

              <input
                type="text"
                placeholder="First Name"
                className={clsx(
                  "w-full p-4 placeholder:text-[#B1B1B1] focus:outline-none"
                )}
                value={watch("firstName")}
                {...register("firstName", { required: true })}
                error={!!errors.firstName}
              />
            </div>
            <div
              className={clsx(
                "w-full flex items-center rounded-md border border-[#DDDDDD]",
                {
                  "border-rose-500 border-2 ": errors.lastName,
                }
              )}
            >
           <div className="p-4 border-r-[1px] border-r-[#DDDDDD]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="27"
                  viewBox="0 0 22 27"
                  fill="none"
                >
                  <path
                    d="M16.0779 26.8283H5.94571C3.91009 26.8353 2.01338 25.797 0.922976 24.0789C-0.168334 22.3608 -0.300044 20.2028 0.571348 18.3649C1.44391 16.5257 3.1985 15.2626 5.21988 15.0205C7.14143 14.7912 9.07604 14.676 11.0115 14.6748H11.0562C12.9789 14.6772 14.8982 14.7924 16.8069 15.0205C18.2427 15.1993 19.5633 15.8967 20.5194 16.9809C21.4767 18.0663 22.0023 19.4634 22 20.9099C21.9976 22.4786 21.3732 23.9839 20.2631 25.093C19.153 26.2031 17.6477 26.8264 16.0779 26.8287L16.0779 26.8283ZM11.0118 16.1798C9.1361 16.1798 7.26281 16.2915 5.39991 16.5138C3.90169 16.7067 2.60579 17.651 1.9625 19.0175C1.31925 20.384 1.41802 21.9845 2.22475 23.2617C3.03147 24.5388 4.4344 25.3161 5.94544 25.3232H16.0776C17.5887 25.3173 18.9929 24.5411 19.7995 23.2641C20.6074 21.9869 20.7074 20.3864 20.0641 19.0186C19.4208 17.651 18.1249 16.7067 16.6255 16.5138C14.7769 16.2939 12.9165 16.1822 11.0536 16.1798H11.0118Z"
                    fill="#F48C06"
                  />
                  <path
                    d="M11.0118 12.6747C9.32896 12.6783 7.71437 12.0138 6.52311 10.8261C5.33185 9.63719 4.66153 8.02491 4.65918 6.34194C4.65801 4.6603 5.32595 3.04573 6.51606 1.85688C7.70497 0.6668 9.3196 -0.00117255 11.0011 1.54517e-06C12.6839 0.00117775 14.2973 0.671496 15.4853 1.86393C16.673 3.05519 17.3374 4.66982 17.3339 6.3526C17.328 8.0272 16.6589 9.63135 15.4747 10.8154C14.2905 11.9996 12.6863 12.6677 11.0118 12.6747ZM11.0118 1.50514C9.72996 1.50161 8.49752 2.00729 7.58853 2.91162C6.67951 3.81594 6.16793 5.04483 6.16441 6.32674C6.16205 7.60973 6.66891 8.841 7.57441 9.74879C8.47991 10.6566 9.7088 11.1682 10.9919 11.1694C12.2738 11.1706 13.505 10.6625 14.4116 9.75586C15.3194 8.84919 15.8286 7.61909 15.8286 6.33743C15.8274 5.05913 15.3194 3.83377 14.4174 2.92832C13.5143 2.02282 12.2899 1.51104 11.0118 1.50514Z"
                    fill="#F48C06"
                  />
                </svg>
              </div>

              <input
                type="text"
                placeholder="Last Name"
                className={clsx(
                  "w-full p-4 placeholder:text-[#B1B1B1] focus:outline-none"
                )}
                value={watch("lastName")}
                {...register("lastName", { required: true })}
                error={!!errors.lastName}
              />
            </div>
            <div
              className={clsx(
                "w-full flex items-center rounded-md border border-[#DDDDDD]",
                {
                  "border-rose-500 border-2 ": errors.email,
                }
              )}
            >
              <div className="border-r-[1px] p-4 border-r-[#DDDDDD]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="23"
                  height="16"
                  viewBox="0 0 23 16"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M1.77764 0H21.2224C21.6936 0.000601511 22.1454 0.185908 22.4787 0.515281C22.8119 0.844654 22.9994 1.29121 23 1.75701V14.243C22.9994 14.7088 22.8119 15.1553 22.4787 15.4847C22.1454 15.8141 21.6936 15.9994 21.2224 16H1.77764C1.30637 15.9994 0.854573 15.8141 0.521332 15.4847C0.188091 15.1553 0.000608576 14.7088 0 14.243V1.75701C0.000608576 1.29121 0.188091 0.844654 0.521332 0.515281C0.854573 0.185908 1.30637 0.000601511 1.77764 0ZM21.9218 1.89694L12.6707 9.90755C12.3481 10.1903 11.9319 10.3464 11.5008 10.3464C11.0696 10.3464 10.6534 10.1903 10.3308 9.90755L1.07819 1.89694V14.243C1.07873 14.4262 1.15259 14.6017 1.28365 14.7313C1.41471 14.8608 1.5923 14.9338 1.77764 14.9343H21.2224C21.4077 14.9338 21.5853 14.8608 21.7164 14.7313C21.8474 14.6017 21.9213 14.4262 21.9218 14.243V1.89694ZM1.74928 1.06618L11.0377 9.10836C11.1656 9.21925 11.3299 9.28039 11.5 9.28039C11.6701 9.28039 11.8344 9.21925 11.9623 9.10836L21.2507 1.06618C21.2415 1.06618 21.2318 1.06618 21.2224 1.06618H1.77764C1.76819 1.06567 1.75873 1.06567 1.74928 1.06618Z"
                    fill="#F48C06"
                  />
                </svg>
              </div>
              <input
                type="email"
                placeholder="Email Address"
                className={clsx(
                  "w-full p-4 placeholder:text-[#B1B1B1] focus:outline-none"
                )}
                value={watch("email")}
                {...register("email", { required: true })}
                error={!!errors.email}
              />
            </div>
            <div
              className={clsx(
                "w-full flex items-center rounded-md border border-[#DDDDDD]",
                {
                  "border-rose-500 border-2 ": errors.contactNumber,
                }
              )}
            >
              <div className="p-4 border-r-[1px] border-r-[#DDDDDD]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="21"
                  height="21"
                  viewBox="0 0 21 21"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0.0346962 4.2232C0.0901636 3.54042 0.389655 2.90045 0.87836 2.42042L2.74277 0.55604C2.92506 0.371724 3.14361 0.227247 3.38461 0.131748C3.62561 0.0362502 3.8838 -0.00818985 4.14286 0.00123987C4.40192 0.0106696 4.65621 0.0737639 4.88962 0.186531C5.12304 0.299298 5.33051 0.459283 5.49891 0.656363L7.98884 3.53354C8.30056 3.89335 8.46445 4.35787 8.44753 4.83363C8.4306 5.30939 8.23412 5.76109 7.89761 6.09784L6.28588 7.70954C6.1764 7.81337 6.09615 7.94416 6.05319 8.0888C6.01023 8.23344 6.00607 8.38684 6.04113 8.53359C6.40709 10.0956 7.2121 11.5203 8.36121 12.6398C9.4806 13.7884 10.905 14.5931 12.4666 14.9589C12.6134 14.994 12.7668 14.9899 12.9114 14.9469C13.0561 14.904 13.1869 14.8237 13.2907 14.7142L14.9024 13.1025C15.2392 12.766 15.6909 12.5695 16.1666 12.5526C16.6424 12.5357 17.1069 12.6995 17.4668 13.0113L20.3433 15.5011C20.5405 15.6695 20.7005 15.8769 20.8134 16.1103C20.9262 16.3438 20.9893 16.5981 20.9988 16.8572C21.0082 17.1162 20.9637 17.3745 20.8682 17.6155C20.7726 17.8565 20.628 18.075 20.4436 18.2572L18.5792 20.1216C18.0992 20.6103 17.4592 20.9098 16.7764 20.9653C16.2408 21.0131 15.7019 21.0115 15.1665 20.9606C11.8138 20.6517 8.18132 18.5416 5.31973 15.6803C2.45813 12.819 0.34827 9.18639 0.0393625 5.83187C-0.0115129 5.29692 -0.013075 4.75843 0.0346962 4.2232ZM1.18213 3.66139C1.08765 3.86649 1.02984 4.08656 1.01135 4.31162C0.969066 4.78803 0.970628 5.26732 1.01602 5.74344C1.30299 8.85812 3.30109 12.27 6.0157 14.9844C8.73031 17.6987 12.1423 19.697 15.257 19.984C15.7332 20.0293 16.2125 20.0309 16.6889 19.9886C17.1433 19.9552 17.5692 19.7546 17.8844 19.4256L19.7488 17.5613C19.8384 17.4749 19.9087 17.3707 19.9553 17.2553C20.002 17.14 20.0238 17.0161 20.0194 16.8918C20.015 16.7674 19.9844 16.6454 19.9298 16.5337C19.8751 16.4219 19.7976 16.3229 19.7021 16.2431L16.8247 13.7532C16.6528 13.6034 16.4304 13.5248 16.2026 13.5332C15.9748 13.5416 15.7587 13.6364 15.5984 13.7985L13.9866 15.4102C13.7661 15.6344 13.4922 15.7989 13.1906 15.8881C12.889 15.9773 12.5697 15.9883 12.2627 15.9202C10.5153 15.5145 8.92039 14.6174 7.6664 13.3346C6.38357 12.0807 5.48638 10.4858 5.08081 8.73844C5.01264 8.43142 5.02368 8.1121 5.1129 7.81052C5.20212 7.50895 5.36659 7.23502 5.59084 7.01451L7.20257 5.40281C7.36459 5.24246 7.45944 5.02642 7.46785 4.79863C7.47626 4.57084 7.39759 4.34839 7.24784 4.17654L4.75791 1.29843C4.67809 1.203 4.57908 1.12544 4.46731 1.07079C4.35555 1.01613 4.23353 0.985613 4.1092 0.981212C3.98486 0.976811 3.861 0.998626 3.74565 1.04524C3.6303 1.09185 3.52605 1.16222 3.43968 1.25177L1.57434 3.11638C1.41276 3.27374 1.28002 3.4582 1.18213 3.66139Z"
                    fill="#F48C06"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Phone Number"
                className={clsx(
                  "w-full p-4 placeholder:text-[#B1B1B1] focus:outline-none focus-o"
                )}
                value={watch("contactNumber")}
                {...register("contactNumber", { required: true })}
                error={!!errors.contactNumber}
              />
            </div>
            <button
              className="w-60 bg-[#F48C06] rounded-md p-4 text-[#FFFFFF] flex justify-center"
              type="submit"
            >
              {!loading ? "Submit" : <Spinner width={"20px"} height={"20px"} />}
            </button>
          </form>
        </div>
      </div>
      <div className="flex flex-col gap-4 lg:gap-8 mt-16 justify-center items-center">
        <p className="text-2xl md:text-[36px] text-[#2F327D] lg:text-[44px] font-semibold">
          Our<span className="text-[#F48C06]"> Popular Category</span>
        </p>
      </div>
      {/* <div className="grid grid-flow-col auto-cols-max gap-4 lg:gap-8 overflow-auto hide-scrollbar mt-8"> */}
        <Category />
      {/* </div> */}
    </div>
  );
};
export default Home;
