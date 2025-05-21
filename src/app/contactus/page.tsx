"use client";

import { useRef, useState } from "react";
import emailjs from "emailjs-com";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "@/src/components/ui/Button";

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (!formRef.current) return;

    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        formRef.current,
        process.env.NEXT_PUBLIC_EMAILJS_USER_ID!
      );
      toast.success("Message sent successfully!");
      formRef.current.reset();
    } catch (error) {
      console.error("Email send error:", error);
      toast.error("Something went wrong. Try again!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded-xl">
      <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
      <form ref={formRef} onSubmit={sendEmail} className="space-y-4">
        <input
          type="text"
          name="from_name"
          placeholder="Your name"
          className="w-full border border-gray-300 p-3 rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your email"
          className="w-full border border-gray-300 p-3 rounded"
          required
        />
        <textarea
          name="message"
          placeholder="Your message"
          rows={5}
          className="w-full border border-gray-300 p-3 rounded"
          required
        />
        <Button type="submit" isLoading={isSubmitting}>
          {isSubmitting ? "Sending..." : "Send Message"}
        </Button>
      </form>
      <ToastContainer position="bottom-right" />
    </div>
  );
}
