'use client';
import React from 'react';

const ParentPage = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <iframe
        src="/chatbot"
        title="Chat Application"
        className="w-full max-w-md h-[600px] border rounded-lg shadow-lg"
      />
    </div>
  );
};

export default ParentPage;
