import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: {title: 'Dashboard', icon: 'dashboard'}
    }]
  },

  {
    path: '/life-cycle',
    component: Layout,
    redirect: '/lifeCycle/map-show',
    name: '生命周期',
    meta: {title: '生命周期', icon: 'el-icon-s-help'},
    children: [
      {
        path: 'map-show',
        name: '地图的创建',
        component: () => import('@/views/lifeCycle/mapShow'),
        meta: {title: '地图的创建', icon: 'table'}
      },
      {
        path: 'map-complete',
        name: '地图的加载完成',
        component: () => import('@/views/lifeCycle/mapComplete'),
        meta: {title: '地图的加载完成', icon: 'tree'}
      },
      {
        path: 'map-create-destroy',
        name: '地图的销毁',
        component: () => import('@/views/lifeCycle/mapCreateDestroy'),
        meta: {title: '地图的销毁', icon: 'tree'}
      }
    ]
  },
  /* 地图属性 */
  {
    path: '/map',
    component: Layout,
    redirect: '/map/getMapzoom',
    name: '地图属性',
    meta: {title: '地图属性', icon: 'el-icon-s-help'},
    children: [
      {
        path: 'get-mapzoom',
        name: '获取地图中心点/级别',
        component: () => import('@/views/map/getMapzoom'),
        meta: {title: '获取地图中心点/级别', icon: 'table'}
      },
      {
        path: 'change-map-center',
        name: '设置地图级别与中心点',
        component: () => import('@/views/map/changeMapCenter'),
        meta: {title: '设置地图级别与中心点', icon: 'tree'}
      },
      {
        path: 'get-current-administrative-region',
        name: '获取地图当前行政区',
        component: () => import('@/views/map/getCurrentAdministrativeRegion'),
        meta: {title: '获取地图当前行政区', icon: 'tree'}
      },
      {
        path: 'set-center-according-to-map-name',
        name: '设置地图当前行政区',
        component: () => import('@/views/map/setCenterAccordingToMapName'),
        meta: {title: '设置地图当前行政区', icon: 'tree'}
      },
      {
        path: 'map-bounds',
        name: '设置/获取地图显示范围',
        component: () => import('@/views/map/mapBounds'),
        meta: {title: '设置/获取地图显示范围', icon: 'tree'}
      },
      {
        path: 'limit-map-show-range',
        name: '限制地图显示范围',
        component: () => import('@/views/map/limitMapShowRange'),
        meta: {title: '限制地图显示范围', icon: 'tree'}
      },
      {
        path: 'map-moving',
        name: '地图的平移',
        component: () => import('@/views/map/mapMoving'),
        meta: {title: '地图的平移', icon: 'tree'}
      },
      {
        path: 'set-map-status',
        name: '交互控制',
        component: () => import('@/views/map/setMapStatus'),
        meta: {title: '交互控制', icon: 'tree'}
      },
      {
        path: 'click-to-get-lnglat',
        name: '获取鼠标点击经纬度',
        component: () => import('@/views/map/clickToGetLnglat'),
        meta: {title: '获取鼠标点击经纬度', icon: 'tree'}
      },
      {
        path: 'hotspot',
        name: '地图的热点',
        component: () => import('@/views/map/hotspot'),
        meta: {title: '地图的热点', icon: 'tree'}
      },
      {
        path: 'set-mouse-style-on-the-map',
        name: '设置鼠标样式',
        component: () => import('@/views/map/setMouseStyleOnTheMap'),
        meta: {title: '设置鼠标样式', icon: 'tree'}
      }
    ]
  },
  /* 覆盖物与图层管理 */
  {
    path: '/map-componets',
    component: Layout,
    redirect: '/mapComponets/mapOverlays',
    name: '覆盖物与图层管理',
    meta: {title: '覆盖物与图层管理', icon: 'el-icon-s-help'},
    children: [
      {
        path: 'map-overlays',
        name: '覆盖物的添加与移除',
        component: () => import('@/views/mapComponets/mapOverlays'),
        meta: {title: '覆盖物的添加与移除', icon: 'table'}
      },
      {
        path: 'map-layers',
        name: '图层的添加与移除',
        component: () => import('@/views/mapComponets/mapLayers'),
        meta: {title: '图层的添加与移除', icon: 'table'}
      },
      {
        path: 'map-with-function-control',
        name: '地图控件',
        component: () => import('@/views/mapComponets/mapWithFunctionControl'),
        meta: {title: '地图控件', icon: 'table'}
      },
    ]
  },
  /* 自定义地图样式 */
  {
    path: '/personalized-map',
    component: Layout,
    redirect: 'personalizedMap/customStyle',
    name: '自定义地图样式',
    meta: {title: '自定义地图样式', icon: 'el-icon-s-help'},
    children: [
      {
        path: 'custom-style',
        name: '自定义地图',
        component: () => import('@/views/personalizedMap/customStyle'),
        meta: {title: '自定义地图', icon: 'table'}
      },
      {
        path: 'building-style',
        name: '设置楼块样式',
        component: () => import('@/views/personalizedMap/buildingStyle'),
        meta: {title: '设置楼块样式', icon: 'table'}
      },
      {
        path: 'setTheme-style',
        name: '标准样式主题',
        component: () => import('@/views/personalizedMap/setThemeStyle'),
        meta: {title: '标准样式主题', icon: 'table'}
      },
      {
        path: 'set-map-cotent',
        name: '地图显示要素',
        component: () => import('@/views/personalizedMap/setMapCotent'),
        meta: {title: '地图显示要素', icon: 'table'}
      },
      {
        path: 'map-showlabel',
        name: '隐藏文字标注',
        component: () => import('@/views/personalizedMap/mapShowlabel'),
        meta: {title: '隐藏文字标注', icon: 'table'}
      }
    ]
  },
  {
    path: '/map3d',
    component: Layout,
    redirect: '3d/map3d',
    name: '三维地图',
    meta: {title: '三维地图', icon: 'el-icon-s-help'},
    children: [
      {
        path: 'mdp3d',
        name: '3D地图',
        component: () => import('@/views/3d/map3d'),
        meta: {title: '3D地图', icon: 'table'}
      },
      {
        path: 'fixed-view',
        name: '固定视角',
        component: () => import('@/views/3d/fixedView'),
        meta: {title: '固定视角', icon: 'table'}
      },
      {
        path: 'mask',
        name: '区域掩模',
        component: () => import('@/views/3d/mask'),
        meta: {title: '区域掩模', icon: 'table'}
      },
    ]
  },
  {
    path: '/axis',
    component: Layout,
    redirect: 'transformateBetweenCoordinatesOfLnglatAndMapContainer',
    name: '坐标系转换',
    meta: {title: '坐标系转换', icon: 'el-icon-s-help'},
    children: [
      {
        path: 'transformate-between-coordinates-of-lnglat-and-map-container',
        name: '经纬度 <-> 地图容器像素坐标',
        component: () => import('@/views/axis/transformateBetweenCoordinatesOfLnglatAndMapContainer'),
        meta: {title: '经纬度 <-> 地图容器像素坐标', icon: 'table'}
      },
      {
        path: 'transformate-between-coordinates-of-lnglat-and-geographical-pixels',
        name: '经纬度 <-> 平面像素坐标',
        component: () => import('@/views/axis/transformateBetweenCoordinatesOfLnglatAndGeographicalPixels'),
        meta: {title: '经纬度 <-> 平面像素坐标', icon: 'table'}
      }
    ]
  },
  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: {title: 'External Link', icon: 'link'}
      }
    ]
  },

  // 404 page must be placed at the end !!!
  {path: '*', redirect: '/404', hidden: true}
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({y: 0}),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
