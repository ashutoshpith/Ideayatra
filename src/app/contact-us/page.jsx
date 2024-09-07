"use client";
import { useState } from "react";
import Image from "next/image";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaInstagram,
  FaLinkedin,
  FaFacebook,
} from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";
import { useForm } from "react-hook-form";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      contactNumber: "",
      inquiryType: "General Inquiry",
      message: "",
      pagePath: "Contact Us",
    },
  });

  const onFormSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      await axios.post("/api/save-lead", data, {
        headers: {
          "content-type": "application/json",
        },
      });
      await axios.post("/api/send-mail", data, {
        headers: {
          "content-type": "application/json",
        },
      });
      toast.success(
        "We have received your message. We will reach out to you in the next 24 hours.",
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
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-lightGray flex justify-center items-center ">
      <div className="bg-white shadow-lg flex flex-col lg:flex-row rounded-lg overflow-hidden w-11/12 lg:w-3/4 mx-auto mt-40 mb-10 lg:mt-28">
        <div className="relative bg-darkBlue p-6 lg:p-10 text-white lg:w-1/3 flex flex-col items-start">
          {/* Background Image */}
          <Image
            src="/contact-frame.png"
            alt="Decorative"
            layout="fill"
            objectFit="cover"
            objectPosition="left"
            className=""
          />
          {/* Contact Information */}
          <div className="relative z-10 flex-grow">
            <h2 className="text-xl lg:text-2xl mb-4">Contact Information</h2>
            <p className="mb-8">Say something to start a live chat!</p>
            <div className="mb-6">
              <p className="flex items-center mb-4">
                <FaPhoneAlt className="mr-2" /> +917700969697
              </p>
              <p className="flex items-center mb-4">
                <FaEnvelope className="mr-2" /> ideayatra@gmail.com
              </p>
              <p className="flex items-center mb-4">
                <FaMapMarkerAlt className="mr-2" /> Gurugram
              </p>
            </div>
          </div>
          {/* Social Media Icons at the Bottom */}
          <div className="relative z-10 mt-auto">
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/ideayatra/" className="text-primary">
                <FaInstagram size={24} />
              </a>
              <a
                href="https://www.facebook.com/people/IdeaYatra/61564388724498/"
                className="text-primary"
              >
                <FaFacebook size={24} />
              </a>
              <a
                href="https://www.linkedin.com/company/ideayatra/posts/?feedView=all"
                className="text-primary"
              >
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 lg:p-10 w-full lg:w-2/3">
          <form onSubmit={handleSubmit(onFormSubmit)}>
            <div className="flex flex-col lg:flex-row lg:space-x-4 mb-4">
              <div className="w-full lg:w-1/2 mb-4 lg:mb-0">
                <label className="block text-dark mb-1">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  {...register("firstName", { required: true })}
                  className="w-full border border-gray-300 p-2 rounded"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">
                    First Name is required
                  </p>
                )}
              </div>
              <div className="w-full lg:w-1/2">
                <label className="block text-dark mb-1">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  {...register("lastName", { required: true })}
                  className="w-full border border-gray-300 p-2 rounded"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">
                    Last Name is required
                  </p>
                )}
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-dark mb-1">Email</label>
              <input
                type="email"
                name="email"
                {...register("email", { required: true })}
                className="w-full border border-gray-300 p-2 rounded"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  Email Address is required
                </p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-dark mb-1">Phone Number</label>
              <input
                type="text"
                name="contactNumber"
                {...register("contactNumber", { required: true })}
                className="w-full border border-gray-300 p-2 rounded"
              />
              {errors.contactNumber && (
                <p className="text-red-500 text-sm mt-1">
                  Phone Number is required
                </p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-dark mb-1">Inquiry Type</label>
              <div className="flex flex-col space-y-2 lg:space-y-0 lg:flex-row lg:space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="inquiryType"
                    value="General Inquiry"
                    {...register("inquiryType", { required: true })}
                    className="mr-2"
                  />
                  General Inquiry
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="inquiryType"
                    value="Idea Brainstorming"
                    {...register("inquiryType", { required: true })}
                    className="mr-2"
                  />
                  Idea Brainstorming
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="inquiryType"
                    value="Enrollment"
                    {...register("inquiryType", { required: true })}
                    className="mr-2"
                  />
                  Enrollment
                </label>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-dark mb-1">Message</label>
              <textarea
                name="message"
                {...register("message", { required: true })}
                className="w-full border border-gray-300 p-2 rounded"
              ></textarea>
              {errors.message && (
                <p className="text-red-500 text-sm mt-1">Message is required</p>
              )}
            </div>
            <button
              type="submit"
              className={`w-full px-4 py-2 text-white font-semibold rounded-lg ${
                isSubmitting
                  ? "bg-gray-400"
                  : "bg-orange-500 hover:bg-orange-600"
              } transition-colors`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
