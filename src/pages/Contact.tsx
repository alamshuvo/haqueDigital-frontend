import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success("Message sent successfully!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 md:p-8"
      >
        <h2 className="text-2xl font-semibold text-gray-900 text-center mb-4 italic">
          Contact Us
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Have questions or feedback? Fill out the form below and we will get back to you promptly.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Your Name"
              className="mt-1 block w-full border-b border-gray-300 bg-transparent focus:border-orange-500 focus:ring-0 outline-none py-1"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="you@example.com"
              className="mt-1 block w-full border-b border-gray-300 bg-transparent focus:border-orange-500 focus:ring-0 outline-none py-1"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              rows={4}
              placeholder="Write your message here..."
              className="mt-1 block w-full border-b border-gray-300 bg-transparent focus:border-orange-500 focus:ring-0 outline-none py-1 resize-none"
              required
            />
          </div>

          <button
            type="submit"
            className="px-6 py-2 rounded-md shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-orange-400 transition-colors"
          >
            Send Message
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default ContactPage;
