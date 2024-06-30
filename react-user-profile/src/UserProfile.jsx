import React, { useState } from 'react';

const UserProfile = ({ name, imageSrc, bio, email }) => {
  const [isEmailVisible, setIsEmailVisible] = useState(false);

  const toggleEmailVisibility = () => {
    setIsEmailVisible(!isEmailVisible);
  };

  return (
    <div className="max-w-lg mx-auto bg-white mt-4 border shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 flex">
      <img
        className="w-1/3 h-auto object-cover object-center"
        src={imageSrc}
        alt={`${name}'s profile`}
      />
      <div className="p-6 flex-1">
        <h2 className="text-2xl font-semibold text-gray-800">{name}</h2>
        <p className="text-gray-600 mt-2">{bio}</p>
        <button
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
          onClick={toggleEmailVisibility}
        >
          {isEmailVisible ? 'Hide Email' : 'Show Email'}
        </button>
        {isEmailVisible && <p className="mt-4 text-gray-700">{email}</p>}
      </div>
    </div>
  );
};

export default UserProfile;
