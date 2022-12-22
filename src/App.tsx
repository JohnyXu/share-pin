import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

import { Login, Home } from './components';

function App() {
  return (
    <GoogleOAuthProvider clientId={`${process.env.REACT_APP_GOOGLE_API_TOKEN}`}>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="/*" element={<Home />} />
      </Routes>
    </GoogleOAuthProvider>
  );
}

export default App;
