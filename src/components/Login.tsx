import React from 'react';
import GoogleLogin from 'react-google-login';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import logo from '../assets/logowhite.png';
import shareVideo from '../assets/share.mp4';

function Login() {
  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className="realative w-full h-full">
        <video
          src={shareVideo}
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

export default Login;
