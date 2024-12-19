/*
 * @Author: 张泽全 hengwujun128@gmail.com
 * @Date: 2024-09-30 16:55:30
 * @LastEditors: 张泽全 hengwujun128@gmail.com
 * @LastEditTime: 2024-12-19 15:00:17
 * @Description:
 * @FilePath: /meimei-prisma-vue3/meimei-ui-vue3/src/store/modules/settings.js
 */
import defaultSettings from '@/settings'
import { useDynamicTitle } from '@/utils/dynamicTitle'
import { getWeb } from '@/api/login.js'
const {
  sideTheme,
  showSettings,
  topNav,
  tagsView,
  fixedHeader,
  sidebarLogo,
  dynamicTitle,
} = defaultSettings

const useSettingsStore = defineStore('settings', {
  state: () => ({
    title: '',
    theme: '#409EFF',
    sideTheme: sideTheme,
    showSettings: showSettings,
    topNav: undefined,
    tagsView: undefined,
    fixedHeader: undefined,
    sidebarLogo: undefined,
    dynamicTitle: undefined,
  }),
  actions: {
    // 初始化布局设置
    initSetting() {
      return new Promise((resolve, reject) => {
        getWeb()
          .then(({ data }) => {
            const storageSetting = data || {}
            this.theme = storageSetting.theme || '#409EFF'
            this.sideTheme = storageSetting.sideTheme || sideTheme
            this.showSettings = showSettings
            this.topNav =
              storageSetting.topNav === undefined
                ? topNav
                : storageSetting.topNav
            this.tagsView =
              storageSetting.tagsView === undefined
                ? tagsView
                : storageSetting.tagsView
            this.fixedHeader =
              storageSetting.fixedHeader === undefined
                ? fixedHeader
                : storageSetting.fixedHeader
            this.sidebarLogo =
              storageSetting.sidebarLogo === undefined
                ? sidebarLogo
                : storageSetting.sidebarLogo
            this.dynamicTitle =
              storageSetting.dynamicTitle === undefined
                ? dynamicTitle
                : storageSetting.dynamicTitle
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    // 修改布局设置
    changeSetting(data) {
      const { key, value } = data
      if (Reflect.has(this, key)) {
        this[key] = value
      }
    },
    // 设置网页标题
    setTitle(title) {
      this.title = title
      useDynamicTitle()
    },
  },
})

export default useSettingsStore
