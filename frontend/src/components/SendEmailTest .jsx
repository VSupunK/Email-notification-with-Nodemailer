import React from "react";
import axios from "axios";

const SendEmailTest = () => {
  const sendTestEmail = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/send-email",
        {
          to: "vsupunkalhara@gmail.com",
          subject: "Ethereal Test Email",
          text: "This is a test using Ethereal SMTP",
          html: "<b>This is a test using <i>Ethereal</i> SMTP</b>",
        }
      );

      console.log(response.data);
      alert(`Preview URL: ${response.data.previewURL}`);
    } catch (error) {
      console.error("Error sending test email:", error);
      alert("Failed to send email");
    }
  };

  return (
    <div>
      <h2>Send Test Email</h2>
      <button onClick={sendTestEmail}>Send Email</button>
    </div>
  );
};

export default SendEmailTest;
