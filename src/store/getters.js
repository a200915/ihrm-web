const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  staffPhoto: state => state.user.userInfo.staffPhoto,
  username: state => state.user.userInfo.username,
  roles: state => state.user.roles,
  permission_routes: state => state.permission.routes
}
export default getters
