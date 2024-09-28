"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import LoadingWrapper from "@/components/loadingwrapper/loadingwrapper";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Alert from "@/components/Login/Alert";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  if (session) {
    router.push("/homepage");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result.error) {
        console.error(result.error);
        if (result.error === "Configuration") {
          setError("Wrong email or password.");
        } else {
          setError("An error occurred. Please try again later.");
        }
        setIsSubmitting(false);
      } else {
        toast.success("Logged in successfully");
        router.push("/homepage");
      }
    } catch (error) {
      console.error(error);
      setError("An unexpected error occurred. Please try again later.");
      setIsSubmitting(false);
    }
  };

  if (isSubmitting) {
    return <LoadingWrapper />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <Image
            width={40}
            height={40}
            className="mx-auto h-40 w-auto"
            src="/barterlogo.png"
            alt="Your Company"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Sign in to your account
          </h2>
        </div>
        {error && <Alert message={error} />}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-white bg-gray-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-white bg-gray-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
          </div>
        </form>

        <div className="mt-6">
          <p className="text-center text-sm text-gray-400">
            Don&apos;t have an account?{" "}
            <a
              href="/register"
              className="font-medium text-indigo-400 hover:text-indigo-300"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
