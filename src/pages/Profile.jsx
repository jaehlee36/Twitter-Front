import React from "react";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";

const Profile = ({}) => {
  const { user } = useContext(AuthContext);
  console.log("user: ", user);
  return (
    <div className="profile-container">
      {!!user.url ? (
        <div className="profile-img-container">
          <img src={user.url} alt="user-profile" className="profile-img" />
        </div>
      ) : null}

      <h2 className="profile-title">ID</h2>
      <span className="profile-text">{user.id}</span>
      <h2 className="profile-title">Username</h2>
      <span className="profile-text">{user.username}</span>
      <h2 className="profile-title">Name</h2>
      <span className="profile-text">{user.name}</span>
      {user.email ? (
        <>
          <h2 className="profile-title">Email</h2>
          <span className="profile-text">{user.email}</span>
        </>
      ) : null}
    </div>
  );
};

export default Profile;
// id: '1',
// username: 'bob',
// password: '$2b$12$G9xf8SFq3oTEgdj7ozHQ/uhDOyeQcUEDU8tnOcvpvApuadr3nE5Vm',
// name: 'Bob',
// email: 'bob@gmail.com',
