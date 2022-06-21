import request from '@/utils/request'

// axiox({
//   url: "/v1_0/authorizations",
//   method: "post",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   data: {
//     mobile: "",
//     code: "",
//   },
// });

export const login = (data) => {
  return request({
    url: '/v1_0/authorizations',
    method: 'post',
    data
  })
}

export const getSmsCode = (mobile) => {
  return request({
    url: `/v1_0/sms/codes/${mobile}`
  })
}
