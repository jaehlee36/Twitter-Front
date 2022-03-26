import TokenStorage from '../db/token';
import Socket from '../network/socket';
import HttpClient from '../network/http';

const tokenStorage = new TokenStorage();
const socketClient = new Socket(process.env.REACT_APP_BASE_URL, () => tokenStorage.getToken());
const httpClient = new HttpClient(process.env.REACT_APP_BASE_URL);

export default class tweetService {
  getHeaders() {
    const token = tokenStorage.getToken();
    return {
      Authorization: `Bearer ${token}`,
    };
  }

  onSync(callback) {
    return socketClient.onSync('tweets', callback);
  }

  async getTweets(username) {
    const query = username ? `?username=${username}` : '';
    return httpClient.get(`/tweets${query}`, {
      headers: this.getHeaders(),
    });
  }

  async postTweet(text) {
    return httpClient.post(`/tweets`, {
      headers: this.getHeaders(),
      body: JSON.stringify({ text, username: 'ellie', name: 'Ellie' }),
    });
  }

  
  async updateTweet(tweetId, text) {
    return httpClient.update(`/tweets/${tweetId}`, {
      headers: this.getHeaders(),
      body: JSON.stringify({ text }),
    });
  }

  async deleteTweet(tweetId) {
    return httpClient.delete(`/tweets/${tweetId}`, {
      headers: this.getHeaders(),
    });
  }
}

// export default class TweetService {
//   // constructor(http) {
//     // this.httpClient = http;
//     // this.tokenStorage = tokenStorage;
//     // this.socket = socket;
//   // }

//   async getTweets(username) {
//     const query = username ? `?username=${username}` : '';
//     return httpClient.fetch(`/tweets${query}`, {
//       method: 'GET',
//       headers: this.getHeaders(),
//     });
//   }

//   async postTweet(text) {
//     return httpClient.fetch(`/tweets`, {
//       method: 'POST',
//       headers: this.getHeaders(),
//       body: JSON.stringify({ text, username: 'ellie', name: 'Ellie' }),
//     });
//   }

//   async deleteTweet(tweetId) {
//     return httpClient.fetch(`/tweets/${tweetId}`, {
//       method: 'DELETE',
//       headers: this.getHeaders(),
//     });
//   }

//   async updateTweet(tweetId, text) {
//     return httpClient.fetch(`/tweets/${tweetId}`, {
//       method: 'PUT',
//       headers: this.getHeaders(),
//       body: JSON.stringify({ text }),
//     });
//   }

//   getHeaders() {
//     const token = tokenStorage.getToken();
//     return {
//       Authorization: `Bearer ${token}`,
//     };
//   }

//   onSync(callback) {
//     return socketClient.onSync('tweets', callback);
//   }
// }
