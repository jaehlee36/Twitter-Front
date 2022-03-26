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
    const onClick = ({ target }) => {
      if (target.matches(".account-popup-text")) return;
      if (target.childNodes[0].textContent === string.PROFILE) onProfile();
      else if (target.childNodes[0].textContent === string.LOGOUT) onLogout();
      setIsVisible(false);
    };
    return (
      <div
        id="account-popup"
        onClick={onClick}
        className="account-popup-container"
      >
        <div className="account-popup-row">
          <span>Profile</span>
        </div>
        <div className="account-popup-row">
          <span>Logout</span>
        </div>
      </div>
    );
  }
);

export default AccountPopup;
