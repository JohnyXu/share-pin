import React, { useEffect, useState } from 'react';
import { AiOutlineLogout } from 'react-icons/ai';
import { useParams, useNavigate } from 'react-router-dom';
import { googleLogout } from '@react-oauth/google';

import { userCreatedPinsQuery, userQuery, userSavedPinsQuery } from '../utils/data';
import { client } from '../client';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';
import { IPin, IUser } from '../types';

const activeBtnStyles = 'bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none';
const notActiveBtnStyles =
  'bg-primary mr-4 text-black font-bold p-2 rounded-full w-20 outline-none';

function UserProfile() {
  const [user, setUser] = useState<null | IUser>(null);
  const [pins, setPins] = useState<IPin[]>([]);
  const [text, setText] = useState<null | string>('Created');
  const [activeBtn, setActiveBtn] = useState('created');
  const navigate = useNavigate();
  const { userId } = useParams();
  const userIdString: string = userId as string;

  const User =
    localStorage.getItem('user') !== 'undefined'
      ? JSON.parse(localStorage.getItem('user') as string)
      : localStorage.clear();

  useEffect(() => {
    const query = userQuery(userId as string);
    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, [userId]);

  useEffect(() => {
    if (text === 'Created') {
      const createdPinsQuery = userCreatedPinsQuery(userIdString);

      client.fetch(createdPinsQuery).then((data) => {
        setPins(data);
      });
    } else {
      const savedPinsQuery = userSavedPinsQuery(userIdString);

      client.fetch(savedPinsQuery).then((data) => {
        setPins(data);
      });
    }
  }, [text, userIdString]);

  if (!user) {
    return <Spinner message="Loading profile" />;
  }

  return (
    <div className="relative pb-2 h-full justify-center items-center">
      <div className="flex flex-col pb-5">
        <div className="relative flex flex-col mb-7">
          <div className="flex flex-col justify-center items-center">
            <img
              className=" w-full h-370 2xl:h-510 shadow-lg object-cover"
              src="https://source.unsplash.com/1600x900/?nature,photography,technology"
              alt="user-pic"
            />
            <img
              className="rounded-full w-20 h-20 -mt-10 shadow-xl object-cover"
              src={user.image}
              alt="user-pic"
            />
          </div>
          <h1 className="font-bold text-3xl text-center mt-3">{user?.userName}</h1>
          <div className="absolute top-0 z-1 right-0 p-2">
            {userId === User.googleId && (
              <button
                type="button"
                className=" bg-white p-2 rounded-full cursor-pointer outline-none shadow-md"
                onClick={() => {
                  googleLogout();
                  localStorage.clear();
                  navigate('/login');
                }}
              >
                <AiOutlineLogout color="red" fontSize={21} />
              </button>
            )}
          </div>
        </div>
        <div className="text-center mb-7">
          <button
            type="button"
            onClick={(e) => {
              const target = e.target as HTMLElement;
              setText(target.textContent);
              setActiveBtn('created');
            }}
            className={`${activeBtn === 'created' ? activeBtnStyles : notActiveBtnStyles}`}
          >
            Created
          </button>
          <button
            type="button"
            onClick={(e) => {
              const target = e.target as HTMLElement;
              setText(target.textContent);
              setActiveBtn('saved');
            }}
            className={`${activeBtn === 'saved' ? activeBtnStyles : notActiveBtnStyles}`}
          >
            Saved
          </button>
        </div>

        <div className="px-2">
          <MasonryLayout pins={pins} />
        </div>

        {pins?.length === 0 && (
          <div className="flex justify-center font-bold items-center w-full text-1xl mt-2">
            No Pins Found!
          </div>
        )}
      </div>
    </div>
  );
}
export default UserProfile;
