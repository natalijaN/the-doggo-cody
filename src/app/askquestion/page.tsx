"use client";
import { useRef, useState, useTransition } from "react";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { submitQuestion } from "@/src/actions";
import Input from "@/src/components/ui/Input";
import Button from "@/src/components/ui/Button";

export default function AskQuestion() {
  const [email, setEmail] = useState("");
  const [question, setQuestion] = useState("");
  const [pending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  const mutation = useMutation({
    mutationFn: async (formData: { email: string; question: string }) => {
      return submitQuestion(formData);
    },
    onSuccess: () => {
      toast.success(" Question submitted successfully!");
      setEmail("");
      setQuestion("");
      if (formRef.current) {
        formRef.current.reset();
      }
    },
    onError: () => {
      toast.error("Something went wrong, please try again.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    startTransition(() => {
      mutation.mutate({ email, question });
    });
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-6 border rounded-lg shadow-lg space-y-6 bg-white">
      <h1 className="text-2xl font-semibold">Ask a Question!</h1>
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required={true}
        />
        <Input
          label="Question"
          type="question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required={true}
        />
        <Button type="submit" isLoading={pending}>
          {pending ? "Sending..." : "Send Message"}
        </Button>
      </form>
    </div>
  );
}
