import React, { useState } from 'react';
import '../CSS/contact.css';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const resetAll = () => {
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="items-center flex justify-center ">
      <div className="form-container ">
        <div className="form">
          <span className="heading1">Get in touch</span>
          <input
            placeholder="Name"
            type="text"
            className="input"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <input
            placeholder="Email"
            id="mail"
            type="email"
            className="input"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <textarea
            placeholder="Say Hello"
            rows="10"
            cols="30"
            id="message"
            name="message"
            className="textarea"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          ></textarea>
          <div className="button-container">
            <div className="send-button  cursor-pointer">Send</div>
            <div className="reset-button-container">
              <div id="reset-btn" className="reset-button  cursor-pointer"  onClick={resetAll}>
                Reset
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
