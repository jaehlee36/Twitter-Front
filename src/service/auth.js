import TokenStorage from '../db/token';
import HttpClient from '../network/http';

const tokenStorage = new TokenStorage();
const httpClient = new HttpClient(process.env.REACT_APP_BASE_URL);

export default class authService {
  async signup(username, password, name, email, url) {
    const data = await httpClient.post('/auth/signup', {
      body: JSON.stringify({
        username,
        password,
        name,
        email,
        url,
      }),
    });

    tokenStorage.saveToken(data.token);
    return data;
  }

  async login(username, password) {
    const data = await httpClient.post('/auth/login', {
      body: JSON.stringify({ username, password }),
    });
    tokenStorage.saveToken(data.token);
    return data;
  }

  async me() {
    const token = tokenStorage.getToken();
    return httpClient.get('/auth/me', {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async logout() {
    tokenStorage.clearToken();
  }
}