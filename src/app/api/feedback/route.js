import { google } from "googleapis";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { NextResponse } from "next/server";

dayjs.extend(utc);
const credentials = {
  client_email: process.env.GOOGLE_CLIENT_IDEAYATRA_EMAIL,
  private_key: process.env.GOOGLE_CLIENT_IDEAYATRA_PRIVATE_KEY?.replace(/\\n/g,'\n'),
}
const scopes = [
  "https://www.googleapis.com/auth/drive",
  "https://www.googleapis.com/auth/drive.file",
  "https://www.googleapis.com/auth/spreadsheets",
]

const auth = new google.auth.GoogleAuth({
  credentials,
  scopes
});

const sheets = google.sheets({ auth, version: "v4" });

export async function POST(req) {
    if (req.method === 'POST') {
      try {
        const data = await req.json();
        
        const {
            name,
            email,
            mobile,
            rating,
            instructor,
            eventPlace,
            workshopDate,
            contentFeedback,
            instructorFeedback,
            suggestions
         } = data;
  
        const spreadsheetId = process.env.GOOGLE_FEEDBACK_SHEET_ID;
  
        await sheets.spreadsheets.values.append({
          spreadsheetId,
          range: 'A1:J1', // Sheet tab name and range
          valueInputOption: 'USER_ENTERED',
          requestBody: {
            values: [
              [
                name ?? '',
                email ?? '',
                mobile ?? '',
                rating ?? '',
                instructor ?? '',
                eventPlace ?? '',
                workshopDate ?? '',
                contentFeedback ?? '',
                instructorFeedback ?? '',
                suggestions ?? '',
              ],
            ],
          },
        });
       return NextResponse.json({
            message: "Data saved successfully!"
          });
  
        // res.status(200).json({ message: 'Feedback successfully submitted!' });
      } catch (error) {
        console.log("Error: saving to sheet", error);
        return NextResponse.json(
          { message: "Something went wrong. Please try again" },
          { status: 500 }
        );
         // res.status(500).json({ error: 'Failed to submit feedback' });
      }
    } else {
    //   res.status(405).json({ message: 'Method Not Allowed' });
    }
  }