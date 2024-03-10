import React from 'react';
import { useState } from 'react';
import '../App.css';
// import { NavLink, useLocation, Link } from 'react-router-dom';
import {
  BrowserRouter as Router,
  Route,
  Link,
  useLocation,
  NavLink,
} from 'react-router-dom';
function Navbar(props) {
  const location = useLocation();
  const [show, setshow] = useState(false);
  const shownav = () => {
    setshow(!show);
  };

  const loggingOut = async () => {
    // Prompt the user for confirmation before logging out
    const confirmLogout = window.confirm('Are you sure you want to log out?');

    if (confirmLogout) {
      try {
        // Make a request to the backend to logout
        const userId = prompt('Enter The User Id');
        const response = await fetch('http://localhost:3001/logout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: userId,
          }),
        });

        if (response.ok) {
          // If logout is successful, clear the token from localStorage
          localStorage.removeItem('token');

          // Optionally redirect the user to the login page or another page
          window.location.href = '/login'; // Example redirection
        } else {
          // Handle non-successful logout response (e.g., server error)
          console.error('Logout failed:', response.status);
          // Inform the user about the logout failure
          alert('Logout failed. Please try again later.');
        }
      } catch (error) {
        // Handle network errors or other unexpected errors
        console.error('Logout error:', error);
        // Inform the user about the error
        alert('An error occurred while logging out. Please try again later.');
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between h-11 bg-black text-yellow-50 items-center">
        <div className="flex justify-center space-x-4">
          <div className="text-yellow-500 font-bold">
            <h1>
              <strong>KP-DOCS</strong>
            </h1>
          </div>
        </div>
        <div className="2xl:flex justify-center space-x-4 xl:flex justify-center space-x-4 lg:flex justify-center space-x-4 md:flex justify-center space-x-4 hidden gap-4">
          <div>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? 'active-link' : '')}
            >
              SIGN IN
            </NavLink>
          </div>

          <div>
            <NavLink
              to="/login"
              className={({ isActive }) => (isActive ? 'active-link' : '')}
            >
              LOG IN
            </NavLink>
          </div>
          <div className="pr-4">
            {location.pathname === `/document/${props.loc}` && (
              <li>
                <button onClick={loggingOut}>Log out</button>
              </li>
            )}
          </div>
        </div>
        <div
          className="p-2 2xl:hidden xl:hidden lg:hidden md:hidden sm:block relative "
          onClick={shownav}
        >
          <div className="bg-white w-3 h-1 mb-2"></div>
          <div className="bg-white w-3 h-1  mb-2"></div>
          <div className="bg-white w-3 h-1  "></div>
        </div>
      </div>
      <div
        className={`hin absolute text-white bg-black p-2 pt-10 right-0 text-yellow-200-500 sm:block md:hidden lg:hidden xl:hidden 2xl:hidden ${
          show ? 'dispnav' : 'hiddenv'
        }`}
      >
        <div>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? 'active-link' : '')}
          >
            SignIn
          </NavLink>
        </div>
        <div>
          <NavLink
            to="/login"
            className={({ isActive }) => (isActive ? 'active-link' : '')}
          >
            LogIn
          </NavLink>
        </div>

        {/* <div className="pr-4">
          <NavLink
            to="/Contact"
            className={({ isActive }) => (isActive ? 'active-link' : '')}
          >
            Contact{' '}
          </NavLink>
        </div> */}
      </div>
    </div>
  );
}
export default Navbar;
