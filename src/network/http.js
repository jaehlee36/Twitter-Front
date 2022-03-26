import { AuthErrorEventBus } from '../context/AuthContext';

export default class HttpClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async fetch(url, method, options) {
    const response = await fetch(url, {
      ...options,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      }
    });
    let data;
    try {
      data = await response.json();
    } catch (error){
      console.error();
    }
    if(response.status < 200 || response.status > 299) {
      const errorMessage = data && data.message ? data.message : `${method} api failed!`;
      const error = new Error(errorMessage);
      throw error;
    }
    return data;
  }

  async get(url, options) {
    return await this.fetch(`${this.baseURL}${url}`, 'GET', options);
  }
  async post(url, options) {
    return await this.fetch(`${this.baseURL}${url}`, 'POST', options);
  }
  async update(url, options) {
    return this.fetch(`${this.baseURL}${url}`, 'PUT', options);
  }
  async delete(url, options) {
    return this.fetch(`${this.baseURL}${url}`, 'DELETE', options);
  }
}