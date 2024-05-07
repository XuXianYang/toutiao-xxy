import request from "@/utils/request";

export const login = (data) => request({
    url:'/v1_0/authorizations',
    method:'POST',
    data,
})

export const sendSMS = mobile => request({
    url:`/v1_0/sms/codes/:${mobile}`,
    method:'GET',
})

export const getUserInfo = mobile => request({
    url:'/v1_0/user',
    method:'GET',
})