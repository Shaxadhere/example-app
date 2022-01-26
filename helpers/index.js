const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

//default api response format
exports.ApiResponse = (status = true, message = "", data = {}) => {
  return {
    status: status,
    message: message,
    data: data,
  };
};

//generate password based on caps, smalls and numbers.
exports.generateString = (length) => {
  length = length ? length : 8;
  (charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"),
    (retVal = "");
  for (let i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
};

//send email using smtp
exports.sendEmail = (to, subject, text, html) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });
  var mailOptions = {
    from: process.env.SMTP_EMAIL,
    to: to,
    subject: subject,
    text: text,
    html: html,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return { error: error, status: false };
    } else {
      return { status: true };
    }
  });
};

//check file extention
exports.checkFileExtention = (file, extentions) => {
  const type = file.originalFilename.split(".").pop() || "png";
  const validTypes = extentions ? extentions : ["jpg", "jpeg", "png"];
  if (validTypes.indexOf(type) === -1) {
    return false;
  }
  return true;
};

//upload file to server
exports.uploadFile = (file) => {};
