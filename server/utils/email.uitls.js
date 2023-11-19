import mailer from "nodemailer";

export const sendEmail = (target, content) => {
  const { subject, text } = content;

  try {
    const message = {
      from: process.env.HOST_EMAIL,
      to: target,
      subject,
      text,
    };

    const transporter = mailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.HOST_EMAIL,
        pass: process.env.HOST_PASSWORD,
      },
    });

    return transporter.sendMail(message);
  } catch (e) {
    throw new Error(e);
  }
};
