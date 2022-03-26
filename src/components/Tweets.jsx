import React, { memo, useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import Banner from "./Banner";
import NewTweetForm from "./NewTweetForm";
import TweetCard from "./TweetCard";
import AuthContext from "../context/AuthContext";
import TweetService from "../service/tweet";

const tweetService = new TweetService();
const Tweets = memo(({ username, addable }) => {
  const [tweets, setTweets] = useState([]);
  const [error, setError] = useState("");
  const history = useHistory();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    tweetService
      .getTweets(username)
      .then((tweets) => setTweets([...tweets]))
      .catch(onError);

    // socket sync
    const stopSync = tweetService.onSync((tweet) => onCreated(tweet));
    return () => stopSync();
  }, [username, user]);

  const onCreated = (tweet) => {
    setTweets((tweets) => [tweet, ...tweets]);
  };

  const onDelete = (tweetId) =>
    tweetService
      .deleteTweet(tweetId)
      .then(() =>
        setTweets((tweets) => tweets.filter((tweet) => tweet.id !== tweetId))
      )
      .catch((error) => setError(error.toString()));

  const onUpdate = (tweetId, text) =>
    tweetService
      .updateTweet(tweetId, text)
      .then((updated) =>
        setTweets((tweets) =>
          tweets.map((item) => (item.id === updated.id ? updated : item))
        )
      )
      .catch((error) => error.toString());

  const onUsernameClick = (tweet) => history.push(`/${tweet.username}`);

  const onError = (error) => {
    setError(error.toString());
    setTimeout(() => {
      setError("");
    }, 3000);
  };

  return (
    <>
      {addable && (
        <NewTweetForm
          tweetService={tweetService}
          onError={onError}
          userName={user.username}
          userImg={user.url}
        />
      )}
      {error && <Banner text={error} isAlert={true} transient={true} />}
      {tweets.length === 0 && <p className="tweets-empty">No Tweets Yet</p>}
      <ul className="tweets">
        {tweets.map((tweet) => (
          <TweetCard
            key={tweet.id}
            tweet={tweet}
            owner={tweet.username === user.username}
            onDelete={onDelete}
            onUpdate={onUpdate}
            onUsernameClick={onUsernameClick}
          />
        ))}
      </ul>
    </>
  );
});
export default Tweets;
