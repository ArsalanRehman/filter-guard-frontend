import axios from 'axios'
var HOST_IP = ''
if (process.env.NODE_ENV === 'development')
  HOST_IP = 'http://127.0.0.1:5050/api/v1/'
else HOST_IP = 'https://filterguard.com:3030/api/v1/'

export const GetHostIP = () => {
  return HOST_IP
}

export const GetHostWS = () => {
  let str = HOST_IP.split('api')[0]
  return str.substring(0, str.length - 1)
}

export const Request = async (method, url, data = null, use_token = false) => {
  url = `${HOST_IP}${url}`
  let config = {}
  let response = null
  let fail = false

  if (use_token) {
    const token = localStorage.getItem('jwt')
    if (token) {
      config.headers = { Authorization: `Bearer ${token}` }
    }
  }

  try {
    const result = await axios({ method, url, data, ...config })
    response = result.data
  } catch (error) {
    console.error(error)
    response = error
    fail = true
  }

  return { response, fail }
}

export * from './user/Login'