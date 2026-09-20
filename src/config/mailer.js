const nodemailer=require("nodemailer");
 const transporter=nodemailer.createTransport({
     host:"smtp.gmail.com",
    port:465,
    secure:true,

  auth:{
       user:process.env.GMAIL_USER,
      pass:process.env.GMAIL_APP_PASSWORD,
   },

   connectionTimeout: 10000,
   greetingTimeout: 10000,
    socketTimeout: 20000,
}
);
module.exports = transporter;