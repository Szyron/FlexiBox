import React from 'react';

function Maintenance() {


  return (
     <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 text-center">
      {/* Logo és cím */}
      <div className="flex flex-col sm:flex-row items-center justify-center mb-8 space-y-4 sm:space-y-0 sm:space-x-4">
        <svg
          className="w-32 sm:w-40 md:w-48"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20.3873 7.1575L11.9999 12L3.60913 7.14978"
            stroke="#50c6c9"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 12V21"
            stroke="#50c6c9"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M11 2.57735C11.6188 2.22008 12.3812 2.22008 13 2.57735L19.6603 6.42265C20.2791 6.77992 20.6603 7.44017 20.6603 8.1547V15.8453C20.6603 16.5598 20.2791 17.2201 19.6603 17.5774L13 21.4226C12.3812 21.7799 11.6188 21.7799 11 21.4226L4.33975 17.5774C3.72094 17.2201 3.33975 16.5598 3.33975 15.8453V8.1547C3.33975 7.44017 3.72094 6.77992 4.33975 6.42265L11 2.57735Z"
            stroke="#50c6c9"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8.5 4.5L16 9"
            stroke="#50c6c9"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary">Flexistore</h1>
      </div>

      {/* Karbantartási üzenet */}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-secondary mb-4">
        🚧 Under Maintenance / Karbantartás alatt 🚧
      </h2>

      {/* Leírás */}
      <div className="text-lg sm:text-xl md:text-2xl text-gray-700 space-y-2">
        <p>We're currently working on improvements. Some features might not work as expected.</p>
        <p>Jelenleg dolgozunk a fejlesztéseken. Egyes funkciók nem működhetnek megfelelően.</p>
      </div>
    </div>
  );
}

export default Maintenance;