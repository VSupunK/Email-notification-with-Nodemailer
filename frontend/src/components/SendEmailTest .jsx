import React, { useState } from "react";
import axios from "axios";

const SendEmailTest = () => {
  const [formData, setFormData] = useState({
    to: "",
    subject: "",
    text: "",
    html: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const sendTestEmail = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/send-email",
        formData
      );
      console.log(response.data);
      alert(`Email Sent! Preview URL: ${response.data.previewURL}`);
    } catch (error) {
      console.error("Error sending test email:", error);
      alert("Failed to send email");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md">
      <h2 className="text-lg font-bold mb-4">Send Test Email</h2>

      <input
        type="email"
        name="to"
        placeholder="Recipient Email"
        value={formData.to}
        onChange={handleChange}
        className="w-full p-2 mb-2 border rounded"
        required
      />

      <input
        type="text"
        name="subject"
        placeholder="Subject"
        value={formData.subject}
        onChange={handleChange}
        className="w-full p-2 mb-2 border rounded"
      />

      <textarea
        name="text"
        placeholder="Plain Text Message"
        value={formData.text}
        onChange={handleChange}
        className="w-full p-2 mb-2 border rounded"
      />

      <textarea
        name="html"
        placeholder="HTML Message"
        value={formData.html}
        onChange={handleChange}
        className="w-full p-2 mb-4 border rounded"
      />

      <button
        onClick={sendTestEmail}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Send Email
      </button>
    </div>
  );
};

export default SendEmailTest;
