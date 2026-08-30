import nodemailer from "nodemailer";

function getRequiredEnvironmentVariable(name) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} no está configurada`);
  }

  return value;
}

function createTransporter() {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: getRequiredEnvironmentVariable("GMAIL_USER"),
      pass: getRequiredEnvironmentVariable("GMAIL_APP_PASSWORD"),
    },
  });
}

export async function sendEmail({ to, subject, text, html }) {
  const from = getRequiredEnvironmentVariable("GMAIL_USER");

  return createTransporter().sendMail({
    from,
    to,
    subject,
    text,
    html,
  });
}
