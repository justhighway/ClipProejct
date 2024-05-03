/* axios.create로 axios 인스턴스 생성
 baseURL: 요청을 보낼 기본 URL
 withCredentials: 요청을 보낼 때 쿠키를 함께 보내는 것을 의미
 */

import axios from 'axios';
import {Platform} from 'react-native';

const axiosInstance = axios.create({
  baseURL:
    Platform.OS === 'android'
      ? 'http://10.0.2.2:3030'
      : 'http://localhost:3030',

  withCredentials: true,
});

export default axiosInstance;