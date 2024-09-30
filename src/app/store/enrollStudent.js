import axios from "axios";

const api = process.env.NEXT_PUBLIC_BE_IDEAYATRA_API;

const enrollPath = "/email/enroll";

export const enrollStudentApi = async ({
  email,
  firstName,
  lastName,
  mobile,
}) => {
  // Creating the input data for the request
  const inputData = {
    email,
    firstName,
    lastName,
    mobile,
  };

  try {
    // Making a POST request to the server with inputData as the JSON body
    const response = await axios.post(`${api}${enrollPath}`, inputData, {
      headers: {
        "Content-Type": "application/json", // Ensures the body is treated as JSON
      },
    });

    // Handle response
    console.log("Student enrolled successfully:", response.data);
    return response.data; // Return the response if needed
  } catch (error) {
    // Handle errors
    console.error(
      "Error enrolling student:",
      error.response ? error.response.data : error.message
    );
    throw error; // Re-throw the error if you want to handle it further up the chain
  }
};
