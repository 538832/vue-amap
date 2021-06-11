import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

// 高德地图
/*
import AMapLoader from '@amap/amap-jsapi-loader';
Vue.use(AMapLoader)
AMapLoader.load({
  key: "4056aa1b76794cdb8df1d5ee0000bdb8",              // 申请好的Web端开发者Key，首次调用 load 时必填
  version: "1.4.15",   // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
  plugins: ['AMap.Map', 'AMap.Control', 'AMap.ToolBar', 'AMap.ControlBar', 'AMap.Scale', 'AMap.MapType', 'AMap.HawkEye', 'AMap.PlaceSearch', 'AMap.InfoWindow', 'AMap.Polygon'],           // 需要使用的的插件列表，如比例尺'AMap.Scale'等
  AMapUI: {             // 是否加载 AMapUI，缺省不加载
    version: '1.1',   // AMapUI 缺省 1.1
    plugins: []       // 需要加载的 AMapUI ui插件
  },
  Loca: {                // 是否加载 Loca， 缺省不加载
    version: '1.3.2'  // Loca 版本，缺省 1.3.2
  }
}).then((AMap) => {
  Vue.use(AMap)
})
*/


/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const {mockXHR} = require('../mock')
  mockXHR()
}

// set ElementUI lang to EN
Vue.use(ElementUI, {locale})
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
