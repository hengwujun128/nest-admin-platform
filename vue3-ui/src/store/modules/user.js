/*
 * @Author: 张泽全 hengwujun128@gmail.com
 * @Date: 2024-09-30 16:55:30
 * @LastEditors: 张泽全 hengwujun128@gmail.com
 * @LastEditTime: 2024-12-20 15:58:35
 * @Description:
 * @FilePath: /meimei-prisma-vue3/vue3-ui/src/store/modules/user.js
 */
import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
// 可以在 js 中直接 import 图片
import defAva from '@/assets/images/admin1.png'

const useUserStore = defineStore('user', {
  state: () => ({
    token: getToken(),
    name: '',
    nickName: '',
    phonenumber: '',
    avatar: '',
    roles: [],
    permissions: [],
    dept: null,
  }),
  actions: {
    // 登录
    login(userInfo) {
      const username = userInfo.username.trim()
      const password = userInfo.password
      const code = userInfo.code
      const uuid = userInfo.uuid
      return new Promise((resolve, reject) => {
        login(username, password, code, uuid)
          .then((res) => {
            setToken(res.token)
            this.token = res.token
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    // 获取用户信息
    getInfo() {
      return new Promise((resolve, reject) => {
        getInfo()
          .then((res) => {
            const user = res.user
            const avatar =
              user.avatar == '' || user.avatar == null
                ? defAva
                : import.meta.env.VITE_APP_BASE_API + user.avatar

            if (res.roles && res.roles.length > 0) {
              // 验证返回的roles是否是一个非空数组
              this.roles = res.roles
              this.permissions = res.permissions
            } else {
              this.roles = ['ROLE_DEFAULT']
            }
            this.name = user.userName
            this.nickName = user.nickName
            this.avatar = avatar
            this.dept = user.dept
            this.phonenumber = user.phonenumber || ''
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    // 退出系统
    logOut() {
      return new Promise((resolve, reject) => {
        logout(this.token)
          .then(() => {
            this.token = ''
            this.roles = []
            this.permissions = []
            removeToken()
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
  },
})

export default useUserStore
