import React, { useEffect, useState } from 'react';
import './Login.css';
import { MdOutlineFacebook } from "react-icons/md";
import { FaGoogle } from "react-icons/fa6";
import { TiVendorMicrosoft } from "react-icons/ti";
function Login() {
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const textElement = document.querySelector('.typewriter');
        const cursorElement = document.querySelector('.cursor');
        const text = "";
        let index = 0;  // Start at 0 instead of 10
        
        function typeWriter() {
            if (index < text.length) {
                textElement.textContent += text.charAt(index); // Add one character at a time
                index++; // Move to the next character
                setTimeout(typeWriter, 100); // Call typeWriter again after 100ms
            } else {
                cursorElement.classList.add('blinking'); // Add blinking effect once typing is done
            }
        }
        
        typeWriter(); // Call typeWriter function to start the effect
        

        const canvas = document.getElementById('spaceCanvas');
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const stars = [];
        const starCount = 500;

        class Star {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.z = Math.random() * canvas.width;
                this.radius = Math.random() * 1.5;
            }

            update() {
                this.z -= 2;
                if (this.z <= 0) {
                    this.reset();
                }
            }

            draw() {
                const x = (this.x - canvas.width / 2) * (canvas.width / this.z) + canvas.width / 2;
                const y = (this.y - canvas.height / 2) * (canvas.width / this.z) + canvas.height / 2;
                const radius = this.radius * (canvas.width / this.z);
                ctx.beginPath();
                ctx.arc(x, y, radius, 0, Math.PI * 2);
                ctx.fillStyle = 'white';
                ctx.fill();
            }
        }

        for (let i = 0; i < starCount; i++) {
            stars.push(new Star());
        }

        function animate() {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            stars.forEach((star) => {
                star.update();
                star.draw();
            });

            requestAnimationFrame(animate);
        }

        animate();

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }, []);

    const handleLoginClick = (platform) => {
        setPopupMessage(`You clicked to login with ${platform}`);
        setIsPopupVisible(true);
    };

    const closePopup = () => {
        setIsPopupVisible(false);
        setPopupMessage('');
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const fixedEmail = "abc@example.com";
        const fixedPassword = "404";

        if (email === fixedEmail && password === fixedPassword) {
            window.location.href = "/home";
        } else {
            setPopupMessage("Invalid email or password. Please try again.");
        }
    };

    return (
        <div class='max'>
            <canvas id="spaceCanvas"></canvas>
            <div className="container">
                <h1 className="typewriter-container">
                    <span className="typewriter">AI_LABS</span>
                    <span className="cursor">|</span>
                </h1>
                <div className="glass-container">
                    <button className="button" onClick={() => handleLoginClick('Google')}>
                       <FaGoogle size={20}/>
                        <span>Continue with Google</span>
                    </button>
                    <button className="button" onClick={() => handleLoginClick('Microsoft')}>
                        <TiVendorMicrosoft size={20}/>
                        <span>Continue with Microsoft</span>
                    </button>
                    <button className="button" onClick={() => handleLoginClick('Facebook')}>
                        <MdOutlineFacebook size={20}/>
                        <span>Continue with Facebook</span>
                    </button>
                    <div className='max'>
                        <p>abc@example.com</p>
                        <p>404</p>
                    </div>
                </div>
            </div>
            {isPopupVisible && (
                <div className="popup">
                    <div className="popup-content">
                        <h2>Login Info</h2>
                        <form onSubmit={handleFormSubmit}>
                            <div>
                                <label htmlFor="Email">Email</label>
                                <input
                                    type="email"
                                    placeholder="Enter your Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="Password">Password</label>
                                <input
                                    type="password"
                                    placeholder="Enter your Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <p>{popupMessage}</p>
                            <div className="flex">
                                <button type="button" className="close-button" onClick={closePopup}>
                                    Close
                                </button>
                                <button type="submit" className="close-button">
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Login;
