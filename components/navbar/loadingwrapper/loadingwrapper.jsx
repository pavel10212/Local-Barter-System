import React from 'react';

const LoadingWrapper = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
            <div className="relative">
                <div className="h-32 w-32 rounded-full border-t-4 border-b-4 border-indigo-500 animate-spin"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div
                        className="h-24 w-24 rounded-full border-t-4 border-b-4 border-indigo-300 animate-spin animate-reverse"></div>
                </div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="h-16 w-16 rounded-full border-t-4 border-b-4 border-indigo-100 animate-spin"></div>
                </div>
            </div>
        </div>
    );
};

export default LoadingWrapper;