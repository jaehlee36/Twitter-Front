import React, { memo } from "react";
import Avatar from "./Avatar";

var string = {
  PROFILE: "Profile",
  LOGOUT: "Logout",
};
const AccountPopup = memo(
  ({
    username,
    userImg,
    onLogout,
    onProfile,
    setIsVisible,
    onMyTweets,
    onAllTweets,
  }) => {
    const handleClickProfile = () => {
      onProfile();
      setIsVisible(false);
    };
    const handleClickLogout = () => {
      onLogout();
      setIsVisible(false);
    };
    return (
      <div id="account-popup" className="account-popup-container">
        <div className="account-popup-row" onClick={handleClickProfile}>
          <span>Profile</span>
        </div>
        <div className="account-popup-row" onClick={handleClickLogout}>
          <span>Logout</span>
        </div>
      </div>
    );
  }
);

export default AccountPopup;
