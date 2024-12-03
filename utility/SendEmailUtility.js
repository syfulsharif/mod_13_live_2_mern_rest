var nodemailer = require('nodemailer');

const SendEmailUtility= async (EmailTo, EmailText, EmailSubject) => {

    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: "sharif88.dev@gmail.com",
            pass: 'jljqrfpayqvoudbp'
        },tls: {
            rejectUnauthorized: false
        },
    });


    let mailOptions = {
        from: 'Task Manager MERN <sharif88.dev@gmail.com>',
        to: EmailTo,
        subject: EmailSubject,
        text: EmailText
    };


    return  await transporter.sendMail(mailOptions)

}
module.exports=SendEmailUtility