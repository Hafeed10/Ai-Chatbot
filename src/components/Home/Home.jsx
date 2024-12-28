import React, { useState, useEffect, useRef } from 'react';
import './Home.css';
import { IoIosSend } from "react-icons/io";
import { RiAddCircleLine } from "react-icons/ri";
import {icons} from './Home_Data'
import { ImGoogleDrive } from "react-icons/im";
import { Link } from 'react-router-dom';

const Home = () => {
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { text: 'Hi! How can I assist you?', sender: 'bot' },
  ]);
  const [dropdownVisible, setDropdownVisible] = useState(false); // State to control dropdown visibility
  const chatWindowRef = useRef(null); // Reference to the chat window



  const handleSendMessage = () => {
    if (message.trim()) {
      setChatMessages([
        ...chatMessages,
        { text: message, sender: 'user' },
        { text: 'Thanks for your message. We will get back to you soon.', sender: 'bot' },
      ]);
      setMessage('');
    }
  };

  // Scroll to the bottom of the chat window whenever messages change
  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <div className="home-page">
      {/* Header */}
      <header className="header">
        <h1 className="heading">AI LAB</h1>
      </header>

      {/* Main Content */}
      <div className="main-content">
        {/* Icons Section */}
        <section className="icons-section">
          {icons.map((icon) => (
            <div key={icon.id} className="icon-container">
              <div
                className="icon"
                onClick={() => alert(`${icon.label} clicked`)}
              >
                <img src={icon.image} alt={icon.label} className="icon-image" />
              </div>
              <p className="icon-label">{icon.label}</p>
            </div>
          ))}
        </section>

        {/* Chatbot Section */}
        <div className="chatbot">
          <h2 className="chatbot-heading italic">AI Support</h2>
          <div className="chat-window" ref={chatWindowRef}>
            <div className="chat-messages">
              {chatMessages.map((msg, index) => (
                <p
                  key={index}
                  className={`chat-message ${msg.sender}-message`}
                >
                  {msg.text}
                </p>
              ))}
            </div>
          </div>
          <div className="chat-input-area">
            {/* Add Icon on the left side of the input */}
            <RiAddCircleLine className="input-icon" onClick={toggleDropdown} />
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="chat-input"
            />
            <button className="chat-send-btn" onClick={handleSendMessage}>
              <IoIosSend size={20} />
            </button>
          </div>

          {/* Dropdown Menu */}
          {dropdownVisible && (
            <div className="dropdown-menu">
              <ul className=' w-34 fixed p-2 rounded-md bg-gray-600'>
                <li  className='flex items-center gap-2'><ImGoogleDrive/>GoogleDrive</li>
                <li >Option 2</li>
                <li >Option 3</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
