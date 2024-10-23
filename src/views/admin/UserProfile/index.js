import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { CurrentUser } from "services/AuthApis";

const UserProfile = () => {
  const [currentUser, setCurrentUser] = useState({});
  let { state } = useLocation();

  const fetchCurrentUser = async () => {
    try {
      const currentUser = await CurrentUser();
      setCurrentUser(currentUser);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (!state) {
      fetchCurrentUser();
    } else {
      setCurrentUser(state);
    }
  }, [state]);

  console.log("state", state, "currentUser", currentUser);

  return (
    <div className="rounded-lg bg-white p-6 shadow-lg dark:!bg-navy-700">
      <div className="flex items-center space-x-4">
        {/* <img
          src={user.avatar}
          alt="User profile"
          className="h-16 w-16 rounded-full object-cover"
        /> */}
        <div>
          <h1 className="text-xl font-bold dark:text-white">
            {currentUser.username}
          </h1>
          <p className="text-gray-600 dark:text-gray-300">{currentUser.role}</p>
          <p className="text-gray-600 dark:text-gray-300">
            {currentUser.email}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
