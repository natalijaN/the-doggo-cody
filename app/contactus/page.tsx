"use client";

import { useState } from "react";
import { toast } from "sonner";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

export default function ContactUs() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (res.ok) {
        toast.success("Your message has been sent!");
        setEmail("");
        setMessage("");
        setName("");
      } else {
        toast.error("Something went wrong. Please try again!");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error sending message.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-6 border rounded-lg shadow-lg space-y-6 bg-white">
      <h1 className="text-3xl font-semibold text-center text-gray-800">
        Contact Us
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required={true}
        />
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required={true}
        />
        <Input
          label="Message"
          type="textarea"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required={true}
          rows={4}
        />
        <Button type="submit" isLoading={isSubmitting}>
          {isSubmitting ? "Sending..." : "Send Message"}
        </Button>
      </form>
    </div>
  );
}
