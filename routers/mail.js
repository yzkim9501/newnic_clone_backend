const express = require("express");
const router = express.Router();//라우터라고 선언한다.

const nodemailer = require('nodemailer')

router.post('/mailing',  async (req, res, next) => {
    const {emailAddress,nickname}=req.body

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: 'newneek.clone@gmail.com',
          pass: 'hanghae99!@',
        },
      });
 
      let info = await transporter.sendMail({
        from: '"Hanghae99 clone 13 Team" <newneek.clone@gmail.com>',
        to: emailAddress,
        subject: nickname+"님, 환영합니다!",
        text: "Welcome to Newneek clone coding site!"
      });
      console.log('Message sent: %s', info.messageId)
      res.status(200).json({
        status: 'Success',
        code: 200,
        message: 'Sent Auth Email',
      });
    });

module.exports = router;

 