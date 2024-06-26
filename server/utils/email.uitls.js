import mailer from "nodemailer";

export const sendEmail = ({ target, title, body }) => {
  try {
    const message = {
      from: process.env.HOST_EMAIL,
      to: target,
      subject: title,
      text: body,
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
