'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function DynamicForm() {
  const [formData, setFormData] = useState({
    greeting_prompt: '',
    forwarding_prompt: '',
    hungup_prompt: '',
    stability: 0.2,
    similarity_boost: 0.2,
    style: 0.2,
    comment: '', // Added field
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  // UUID for GET API (can be dynamic)
  const uuid = '1';

  // Fetch Data (GET)
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('http://137.184.73.22:8000/prompt-settings/1');

        if (response.status === 200) {
          if (response.data && Array.isArray(response.data) && response.data.length > 0) {
            setFormData((prev) => ({ ...prev, ...response.data[0] })); // Populate state
          } else {
            setError('No data available');
          }
        }
      } catch (err) {
        setError(err.response?.data || 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [uuid]);

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === 'stability' || name === 'similarity_boost' || name === 'style'
          ? parseFloat(value)
          : value,
    }));
  };

  // Save Data (POST)
  const handleSave = async () => {
    console.log("form submited")
    setLoading(true);
    setError(null);
    setSuccessMessage('');
    try {
      const response = await axios.post('http://137.184.73.22:8000/update-prompt-settings/1', formData);
      if (response.status === 200 || response.status === 201) {
        setSuccessMessage('Data saved successfully!');
      }
    } catch (err) {
      setError(err.response?.data || 'Failed to save data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-gray-700 text-center mb-6">Edit Data</h1>
        <div className="w-full max-w-2xl bg-white shadow-md rounded-md p-6">
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Greeting Prompt</label>
              <textarea
                name="greeting_prompt"
                value={formData.greeting_prompt}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-3 shadow-sm focus:ring-blue-400 focus:border-blue-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Forwarding Prompt</label>
              <textarea
                name="forwarding_prompt"
                value={formData.forwarding_prompt}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-3 shadow-sm focus:ring-blue-400 focus:border-blue-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Hungup Prompt</label>
              <textarea
                name="hungup_prompt"
                value={formData.hungup_prompt}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-3 shadow-sm focus:ring-blue-400 focus:border-blue-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Stability</label>
              <input
                type="number"
                step="0.01"
                name="stability"
                value={formData.stability}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-3 shadow-sm focus:ring-blue-400 focus:border-blue-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Similarity Boost</label>
              <input
                type="number"
                step="0.01"
                name="similarity_boost"
                value={formData.similarity_boost}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-3 shadow-sm focus:ring-blue-400 focus:border-blue-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Style</label>
              <input
                type="number"
                step="0.01"
                name="style"
                value={formData.style}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-3 shadow-sm focus:ring-blue-400 focus:border-blue-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Comment</label>
              <textarea
                name="comment"
                value={formData.comment}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-3 shadow-sm focus:ring-blue-400 focus:border-blue-400"
                placeholder="Add your comment here"
              />
            </div>
            <button
              type="button"
              onClick={handleSave}
              className="w-full bg-blue-500 text-white py-2 rounded-md"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
