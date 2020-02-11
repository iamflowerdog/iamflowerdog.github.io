import axios from 'axios';
import baseURL from './baseURL';

axios.interceptors.request.use(
  config => {
    config.headers['x-auth-token'] = '';
    config.baseURL = baseURL
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

/**
 * get请求
 * @param {*} url url地址
 * @param {*} data 数据
 * @param {*} needOrigin 是否需要原始的response,默认只返回data
 * @param {*} responseType 需要返回的数据类型,默认json
 */
export const get = (url, data, needOrigin, responseType) => {
  // console.log('get url ', url, data)
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: data,
      responseType: responseType || 'json',
    }).then(res => {
      resolve(needOrigin ? res : res.data)
    }).catch(error => {
      reject(error)
    })
  })
}

/**
 * post请求
 * @param {*} url url地址
 * @param {*} data 数据
 * @param {*} needOrigin 是否需要原始的response,默认只返回data
 */
export const post = (url, data, needOrigin) => {
  // console.log('post url2 ', url, data)
  return new Promise((resolve, reject) => {
    axios.post(url, data).then((res) => {
      resolve(needOrigin ? res : res.data)
    }).catch(error => {
      reject(error)
    })
  })
}

