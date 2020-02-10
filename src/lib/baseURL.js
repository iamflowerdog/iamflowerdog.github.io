// var baseURL = 'http://10.10.8.221:8080/api'
let baseURL;
// baseURL = 'https://testepms.epark.com/api'
// var baseURL = 'https://epms.epark.com/api'

if (environment === 'prod') {
  baseURL = 'https://epms.epark.com/api'
  console.log(environment)
} else if (environment === 'test') {
  baseURL = 'https://testepms.epark.com/api'
  console.log(environment)
} else {
  // baseURL = 'http://10.10.8.221:8080/api' // 默认 伟伟
  // console.log('默认')
  baseURL = 'https://testepms.epark.com/api' // 默认 测试
}

export default baseURL;