import React, { memo } from "react";
const Avatar = memo(({ url, name }) => {
  return (
    <div className="avatar-container">
      {!!url ? (
        <img src={url} alt="avatar" className="avatar-img" />
      ) : (
        <img src="./img/profile.jpg" alt="profile" className="logo-img" />
      )}
    </div>
  );
});

export default Avatar;
