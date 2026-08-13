import type { App, Plugin } from 'vue'

type SFCwithInstall<T> = T & Plugin

export const withInstall = <T>(component: T) => {
  (component as SFCwithInstall<T>).install = (app: App) => {
    const name = (component as { name?: string }).name
    if (name) {
      app.component(name, component as any)
    } else {
      console.warn('[yk-ui] withInstall: 组件缺少 name，无法全局注册')
    }
  }
  return component as SFCwithInstall<T>
}