import React from "react";
import { useParams } from "react-router-dom";
import Tweets from "../components/Tweets";

const MyTweets = () => {
  const { username } = useParams();
  return <Tweets username={username} addable={false} />;
};

export default MyTweets;
