const LoadingWrapper = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 z-50">
            <div className="relative">
                <div className="h-32 w-32 rounded-full border-t-4 border-b-4 border-gray-300 animate-spin"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div
                        className="h-24 w-24 rounded-full border-t-4 border-b-4 border-gray-500 animate-spin animate-reverse"></div>
                </div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="h-16 w-16 rounded-full border-t-4 border-b-4 border-gray-700 animate-spin"></div>
                </div>
            </div>
        </div>
    );
};

export default LoadingWrapper;