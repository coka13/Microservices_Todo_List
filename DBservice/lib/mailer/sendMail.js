import nodemailer from "nodemailer";
import nl2br from "nl2br"



let mailer = nodemailer.createTransport({
    host: "smtp4dev",  // can add smtp host
    port: 25,           // can add port for smtp
    secure: false,
})

// Function to send an email notification
export const sendMail = async (email, user) => {
    try {
        // Send an email using the mailer service
        await mailer.sendMail({
            from: 'admin@admin.com',  // Sender's email address
            to: user,                  // Recipient's email address
            subject: "Action completed",  // Email subject
            text: email,                // Plain text content of the email
            html: `<h1>Action completed</h1><p>${nl2br(email)}</p>`  // HTML content of the email
        });

        // Log a message indicating successful email delivery
        console.log('Email sent to:', user);
    } catch (error) {
        // Log an error message if sending the email fails
        console.error('Error sending email:', error.message);
    }
};
