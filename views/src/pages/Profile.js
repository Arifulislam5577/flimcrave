import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateUserMutation } from "../features/auth/authSlice";
import { logout } from "../features/auth/authState";

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [updateUser, { isLoading, isError, error }] = useUpdateUserMutation();

  const [email, setEmail] = useState(user?.email);
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState(user?.userName);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      id: user._id,
      email,
      password,
      userName,
    };

    updateUser(newUser);
  };

  return (
    <section>
      <div>
        <img
          className="h-96 w-full object-cover rounded"
          src="https://image.tmdb.org/t/p/original/sANUefL2v8VI6fSfK3gWAG3XBt4.jpg"
          alt=""
        />
        <div className="flex items-center gap-5 px-6 -mt-10">
          <img
            src={
              user?.userCoverImg
                ? user?.userCoverImg
                : `https://randomuser.me/api/portraits/men/${
                    Math.floor(Math.random() * 50) + 1
                  }.jpg`
            }
            alt="user"
            className="rounded border-2 border-white "
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

      <div className="my-3">
        <h1 className="text-white text-xl font-bold text-right">
          Update Profile
        </h1>

        <form className="my-5" onSubmit={handleSubmit}>
          {isError && (
            <h1 className="text-sm text-red-600 mb-3">
              {error?.data?.message}
            </h1>
          )}
          <div className="mb-4">
            <label
              className="block w-full text-white text-sm mb-2"
              htmlFor="name"
            >
              User Name
            </label>
            <input
              className="block w-full text-white bg-slate-800 py-3 px-5 focus:outline-none rounded"
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label
              className="block w-full text-white text-sm mb-2"
              htmlFor="name"
            >
              Email
            </label>
            <input
              className="block w-full text-white bg-slate-800 py-3 px-5 focus:outline-none rounded"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block w-full text-white text-sm mb-2"
              htmlFor="name"
            >
              Password
            </label>
            <input
              className="block w-full text-white bg-slate-800 py-3 px-5 focus:outline-none rounded"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="py-2 px-6 rounded text-white bg-orange-600 text-sm"
            >
              {isLoading ? "Loading..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Profile;
