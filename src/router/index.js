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
    path: '/map',
    component: Layout,
    redirect: '/map/life-cycle',
    name: '地图',
    meta: {
      title: '地图',
      icon: 'nested'
    },
    children: [
      {
        path: 'life-cycle',
        component: () => import('@/views/map/lifeCycle/index'), // Parent router-view
        name: '生命周期',
        meta: {
          title: '生命周期',
          icon: 'nested'
        },
        children: [
          {
            path: 'map-show',
            name: '地图的创建',
            component: () => import('@/views/map/lifeCycle/mapShow'),
            meta: {title: '地图的创建', icon: 'table'}
          },
          {
            path: 'map-complete',
            name: '地图的加载完成',
            component: () => import('@/views/map/lifeCycle/mapComplete'),
            meta: {title: '地图的加载完成', icon: 'tree'}
          },
          {
            path: 'map-create-destroy',
            name: '地图的销毁',
            component: () => import('@/views/map/lifeCycle/mapCreateDestroy'),
            meta: {title: '地图的销毁', icon: 'tree'}
          }
        ]
      },
      /* 地图属性 */
      {
        path: '/getMapzoom',
        component: () => import('@/views/map/map/index'), // Parent router-view
        name: '地图属性',
        meta: {title: '地图属性', icon: 'el-icon-s-help'},
        children: [
          {
            path: 'get-mapzoom',
            name: '获取地图中心点/级别',
            component: () => import('@/views/map/map/getMapzoom'),
            meta: {title: '获取地图中心点/级别', icon: 'table'}
          },
          {
            path: 'change-map-center',
            name: '设置地图级别与中心点',
            component: () => import('@/views/map/map/changeMapCenter'),
            meta: {title: '设置地图级别与中心点', icon: 'tree'}
          },
          {
            path: 'get-current-administrative-region',
            name: '获取地图当前行政区',
            component: () => import('@/views/map/map/getCurrentAdministrativeRegion'),
            meta: {title: '获取地图当前行政区', icon: 'tree'}
          },
          {
            path: 'set-center-according-to-map-name',
            name: '设置地图当前行政区',
            component: () => import('@/views/map/map/setCenterAccordingToMapName'),
            meta: {title: '设置地图当前行政区', icon: 'tree'}
          },
          {
            path: 'map-bounds',
            name: '设置/获取地图显示范围',
            component: () => import('@/views/map/map/mapBounds'),
            meta: {title: '设置/获取地图显示范围', icon: 'tree'}
          },
          {
            path: 'limit-map-show-range',
            name: '限制地图显示范围',
            component: () => import('@/views/map/map/limitMapShowRange'),
            meta: {title: '限制地图显示范围', icon: 'tree'}
          },
          {
            path: 'map-moving',
            name: '地图的平移',
            component: () => import('@/views/map/map/mapMoving'),
            meta: {title: '地图的平移', icon: 'tree'}
          },
          {
            path: 'set-map-status',
            name: '交互控制',
            component: () => import('@/views/map/map/setMapStatus'),
            meta: {title: '交互控制', icon: 'tree'}
          },
          {
            path: 'click-to-get-lnglat',
            name: '获取鼠标点击经纬度',
            component: () => import('@/views/map/map/clickToGetLnglat'),
            meta: {title: '获取鼠标点击经纬度', icon: 'tree'}
          },
          {
            path: 'hotspot',
            name: '地图的热点',
            component: () => import('@/views/map/map/hotspot'),
            meta: {title: '地图的热点', icon: 'tree'}
          },
          {
            path: 'set-mouse-style-on-the-map',
            name: '设置鼠标样式',
            component: () => import('@/views/map/map/setMouseStyleOnTheMap'),
            meta: {title: '设置鼠标样式', icon: 'tree'}
          }
        ]
      },
      /* 覆盖物与图层管理 */
      {
        path: '/map-componets',
        component: () => import('@/views/map/mapComponets/index'), // Parent router-view
        name: '覆盖物与图层管理',
        meta: {title: '覆盖物与图层管理', icon: 'el-icon-s-help'},
        children: [
          {
            path: 'map-overlays',
            name: '覆盖物的添加与移除',
            component: () => import('@/views/map/mapComponets/mapOverlays'),
            meta: {title: '覆盖物的添加与移除', icon: 'table'}
          },
          {
            path: 'map-layers',
            name: '图层的添加与移除',
            component: () => import('@/views/map/mapComponets/mapLayers'),
            meta: {title: '图层的添加与移除', icon: 'table'}
          },
          {
            path: 'map-with-function-control',
            name: '地图控件',
            component: () => import('@/views/map/mapComponets/mapWithFunctionControl'),
            meta: {title: '地图控件', icon: 'table'}
          },
        ]
      },
      /* 自定义地图样式 */
      {
        path: '/map/personalized-map',
        component: () => import('@/views/map/personalizedMap/index'), // Parent router-view
        name: '自定义地图样式',
        meta: {title: '自定义地图样式', icon: 'el-icon-s-help'},
        children: [
          {
            path: 'custom-style',
            name: '自定义地图',
            component: () => import('@/views/map/personalizedMap/customStyle'),
            meta: {title: '自定义地图', icon: 'table'}
          },
          {
            path: 'building-style',
            name: '设置楼块样式',
            component: () => import('@/views/map/personalizedMap/buildingStyle'),
            meta: {title: '设置楼块样式', icon: 'table'}
          },
          {
            path: 'setTheme-style',
            name: '标准样式主题',
            component: () => import('@/views/map/personalizedMap/setThemeStyle'),
            meta: {title: '标准样式主题', icon: 'table'}
          },
          {
            path: 'set-map-cotent',
            name: '地图显示要素',
            component: () => import('@/views/map/personalizedMap/setMapCotent'),
            meta: {title: '地图显示要素', icon: 'table'}
          },
          {
            path: 'map-showlabel',
            name: '隐藏文字标注',
            component: () => import('@/views/map/personalizedMap/mapShowlabel'),
            meta: {title: '隐藏文字标注', icon: 'table'}
          }
        ]
      },
      {
        path: '/map/3d',
        component: () => import('@/views/map/3d/index'), // Parent router-view
        name: '三维地图',
        meta: {title: '三维地图', icon: 'el-icon-s-help'},
        children: [
          {
            path: 'mdp3d',
            name: '3D地图',
            component: () => import('@/views/map/3d/map3d'),
            meta: {title: '3D地图', icon: 'table'}
          },
          {
            path: 'fixed-view',
            name: '固定视角',
            component: () => import('@/views/map/3d/fixedView'),
            meta: {title: '固定视角', icon: 'table'}
          },
          {
            path: 'mask',
            name: '区域掩模',
            component: () => import('@/views/map/3d/mask'),
            meta: {title: '区域掩模', icon: 'table'}
          },
        ]
      },
    ]
  },

  {
    path: '/coordinate',
    component: Layout,
    redirect: '/coordinate/axis',
    name: '坐标',
    meta: {
      title: '坐标',
      icon: 'nested'
    },
    children: [
      {
        path: '/axis',
        component: () => import('@/views/coordinate/axis/index'), // Parent router-view
        name: '坐标系转换',
        meta: {title: '坐标系转换', icon: 'el-icon-s-help'},
        children: [
          {
            path: 'transformate-between-coordinates-of-lnglat-and-map-container',
            name: '经纬度 <-> 地图容器像素坐标',
            component: () => import('@/views/coordinate/axis/transformateBetweenCoordinatesOfLnglatAndMapContainer'),
            meta: {title: '经纬度 <-> 地图容器像素坐标', icon: 'table'}
          },
          {
            path: 'transformate-between-coordinates-of-lnglat-and-geographical-pixels',
            name: '经纬度 <-> 平面像素坐标',
            component: () => import('@/views/coordinate/axis/transformateBetweenCoordinatesOfLnglatAndGeographicalPixels'),
            meta: {title: '经纬度 <-> 平面像素坐标', icon: 'table'}
          }
        ]
      },
      {
        path: '/other-gaode',
        component: () => import('@/views/coordinate/otherGaode/index'), // Parent router-view
        name: '其他坐标转高德坐标',
        meta: {title: '其他坐标转高德坐标', icon: 'el-icon-s-help'},
        children: [
          {
            path: 'othertoamap',
            name: '其他坐标 -> 高德坐标',
            component: () => import('@/views/coordinate/otherGaode/othertoamap'),
            meta: {title: '其他坐标 -> 高德坐标', icon: 'table'}
          },
          {
            path: 'othertoamap-more',
            name: '其他坐标 -> 高德坐标 （批量）',
            component: () => import('@/views/coordinate/otherGaode/othertoamapMore'),
            meta: {title: '其他坐标 -> 高德坐标 （批量）', icon: 'table'}
          }
        ]
      }
    ]
  },

  {
    path: '/event',
    component: Layout,
    redirect: '/event/event',
    name: '事件系统',
    meta: {title: '事件系统', icon: 'el-icon-s-help'},
    children: [
      {
        path: 'event',
        component: () => import('@/views/event/event/index'), // Parent router-view
        name: '地图事件',
        meta: {title: '地图事件', icon: 'el-icon-s-help'},
        children: [
          {
            path: 'othertoamap',
            name: '地图加载完成事件',
            component: () => import('@/views/event/event/mapLoadingCompleteEvent'),
            meta: {title: '地图加载完成事件', icon: 'table'}
          },
          {
            path: 'event-state',
            name: '地图移动相关事件',
            component: () => import('@/views/event/event/eventState'),
            meta: {title: '地图移动相关事件', icon: 'table'}
          },
          {
            path: 'event-map-zoom',
            name: '地图缩放相关事件',
            component: () => import('@/views/event/event/eventMapZoom'),
            meta: {title: '地图缩放相关事件', icon: 'table'}
          },
          {
            path: 'map-click-event',
            name: '地图点击和鼠标事件',
            component: () => import('@/views/event/event/mapClickEvent'),
            meta: {title: '地图点击和鼠标事件', icon: 'table'}
          },
          {
            path: 'event-map-drag',
            name: '地图拖拽相关事件',
            component: () => import('@/views/event/event/eventMapDrag'),
            meta: {title: '地图拖拽相关事件', icon: 'table'}
          }
        ]
      },
      {
        path: 'event-overlay',
        component: () => import('@/views/event/eventOverlay/index'), // Parent router-view
        name: '覆盖物事件',
        meta: {title: '覆盖物事件', icon: 'el-icon-s-help'},
        children: [
          {
            path: 'overlayer-event',
            name: '覆盖物点击和鼠标事件',
            component: () => import('@/views/event/eventOverlay/overlayerEvent'),
            meta: {title: '覆盖物点击和鼠标事件', icon: 'table'}
          },
          {
            path: 'event-overlay-drag',
            name: '覆盖物拖拽相关事件',
            component: () => import('@/views/event/eventOverlay/eventOverlayDrag'),
            meta: {title: '覆盖物拖拽相关事件', icon: 'table'}
          },
          {
            path: 'infowindow-event',
            name: '信息窗体打开关闭事件',
            component: () => import('@/views/event/eventOverlay/infowindowEvent'),
            meta: {title: '信息窗体打开关闭事件', icon: 'table'}
          }
        ]
      },
      {
        path: 'event-other',
        component: () => import('@/views/event/eventOther/index'), // Parent router-view
        name: '其他事件',
        meta: {title: '其他事件', icon: 'el-icon-s-help'},
        children: [
          {
            path: 'dom-event',
            name: 'DOM事件',
            component: () => import('@/views/event/eventOther/domEvent'),
            meta: {title: 'DOM事件', icon: 'table'}
          },
          {
            path: 'custom-event',
            name: '自定义事件',
            component: () => import('@/views/event/eventOther/customEvent'),
            meta: {title: '自定义事件', icon: 'table'}
          }
        ]
      }
    ]
  },

  {
    path: '/layers',
    component: Layout,
    redirect: '/layers/layer-common',
    name: '图层',
    meta: {title: '图层', icon: 'el-icon-s-help'},
    children: [
      {
        path: 'layer-common',
        component: () => import('@/views/layers/layerCommon/index'), // Parent router-view
        name: '图层通用接口',
        meta: {title: '图层通用接口', icon: 'el-icon-s-help'},
        children: [
          {
            path: 'layergroup',
            name: '批量修改图层',
            component: () => import('@/views/layers/layerCommon/layergroup'),
            meta: {title: '批量修改图层', icon: 'table'}
          },
          {
            path: 'layer-add-rm',
            name: '图层添加与移除',
            component: () => import('@/views/layers/layerCommon/layerAddRm'),
            meta: {title: '图层添加与移除', icon: 'table'}
          },
          {
            path: 'layer-zindex',
            name: '层级设定',
            component: () => import('@/views/layers/layerCommon/layerZindex'),
            meta: {title: '层级设定', icon: 'table'}
          },
          {
            path: 'layer-opacity',
            name: '图层透明度',
            component: () => import('@/views/layers/layerCommon/layerOpacity'),
            meta: {title: '图层透明度', icon: 'table'}
          }
        ]
      },
      {
        path: 'layers',
        component: () => import('@/views/layers/layers/index'), // Parent router-view
        name: '高德官方图层',
        meta: {title: '高德官方图层', icon: 'el-icon-s-help'},
        children: [
          {
            path: 'layergroup',
            name: '默认标准图层',
            component: () => import('@/views/layers/layers/default'),
            meta: {title: '默认标准图层', icon: 'table'}
          },
          {
            path: 'trafffic',
            name: '实时路况图层',
            component: () => import('@/views/layers/layers/trafffic'),
            meta: {title: '实时路况图层', icon: 'table'}
          },
          {
            path: 'satellite',
            name: '卫星图',
            component: () => import('@/views/layers/layers/satellite'),
            meta: {title: '卫星图', icon: 'table'}
          },
          {
            path: 'roadnet',
            name: '卫星和路网',
            component: () => import('@/views/layers/layers/roadnet'),
            meta: {title: '卫星和路网', icon: 'table'}
          },
          {
            path: 'buildings',
            name: '楼块图层',
            component: () => import('@/views/layers/layers/buildings'),
            meta: {title: '楼块图层', icon: 'table'}
          },
        ]
      },
   /*   {
        path: 'layer-common',
        component: () => import('@/views/layers/layerCommon/index'), // Parent router-view
        name: '图层通用接口',
        meta: {title: '图层通用接口', icon: 'el-icon-s-help'},
        children: [
          {
            path: 'layergroup',
            name: '批量修改图层',
            component: () => import('@/views/layers/layerCommon/layergroup'),
            meta: {title: '批量修改图层', icon: 'table'}
          },
          {
            path: 'layer-add-rm',
            name: '图层添加与移除',
            component: () => import('@/views/layers/layerCommon/layerAddRm'),
            meta: {title: '图层添加与移除', icon: 'table'}
          },
          {
            path: 'layer-zindex',
            name: '层级设定',
            component: () => import('@/views/layers/layerCommon/layerZindex'),
            meta: {title: '层级设定', icon: 'table'}
          },
          {
            path: 'layer-opacity',
            name: '图层透明度',
            component: () => import('@/views/layers/layerCommon/layerOpacity'),
            meta: {title: '图层透明度', icon: 'table'}
          }
        ]
      },*/
      {
        path: 'district',
        component: () => import('@/views/layers/district/index'), // Parent router-view
        name: '简易行政区图',
        meta: {title: '简易行政区图', icon: 'el-icon-s-help'},
        children: [
          {
            path: 'district-labels',
            name: '简易行政区图+标注',
            component: () => import('@/views/layers/district/districtLabels'),
            meta: {title: '简易行政区图+标注', icon: 'table'}
          },
          {
            path: 'district-world',
            name: '简易行政区图-世界',
            component: () => import('@/views/layers/district/districtWorld'),
            meta: {title: '简易行政区图-世界', icon: 'table'}
          },
          {
            path: 'district-chn',
            name: '简易行政区图-中国',
            component: () => import('@/views/layers/district/districtChn'),
            meta: {title: '简易行政区图-中国', icon: 'table'}
          },
          {
            path: 'district-country',
            name: '简易行政区图-外国',
            component: () => import('@/views/layers/district/districtCountry'),
            meta: {title: '简易行政区图-外国', icon: 'table'}
          },
          {
            path: 'district-pro',
            name: '简易行政区图-省区',
            component: () => import('@/views/layers/district/districtPro'),
            meta: {title: '简易行政区图-省区', icon: 'table'}
          },
          {
            path: 'layer-switch',
            name: '图层切换',
            component: () => import('@/views/layers/district/layerSwitch'),
            meta: {title: '图层切换', icon: 'table'}
          },
          {
            path: 'districtPick',
            name: '行政区拾取+修改样式',
            component: () => import('@/views/layers/district/districtPick'),
            meta: {title: '行政区拾取+修改样式', icon: 'table'}
          }
        ]
      },
      {
        path: 'thirdlayer',
        component: () => import('@/views/layers/thirdlayer/index'), // Parent router-view
        name: '三方标准图层',
        meta: {title: '三方标准图层', icon: 'el-icon-s-help'},
        children: [
          {
            path: 'terrain-mask',
            name: '卫星图+掩模',
            component: () => import('@/views/layers/thirdlayer/terrainMask'),
            meta: {title: '卫星图+掩模', icon: 'table'}
          },
          {
            path: 'wmts',
            name: 'WMTS',
            component: () => import('@/views/layers/thirdlayer/wmts'),
            meta: {title: 'WMTS', icon: 'table'}
          },
          {
            path: 'custom-grid-map',
            name: 'XYZ栅格图层',
            component: () => import('@/views/layers/thirdlayer/customGridMap'),
            meta: {title: 'XYZ栅格图层', icon: 'table'}
          },
          {
            path: 'functile',
            name: '函数加载栅格图',
            component: () => import('@/views/layers/thirdlayer/functile'),
            meta: {title: '函数加载栅格图', icon: 'table'}
          },
        ]
      },
      {
        path: 'selflayer',
        component: () => import('@/views/layers/selflayer/index'), // Parent router-view
        name: '自有数据图层',
        meta: {title: '自有数据图层', icon: 'el-icon-s-help'},
        children: [
          {
            path: 'imagelayer',
            name: '图片图层',
            component: () => import('@/views/layers/selflayer/imagelayer'),
            meta: {title: '图片图层', icon: 'table'}
          },
          {
            path: 'canvaslayer',
            name: 'Canvas图层',
            component: () => import('@/views/layers/selflayer/canvaslayer'),
            meta: {title: 'Canvas图层', icon: 'table'}
          },
          {
            path: 'heatmap',
            name: '热力图',
            component: () => import('@/views/layers/selflayer/heatmap'),
            meta: {title: '热力图', icon: 'table'}
          },
          {
            path: 'heatmap-3d',
            name: '3D 热力图',
            component: () => import('@/views/layers/selflayer/heatmap3d'),
            meta: {title: '3D 热力图', icon: 'table'}
          },
          {
            path: 'cus-svg',
            name: '自定义图层-SVG',
            component: () => import('@/views/layers/selflayer/cusSvg'),
            meta: {title: '自定义图层-SVG', icon: 'table'}
          },
          {
            path: 'glcustom-layer',
            name: '自定义图层-GLCustomLayer 结合 THREE',
            component: () => import('@/views/layers/selflayer/glcustomLayer'),
            meta: {title: '自定义图层-GLCustomLayer 结合 THREE', icon: 'table'}
          },
          {
            path: 'glcustomlayer-regl',
            name: '自定义图层-GLCustomLayer 结合 ReGL',
            component: () => import('@/views/layers/selflayer/glcustomlayerRegl'),
            meta: {title: '自定义图层-GLCustomLayer 结合 ReGL', icon: 'table'}
          },
          {
            path: '3dtileslayer',
            name: '3D Tiles 图层',
            component: () => import('@/views/layers/selflayer/3dtileslayer'),
            meta: {title: '3D Tiles 图层', icon: 'table'}
          },
          {
            path: 'custom-layer',
            name: '自定义图层-Canvas',
            component: () => import('@/views/layers/selflayer/customLayer'),
            meta: {title: '自定义图层-Canvas', icon: 'table'}
          },
          {
            path: 'flex-canvas',
            name: 'Canvas作为切片',
            component: () => import('@/views/layers/selflayer/flexCanvas'),
            meta: {title: 'Canvas作为切片', icon: 'table'}
          },
          {
            path: 'flex-img',
            name: 'img作为切片',
            component: () => import('@/views/layers/selflayer/flexImg'),
            meta: {title: 'img作为切片', icon: 'table'}
          }
        ]
      },
      {
        path: 'indoormap',
        component: () => import('@/views/layers/indoormap/index'), // Parent router-view
        name: '室内地图',
        meta: {title: '室内地图', icon: 'el-icon-s-help'},
        children: [
          {
            path: 'add-indoormap',
            name: '叠加室内地图',
            component: () => import('@/views/layers/indoormap/addIndoormap'),
            meta: {title: '叠加室内地图', icon: 'table'}
          },
          {
            path: 'indoormap',
            name: '默认室内图层',
            component: () => import('@/views/layers/indoormap/indoormap'),
            meta: {title: '默认室内图层', icon: 'table'}
          },
        ]
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
