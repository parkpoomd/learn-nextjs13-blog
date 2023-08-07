"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";

const CTACard = ({ dictionary }: { dictionary: any }) => {
  // Server Actions Approach
  /* const formAction = async (formData: FormData) => {
    "use server";
    try {
      const email = formData.get("email");
      // create form server(database)
    } catch (error) {
      console.log(error);
    }
  }; */

  // Mock data subscribers (fetch api)
  const subscribersCount = 1;

  // Client Component Approach
  const [email, setEmail] = useState("");
  const [isHandling, setIsHandling] = useState(false);

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    if (!email) {
      return;
    }

    // subscribers on server
  };

  return (
    <div className="relative overflow-hidden rounded-md bg-slate-100 px-6 py-10">
      {/* Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-br from-white/95 via-white/70 to-white/30" />
      {/* Image */}
      <Image
        fill
        alt="CTA Card Image"
        className="object-cover object-center"
        src="https://images.unsplash.com/photo-1672600830594-ae4ccc159578?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1263&q=80"
      />
      {/* Content Container */}
      <div className="relative z-20">
        <div className="text-lg font-medium">#exploretheworld</div>
        <h3 className="mt-3 text-4xl font-semibold">
          {dictionary.ctaCard.title}
        </h3>
        <p className="mt-2 max-w-lg text-lg">
          {dictionary.ctaCard.description}
        </p>
        {/* Form */}
        <form
          // Server Actions Approach
          /* key={subscribersCount + "subscribers-form"}
          action={formAction} */
          onSubmit={submitHandler}
          className="mt-6 flex w-full items-center gap-2"
        >
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md bg-white/80 px-3 py-2 text-base outline-none ring-neutral-600 placeholder:text-sm focus:ring-2 md:w-auto"
            placeholder={dictionary.ctaCard.placeholder}
          />
          <button
            type="submit"
            className="whitespace-nowrap rounded-md bg-neutral-900 px-3 py-2 text-neutral-200"
          >
            {!isHandling ? dictionary.ctaCard.button : "Sending..."}
          </button>
        </form>

        {/* Subscribers for Server Actions Approach */}
        {/* <div className="mt-5 text-neutral-700">
          {dictionary.ctaCard.subscriberText1}{" "}
          <span className="rounded-md bg-neutral-700 px-2 py-1 text-sm text-neutral-100">
            {subscribersCount}
          </span>{" "}
          {dictionary.ctaCard.subscriberText2}
        </div> */}
      </div>
    </div>
  );
};

export default CTACard;
