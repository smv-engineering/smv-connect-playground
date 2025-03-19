const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-white text-gray-900 p-6">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-extrabold tracking-tight text-gray-900">
          Welcome to <span className="text-blue-600">SMV Konveyor</span>
        </h1>
        <p className="text-lg font-light max-w-xl mx-auto text-gray-600">
          Your gateway to seamless API integrations. Simplify your workflows and
          enhance productivity with ease.
        </p>
      </div>

      <div className="mt-8 flex space-x-4">
        <a
          href="https://konveyor.stampmyvisa.com/"
          target="_blank"
          className="px-6 py-3 text-lg font-medium bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 transition"
        >
          Visit Landing Page
        </a>
        <a
          href="https://www.postman.com/smv-engineering/smv-konveyor/overview"
          target="_blank"
          className="px-6 py-3 text-lg font-medium bg-gray-200 text-gray-900 rounded-xl shadow-md hover:bg-gray-300 transition"
        >
          View API Documentation
        </a>
        <a
          href="https://github.com/smv-engineering/smv-connect-playground"
          target="_blank"
          className="px-6 py-3 text-lg font-medium bg-gray-200 text-gray-900 rounded-xl shadow-md hover:bg-gray-300 transition"
        >
          Github Repository
        </a>
      </div>
    </div>
  );
};

export default HomePage;
