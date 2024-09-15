import { google } from "googleapis";
import { NextResponse } from "next/server";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
const credentials = {
  client_email: process.env.GOOGLE_CLIENT_EMAIL,
  private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
};
const scopes = [
  "https://www.googleapis.com/auth/drive",
  "https://www.googleapis.com/auth/drive.file",
  "https://www.googleapis.com/auth/spreadsheets",
];

const auth = new google.auth.GoogleAuth({
  credentials,
  scopes,
});

const sheets = google.sheets({ auth, version: "v4" });

export async function POST(req) {
  try {
    const data = await req.json();

    const {
      firstName,
      lastName,
      email,
      contactNumber,
      inquiryType,
      message,
      pagePath,
    } = data;

    // Append the data
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "A1:H1", // Adjust this range as needed
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [
            firstName ?? "",
            lastName ?? "",
            email ?? "",
            contactNumber ?? "",
            inquiryType ?? "",
            message ?? "",
            dayjs().local().format("DD MMM, YYYY - hh:mm A"),
            pagePath ?? "",
          ],
        ],
      },
    });

    // Extract the updated range from the response
    const updatedRange = response.data.updates?.updatedRange;
    const lastRow = updatedRange
      ? updatedRange.split(":")[0].replace(/[^\d]/g, "")
      : "Unknown";
    console.log("here last row ", lastRow);

    return NextResponse.json({
      message: "Data saved successfully!",
    });
  } catch (error) {
    console.log("Error: saving to sheet", error);
    return NextResponse.json(
      { message: "Something went wrong. Please try again" },
      { status: 500 }
    );
  }
}
