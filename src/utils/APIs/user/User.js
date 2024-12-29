// updatePassword
import { Request } from 'utils/APIs/APICenter'

export const UpdatePassword = async (data) => {
  const response = await Request('POST', 'user/updatePassword', data, true)
  //   if (response.fail) return null
  return response
}
// getUsersByDepartment
export const GetUsersByDepartment = async (data) => {
  const response = await Request('GET', 'user/getUsersByDepartment', data, true)
  if (response.fail) return null
  else return response.response
}
