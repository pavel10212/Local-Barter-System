"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import LoadingWrapper from "@/components/LoadingWrapper/LoadingWrapper"
import { toast } from "sonner";
import { getSession } from "next-auth/react";
import Image from "next/image";

const RegisterPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { data: session } = getSession();

  if (session) {
    router.push("/homepage");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsSubmitting(false);
      return;
    }
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !address ||
      !phoneNumber
    ) {
      setError("Please fill in all fields");
      setIsSubmitting(false);
      return;
    }
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          address,
          phoneNumber,
        }),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }

      toast.success("Account created successfully");
      router.push("/login");
    } catch (error) {
      setError(error.message);
    }
    setIsSubmitting(false);
  };

  if (isSubmitting) {
    return <LoadingWrapper />;
  }

  return (
    <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8 bg-gray-900">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image
          width={40}
          height={40}
          className="mx-auto h-40 w-auto"
          src="/barterlogo.png"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
          Create your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="first-name"
              className="block text-sm font-medium leading-6 text-gray-300"
            >
              First Name
            </label>
            <div className="mt-2">
              <input
                id="first-name"
                name="first-name"
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-white bg-gray-800 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-cyan-400 sm:text-sm sm:leading-6"
              />
            </div>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>

          <div>
            <label
              htmlFor="last-name"
              className="block text-sm font-medium leading-6 text-gray-300"
            >
              Last Name
            </label>
            <div className="mt-2">
              <input
                id="last-name"
                name="last-name"
                type="text"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-white bg-gray-800 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-cyan-400 sm:text-sm sm:leading-6"
              />
            </div>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-300"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-white bg-gray-800 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-cyan-400 sm:text-sm sm:leading-6"
              />
            </div>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-300"
            >
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-white bg-gray-800 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-cyan-400 sm:text-sm sm:leading-6"
              />
            </div>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>

          <div>
            <label
              htmlFor="confirm-password"
              className="block text-sm font-medium leading-6 text-gray-300"
            >
              Confirm Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-white bg-gray-800 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-cyan-400 sm:text-sm sm:leading-6"
              />
            </div>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>

          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium leading-6 text-gray-300"
            >
              Address
            </label>
            <div className="mt-2">
              <input
                id="address"
                name="address"
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-white bg-gray-800 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-cyan-400 sm:text-sm sm:leading-6"
              />
            </div>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>

          <div>
            <label
              htmlFor="phone-number"
              className="block text-sm font-medium leading-6 text-gray-300"
            >
              Phone Number
            </label>
            <div className="mt-2">
              <input
                id="phone-number"
                name="phone-number"
                type="tel"
                required
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-white bg-gray-800 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-cyan-400 sm:text-sm sm:leading-6"
              />
            </div>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-black text-sm font-medium rounded-md text-black bg-white hover:bg-black hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
            >
              Sign up
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-400">
          Already have an account?
          <a
            href="/login"
            className="font-medium text-cyan-400 hover:text-cyan-300"
          >
            {" "}
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
