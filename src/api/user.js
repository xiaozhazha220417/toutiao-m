import request from '@/utils/request'
// import store from "@/store";

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

export const getUserInfo = () => {
  return request({
    url: '/v1_0/user'
    // headers: {
    //   Authorization: `Bearer ${store.state.user.token}`,
    // },
  })
}
