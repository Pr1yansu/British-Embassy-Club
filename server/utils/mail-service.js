const nodemailer = require("nodemailer");

exports.sendMail = async (to, subject, text) => {
  try {
    const transport = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    console.log(transport);

    const info = await transport.sendMail({
      from: process.env.EMAIL,
      to,
      subject,
      text,
    });

    console.log(info);

    return info;
  } catch (error) {
    console.log(error);
    return error;
  }
};
