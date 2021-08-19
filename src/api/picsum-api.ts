import axios from 'axios';

export const picsumApi2 = axios.create({
  baseURL: 'https://picsum.photos/v2',
});
