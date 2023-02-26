import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authState";

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  return (
    <section>
      <div className="relative">
        <img
          className="h-96 w-full object-cover rounded"
          src="https://image.tmdb.org/t/p/original/sANUefL2v8VI6fSfK3gWAG3XBt4.jpg"
          alt=""
        />
        <div className="absolute -bottom-20 left-5 flex items-center gap-5">
          <img
            src={
              user?.userCoverImg
                ? user?.userCoverImg
                : `https://randomuser.me/api/portraits/men/${
                    Math.floor(Math.random() * 50) + 1
                  }.jpg`
            }
            alt="user"
            className="rounded-full border-2 border-white "
          />

          <div className="text-white">
            <h1 className="font-bold text-2xl">{user?.userName}</h1>
            <h1 className="font-bold text-xl">{user?.email}</h1>
            <h1 className="font-bold text-xl">{user?.country}</h1>

            <button
              className="p-1 bg-orange-600 rounded mt-3 w-full block text-center"
              onClick={() => dispatch(logout())}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
