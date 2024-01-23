import axios from 'axios';

export const api = axios.create({
  baseURL:
    location.host === 'localhost:5173'
      ? 'http://localhost:8000'
      : 'https://means.vercel.app',
});
