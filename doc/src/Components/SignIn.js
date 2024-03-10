import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidV4 } from 'uuid';
import Navbar from './Navbar';
import './sign.css';
import Footer from './Footer';
function SignIn() {
  const history = useNavigate();
  const idRef = useRef(null);
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passRef = useRef(null);

  const newPage = async (event) => {
    event.preventDefault();
    const idvalue = idRef.current.value;
    const name = nameRef.current.value;
    const emailvalue = emailRef.current.value;
    const pass = passRef.current.value;

    try {
      if (idvalue && emailvalue && name && pass) {
        const response = await fetch('http://localhost:3001/post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: idvalue,
            username: name,
            email: emailvalue,
            password: pass,
          }),
        });

        const data = await response.json();
        localStorage.setItem('Refreshtoken', data.RefreshToken);
        localStorage.setItem('Accessstoken', data.Token);

        // console.log(data);

        console.log('Frontend save successful');
        if (response.status == 201) history(`/documents/${uuidV4()}`);
      } else {
        console.log('Please fill in both username and password.');
      }
    } catch (error) {
      console.error('An error occurred:', error.message);
    }
  };

  useEffect(() => {
    //animation Effect

    const script = document.createElement('script');
    script.src = 'https://static-bundles.visme.co/forms/vismeforms-embed.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
  return (
    <div>
      <Navbar loc={uuidV4()} />
      <div className="body">
        <div className="visme">
          <div
            className="visme_d"
            data-title="Volunteer Registration Form"
            data-url="jwomvgj1-volunteer-registration-form?sidebar=true"
            data-domain="forms"
            data-full-page="false"
            data-form-id="27322"
          ></div>
        </div>

        <div className="main">
          <div>
            <h1 className="head">Sign In</h1>
          </div>
          <div>
            <form>
              <label htmlFor="name">USER ID</label>

              <div class="inputbox">
                <input
                  required="required"
                  type="number"
                  id="name"
                  ref={idRef}
                />
                <i></i>
              </div>
              <br />

              <label htmlFor="name">USERNAME</label>

              <div class="inputbox">
                <input
                  required="required"
                  type="text"
                  id="name"
                  ref={nameRef}
                />
                <i></i>
              </div>
              <br />

              <label htmlFor="name">EMAIL</label>

              <div class="inputbox">
                <input
                  required="required"
                  type="email"
                  id="name"
                  ref={emailRef}
                />
                <i></i>
              </div>
              <br />
              <label htmlFor="pass">Password</label>

              <div class="inputbox">
                <input
                  required="required"
                  type="password"
                  id="pass"
                  ref={passRef}
                />
                <i></i>
              </div>

              <h5>Already have an account? Go To LogIn</h5>

              <br />
            </form>
            <div className="text-yellow-500 mb-1 mt-[-10px]">
              Always Remember Your Documents URL !!!
            </div>
            <div>
              <button onClick={newPage}>Sign In</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SignIn;
