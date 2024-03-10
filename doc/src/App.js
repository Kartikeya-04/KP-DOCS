import React from 'react';
import SignIn from './Components/SignIn';
import Editor from './Components/Editor';
import LogIn from './Components/LogIn';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { v4 as uuidV4 } from 'uuid';

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Navigate to={`/documents/${uuidV4()}`} />} /> */}
        <Route path="/" element={<SignIn />} />

        <Route path="/documents/:id" element={<Editor />} />
        <Route path="/login" element={<LogIn />} />
      </Routes>
    </Router>
  );
}

export default App;
