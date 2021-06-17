<template>
  <div class="app-container" :style="{ height: windowHeight - 50 + 'px' }">
    <div id="container"></div>
  </div>
</template>

<script>
  import {points} from '@/utils/amap/community.js'
  import {district} from '@/utils/amap/district.js'

  export default {
    name: "index",

    data() {
      return {
        //实时屏幕高度
        windowHeight: document.documentElement.clientHeight,
        map: null,
        cluster: null,
      }
    },
    mounted() {
      // 当浏览器被重置大小时执行
      window.onresize = () => {
        return (() => {
          this.windowHeight = document.documentElement.clientHeight;
        })()
      };
      //调用地图初始化方法
      this.initAMap()
    },
    methods: {
      initAMap() {
        this.map = new AMap.Map("container", {
          zoom: 9,
          animateEnable: true,
          mapStyle: "amap://styles/grey",
        });

        let count = points.length;
        let clusterIndexSet = {
          city: {
            minZoom: 2,
            maxZoom: 10,
          },
          district: {
            minZoom: 10,
            maxZoom: 12,
          },
          area: {
            minZoom: 12,
            maxZoom: 15,
          },
          community: {
            minZoom: 15,
            maxZoom: 22,
          },
        };

        let cluster = new AMap.IndexCluster(this.map, points, {
          renderClusterMarker: this.renderClusterMarker,
          clusterIndexSet: clusterIndexSet,
        });
      },

      clusterMarkers() {
        let markerList = [];
        let marker = new AMap.Marker({
          map: this.map,
        })
        markerList.push(marker);
        return markerList;
      },

      getStyle(context) {
        let clusterData = context.clusterData; // 聚合中包含数据
        let index = context.index; // 聚合的条件
        let count = context.count; // 聚合中点的总数
        let marker = context.marker; // 聚合绘制点 Marker 对象
        let color = [
          '8,60,156',
          '66,130,198',
          '107,174,214',
          '78,200,211',
        ];
        let indexs = ['city', 'district', 'area', 'community'];
        let i = indexs.indexOf(index['mainKey']);
        let text = clusterData[0][index['mainKey']];
        let size = Math.round(30 + Math.pow(count / points.length, 1 / 5) * 70);
        if (i <= 2) {
          let extra = '<span class="showCount">' + context.count + '套</span>';
          text = '<span class="showName">' + text + '</span>';
          text += extra;
        } else {
          size = 12 * text.length + 20;
        }
        let style = {
          bgColor: 'rgba(' + color[i] + ',.8)',
          borderColor: 'rgba(' + color[i] + ',1)',
          text: text,
          size: size,
          index: i,
          color: '#ffffff',
          textAlign: 'center',
          boxShadow: '0px 0px 5px rgba(0,0,0,0.8)'
        }
        return style;
      },

      getPosition(context) {
        let key = context.index.mainKey;
        let dataItem = context.clusterData && context.clusterData[0];
        let districtName = dataItem[key];
        if (!district[districtName]) {
          return null;
        }
        let center = district[districtName].center.split(',');
        let centerLnglat = new AMap.LngLat(center[0], center[1]);
        return centerLnglat;
      },

      // 自定义聚合点样式
      renderClusterMarker(context) {
        let that = this;
        let bgColor;
        let clusterData = context.clusterData; // 聚合中包含数据
        let index = context.index; // 聚合的条件
        let count = context.count; // 聚合中点的总数
        let marker = context.marker; // 聚合点标记对象
        let styleObj = this.getStyle(context);
        // 自定义点标记样式
        let div = document.createElement('div');
        div.className = 'amap-cluster';
        div.style.backgroundColor = styleObj.bgColor;
        div.style.width = styleObj.size + 'px';
        if (styleObj.index <= 2) {
          div.style.height = styleObj.size + 'px';
          // 自定义点击事件
          context.marker.on('click', function (e) {
            //console.log(e)
            let curZoom = that.map.getZoom();
            if (curZoom < 20) {
              curZoom += 1;
            }
            that.map.setZoomAndCenter(curZoom, e.lnglat);
          });
        }
        div.style.border = 'solid 1px ' + styleObj.borderColor;
        div.style.borderRadius = styleObj.size + 'px';
        div.innerHTML = styleObj.text;
        div.style.color = styleObj.color;
        div.style.textAlign = styleObj.textAlign;
        div.style.boxShadow = styleObj.boxShadow;
        context.marker.setContent(div)
        // 自定义聚合点标记显示位置
        let position = this.getPosition(context);
        if (position) {
          context.marker.setPosition(position);
        }
        context.marker.setAnchor('center');
      },

      customRender(data) {
        const keys = Object.keys(data.clusterData);
        let markers = [];
        for (let i = 0; i < keys.length; i++) {
          let key = keys[i];
          let cluster = data.clusterData[key];
          let position = cluster.data[0].lnglat;
          let marker = new AMap.LabelMarker({
            position: position,
            text: {
              content: cluster.data.length.toString(),
              style: {
                fillColor: '#ffffff'
              }
            }
          });
          markers.push(marker)
        }
        return {
          type: 'type',
          layer: null,
          markers: markers,
        };
      }
    }
  }
</script>

<style scoped>
  #app-container {
    width: 100%;
    position: relative
  }

  #container {
    width: 100%;
    height: 100%;
  }
</style>
