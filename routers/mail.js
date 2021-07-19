const express = require("express");
const router = express.Router();//라우터라고 선언한다.

const nodemailer = require('nodemailer')
const fs = require('fs');

const { promisify } = require('util');

const readFile = promisify(fs.readFile);
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
        subject: nickname+" 뉴니커, 만나서 반갑슴!",
        html: await readFile(__dirname + '/../emails/welcome.html', 'utf8')
      });
      console.log('Message sent: %s', info.messageId)
      res.status(200).json({
        status: 'Success',
        code: 200,
        message: 'Sent Auth Email',
      });
    });

module.exports = router;

 