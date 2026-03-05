const transporter = require('./Transporter_Mail');
require('dotenv').config();
const fs = require('fs');
const path = require('path');

/**
 * Sends the OTP using the interface_otp.html as a static template.
 * Injects OTP digits while preserving original HTML/CSS structure.
 */
const SendOTPEmail = async (email, otp) => {
    try {
        // 1. Locate and Read the HTML template
        // Using path.resolve ensures the path is absolute regardless of where the script is run
        const templatePath = path.resolve(__dirname, './Interface_Mailing/interface_otp.html');
        
        if (!fs.existsSync(templatePath)) {
            throw new Error(`Template not found at: ${templatePath}`);
        }

        let htmlContent = fs.readFileSync(templatePath, 'utf8');

        // 2. Prepare the OTP string
        const otpStr = otp.toString().padStart(6, '0'); // Ensures it's always 6 digits

        // 3. Inject digits into placeholders {{D1}} through {{D6}}
        // This loop replaces each placeholder with the specific digit
        for (let i = 0; i < 6; i++) {
            const placeholder = `{{D${i + 1}}}`;
            htmlContent = htmlContent.replace(placeholder, otpStr[i]);
        }

        // 4. Configure Email Options
        const mailOptions = {
            from: `"NexaSoft System" <${process.env.APP_EMAIL}>`,
            to: email,
            subject: `NexaSoft verification code`,
            // The 'html' field treats the string as a full static document
            html: htmlContent,
            // Added headers for better deliverability
            priority: 'high',
        };

        console.log(`[Mail Service] OTP [${otpStr}]  for: ${email}`);
        
        const info = await transporter.sendMail(mailOptions);
        return info;
        
    } catch (error) {
        console.error("Critical Error: Failed to send OTP email:", error.message);
        throw error;
    }
};

module.exports = { SendOTPEmail };