import React from "react";

const User = ({ user }) => {
  return (
    <div className="flex items-center justify-between gap-2 p-3  bg-slate-800">
      <img
        src={
          user?.userCoverImg
            ? user?.userCoverImg
            : `https://randomuser.me/api/portraits/men/${
                Math.floor(Math.random() * 50) + 1
              }.jpg`
        }
        alt="user"
        className="h-10 rounded-full"
      />

      <div className="text-right">
        <h2>{user?.userName}</h2>
        <p className="text-xs">{user?.email}</p>
      </div>
    </div>
  );
};

export default User;
