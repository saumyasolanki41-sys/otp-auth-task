const transporter=require("../config/mailer");

   const sendOtpEmail=async(email,otp)=>{
  const info=await transporter.sendMail({
    from:{
       name:"otp-auth-task",
      address:process.env.GMAIL_USER,
 },
      to:email,
    subject:"Verify your email-otp auth task",

    text:[
      `Your verification OTP is:${otp}`,
      "",
        "This OTP expires in 10 minutes.",
       "Do not share it with anyone.",
      "",
       "If you did not request this, ignore this email.",
    ].join("\n"),
  }
);

  if(!info.accepted||info.accepted.length === 0){
    throw new Error("Email recipient was not accepted");
  }
};
module.exports = { sendOtpEmail };