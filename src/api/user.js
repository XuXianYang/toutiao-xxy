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

export const getUserInfo = () => request({
    url:'/v1_0/user',
    method:'GET',
})

export const getUserChannels = () => request({
    url:'/v1_0/user/channels',
    method:'GET',
})

export const getArtilceList = params => request({
    url:'/v1_0/articles',
    method:'GET',
    params,
})