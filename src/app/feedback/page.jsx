"use client"

import { useState } from 'react';
import axios from "axios";
import { toast } from "react-toastify";

const FeedbackForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Available instructors
  const instructors = ['Simran Thakral','Toshal Lubana', 'Ashutosh Singh'];

  // Available event places
  const eventPlaces = ['JMIT', 'SRM University', 'IIT Madras'];

  
  const [formData, setFormData] = useState({
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
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    setIsSubmitting(true);
    const data = formData
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
          "We have received your Feedback.",
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
        

        // reset();
        // clearErrors();
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
        <form onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
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
              value={formData.email}
              onChange={handleChange}
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
              value={formData.mobile}
              onChange={handleChange}
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
              value={formData.rating}
              onChange={handleChange}
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
              value={formData.instructor}
              onChange={handleChange}
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
              value={formData.eventPlace}
              onChange={handleChange}
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
              value={formData.workshopDate}
              onChange={handleChange}
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
              value={formData.contentFeedback}
              onChange={handleChange}
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
              value={formData.instructorFeedback}
              onChange={handleChange}
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
              value={formData.suggestions}
              onChange={handleChange}
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
