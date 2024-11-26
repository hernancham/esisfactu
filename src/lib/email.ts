import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  /* host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT as string), */
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

interface sendEmailProps {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

export const sendEmail = async ({
  to,
  subject,
  text,
  html,
}: sendEmailProps) => {
  return await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
    html,
  });
};
