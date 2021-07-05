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
    redirect: '/index',
    children: [{
      path: 'index',
      name: '首页',
      component: () => import('@/views/index/index'),
      meta: {title: '首页', icon: 'guide'}
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
        meta: { title: '生命周期', icon: 'example'},
        children: [
          {
            path: 'map-show',
            name: '地图的创建',
            component: () => import('@/views/map/lifeCycle/mapShow'),
            meta: {title: '地图的创建', icon: 'component'}
          },
          {
            path: 'map-complete',
            name: '地图的加载完成',
            component: () => import('@/views/map/lifeCycle/mapComplete'),
            meta: {title: '地图的加载完成', icon: 'component'}
          },
          {
            path: 'map-create-destroy',
            name: '地图的销毁',
            component: () => import('@/views/map/lifeCycle/mapCreateDestroy'),
            meta: {title: '地图的销毁', icon: 'component'}
          }
        ]
      },
      /* 地图属性 */
      {
        path: 'getMapzoom',
        component: () => import('@/views/map/map/index'), // Parent router-view
        name: '地图属性',
        meta: {title: '地图属性', icon: 'example'},
        children: [
          {
            path: 'get-mapzoom',
            name: '获取地图中心点/级别',
            component: () => import('@/views/map/map/getMapzoom'),
            meta: {title: '获取地图中心点/级别', icon: 'component'}
          },
          {
            path: 'change-map-center',
            name: '设置地图级别与中心点',
            component: () => import('@/views/map/map/changeMapCenter'),
            meta: {title: '设置地图级别与中心点', icon: 'component'}
          },
          {
            path: 'get-current-administrative-region',
            name: '获取地图当前行政区',
            component: () => import('@/views/map/map/getCurrentAdministrativeRegion'),
            meta: {title: '获取地图当前行政区', icon: 'component'}
          },
          {
            path: 'set-center-according-to-map-name',
            name: '设置地图当前行政区',
            component: () => import('@/views/map/map/setCenterAccordingToMapName'),
            meta: {title: '设置地图当前行政区', icon: 'component'}
          },
          {
            path: 'map-bounds',
            name: '设置/获取地图显示范围',
            component: () => import('@/views/map/map/mapBounds'),
            meta: {title: '设置/获取地图显示范围', icon: 'component'}
          },
          {
            path: 'limit-map-show-range',
            name: '限制地图显示范围',
            component: () => import('@/views/map/map/limitMapShowRange'),
            meta: {title: '限制地图显示范围', icon: 'component'}
          },
          {
            path: 'map-moving',
            name: '地图的平移',
            component: () => import('@/views/map/map/mapMoving'),
            meta: {title: '地图的平移', icon: 'component'}
          },
          {
            path: 'set-map-status',
            name: '交互控制',
            component: () => import('@/views/map/map/setMapStatus'),
            meta: {title: '交互控制', icon: 'component'}
          },
          {
            path: 'click-to-get-lnglat',
            name: '获取鼠标点击经纬度',
            component: () => import('@/views/map/map/clickToGetLnglat'),
            meta: {title: '获取鼠标点击经纬度', icon: 'component'}
          },
          {
            path: 'hotspot',
            name: '地图的热点',
            component: () => import('@/views/map/map/hotspot'),
            meta: {title: '地图的热点', icon: 'component'}
          },
          {
            path: 'set-mouse-style-on-the-map',
            name: '设置鼠标样式',
            component: () => import('@/views/map/map/setMouseStyleOnTheMap'),
            meta: {title: '设置鼠标样式', icon: 'component'}
          }
        ]
      },
      /* 覆盖物与图层管理 */
      {
        path: 'map-componets',
        component: () => import('@/views/map/mapComponets/index'), // Parent router-view
        name: '覆盖物与图层管理',
        meta: {title: '覆盖物与图层管理', icon: 'example'},
        children: [
          {
            path: 'map-overlays',
            name: '覆盖物的添加与移除',
            component: () => import('@/views/map/mapComponets/mapOverlays'),
            meta: {title: '覆盖物的添加与移除', icon: 'component'}
          },
          {
            path: 'map-layers',
            name: '图层的添加与移除',
            component: () => import('@/views/map/mapComponets/mapLayers'),
            meta: {title: '图层的添加与移除', icon: 'component'}
          },
          {
            path: 'map-with-function-control',
            name: '地图控件',
            component: () => import('@/views/map/mapComponets/mapWithFunctionControl'),
            meta: {title: '地图控件', icon: 'component'}
          },
        ]
      },
      /* 自定义地图样式 */
      {
        path: 'personalized-map',
        component: () => import('@/views/map/personalizedMap/index'), // Parent router-view
        name: '自定义地图样式',
        meta: {title: '自定义地图样式', icon: 'example'},
        children: [
          {
            path: 'custom-style',
            name: '自定义地图',
            component: () => import('@/views/map/personalizedMap/customStyle'),
            meta: {title: '自定义地图', icon: 'component'}
          },
          {
            path: 'building-style',
            name: '设置楼块样式',
            component: () => import('@/views/map/personalizedMap/buildingStyle'),
            meta: {title: '设置楼块样式', icon: 'component'}
          },
          {
            path: 'setTheme-style',
            name: '标准样式主题',
            component: () => import('@/views/map/personalizedMap/setThemeStyle'),
            meta: {title: '标准样式主题', icon: 'component'}
          },
          {
            path: 'set-map-cotent',
            name: '地图显示要素',
            component: () => import('@/views/map/personalizedMap/setMapCotent'),
            meta: {title: '地图显示要素', icon: 'component'}
          },
          {
            path: 'map-showlabel',
            name: '隐藏文字标注',
            component: () => import('@/views/map/personalizedMap/mapShowlabel'),
            meta: {title: '隐藏文字标注', icon: 'component'}
          }
        ]
      },
      {
        path: '/map/3d',
        component: () => import('@/views/map/3d/index'), // Parent router-view
        name: '三维地图',
        meta: {title: '三维地图', icon: 'example'},
        children: [
          {
            path: 'mdp3d',
            name: '3D地图',
            component: () => import('@/views/map/3d/map3d'),
            meta: {title: '3D地图', icon: 'component'}
          },
          {
            path: 'fixed-view',
            name: '固定视角',
            component: () => import('@/views/map/3d/fixedView'),
            meta: {title: '固定视角', icon: 'component'}
          },
          {
            path: 'mask',
            name: '区域掩模',
            component: () => import('@/views/map/3d/mask'),
            meta: {title: '区域掩模', icon: 'component'}
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
        meta: {title: '坐标系转换', icon: 'example'},
        children: [
          {
            path: 'transformate-between-coordinates-of-lnglat-and-map-container',
            name: '经纬度 <-> 地图容器像素坐标',
            component: () => import('@/views/coordinate/axis/transformateBetweenCoordinatesOfLnglatAndMapContainer'),
            meta: {title: '经纬度 <-> 地图容器像素坐标', icon: 'component'}
          },
          {
            path: 'transformate-between-coordinates-of-lnglat-and-geographical-pixels',
            name: '经纬度 <-> 平面像素坐标',
            component: () => import('@/views/coordinate/axis/transformateBetweenCoordinatesOfLnglatAndGeographicalPixels'),
            meta: {title: '经纬度 <-> 平面像素坐标', icon: 'component'}
          }
        ]
      },
      {
        path: '/other-gaode',
        component: () => import('@/views/coordinate/otherGaode/index'), // Parent router-view
        name: '其他坐标转高德坐标',
        meta: {title: '其他坐标转高德坐标', icon: 'example'},
        children: [
          {
            path: 'othertoamap',
            name: '其他坐标 -> 高德坐标',
            component: () => import('@/views/coordinate/otherGaode/othertoamap'),
            meta: {title: '其他坐标 -> 高德坐标', icon: 'component'}
          },
          {
            path: 'othertoamap-more',
            name: '其他坐标 -> 高德坐标 （批量）',
            component: () => import('@/views/coordinate/otherGaode/othertoamapMore'),
            meta: {title: '其他坐标 -> 高德坐标 （批量）', icon: 'component'}
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
    meta: {title: '事件系统', icon: 'nested'},
    children: [
      {
        path: 'event',
        component: () => import('@/views/event/event/index'), // Parent router-view
        name: '地图事件',
        meta: {title: '地图事件', icon: 'example'},
        children: [
          {
            path: 'othertoamap',
            name: '地图加载完成事件',
            component: () => import('@/views/event/event/mapLoadingCompleteEvent'),
            meta: {title: '地图加载完成事件', icon: 'component'}
          },
          {
            path: 'event-state',
            name: '地图移动相关事件',
            component: () => import('@/views/event/event/eventState'),
            meta: {title: '地图移动相关事件', icon: 'component'}
          },
          {
            path: 'event-map-zoom',
            name: '地图缩放相关事件',
            component: () => import('@/views/event/event/eventMapZoom'),
            meta: {title: '地图缩放相关事件', icon: 'component'}
          },
          {
            path: 'map-click-event',
            name: '地图点击和鼠标事件',
            component: () => import('@/views/event/event/mapClickEvent'),
            meta: {title: '地图点击和鼠标事件', icon: 'component'}
          },
          {
            path: 'event-map-drag',
            name: '地图拖拽相关事件',
            component: () => import('@/views/event/event/eventMapDrag'),
            meta: {title: '地图拖拽相关事件', icon: 'component'}
          }
        ]
      },
      {
        path: 'event-overlay',
        component: () => import('@/views/event/eventOverlay/index'), // Parent router-view
        name: '覆盖物事件',
        meta: {title: '覆盖物事件', icon: 'example'},
        children: [
          {
            path: 'overlayer-event',
            name: '覆盖物点击和鼠标事件',
            component: () => import('@/views/event/eventOverlay/overlayerEvent'),
            meta: {title: '覆盖物点击和鼠标事件', icon: 'component'}
          },
          {
            path: 'event-overlay-drag',
            name: '覆盖物拖拽相关事件',
            component: () => import('@/views/event/eventOverlay/eventOverlayDrag'),
            meta: {title: '覆盖物拖拽相关事件', icon: 'component'}
          },
          {
            path: 'infowindow-event',
            name: '信息窗体打开关闭事件',
            component: () => import('@/views/event/eventOverlay/infowindowEvent'),
            meta: {title: '信息窗体打开关闭事件', icon: 'component'}
          }
        ]
      },
      {
        path: 'event-other',
        component: () => import('@/views/event/eventOther/index'), // Parent router-view
        name: '其他事件',
        meta: {title: '其他事件', icon: 'example'},
        children: [
          {
            path: 'dom-event',
            name: 'DOM事件',
            component: () => import('@/views/event/eventOther/domEvent'),
            meta: {title: 'DOM事件', icon: 'component'}
          },
          {
            path: 'custom-event',
            name: '自定义事件',
            component: () => import('@/views/event/eventOther/customEvent'),
            meta: {title: '自定义事件', icon: 'component'}
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
    meta: {title: '图层', icon: 'nested'},
    children: [
      {
        path: 'layer-common',
        component: () => import('@/views/layers/layerCommon/index'), // Parent router-view
        name: '图层通用接口',
        meta: {title: '图层通用接口', icon: 'example'},
        children: [
          {
            path: 'layergroup',
            name: '批量修改图层',
            component: () => import('@/views/layers/layerCommon/layergroup'),
            meta: {title: '批量修改图层', icon: 'component'}
          },
          {
            path: 'layer-add-rm',
            name: '图层添加与移除',
            component: () => import('@/views/layers/layerCommon/layerAddRm'),
            meta: {title: '图层添加与移除', icon: 'component'}
          },
          {
            path: 'layer-zindex',
            name: '层级设定',
            component: () => import('@/views/layers/layerCommon/layerZindex'),
            meta: {title: '层级设定', icon: 'component'}
          },
          {
            path: 'layer-opacity',
            name: '图层透明度',
            component: () => import('@/views/layers/layerCommon/layerOpacity'),
            meta: {title: '图层透明度', icon: 'component'}
          }
        ]
      },
      {
        path: 'layers',
        component: () => import('@/views/layers/layers/index'), // Parent router-view
        name: '高德官方图层',
        meta: {title: '高德官方图层', icon: 'example'},
        children: [
          {
            path: 'layergroup',
            name: '默认标准图层',
            component: () => import('@/views/layers/layers/default'),
            meta: {title: '默认标准图层', icon: 'component'}
          },
          {
            path: 'trafffic',
            name: '实时路况图层',
            component: () => import('@/views/layers/layers/trafffic'),
            meta: {title: '实时路况图层', icon: 'component'}
          },
          {
            path: 'satellite',
            name: '卫星图',
            component: () => import('@/views/layers/layers/satellite'),
            meta: {title: '卫星图', icon: 'component'}
          },
          {
            path: 'roadnet',
            name: '卫星和路网',
            component: () => import('@/views/layers/layers/roadnet'),
            meta: {title: '卫星和路网', icon: 'component'}
          },
          {
            path: 'buildings',
            name: '楼块图层',
            component: () => import('@/views/layers/layers/buildings'),
            meta: {title: '楼块图层', icon: 'component'}
          },
        ]
      },
      {
        path: 'district',
        component: () => import('@/views/layers/district/index'), // Parent router-view
        name: '简易行政区图',
        meta: {title: '简易行政区图', icon: 'example'},
        children: [
          {
            path: 'district-labels',
            name: '简易行政区图+标注',
            component: () => import('@/views/layers/district/districtLabels'),
            meta: {title: '简易行政区图+标注', icon: 'component'}
          },
          {
            path: 'district-world',
            name: '简易行政区图-世界',
            component: () => import('@/views/layers/district/districtWorld'),
            meta: {title: '简易行政区图-世界', icon: 'component'}
          },
          {
            path: 'district-chn',
            name: '简易行政区图-中国',
            component: () => import('@/views/layers/district/districtChn'),
            meta: {title: '简易行政区图-中国', icon: 'component'}
          },
          {
            path: 'district-country',
            name: '简易行政区图-外国',
            component: () => import('@/views/layers/district/districtCountry'),
            meta: {title: '简易行政区图-外国', icon: 'component'}
          },
          {
            path: 'district-pro',
            name: '简易行政区图-省区',
            component: () => import('@/views/layers/district/districtPro'),
            meta: {title: '简易行政区图-省区', icon: 'component'}
          },
          {
            path: 'layer-switch',
            name: '图层切换',
            component: () => import('@/views/layers/district/layerSwitch'),
            meta: {title: '图层切换', icon: 'component'}
          },
          {
            path: 'districtPick',
            name: '行政区拾取+修改样式',
            component: () => import('@/views/layers/district/districtPick'),
            meta: {title: '行政区拾取+修改样式', icon: 'component'}
          }
        ]
      },
      {
        path: 'thirdlayer',
        component: () => import('@/views/layers/thirdlayer/index'), // Parent router-view
        name: '三方标准图层',
        meta: {title: '三方标准图层', icon: 'example'},
        children: [
          {
            path: 'terrain-mask',
            name: '卫星图+掩模',
            component: () => import('@/views/layers/thirdlayer/terrainMask'),
            meta: {title: '卫星图+掩模', icon: 'component'}
          },
          {
            path: 'wmts',
            name: 'WMTS',
            component: () => import('@/views/layers/thirdlayer/wmts'),
            meta: {title: 'WMTS', icon: 'component'}
          },
          {
            path: 'custom-grid-map',
            name: 'XYZ栅格图层',
            component: () => import('@/views/layers/thirdlayer/customGridMap'),
            meta: {title: 'XYZ栅格图层', icon: 'component'}
          },
          {
            path: 'functile',
            name: '函数加载栅格图',
            component: () => import('@/views/layers/thirdlayer/functile'),
            meta: {title: '函数加载栅格图', icon: 'component'}
          },
        ]
      },
      {
        path: 'selflayer',
        component: () => import('@/views/layers/selflayer/index'), // Parent router-view
        name: '自有数据图层',
        meta: {title: '自有数据图层', icon: 'example'},
        children: [
          {
            path: 'imagelayer',
            name: '图片图层',
            component: () => import('@/views/layers/selflayer/imagelayer'),
            meta: {title: '图片图层', icon: 'component'}
          },
          {
            path: 'canvaslayer',
            name: 'Canvas图层',
            component: () => import('@/views/layers/selflayer/canvaslayer'),
            meta: {title: 'Canvas图层', icon: 'component'}
          },
          {
            path: 'heatmap',
            name: '热力图',
            component: () => import('@/views/layers/selflayer/heatmap'),
            meta: {title: '热力图', icon: 'component'}
          },
          {
            path: 'heatmap-3d',
            name: '3D 热力图',
            component: () => import('@/views/layers/selflayer/heatmap3d'),
            meta: {title: '3D 热力图', icon: 'component'}
          },
          {
            path: 'cus-svg',
            name: '自定义图层-SVG',
            component: () => import('@/views/layers/selflayer/cusSvg'),
            meta: {title: '自定义图层-SVG', icon: 'component'}
          },
          {
            path: 'glcustom-layer',
            name: '自定义图层-GLCustomLayer 结合 THREE',
            component: () => import('@/views/layers/selflayer/glcustomLayer'),
            meta: {title: '自定义图层-GLCustomLayer 结合 THREE', icon: 'component'}
          },
          {
            path: 'glcustomlayer-regl',
            name: '自定义图层-GLCustomLayer 结合 ReGL',
            component: () => import('@/views/layers/selflayer/glcustomlayerRegl'),
            meta: {title: '自定义图层-GLCustomLayer 结合 ReGL', icon: 'component'}
          },
          {
            path: '3dtileslayer',
            name: '3D Tiles 图层',
            component: () => import('@/views/layers/selflayer/3dtileslayer'),
            meta: {title: '3D Tiles 图层', icon: 'component'}
          },
          {
            path: 'custom-layer',
            name: '自定义图层-Canvas',
            component: () => import('@/views/layers/selflayer/customLayer'),
            meta: {title: '自定义图层-Canvas', icon: 'component'}
          },
          {
            path: 'flex-canvas',
            name: 'Canvas作为切片',
            component: () => import('@/views/layers/selflayer/flexCanvas'),
            meta: {title: 'Canvas作为切片', icon: 'component'}
          },
          {
            path: 'flex-img',
            name: 'img作为切片',
            component: () => import('@/views/layers/selflayer/flexImg'),
            meta: {title: 'img作为切片', icon: 'component'}
          }
        ]
      },
      {
        path: 'indoormap',
        component: () => import('@/views/layers/indoormap/index'), // Parent router-view
        name: '室内地图',
        meta: {title: '室内地图', icon: 'example'},
        children: [
          {
            path: 'add-indoormap',
            name: '叠加室内地图',
            component: () => import('@/views/layers/indoormap/addIndoormap'),
            meta: {title: '叠加室内地图', icon: 'component'}
          },
          {
            path: 'indoormap',
            name: '默认室内图层',
            component: () => import('@/views/layers/indoormap/indoormap'),
            meta: {title: '默认室内图层', icon: 'component'}
          },
        ]
      }
    ]
  },
  {
    path: '/coverings',
    component: Layout,
    redirect: '/coverings/common',
    name: '覆盖物',
    meta: {title: '覆盖物', icon: 'nested'},
    children: [
      {
        path: 'common',
        component: () => import('@/views/coverings/common/index'), // Parent router-view
        name: '通用',
        meta: {title: '通用', icon: 'example'},
        children: [
          {
            path: 'setfitview',
            name: '根据覆盖物调整地图范围',
            component: () => import('@/views/coverings/common/setfitview'),
            meta: {title: '根据覆盖物调整地图范围', icon: 'component'}
          },
          {
            path: 'add-several-overlay',
            name: '添加一个或多个覆盖物',
            component: () => import('@/views/coverings/common/addSeveralOverlay'),
            meta: {title: '添加一个或多个覆盖物', icon: 'component'}
          },
          {
            path: 'remove-overlay',
            name: '移除一个或多个覆盖物',
            component: () => import('@/views/coverings/common/removeOverlay'),
            meta: {title: '移除一个或多个覆盖物', icon: 'component'}
          },
          {
            path: 'overlay-clear',
            name: '清除所有覆盖物',
            component: () => import('@/views/coverings/common/overlayClear'),
            meta: {title: '清除所有覆盖物', icon: 'component'}
          },
          {
            path: 'get-all-overlays',
            name: '获取某类覆盖物',
            component: () => import('@/views/coverings/common/getAllOverlays'),
            meta: {title: '获取某类覆盖物', icon: 'component'}
          },
          {
            path: 'ext-data',
            name: '获取某个覆盖物',
            component: () => import('@/views/coverings/common/extData'),
            meta: {title: '获取某个覆盖物', icon: 'component'}
          },
          {
            path: 'cross-date-line-overlays',
            name: '跨日期线绘制',
            component: () => import('@/views/coverings/common/crossDateLineOverlays'),
            meta: {title: '跨日期线绘制', icon: 'component'}
          }
        ]
      },
      {
        path: 'marker',
        component: () => import('@/views/coverings/marker/index'), // Parent router-view
        name: '点标记',
        meta: {title: '点标记', icon: 'example'},
        children: [
          {
            path: 'marker-content',
            name: '点标记',
            component: () => import('@/views/coverings/marker/markerContent/index'),
            meta: {title: '点标记', icon: 'component'}
          },
          {
            path: 'marker-anchor',
            name: '点标记锚点',
            component: () => import('@/views/coverings/marker/markerAnchor/index'),
            meta: {title: '点标记锚点', icon: 'component'}
          },
          {
            path: 'text',
            name: '文本标记',
            component: () => import('@/views/coverings/marker/text/index'),
            meta: {title: '文本标记', icon: 'component'}
          },
          {
            path: 'custom-icon',
            name: '自定义图标',
            component: () => import('@/views/coverings/marker/customIcon/index'),
            meta: {title: '自定义图标', icon: 'component'}
          },
          {
            path: 'circlemarker',
            name: '圆点标记',
            component: () => import('@/views/coverings/marker/circlemarker/index'),
            meta: {title: '圆点标记', icon: 'component'}
          },
          {
            path: 'custom-icon-content',
            name: '自定义点标记内容',
            component: () => import('@/views/coverings/marker/customIconContent/index'),
            meta: {title: '自定义点标记内容', icon: 'component'}
          },
          {
            path: 'set-marker-text-label',
            name: '设置点标注的文本标签',
            component: () => import('@/views/coverings/marker/setMarkerTextLabel/index'),
            meta: {title: '设置点标注的文本标签', icon: 'component'}
          },
          {
            path: 'adaptive-show-multiple-markers',
            name: '自适应显示多个点标记',
            component: () => import('@/views/coverings/marker/adaptiveShowMultipleMarkers/index'),
            meta: {title: '自适应显示多个点标记', icon: 'component'}
          },
          {
            path: 'delete-multiple-markers',
            name: '删除多个点标记',
            component: () => import('@/views/coverings/marker/deleteMultipleMarkers/index'),
            meta: {title: '删除多个点标记', icon: 'component'}
          },
          {
            path: 'delet-specified-marker-from-multiple-markers',
            name: '从多个点中删除指定点',
            component: () => import('@/views/coverings/marker/deletSpecifiedMarkerFromMultipleMarkers/index'),
            meta: {title: '从多个点中删除指定点', icon: 'component'}
          },
          {
            path: 'set-marker-draggable',
            name: '设置点的拖拽效果',
            component: () => import('@/views/coverings/marker/setMarkerDraggable/index'),
            meta: {title: '设置点的拖拽效果', icon: 'component'}
          },
          {
            path: 'replaying-historical-running-data',
            name: '轨迹回放',
            component: () => import('@/views/coverings/marker/replayingHistoricalRunningData/index'),
            meta: {title: '轨迹回放', icon: 'component'}
          },
          {
            path: 'elastic-marker',
            name: '灵活的点标记',
            component: () => import('@/views/coverings/marker/elasticMarker/index'),
            meta: {title: '灵活的点标记', icon: 'component'}
          }
        ]
      },
      {
        path: 'mass-markers',
        component: () => import('@/views/coverings/massMarkers/index'), // Parent router-view
        name: '海量点标记',
        meta: {title: '海量点标记', icon: 'example'},
        children: [
          {
            path: 'labelmarker',
            name: '标注和标注图层',
            component: () => import('@/views/coverings/massMarkers/labelmarker/index'),
            meta: {title: '标注和标注图层', icon: 'component'}
          },
          {
            path: 'labelmarker-text',
            name: '标注和标注图层-文字标注',
            component: () => import('@/views/coverings/massMarkers/labelmarkerText/index'),
            meta: {title: '标注和标注图层-文字标注', icon: 'component'}
          },
          {
            path: 'labelmarker-mass',
            name: '标注和标注图层-海量点',
            component: () => import('@/views/coverings/massMarkers/labelmarkerMass/index'),
            meta: {title: '标注和标注图层-海量点', icon: 'component'}
          },
          {
            path: 'massmarks',
            name: '海量点 MassMarks',
            component: () => import('@/views/coverings/massMarkers/massmarks/index'),
            meta: {title: '海量点 MassMarks', icon: 'component'}
          },
          {
            path: 'markerclusterer',
            name: '点聚合',
            component: () => import('@/views/coverings/massMarkers/markerclusterer/index'),
            meta: {title: '点聚合', icon: 'component'}
          },
          {
            path: 'markerclusterer-weight',
            name: '点聚合（包含权重信息）',
            component: () => import('@/views/coverings/massMarkers/markerclustererWeight/index'),
            meta: {title: '点聚合（包含权重信息）', icon: 'component'}
          },
          {
            path: 'marker-indexcluster2',
            name: '按索引聚合',
            component: () => import('@/views/coverings/massMarkers/markerIndexcluster2/index'),
            meta: {title: '按索引聚合', icon: 'component'}
          }
        ]
      },
      {
        path: 'overlaygroup',
        component: () => import('@/views/coverings/overlaygroup/index'), // Parent router-view
        name: '覆盖物群组',
        meta: {title: '覆盖物群组', icon: 'example'},
        children: [
          {
            path: 'overlaygroup-add-remove',
            name: '添加/移除',
            component: () => import('@/views/coverings/overlaygroup/overlaygroupAddRemove/index'),
            meta: {title: '添加/移除', icon: 'component'}
          },
          {
            path: 'change-ovelaygroup',
            name: '批量修改属性',
            component: () => import('@/views/coverings/overlaygroup/changeOvelaygroup/index'),
            meta: {title: '批量修改属性', icon: 'component'}
          }
        ]
      },
      {
        path: 'mapbar',
        component: () => import('@/views/coverings/mapbar/index'), // Parent router-view
        name: '地图控件',
        meta: {title: '地图控件', icon: 'example'},
        children: [
          {
            path: 'mapcontrol-control-add-remove',
            name: '地图控件的添加和移除',
            component: () => import('@/views/coverings/mapbar/mapcontrolControlAddRemove/index'),
            meta: {title: '地图控件的添加和移除', icon: 'component'}
          },
          {
            path: 'toolbar-litestyle',
            name: '简易缩放按钮',
            component: () => import('@/views/coverings/mapbar/toolbarLitestyle/index'),
            meta: {title: '简易缩放按钮', icon: 'component'}
          },
          {
            path: 'controlbar',
            name: '3D 控制罗盘',
            component: () => import('@/views/coverings/mapbar/controlbar/index'),
            meta: {title: '3D 控制罗盘', icon: 'component'}
          }
        ]
      },
      {
        path: 'infowindow',
        component: () => import('@/views/coverings/infowindow/index'), // Parent router-view
        name: '信息窗体',
        meta: {title: '信息窗体', icon: 'example'},
        children: [
          {
            path: 'default-style-infowindow',
            name: '默认样式信息窗体',
            component: () => import('@/views/coverings/infowindow/defaultStyleInfowindow/index'),
            meta: {title: '默认样式信息窗体', icon: 'component'}
          },
          {
            path: 'infowindow-anchor',
            name: '信息窗体锚点',
            component: () => import('@/views/coverings/infowindow/infowindowAnchor/index'),
            meta: {title: '信息窗体锚点', icon: 'component'}
          },
          {
            path: 'custom-style-infowindow',
            name: '自定义样式信息窗体',
            component: () => import('@/views/coverings/infowindow/customStyleInfowindow/index'),
            meta: {title: '自定义样式信息窗体', icon: 'component'}
          },
          {
            path: 'infowindow-event',
            name: '信息窗体内的事件交互',
            component: () => import('@/views/coverings/infowindow/infowindowEvent/index'),
            meta: {title: '信息窗体内的事件交互', icon: 'component'}
          },
          {
            path: 'add-infowindows-to-multiple-markers',
            name: '给多个点添加信息窗体',
            component: () => import('@/views/coverings/infowindow/addInfowindowsToMultipleMarkers/index'),
            meta: {title: '给多个点添加信息窗体', icon: 'component'}
          }
        ]
      },
      {
        path: 'contextmenu',
        component: () => import('@/views/coverings/contextmenu/index'), // Parent router-view
        name: '右键菜单',
        meta: {title: '右键菜单', icon: 'example'},
        children: [
          {
            path: 'default-contextmenu',
            name: '默认右键菜单',
            component: () => import('@/views/coverings/contextmenu/defaultContextmenu/index'),
            meta: {title: '默认右键菜单', icon: 'component'}
          },
          {
            path: 'custom-contextmenu',
            name: '自定义右键菜单',
            component: () => import('@/views/coverings/contextmenu/customContextmenu/index'),
            meta: {title: '自定义右键菜单', icon: 'component'}
          },
          {
            path: 'add-contextmenu-to-overlayer',
            name: '覆盖物添加右键菜单',
            component: () => import('@/views/coverings/contextmenu/addContextmenuToOverlayer/index'),
            meta: {title: '覆盖物添加右键菜单', icon: 'component'}
          }
        ]
      },
      {
        path: 'overlayers',
        component: () => import('@/views/coverings/overlayers/index'), // Parent router-view
        name: '矢量图形',
        meta: {title: '矢量图形', icon: 'example'},
        children: [
          {
            path: 'polyline-draw',
            name: '折线的绘制',
            component: () => import('@/views/coverings/overlayers/polylineDraw/index'),
            meta: {title: '折线的绘制', icon: 'component'}
          },
          {
            path: 'beziercurve-draw-and-edit',
            name: '弧线的绘制和编辑',
            component: () => import('@/views/coverings/overlayers/beziercurveDrawAndEdit/index'),
            meta: {title: '弧线的绘制和编辑', icon: 'component'}
          },
          {
            path: 'polygon-draw',
            name: '多边形的绘制',
            component: () => import('@/views/coverings/overlayers/polygonDraw/index'),
            meta: {title: '多边形的绘制', icon: 'component'}
          },
          {
            path: 'rectangle-draw-and-edit',
            name: '矩形的绘制和编辑',
            component: () => import('@/views/coverings/overlayers/rectangleDrawAndEdit/index'),
            meta: {title: '矩形的绘制和编辑', icon: 'component'}
          },
          {
            path: 'circle-draw-and-edit',
            name: '圆的绘制',
            component: () => import('@/views/coverings/overlayers/circleDrawAndEdit/index'),
            meta: {title: '圆的绘制', icon: 'component'}
          },
          {
            path: 'ellipse-draw-and-edit',
            name: '椭圆的绘制和编辑',
            component: () => import('@/views/coverings/overlayers/ellipseDrawAndEdit/index'),
            meta: {title: '椭圆的绘制和编辑', icon: 'component'}
          },
          {
            path: 'overlay-draw',
            name: '绘制矢量图形',
            component: () => import('@/views/coverings/overlayers/overlayDraw/index'),
            meta: {title: '绘制矢量图形', icon: 'component'}
          },
          {
            path: 'cross-date-line',
            name: '跨日期线绘制',
            component: () => import('@/views/coverings/overlayers/crossDateLine/index'),
            meta: {title: '跨日期线绘制', icon: 'component'}
          },
          {
            path: 'draw-ground-line',
            name: '绘制大地线',
            component: () => import('@/views/coverings/overlayers/drawGroundLine/index'),
            meta: {title: '绘制大地线', icon: 'component'}
          },
          {
            path: 'cover',
            name: '遮罩',
            component: () => import('@/views/coverings/overlayers/cover/index'),
            meta: {title: '遮罩', icon: 'component'}
          },
          {
            path: 'geojson',
            name: 'GeoJSON',
            component: () => import('@/views/coverings/overlayers/geojson/index'),
            meta: {title: 'GeoJSON', icon: 'component'}
          },
          {
            path: 'overlaygroup',
            name: 'OverlayGroup批处理矢量图形',
            component: () => import('@/views/coverings/overlayers/overlaygroup/index'),
            meta: {title: 'OverlayGroup批处理矢量图形', icon: 'component'}
          },
          {
            path: 'linedir',
            name: '自定义折线方向箭头',
            component: () => import('@/views/coverings/overlayers/linedir/index'),
            meta: {title: '自定义折线方向箭头', icon: 'component'}
          }
        ]
      },
      {
        path: 'overlay-editor',
        component: () => import('@/views/coverings/overlayEditor/index'), // Parent router-view
        name: '矢量覆盖物编辑',
        meta: {title: '矢量覆盖物编辑', icon: 'example'},
        children: [
          {
            path: 'polyline-editor',
            name: '折线编辑器',
            component: () => import('@/views/coverings/overlayEditor/polylineEditor/index'),
            meta: {title: '折线编辑器', icon: 'component'}
          },
          {
            path: 'polygon-editor',
            name: '多边形编辑器',
            component: () => import('@/views/coverings/overlayEditor/polygonEditor/index'),
            meta: {title: '多边形编辑器', icon: 'component'}
          },
          {
            path: 'polygon-editor-avoidpolygon',
            name: '多边形编辑器吸附功能',
            component: () => import('@/views/coverings/overlayEditor/polygonEditorAvoidpolygon/index'),
            meta: {title: '多边形编辑器吸附功能', icon: 'component'}
          }
        ]
      }
    ]
  },
  {
    path: '/search-services',
    component: Layout,
    redirect: '/search-services/searchServices',
    name: '搜索服务',
    meta: {title: '搜索服务', icon: 'nested'},
    children: [
      {
        path: 'input',
        component: () => import('@/views/searchServices/input/index'), // Parent router-view
        name: '输入提示',
        meta: {title: '输入提示', icon: 'example'},
        children: [
          {
            path: 'get-input-data',
            name: '获取输入提示数据',
            component: () => import('@/views/searchServices/input/getInputData'),
            meta: {title: '获取输入提示数据', icon: 'component'}
          },
          {
            path: 'input-prompt',
            name: '输入提示',
            component: () => import('@/views/searchServices/input/inputPrompt'),
            meta: {title: '输入提示', icon: 'component'}
          }
        ]
      },
      {
        path: 'poi-search',
        component: () => import('@/views/searchServices/poiSearch/index'), // Parent router-view
        name: 'POI搜索',
        meta: {title: 'POI搜索', icon: 'example'},
        children: [
          {
            path: 'get-search-data',
            name: '获取输入提示数据',
            component: () => import('@/views/searchServices/poiSearch/getSearchData'),
            meta: {title: '获取输入提示数据', icon: 'component'}
          },
          {
            path: 'keywords-search',
            name: '关键字搜索',
            component: () => import('@/views/searchServices/poiSearch/keywordsSearch'),
            meta: {title: '关键字搜索', icon: 'component'}
          },
          {
            path: 'multi-keywords-search',
            name: '多关键字检索',
            component: () => import('@/views/searchServices/poiSearch/multiKeywordsSearch'),
            meta: {title: '多关键字检索', icon: 'component'}
          },
          {
            path: 'around-search',
            name: '周边搜索',
            component: () => import('@/views/searchServices/poiSearch/aroundSearch'),
            meta: {title: '周边搜索', icon: 'component'}
          },
          {
            path: 'polygon-search',
            name: '多边形搜索',
            component: () => import('@/views/searchServices/poiSearch/polygonSearch'),
            meta: {title: '多边形搜索', icon: 'component'}
          },
          {
            path: 'details-search',
            name: '详情查询',
            component: () => import('@/views/searchServices/poiSearch/detailsSearch'),
            meta: {title: '详情查询', icon: 'component'}
          },
          {
            path: 'search-after-enter-prompt',
            name: '输入提示后查询',
            component: () => import('@/views/searchServices/poiSearch/searchAfterEnterPrompt'),
            meta: {title: '输入提示后查询', icon: 'component'}
          },
          {
            path: 'keywords-search-and-self-presentation',
            name: '根据搜索结果添加 marker',
            component: () => import('@/views/searchServices/poiSearch/keywordsSearchAndSelfPresentation'),
            meta: {title: '根据搜索结果添加 marker', icon: 'component'}
          }
        ]
      },
    ]
  },
  {
    path: '/pathPlanning-services',
    component: Layout,
    redirect: '/pathPlanning-services/driving-route',
    name: '路线规划服务',
    meta: {title: '路线规划服务', icon: 'nested'},
    children: [
      {
        path: 'driving-route',
        component: () => import('@/views/pathPlanningServices/drivingRoute/index'), // Parent router-view
        name: '驾车路线规划',
        meta: {title: '驾车路线规划', icon: 'example'},
        children: [
          {
            path: 'plan-route-according-to-lnglat',
            name: '位置经纬度 + 驾车规划路线',
            component: () => import('@/views/pathPlanningServices/drivingRoute/planRouteAccordingToLnglat'),
            meta: {title: '位置经纬度 + 驾车规划路线', icon: 'component'}
          },
          {
            path: 'plan-route-according-to-name',
            name: '地点关键字 + 驾车路线规划',
            component: () => import('@/views/pathPlanningServices/drivingRoute/planRouteAccordingToName'),
            meta: {title: '地点关键字 + 驾车路线规划', icon: 'component'}
          },
          {
            path: 'driving-data',
            name: '位置经纬度 + 获取驾车规划数据',
            component: () => import('@/views/pathPlanningServices/drivingRoute/drivingData'),
            meta: {title: '位置经纬度 + 获取驾车规划数据', icon: 'component'}
          },
          {
            path: 'driving-custom',
            name: '规划结果 + 驾车路线绘制',
            component: () => import('@/views/pathPlanningServices/drivingRoute/drivingCustom'),
            meta: {title: '规划结果 + 驾车路线绘制', icon: 'component'}
          },
          {
            path: 'route-can-be-dragged',
            name: '可拖拽驾车路线规划',
            component: () => import('@/views/pathPlanningServices/drivingRoute/routeCanBeDragged'),
            meta: {title: '可拖拽驾车路线规划', icon: 'component'}
          },
          {
            path: 'waypoint',
            name: '途经点',
            component: () => import('@/views/pathPlanningServices/drivingRoute/waypoint'),
            meta: {title: '途经点', icon: 'component'}
          }
        ]
      },
      {
        path: 'truck-route',
        component: () => import('@/views/pathPlanningServices/truckRoute/index'), // Parent router-view
        //redirect: '/pathPlanning-services/truck-route',
        name: '货车路线规划',
        meta: {title: '货车路线规划', icon: 'example'},
      },
      {
        path: 'walking-route',
        component: () => import('@/views/pathPlanningServices/walkingRoute/index'), // Parent router-view
        name: '步行路线规划',
        meta: {title: '步行路线规划', icon: 'example'},
        children: [
          {
            path: 'plan-route-according-to-lnglat',
            name: '位置经纬度 + 步行路线规划',
            component: () => import('@/views/pathPlanningServices/walkingRoute/planRouteAccordingToLnglat'),
            meta: {title: '位置经纬度 + 步行路线规划', icon: 'component'}
          },
          {
            path: 'plan-route-according-to-name',
            name: '地点关键字 + 步行路线规划',
            component: () => import('@/views/pathPlanningServices/walkingRoute/planRouteAccordingToName'),
            meta: {title: '地点关键字 + 步行路线规划', icon: 'component'}
          },
          {
            path: 'walk-custom',
            name: '规划结果 + 步行路线绘制',
            component: () => import('@/views/pathPlanningServices/walkingRoute/walkCustom'),
            meta: {title: '规划结果 + 步行路线绘制', icon: 'component'}
          },
          {
            path: 'walk-data',
            name: '位置经纬度 + 获取步行规划数据',
            component: () => import('@/views/pathPlanningServices/walkingRoute/walkData'),
            meta: {title: '位置经纬度 + 获取步行规划数据', icon: 'component'}
          }
        ]
      },
      {
        path: 'riding-route',
        component: () => import('@/views/pathPlanningServices/ridingRoute/index'), // Parent router-view
        name: '骑行路径规划',
        meta: {title: '骑行路径规划', icon: 'example'},
        children: [
          {
            path: 'plan-route-according-to-lnglat',
            name: '位置经纬度 + 骑行路线规划',
            component: () => import('@/views/pathPlanningServices/ridingRoute/planRouteAccordingToLnglat'),
            meta: {title: '位置经纬度 + 骑行路线规划', icon: 'component'}
          },
          {
            path: 'plan-route-according-to-name',
            name: '地点关键字 + 骑行路线规划',
            component: () => import('@/views/pathPlanningServices/ridingRoute/planRouteAccordingToName'),
            meta: {title: '地点关键字 + 骑行路线规划', icon: 'component'}
          },
          {
            path: 'riding-data',
            name: '位置经纬度 + 获取骑行规划数据',
            component: () => import('@/views/pathPlanningServices/ridingRoute/ridingData'),
            meta: {title: '位置经纬度 + 获取骑行规划数据', icon: 'component'}
          },
          {
            path: 'riding-custom',
            name: '规划结果 + 骑行路线绘制',
            component: () => import('@/views/pathPlanningServices/ridingRoute/ridingCustom'),
            meta: {title: '规划结果 + 骑行路线绘制', icon: 'component'}
          }
        ]
      },
      {
        path: 'bus-search',
        component: () => import('@/views/pathPlanningServices/busSearch/index'), // Parent router-view
        name: '公交路线规划',
        meta: {title: '公交路线规划', icon: 'example'},
        children: [
          {
            path: 'plan-route-according-to-lnglat',
            name: '位置经纬度 + 公交路线规划',
            component: () => import('@/views/pathPlanningServices/busSearch/planRouteAccordingToLnglat'),
            meta: {title: '位置经纬度 + 公交路线规划', icon: 'component'}
          },
          {
            path: 'plan-route-according-to-name',
            name: '地点关键字 + 公交路线规划',
            component: () => import('@/views/pathPlanningServices/busSearch/planRouteAccordingToName'),
            meta: {title: '地点关键字 + 公交路线规划', icon: 'component'}
          },
          {
            path: 'bus-data',
            name: '位置经纬度 + 获取公交规划数据',
            component: () => import('@/views/pathPlanningServices/busSearch/busData'),
            meta: {title: '位置经纬度 + 获取公交规划数据', icon: 'component'}
          },
          {
            path: 'bus-custom',
            name: '规划结果 + 公交路线绘制',
            component: () => import('@/views/pathPlanningServices/busSearch/busCustom'),
            meta: {title: '规划结果 + 公交路线绘制', icon: 'component'}
          }
        ]
      }
    ]
  },
  {
    path: '/other-lbs-services',
    component: Layout,
    redirect: '/other-lbs-services/geocoder',
    name: '其他LBS服务',
    meta: {title: '其他LBS服务', icon: 'nested'},
    children: [
      {
        path: 'geocoder',
        component: () => import('@/views/otherLbsServices/geocoder/index'), // Parent router-view
        name: '地理编码',
        meta: {title: '地理编码', icon: 'example'},
        children: [
          {
            path: 'geocoding',
            name: '地理编码（地址 -> 坐标）',
            component: () => import('@/views/otherLbsServices/geocoder/geocoding'),
            meta: {title: '地理编码（地址 -> 坐标）', icon: 'component'}
          },
          {
            path: 'multi-geo',
            name: '批量地理编码',
            component: () => import('@/views/otherLbsServices/geocoder/multiGeo'),
            meta: {title: '批量地理编码', icon: 'component'}
          },
          {
            path: 'regeocoding',
            name: '逆地理编码（坐标 -> 地址）',
            component: () => import('@/views/otherLbsServices/geocoder/regeocoding'),
            meta: {title: '逆地理编码（坐标 -> 地址）', icon: 'component'}
          },
          {
            path: 'multi-regeo',
            name: '批量逆地理编码',
            component: () => import('@/views/otherLbsServices/geocoder/multiRegeo'),
            meta: {title: '批量逆地理编码', icon: 'component'}
          }
        ]
      },
      {
        path: 'district-search',
        component: () => import('@/views/otherLbsServices/districtSearch/index'), // Parent router-view
        name: '行政区划查询',
        meta: {title: '行政区划查询', icon: 'example'},
        children: [
          {
            path: 'draw-district-boundaries',
            name: '行政区边界查询',
            component: () => import('@/views/otherLbsServices/districtSearch/drawDistrictBoundaries'),
            meta: {title: '行政区边界查询', icon: 'component'}
          },
          {
            path: 'city-drop-down-list',
            name: '下属行政区查询',
            component: () => import('@/views/otherLbsServices/districtSearch/cityDropDownList'),
            meta: {title: '下属行政区查询', icon: 'component'}
          }
        ]
      },
      {
        path: 'grasp',
        component: () => import('@/views/otherLbsServices/grasp/index'), // Parent router-view
        name: '轨迹纠偏',
        meta: {title: '轨迹纠偏', icon: 'example'},
        children: [
          {
            path: 'grasp-driving',
            name: '驾车轨迹纠偏',
            component: () => import('@/views/otherLbsServices/grasp/graspDriving'),
            meta: {title: '驾车轨迹纠偏', icon: 'component'}
          }
        ]
      },
      {
        path: 'bus-info',
        component: () => import('@/views/otherLbsServices/busInfo/index'), // Parent router-view
        name: '公交信息查询',
        meta: {title: '公交信息查询', icon: 'example'},
        children: [
          {
            path: 'search-bus-station',
            name: '公交站点查询',
            component: () => import('@/views/otherLbsServices/busInfo/searchBusStation'),
            meta: {title: '公交站点查询', icon: 'component'}
          },
          {
            path: 'search-bus-route',
            name: '公交站点查询',
            component: () => import('@/views/otherLbsServices/busInfo/searchBusRoute'),
            meta: {title: '公交站点查询', icon: 'component'}
          },
          {
            path: 'arrival-range',
            name: '公交到达圈',
            component: () => import('@/views/otherLbsServices/busInfo/arrivalRange'),
            meta: {title: '公交到达圈', icon: 'component'}
          }
        ]
      },
      {
        path: 'location',
        component: () => import('@/views/otherLbsServices/location/index'), // Parent router-view
        name: '定位',
        meta: {title: '定位', icon: 'example'},
        children: [
          {
            path: 'get-city-name-by-ip-location',
            name: 'IP城市定位',
            component: () => import('@/views/otherLbsServices/location/getCityNameByIpLocation'),
            meta: {title: 'IP城市定位', icon: 'component'}
          },
          {
            path: 'map-is-initially-loaded-into-the-current-city',
            name: '地图初始IP城市定位',
            component: () => import('@/views/otherLbsServices/location/mapIsInitiallyLoadedIntoTheCurrentCity'),
            meta: {title: '地图初始IP城市定位', icon: 'component'}
          },
          {
            path: 'browser-location',
            name: '浏览器精确定位',
            component: () => import('@/views/otherLbsServices/location/browserLocation'),
            meta: {title: '浏览器精确定位', icon: 'component'}
          },
          {
            path: 'custom-location-icon',
            name: '浏览器精确定位-定位点自定义',
            component: () => import('@/views/otherLbsServices/location/customLocationIcon'),
            meta: {title: '浏览器精确定位-定位点自定义', icon: 'component'}
          }
        ]
      },
      {
        path: 'weather-forecast',
        component: () => import('@/views/otherLbsServices/weatherForecast/index'), // Parent router-view
        name: '天气预报',
        meta: {title: '天气预报', icon: 'example'},
        children: [
          {
            path: 'weather-forecast',
            name: 'IP城市定位',
            component: () => import('@/views/otherLbsServices/weatherForecast/weatherForecast'),
            meta: {title: 'IP城市定位', icon: 'component'}
          }
        ]
      }
    ]
  },
  {
    path: '/auxiliary-interface',
    component: Layout,
    redirect: '/auxiliary-interfac/mouse-operate-map',
    name: '辅助接口',
    meta: {title: '辅助接口', icon: 'nested'},
    children: [
      {
        path: 'mouse-operate-map',
        component: () => import('@/views/auxiliaryInterface/mouseOperateMap/index'), // Parent router-view
        name: '工具类',
        meta: {title: '工具类', icon: 'example'},
        children: [
          {
            path: 'mouse-draw-overlayers',
            name: '鼠标工具-绘制覆盖物',
            component: () => import('@/views/auxiliaryInterface/mouseOperateMap/mouseDrawOverlayers'),
            meta: {title: '鼠标工具-绘制覆盖物', icon: 'component'}
          },
          {
            path: 'pull-box-enlarged-map',
            name: '鼠标工具-拉框缩放',
            component: () => import('@/views/auxiliaryInterface/mouseOperateMap/pullBoxEnlargedMap'),
            meta: {title: '鼠标工具-拉框缩放', icon: 'component'}
          },
          {
            path: 'measure-area',
            name: '鼠标工具-距离面积测量',
            component: () => import('@/views/auxiliaryInterface/mouseOperateMap/measureArea'),
            meta: {title: '鼠标工具-距离面积测量', icon: 'component'}
          },
          {
            path: 'measure-distance',
            name: '测距工具',
            component: () => import('@/views/auxiliaryInterface/mouseOperateMap/measureDistance'),
            meta: {title: '测距工具', icon: 'component'}
          }
        ]
      },
      {
        path: 'utils',
        component: () => import('@/views/auxiliaryInterface/utils/index'), // Parent router-view
        name: '辅助库',
        meta: {title: '辅助库', icon: 'example'},
        children: [
          {
            path: 'browser',
            name: '浏览器环境',
            component: () => import('@/views/auxiliaryInterface/utils/browser'),
            meta: {title: '浏览器环境', icon: 'component'}
          },
          {
            path: 'util-color',
            name: '颜色转换',
            component: () => import('@/views/auxiliaryInterface/utils/utilColor'),
            meta: {title: '颜色转换', icon: 'component'}
          }
        ]
      },
      {
        path: 'call-amap',
        component: () => import('@/views/auxiliaryInterface/callAmap/index'), // Parent router-view
        name: '调起高德地图',
        meta: {title: '调起高德地图', icon: 'example'},
        children: [
          {
            path: 'call-amap',
            name: '调起高德地图',
            component: () => import('@/views/auxiliaryInterface/callAmap/callAmap'),
            meta: {title: '调起高德地图', icon: 'component'}
          }
        ]
      }
    ]
  },
  {
    path: '/geometric-calculation',
    component: Layout,
    redirect: '/geometric-calculation/calcutation',
    name: '几何计算',
    meta: {title: '几何计算', icon: 'nested'},
    children: [
      {
        path: 'calcutation',
        component: () => import('@/views/geometricCalculation/calcutation/index'), // Parent router-view
        name: '距离/面积计算',
        meta: {title: '距离/面积计算', icon: 'example'},
        children: [
          {
            path: 'calculate-distance-between-two-markers',
            name: '两点间距离',
            component: () => import('@/views/geometricCalculation/calcutation/calculateDistanceBetweenTwoMarkers'),
            meta: {title: '两点间距离', icon: 'component'}
          },
          {
            path: 'calcute-distance-from-marker-to-line',
            name: '点到线的距离',
            component: () => import('@/views/geometricCalculation/calcutation/calcuteDistanceFromMarkerToLine'),
            meta: {title: '点到线的距离', icon: 'component'}
          },
          {
            path: 'path-length',
            name: '路径长度',
            component: () => import('@/views/geometricCalculation/calcutation/pathLength'),
            meta: {title: '路径长度', icon: 'component'}
          },
          {
            path: 'ring-area',
            name: '区域面积',
            component: () => import('@/views/geometricCalculation/calcutation/ringArea'),
            meta: {title: '区域面积', icon: 'component'}
          }
        ]
      },
      {
        path: 'relationship-judgment',
        component: () => import('@/views/geometricCalculation/relationshipJudgment/index'), // Parent router-view
        name: '关系判断',
        meta: {title: '关系判断', icon: 'example'},
        children: [
          {
            path: 'is-point-on-segment',
            name: '两点间距离',
            component: () => import('@/views/geometricCalculation/relationshipJudgment/isPointOnSegment'),
            meta: {title: '两点间距离', icon: 'component'}
          },
          {
            path: 'point-surface-relation',
            name: '点是否在多边形内',
            component: () => import('@/views/geometricCalculation/relationshipJudgment/pointSurfaceRelation'),
            meta: {title: '点是否在多边形内', icon: 'component'}
          },
          {
            path: 'ringring',
            name: '面与面的几何关系',
            component: () => import('@/views/geometricCalculation/relationshipJudgment/ringring'),
            meta: {title: '面与面的几何关系', icon: 'component'}
          }
        ]
      },
      {
        path: 'calculation-other',
        component: () => import('@/views/geometricCalculation/calculationOther/index'), // Parent router-view
        name: '其他',
        meta: {title: '其他', icon: 'example'},
        children: [
          {
            path: 'is-clockwise',
            name: '路径是否顺时针',
            component: () => import('@/views/geometricCalculation/calculationOther/isClockwise'),
            meta: {title: '路径是否顺时针', icon: 'component'}
          }
        ]
      }
    ]
  },
  {
    path: '用生命研发技术',
    component: Layout,
    children: [
      {
        path: 'https://blog.csdn.net/qq_37242720',
        meta: {title: '用生命研发技术', icon: 'link'}
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
