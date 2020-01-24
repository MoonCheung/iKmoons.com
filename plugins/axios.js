/*
 * @Description: 定制Axios拦截器
 * @Author: MoonCheung
 * @Github: https://github.com/MoonCheung
 * @Date: 2019-12-10 17:15:03
 * @LastEditors: MoonCheung
 * @LastEditTime: 2020-01-22 20:36:59
 */

export default function({ $axios, redirect }) {
  // 向服务器请求
  $axios.onRequest(config => {
    // TODO: 请求头
    // config.headers["Content-Type"] = "application/json";
    // config.headers["Access-Control-Allow-Origin"] = "*";
    // 请求时间超过会被中止
    config.timeout = 5000
  })

  // 向服务器请求得到错误信息
  $axios.onRequestError(err => {
    console.log('请求错误:', err);
  })

  // 向服务器请求得到响应
  $axios.onResponse(res => {
    console.log('响应:' + res)
  })

  // 向服务器请求得到响应错误信息
  $axios.onResponseError(err => {
    console.log('响应错误:', err);
  })

  // TODO: 暂时处理错误方法
  // $axios.onError(error => {
  //   const code = parseInt(error.response && error.response.status)
  //   if (code === 400) {
  //     redirect('/400')
  //   }
  // })
}
