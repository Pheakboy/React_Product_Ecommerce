const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-96">
      <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4" />
      <p className="text-gray-600 font-semibold">Loading products...</p>
    </div>
  );
};

export default Loading;
