"use client"

import { useState } from 'react';
import axios from "axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

const FeedbackForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Available instructors
  const instructors = ['Simran Thakral','Toshal Lubana', 'Ashutosh Singh'];

  // Available event places
  const eventPlaces = ['JMIT', 'SRM University', 'IIT Madras'];

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
  } = useForm({
    defaultValues: {
        name: '',
        email: '',
        mobile: '',
        rating: '5',
        instructor: '',
        eventPlace: '',
        workshopDate: '',
        contentFeedback: '',
        instructorFeedback: '',
        suggestions: '',
    },
  });
  
  const onFormSubmit = async (data) => {
    setIsSubmitting(true);
    try {
        await axios.post("/api/feedback", data, {
          headers: {
            "content-type": "application/json",
          },
        })
        await axios.post("/api/send-mail", data, {
          headers: {
            "content-type": "application/json",
          },
        })
      toast.success(
          "Your feedback has been submitted successfully. Thank you for sharing!",
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
      }finally {
        setIsSubmitting(false);
      } 

  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center
     py-44 px-4 sm:px-6 lg:px-8 lg:py-48"
     >
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-3xl p-2 font-bold text-gray-900 mb-6 text-center">
         <span className='text-mainTheme3'> JavaScript Workshop</span>
          <span className='text-mainTheme2'> Feedback </span>
        </h1>
        <form onSubmit={handleSubmit(onFormSubmit)}>
          {/* Name Field */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              {...register("name", { required: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              {...register("email", { required: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter your email"
              required
            />
          </div>

            {/* Contact Field */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
              Mobile Number
            </label>
            <input
              type="text"
              id="mobile"
              name="mobile"
              {...register("mobile", { required: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter your mobile number"
              required
            />
          </div>

          {/* Rating Field */}
          <div className="mb-4">
            <label htmlFor="rating" className="block text-gray-700 text-sm font-bold mb-2">
              Rating
            </label>
            <select
              id="rating"
              name="rating"
              {...register("rating", { required: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            >
              <option value="1">1 - Poor</option>
              <option value="2">2 - Fair</option>
              <option value="3">3 - Good</option>
              <option value="4">4 - Very Good</option>
              <option value="5">5 - Excellent</option>
            </select>
          </div>

          {/* Instructor Dropdown */}
          <div className="mb-4">
            <label htmlFor="instructor" className="block text-gray-700 text-sm font-bold mb-2">
              Instructor Name
            </label>
            <select
              id="instructor"
              name="instructor"
              {...register("instructor", { required: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            >
              <option value="">Select an Instructor</option>
              {instructors.map((instructor, index) => (
                <option key={index} value={instructor}>
                  {instructor}
                </option>
              ))}
            </select>
          </div>

          {/* Event Place Dropdown */}
          <div className="mb-4">
            <label htmlFor="eventPlace" className="block text-gray-700 text-sm font-bold mb-2">
              Event Place
            </label>
            <select
              id="eventPlace"
              name="eventPlace"
              {...register("eventPlace", { required: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            >
              <option value="">Select Event Place</option>
              {eventPlaces.map((place, index) => (
                <option key={index} value={place}>
                  {place}
                </option>
              ))}
            </select>
          </div>

          {/* Date Picker for Workshop Date */}
          <div className="mb-4">
            <label htmlFor="workshopDate" className="block text-gray-700 text-sm font-bold mb-2">
              Workshop Date
            </label>
            <input
              type="date"
              id="workshopDate"
              name="workshopDate"
              {...register("workshopDate", { required: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>

          {/* Workshop Content Feedback */}
          <div className="mb-4">
            <label htmlFor="contentFeedback" className="block text-gray-700 text-sm font-bold mb-2">
              Workshop Content Feedback
            </label>
            <textarea
              id="contentFeedback"
              name="contentFeedback"
              {...register("contentFeedback", { required: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              rows="4"
              placeholder="How was the content of the workshop?"
              required
            ></textarea>
          </div>

          {/* Instructor Feedback */}
          <div className="mb-4">
            <label htmlFor="instructorFeedback" className="block text-gray-700 text-sm font-bold mb-2">
              Instructor Feedback
            </label>
            <textarea
              id="instructorFeedback"
              name="instructorFeedback"
              {...register("instructorFeedback", { required: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              rows="4"
              placeholder="How was the instructor's teaching?"
              required
            ></textarea>
          </div>

          {/* Suggestions */}
          <div className="mb-6">
            <label htmlFor="suggestions" className="block text-gray-700 text-sm font-bold mb-2">
              Suggestions for Improvement
            </label>
            <textarea
              id="suggestions"
              name="suggestions"
              {...register("suggestions", { required: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              rows="4"
              placeholder="Any suggestions to improve the workshop?"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className={` text-white px-4 py-2 
                rounded-md shadow  focus:outline-none
                 focus:ring-2 focus:ring-blue-300 w-full
                 ${
                    isSubmitting
                      ? "bg-gray-400"
                      : "bg-mainTheme2 hover:bg-orange-600"
                  } transition-colors`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Feedback"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;
