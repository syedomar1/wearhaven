import Forgot from "../../models/Forgot";
import User from "@/models/User";
import connectDb from "@/middleware/mongoose";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const handler = async (req, res) => {
  // await connectDB(); // Ensure you are connected to the database
  try {
    const { email, sendMail, password, token } = req.body;

    // Check if the user exists in the Database
    // Send an email to the user
    if (sendMail) {
      let token = crypto.randomBytes(20).toString("hex");
      let forgot = new Forgot({
        email: email,
        token: token,
      });
      await forgot.save();

      let emailContent = `We have sent you this email in response to your request to reset your password on Wearhaven.com.

    To reset your password, please follow the link below:

    <a href="https://wearhaven.vercel.app/forgot?token=${token}">Click here to reset your password</a>

    <br/><br/>

    We recommend that you keep your password secure and not share it with anyone.If you feel your password has been compromised, you can change it by going to your My Account Page and change your Password".`;
      // Code to send mail using Nodemailer or
      const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: "javalab98@gmail.com",
        subject: "Password Reset Request",
        html: emailContent,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("error sending mail: ", error);
          return res
            .status(500).json({ success: false, message: error.message });
        } else {
          console.log("Email sent: " + info.res);
          return res.status(200).json({ success: true, token });
        }
      });
    } else {
      // Reset User Password
      // This part of the code should handle the password reset
      // Make sure to validate the token, find the user, and update their password
      const forgotRecord = await Forgot.findOne({ token: token });
      if (forgotRecord) {
        const user = await User.findOne({ email: forgotRecord.email });
        if (user) {
          const hashedPassword = await bcrypt.hash(password, 10);
          user.password = hashedPassword;
          await user.save();
          await Forgot.deleteOne({ token: token }); // Optionally delete the token after use
          return res.status(200).json({ success: true });
        } else {
          return res
            .status(400).json({ success: false, message: "User not found" });
        }
      } else {
        return res
          .status(400).json({ success: false, message: "Invalid token" });
      }
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export default connectDb(handler);
