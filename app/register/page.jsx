import React from 'react';

const RegisterPage = () => {
    return (
        <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8 bg-gray-900">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img className="mx-auto h-40 w-auto"
                     src="/barterlogo.png" alt="Your Company"/>
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">Create your account</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" action="#" method="POST">
                    <div>
                        <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-300">First Name</label>
                        <div className="mt-2">
                            <input id="first-name" name="first-name" type="text" required
                                   className="block w-full rounded-md border-0 py-1.5 text-white bg-gray-800 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-300">Last Name</label>
                        <div className="mt-2">
                            <input id="last-name" name="last-name" type="text" required
                                   className="block w-full rounded-md border-0 py-1.5 text-white bg-gray-800 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-300">Email address</label>
                        <div className="mt-2">
                            <input id="email" name="email" type="email" autoComplete="email" required
                                   className="block w-full rounded-md border-0 py-1.5 text-white bg-gray-800 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-300">Password</label>
                        <div className="mt-2">
                            <input id="password" name="password" type="password" autoComplete="new-password" required
                                   className="block w-full rounded-md border-0 py-1.5 text-white bg-gray-800 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-300">Address</label>
                        <div className="mt-2">
                            <input id="address" name="address" type="text" required
                                   className="block w-full rounded-md border-0 py-1.5 text-white bg-gray-800 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="phone-number" className="block text-sm font-medium leading-6 text-gray-300">Phone Number</label>
                        <div className="mt-2">
                            <input id="phone-number" name="phone-number" type="tel" required
                                   className="block w-full rounded-md border-0 py-1.5 text-white bg-gray-800 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                        </div>
                    </div>

                    <div>
                        <button type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            Sign up
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-400">
                    Already have an account?
                    <a href="#" className="font-semibold leading-6 text-indigo-400 hover:text-indigo-300">Sign in</a>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;