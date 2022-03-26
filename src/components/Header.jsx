import React, { memo, useState } from "react";
import Avatar from "./../../src/components/Avatar";
import AccountPopup from "./AccountPopup";

const Header = memo(
  ({ username, userImg, onLogout, onProfile, onMyTweets, onAllTweets }) => {
    const [isVisible, setIsVisible] = useState(false);
    const onClickAccount = ({ target }) => {
      if (target.className.includes("account")) return;
      isVisible ? setIsVisible(false) : setIsVisible(true);
    };
    return (
      <header className="header">
        <div className="logo" onClick={onAllTweets}>
          <img src="./img/logo.png" alt="Dwitter Logo" className="logo-img" />
        </div>
        {username && (
          <nav className="menu flex-row">
            <button onClick={onMyTweets} className="header-button">
              My Tweets
            </button>
            <button className="flex-row header-button" onClick={onClickAccount}>
              <Avatar url={userImg} name={username}></Avatar>
              {username}
              {isVisible ? (
                <AccountPopup
                  onLogout={onLogout}
                  onProfile={onProfile}
                  setIsVisible={setIsVisible}
                />
              ) : null}
            </button>
          </nav>
        )}
      </header>
    );
  }
);

export default Header;
