import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { name, email } = await req.json();

    const htmlTemplate = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Email Template</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          margin: 0;
          padding: 0;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
          .container {
  width: 700px;
}
        .header {
  background-color: #252641;
  width: 100%;
  height: 100%;
  padding: 15px;
  text-align: center;
}

.header__title {
  font-weight: bold;
  font-size: 38px;
  color: #f8f6f7;
}

.content-body {
  background-color: #f8f6f7;
  width: 100%;
  height: 100%;
  padding: 15px;
}

.content-body__para {
  font-size: 11px;
}

.footer {
  background-color: #252641;
  width: 100%;
  height: 100%;
  padding: 15px;
  color: #f8f6f7;
}
.footer__heading {
  font-size: 24px;
  font-weight: 700;
}
.footer__description__para {
  font-size: 12px;
  letter-spacing: 0.9px;
}

.footer__closing {
  text-align: center;
  font-style: italic;
}

      </style>
    </head>
    <body>
      <div class="container">
      <div class="header">
        <p class="header__title">Welcome To</p>
      </div>
      <div class="content-body">
        <p class="content-body__para">
          Dear ${name ?? email}, Welcome to Idea Yatra! We’re thrilled to have you join
          our community of innovators, dreamers, and creators.<br /><br />
          At Idea Yatra, we believe that every great innovation starts with a
          simple idea. By joining us, you’re taking the first step towards
          transforming your ideas into reality, and we’re here to support you
          every step of the way.<br /><br />
          If you have any questions or need assistance, don’t hesitate to reach
          out to our team at ideayatra@gmail.com. We’re here to help
          you make the most of your journey with Idea Yatra.
        </p>
      </div>
      <div class="footer">
        <p class="footer__heading">What You Can Expect:</p>
        <ul class="footer__description">
          <li class="footer__description__para">
            Exclusive Resources: Access to cutting-edge training programs and
            materials designed to equip you with the skills and knowledge you
            need to succeed in today’s tech landscape.
          </li>
          <li class="footer__description__para">
            Expert Guidance: Mentorship from industry professionals who will
            help you navigate the complexities of turning your ideas into
            market-ready products.
          </li>
          <li class="footer__description__para">
            Community Support: Connect with like-minded peers and innovators who
            share your passion for technology and entrepreneurship.
          </li>
        </ul>
        <p class="footer__closing">
          Thank you for choosing Idea Yatra. Together, let’s turn ideas into
          reality!
        </p>
      </div>
    </div>
    </body>
    </html>
  `;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // Your Gmail address
        pass: process.env.EMAIL_PASS, // Your Gmail password or App Password
      },
    });

    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL_USER, // Sender address
      to: email, // List of receivers
      subject: "IdeaYatra 🚀", // Subject line
      text: "Hello User", // Plain text body
      html: htmlTemplate, // HTML body
    });
    return NextResponse.json({ message: "Message sent successfully!" });
  } catch (error) {
    console.log("Error: sending mail", error);
    return NextResponse.json(
      { message: "Something went wrong. Please try again" },
      { status: 500 }
    );
  }
}
