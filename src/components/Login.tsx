import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logowhite.png';
import shareVideo from '../assets/share.mp4';

import { client } from '../client';
import { getUser, ISanityUserDoc } from '../utils';

function Login() {
  const navigate = useNavigate();

  const responseGoogle = (response: any) => {
    console.log('responseGoogle');

    const doc: ISanityUserDoc = getUser(response);
    localStorage.setItem('user', JSON.stringify(doc));

    client.createIfNotExists(doc).then(() => {
      navigate('/', { replace: true });
    });
  };

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
        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
          <div className="p-5">
            <img src={logo} width="130px" alt="logo" />
          </div>

          <div className="shadow-2xl">
            <GoogleLogin onSuccess={responseGoogle} onError={() => console.log('Login Failed')} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
