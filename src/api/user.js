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

// 获取用户个人信息
export const getUserProfile = () => request({
    url:'/v1_0/user/profile',
    method:'GET',
})

// 获取他人用户信息:废弃
export const getOtherUserInfo = userId => request({
    url:`/v1_0/user/${userId}`,
    method:'GET',
})

// 获取收藏
export const getCollections = () => request({
    url:'/v1_0/article/collections',
    method:'GET',
})

// 获取历史
export const getHistories = () => request({
    url:'/v1_0/user/histories',
    method:'GET',
})

// 获取关注
export const getFollowings = () => request({
    url:'/v1_0/user/followings',
    method:'GET',
})

// 获取粉丝
export const getFollowers = () => request({
    url:'/v1_0/user/followers',
    method:'GET',
})

// 编辑用户头像
export const editUserPhoto = data => request({
    url:'/v1_0/user/photo',
    method:'PATCH',
    data,
})

// 编辑用户资料
export const editUserInfo = data => request({
    url:'/v1_0/user/profile',
    method:'PATCH',
    data,
})

// 编辑用户头像
export const editUserHead = data => request({
    url:'v1_0/user/photo',
    method:'PATCH',
    data,
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

// 获取搜索联想建议
export const getSuggestions = q => request({
    url:'/v1_0/suggestion',
    method:'GET',
    params:{q},
})

// 获取搜索结果
export const getSearchResult = params => request({
    url:'/v1_0/search',
    method:'GET',
    params,
})

// 获取搜索结果
export const getArticleDetail = articleId => request({
    url:`/v1_0/articles/${articleId}`,
    method:'GET',
})

// 关注用户
export const followUsers = userId => request({
    url:'/v1_0/user/followings',
    method:'POST',
    data:{target:userId}
})

// 取消关注用户
export const cancleFollowUsers = userId => request({
    url:`/v1_0/user/followings/${userId}`,
    method:'DELETE',
})

// 收藏文章
export const collectActicle = articleId => request({
    url:'/v1_0/article/collections',
    method:'POST',
    data:{target:articleId}
})

// 取消收藏文章
export const cancleCollectActicle = articleId => request({
    url:`/v1_0/article/collections/${articleId}`,
    method:'DELETE',
})

// 点赞文章
export const likeActicle = articleId => request({
    url:'/v1_0/article/likings',
    method:'POST',
    data:{target:articleId}
})

// 取消点赞文章
export const canclelikeActicle = articleId => request({
    url:`/v1_0/article/likings/${articleId}`,
    method:'DELETE',
})

// 获取文章评论或者评论回复
export const getActicleComment = params => request({
    url:'/v1_0/comments',
    method:'GET',
    params,
})

// 对评论点赞
export const addCommentLike = target => request({
    url:'/v1_0/comment/likings',
    method:'POST',
    data:{target:target}
})

// 取消评论点赞
export const cancleCommentLike = target => request({
    url:`/v1_0/comment/likings/${target}`,
    method:'DELETE',
})

// 发布评论
export const addComments = data => request({
    url:'/v1_0/comments',
    method:'POST',
    data
})