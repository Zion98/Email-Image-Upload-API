const nodemailer = require("nodemailer");

const sendEmail = async (req, res) => {
  let testAccount = await nodemailer.createTestAccount();
 

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "qq3ukrrj6do2uyl5@ethereal.email",
    pass: "jtcHThhZv6E3gK5fZH",
  },
});

let info = await transporter.sendMail({
  from: '"Billions Fate" <segunadreck98@gmail.com>',
  to: "adeyemioluwasegun98@gmail.com",
  subject: "Hello, welcome to the Billions Fate",
  html: "<h2>Sending Emails with Node.js</h2>",
});

res.json(info);
};

module.exports = {
  sendEmail,
};
