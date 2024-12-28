import React, { useState, useEffect, useRef } from 'react';
import './Home.css';
import { IoIosSend } from "react-icons/io";
import { RiAddCircleLine } from "react-icons/ri";
import {icons} from './Home_Data';
import { ImGoogleDrive } from "react-icons/im";
import { Link } from 'react-router-dom';

const Home = () => {
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { text: 'Hi! How can I assist you?', sender: 'bot' },
  ]);
  const [dropdownVisible, setDropdownVisible] = useState(false); 
  const chatWindowRef = useRef(null); 

  const handleSendMessage = async () => {
    if (message.trim()) {
        setChatMessages([...chatMessages, { text: message, sender: 'user' }]);
        setMessage('');

        try {
            const response = await fetch('http://127.0.0.1:8000/api/ai/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message }), 
            });
            const data = await response.json();

            if (data.response) {
                setChatMessages((prev) => [
                  ...prev, 
                  { 
                    text: data.formatted_response, // Use the formatted response here
                    sender: 'bot' 
                  }
                ]);
            } else if (data.error) {
                setChatMessages((prev) => [
                  ...prev, 
                  { text: 'Error: ' + data.error, sender: 'bot' }
                ]);
            }
        } catch (error) {
            setChatMessages((prev) => [
              ...prev, 
              { text: 'Error connecting to the server.', sender: 'bot' }
            ]);
        }
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
              <a href={icon.Link} target="_blank" rel="noopener noreferrer">
                <div className="icon">
                  <img src={icon.image} alt={icon.label} className="icon-image" />
                </div>
                <p className="icon-label">{icon.label}</p>
              </a>
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
                  dangerouslySetInnerHTML={{ __html: msg.text }} // Render the HTML content
                />
              ))}
            </div>
          </div>
          <div className="chat-input-area">
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
              <ul className='w-34 fixed p-2 rounded-md bg-gray-600'>
                <li className='flex items-center gap-2'><ImGoogleDrive />GoogleDrive</li>
                <li>Gemini</li>
                <li>Open AI</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
