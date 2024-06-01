import User from "@/models/user.model";
import { hash } from "bcrypt";
import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "a56ed0e5de9ea8",
      pass: "cdf13ceeb99107"
    }
  });

export const sendEmail = async({ email, emailType, userId }: any)=> {
    try {

        // Create a hashed token
        const hashedToken = await hash(userId.toString(), 10)

        // Configure mail sending function
        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000
            })
        } else if(emailType === "RESET") {
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000
            })
            
        }
        
        const mailOptions = {
            from: "sanandreas9918@gmail.com", 
            to: email,
            subject: emailType === "VERIFY" ? "Verify your account":"Reset your password", 
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType==="VERIFY"? "Verify your account":"Reset your password"} or copy and paste the link below in your browser
            <br>
            ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`
        }

        const sendEmailResponse = await transporter.sendMail(mailOptions)
        return sendEmailResponse

    } catch (error) {
        console.log(error)
    }
}