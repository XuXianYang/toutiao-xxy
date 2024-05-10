import request from "@/utils/request";

// 登录
export const login = (data) => request({
    url:'/v1_0/authorizations',
    method:'POST',
    data,
})

// 登录：发送短信
export const sendSMS = mobile => request({
    url:`/v1_0/sms/codes/:${mobile}`,
    method:'GET',
})

// 获取用户信息
export const getUserInfo = () => request({
    url:'/v1_0/user',
    method:'GET',
})

// 获取首页用户频道
export const getUserChannels = () => request({
    url:'/v1_0/user/channels',
    method:'GET',
})

// 获取所有频道
export const getAllChannels = () => request({
    url:'/v1_0/channels',
    method:'GET',
})

// 根据频道id和时间戳获取文章列表
export const getArtilceList = params => request({
    url:'/v1_0/articles',
    method:'GET',
    params,
})

// 新增用户指定某个频道
export const addUserChannels = channels => request({
    url:'/v1_0/user/channels',
    method:'PATCH',
    data:{channels},
})

// 删除用户指定某个频道
export const delUserChannels = channelId => request({
    url:`/v1_0/user/channels/${channelId}`,
    method:'DELETE',
})