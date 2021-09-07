import axios from 'axios';

const instance = axios.create({
  baseURL:'/api/',
  timeout:20000,
})

export function get(url, params){
  //return axios.get(url,{
    //创建了实例就不用用axios来写了，直接拿实例就行
    return instance.get(url,{
    params
  })
}
//为何要return 因为我们希望在使用get函数之后，还可以进行get().then().catch()的操作
//因为axios自带Promise所以可以直接返回

export function post(url, params){
  return instance.post(url,params ,{
    // transformRequest: [
    //   function (data) {
    //     let str = ''
    //     for (let key in data) {
    //       str += encodeURIComponent(key) + '=' + encodeURIComponent(data[key]) + '&'
    //     }
    //     return str.slice(0,str.length-1)
    // }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}


// //下面是拦截器相关的一些操作
// instance.interceptors.request.use(config=>{
//   //可以用于鉴定密码的token
//   //可以配置一些信息,相当于在配置里面加一些信息，然后再放行
//   // EG:
//    config.headers.token ="123456"
//   //下面为放行
//   console.log('----------config-----------');
//   console.log(config);
//   console.log('----------config-----------');
//   return config;
// },error=>{
//   return Promise.reject(error);
// })

// instance.interceptors.response.use(
//   response=>{//response代表响应回来的数据
//     console.log('----------response-----------');
//     console.log(response);
//     console.log('----------response-----------');
//     //下方为放行
//     return response;
//   },error=>{
//     return Promise.reject(error)
//   }
// )


