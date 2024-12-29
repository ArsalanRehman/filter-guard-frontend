import { Request } from 'utils/APIs/APICenter';

export const LoginAPI = async (username, password, setUserName) => {
  const apiUrl = 'users/login'

  const data = {
    email: username,
    password: password,
  }
  const res = await Request('POST', apiUrl, data, false)
  // console.log(res);
  
  if (res.fail) return false
  else {
    const name = res.response.data.user.name
    // console.log(name);
    const jwt = res.response.token

    setUserName(name)
    // localStorage.setItem('UserID', ID)
    localStorage.setItem('jwt', jwt)
    localStorage.setItem('username', name)


    return true
  }
}
