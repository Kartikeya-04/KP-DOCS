import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidV4 } from 'uuid';
import Lottie from 'lottie-react';
import animation from './animation.json';
import './sign.css';
import './Login.css';
import Navbar from './Navbar';
import Footer from './Footer';
function LogIn() {
  const history = useNavigate();
  const idRef = useRef(null);
  const nameRef = useRef(null);
  const passRef = useRef(null);

  const newPage = async (event) => {
    event.preventDefault();
    const idvalue = idRef.current.value;
    const name = nameRef.current.value;
    const pass = passRef.current.value;

    try {
      const token = localStorage.getItem('Refreshtoken');
      if (idvalue && name && pass) {
        const response = await fetch('http://localhost:3001/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ id: idvalue, username: name, password: pass }),
        });

        const data = await response.json();

        console.log('Frontend is save successful');
        if (response.status === 201) {
          history(`/documents/${uuidV4()}`);
        }
        if (response.status === 401) {
          alert('Please Inter Valid Data !!!!');
          console.log('Please Inter Valid Data !!!');
        }
      } else {
        console.log('Please fill the form !!!');
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
        <div className="main2">
          <div>
            <h1 className="head2">LOG IN</h1>
          </div>
          <div>
            <form>
              <label htmlFor="name">USER ID</label>

              <div class="form-control">
                <input
                  class="input input-alt"
                  placeholder="Type User ID here!"
                  required=""
                  type="number"
                  ref={idRef}
                />
                <span class="input-border input-border-alt"></span>
              </div>

              <br />

              <label htmlFor="name">USERNAME</label>

              <div class="form-control">
                <input
                  class="input input-alt"
                  placeholder="Type User Name here!"
                  required=""
                  type="text"
                  ref={nameRef}
                />
                <span class="input-border input-border-alt"></span>
              </div>
              <br />

              <label htmlFor="pass">Password</label>

              <div class="form-control">
                <input
                  class="input input-alt"
                  placeholder="Type User ID here!"
                  required=""
                  type="password"
                  ref={passRef}
                />
                <span class="input-border input-border-alt"></span>
              </div>

              <h5>Don't have an account? Go to SignIn</h5>

              <br />
            </form>
            <div className="text-red-600 mb-1 mt-[-10px]">
              Always Remember Your Documents URL !!!
            </div>
            <div>
              <button
                class="w-48 h-12 text-white font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg shadow-lg hover:scale-105 duration-200 hover:drop-shadow-2xl hover:shadow-[#7dd3fc] hover:cursor-pointer"
                onClick={newPage}
              >
                SUBMIT
              </button>
            </div>
          </div>
        </div>
        <Lottie className="w-[70vw]" animationData={animation} loop={true} />
      </div>
      <Footer />
    </div>
  );
}

export default LogIn;
