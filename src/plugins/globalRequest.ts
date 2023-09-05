/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import {extend} from 'umi-request';
import {message} from "antd";
import {history} from "@@/core/history";
import {stringify} from "querystring";
import * as process from "process";

const request = extend({
  credentials: 'include',//默认请求是否带上cookie
  prefix: process.env.NODE_ENV === 'production' ? 'http://192.168.253.128:80' : undefined
})
/**
 * 所以请求拦截器
 */
request.interceptors.request.use((url, options): any => {
  console.log(`do request url=${url}`)
  return {
    url,
    options: {
      ...options,
      headers: {},
    },
  };
});

/**
 * 所有响应拦截器
 */
request.interceptors.response.use(async (response, options): Promise<any> => {
  const res = await response.clone().json();
  console.log('全局响应拦截器', res);
  if (res.code === 40100) {
    message.error('请先登录')
    history.replace({
      pathname: '/user/login',
      search: stringify({
        redirect: location.pathname,
      }),
    });
  } else if (res.code !== 1) {
    message.error(res.description)
  }
  return res.data;
});

export default request;
