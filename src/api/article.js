import request from '@/utils/request'
//获取文章分类
export const artGetChannelsService = () => request.get('/my/cate/list')
//添加文章分类
export const artAddChannelService = (data) => request.post('/my/cate/add', data)
//编辑文章分类
export const artEditChannelService = (data) =>
  request.put('/my/cate/info', data)
//删除文章分类
export const artDelChannelService = (id) =>
  request.delete('/my/cate/del', {
    params: { id }
  })
//获取文章列表
export const artGetListService = (params) =>
  request.get('/my/article/list', { params })
//添加文章
export const artPublishService = (data) => request.post('/my/article/add', data)
//获取文章详细
export const artGetDetailService = (id) =>
  request.get('/my/article/info', { params: { id } })
//编辑文章
export const artEditService = (data) => request.put('/my/article/info', data)
//更新用户信息
export const userUpdateInfoService = ({ id, nickname, email }) =>
  request.put('/my/userinfo', { id, nickname, email })
//更新用户头像
export const userUpdateAvatarService = (avatar) =>
  request.patch('/my/update/avatar', { avatar })
//更新用户密码
export const userUpdatePasswordService = ({ old_pwd, new_pwd, re_pwd }) =>
  request.patch('/my/updatepwd', { old_pwd, new_pwd, re_pwd })
