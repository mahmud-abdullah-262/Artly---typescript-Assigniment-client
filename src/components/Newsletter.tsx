import { useState, type FormEvent } from "react";
import { Input, Button, TextField, FieldError, Spinner, Form } from "@heroui/react";
import { toast } from "@heroui/react";

import { Check } from "lucide-react";

interface NewsletterProps {
  /** আসবে API/props থেকে — ডায়নামিক */
  subscriberCount: number;
  /** সাবমিট হ্যান্ডলার — parent থেকে API কল করে পাঠানো হবে */
  onSubscribe: (email: string) => Promise<void>;
}

const Newsletter = ({ subscriberCount, onSubscribe }: NewsletterProps) => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);
    try {
      await onSubscribe(email);
      toast.success( "You're on The Artly Letter list now.");
      setEmail("");
    } catch {
      toast.danger("Please try again in a moment.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formattedCount = new Intl.NumberFormat("en-US").format(
    subscriberCount
  );

  return (
    <section className="bg-accent px-6 py-20">
      <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <span className="text-xs font-semibold tracking-[0.2em] text-bg-light/70 uppercase">
          The Artly Letter
        </span>

        <h2 className="mt-4 font-serif text-4xl italic text-bg-light md:text-5xl">
          New works every Thursday.
        </h2>

        <p className="mt-5 max-w-lg text-base leading-relaxed text-bg-light/80">
          Join {formattedCount} collectors who receive our weekly curation —
          new artists, limited editions, studio stories, and café specials.
          No noise, just art.
        </p>

   <Form className="flex flex-col md:flex-row mx-auto my-4 w-96 max-w-11/12 gap-1 rounded-lg justify-center items-center" onSubmit={handleSubmit}>
  <TextField
    isRequired
    name="email"
    type="email"
    className={'flex-1'}
    validate={(value) => {
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
        return "Please enter a valid email address";
      }
      return null;
    }}
  >
    <Input placeholder="john@example.com" className="border border-border rounded p-2 focus:border-primary text-text-dark" />
    <FieldError className="text-sm text-red-500" />
  </TextField>

  <div className="flex gap-2">
    <Button type="submit" className="bg-primary text-white rounded p-2 flex items-center gap-2 hover:bg-primary-dark">
      {isSubmitting ? <Spinner className="w-5 h-5 text-white animate-spin" /> : <>   <Check className="w-5 h-5 text-white" />
      Submit</>}
    </Button>
  </div>
</Form>

        <p className="mt-4 text-xs text-bg-light/60">
          Unsubscribe any time. No spam, ever.
        </p>
      </div>
    </section>
  );
};

export default Newsletter;