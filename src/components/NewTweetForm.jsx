import React, { useState } from "react";
import Avatar from "./Avatar";

const NewTweetForm = ({ tweetService, onError, userName, userImg }) => {
  const [tweet, setTweet] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    tweetService
      .postTweet(tweet)
      .then((created) => {
        setTweet("");
      })
      .catch(onError);
  };

  const onChange = (event) => {
    setTweet(event.target.value);
  };

  return (
    <div className="tweet-form-container">
      <Avatar name={userName} url={userImg}></Avatar>
      <form className="tweet-form" onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="무슨일이 일어나고 있나요?"
          value={tweet}
          required
          autoFocus
          onChange={onChange}
          className="form-input tweet-input tweet-new"
        />
        <button type="submit" className="form-btn-submit">
          <span className="form-btn-text">트윗하기</span>
        </button>
      </form>
    </div>
  );
};

export default NewTweetForm;
