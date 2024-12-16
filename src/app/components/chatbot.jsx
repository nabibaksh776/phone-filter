'use client';
import React, { useState, useEffect, useRef } from 'react';
import 'tailwindcss/tailwind.css';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  const messagesEndRef = useRef(null); // Ref to scroll to the last message

  // Load saved messages from localStorage
  useEffect(() => {
    const savedMessages = localStorage.getItem('chatMessages');
    if (savedMessages) {
      const parsedMessages = JSON.parse(savedMessages).map((msg) => {
        // Ensure the time is a valid Date object
        return {
          ...msg,
          time: msg.time ? new Date(msg.time) : new Date(), // Convert time to Date object
        };
      });
      setMessages(parsedMessages);
    } else {
      setMessages([{ user: 'bot', text: 'Hi! How can I help you today?', time: new Date() }]);
    }
  }, []);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('chatMessages', JSON.stringify(messages));
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { user: 'user', text: input, time: new Date() };
    setMessages((prevMessages) => {
      const updatedMessages = [...prevMessages, userMessage];
      return updatedMessages;
    });
    setInput('');
    setIsBotTyping(true);

    // Simulate bot response with a generic reply
    setTimeout(() => {
      const botMessage = { user: 'bot', text: 'Thank you for your message!', time: new Date() };
      setMessages((prev) => [...prev, botMessage]);
      setIsBotTyping(false);
    }, 1000);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const formatTime = (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
  };

  // Scroll to the bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    isOpen && (
      <div className="w-full max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="relative">
          <div className="p-4 bg-blue-600 text-white font-bold flex justify-between items-center">
            <span>Chat with us</span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white text-xl font-bold"
            >
              &times;
            </button>
          </div>
          <div className="h-[410px] p-4 overflow-y-auto bg-blue-50">
            {messages.map((msg, index) => (
              <div key={index} className="mb-2">
                <div
  className={`flex ${msg.user === 'user' ? 'justify-end' : 'justify-start'}`}
>
                  <span
                    className={`inline-block px-4 py-2 rounded-lg max-w-xs shadow-md ${
                      msg.user === 'user'
                        ? 'bg-blue-500 text-white'
                        : 'bg-white text-blue-600'
                    }`}
                  >
                    {msg.text}
                  </span>
                </div>
                <div
                  className={`text-xs text-gray-500 mt-2 ${
                    msg.user === 'user' ? 'text-right' : 'text-left'
                  }`}
                >
                  {formatTime(msg.time)}
                </div>
              </div>
            ))}
            {isBotTyping && (
              <div className="flex justify-start">
                {/* Align typing indicator to the left */}
                <span className="inline-block px-4 py-2 rounded-lg max-w-xs bg-gray-200 text-gray-700">
                  ...
                </span>
              </div>
            )}
            <div ref={messagesEndRef} /> {/* The scroll reference element */}
          </div>
          <div className="p-4 flex bg-white border-t border-gray-200">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-grow border border-gray-300 rounded-l-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type a message..."
            />
            <button
              onClick={handleSend}
              className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default Chatbot;
