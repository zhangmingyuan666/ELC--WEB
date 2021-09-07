import axios from 'axios';


export function postJSON(url, params = {}) {
  // json格式请求头
  const headerJSON = {
    "Content-Type": "application/json"
  };

  return new Promise((resolve, reject) => {
    axios
      .post(url, JSON.stringify(params), {
        headers:  headerJSON 
      })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data);
      });
  });
}
// post接口封装：
// json或FormData格式请求头测试接口
export function postHeader(url, params) {
  return postJSON('/api/'+ url, params)
}