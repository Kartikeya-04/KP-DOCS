import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidV4 } from 'uuid';
import './sign.css';

function SignIn() {
  const history = useNavigate();
  const nameRef = useRef(null);
  const passRef = useRef(null);

  const newPage = async (event) => {
    event.preventDefault();

    const name = nameRef.current.value;
    const pass = passRef.current.value;

    try {
      if (name && pass) {
        const response = await fetch('http://localhost:3001/post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username: name, password: pass }),
        });

        const data = await response.json();
        // console.log(data);

        console.log('Frontend save successful');
        history(`/documents/${uuidV4()}`);
      } else {
        console.log('Please fill in both username and password.');
      }
    } catch (error) {
      console.error('An error occurred:', error.message);
    }
  };

  return (
    <div className="body">
      <div className="main">
        <div>
          <h1>Sign In</h1>
        </div>

        <form>
          <label htmlFor="name">UserName</label>
          <input
            type="text"
            id="name"
            ref={nameRef}
            placeholder="Enter the Username"
            required
          />
          <br />
          <label htmlFor="pass">Password</label>
          <input
            type="password"
            id="pass"
            ref={passRef}
            placeholder="password"
            required
          />
          <br />
        </form>

        <div>
          <button onClick={newPage}>Sign In</button>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
