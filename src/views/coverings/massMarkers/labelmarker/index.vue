<template>
  <div class="app-container" :style="{ height: windowHeight - 50 + 'px' }">
    <div id="container"></div>
    <div class="input-item">
      <h5>和地图标注避让设置</h5>
      <el-button size="mini" round @click="allowCollisionFunc" :disabled="disabled1">标注避让Marker</el-button>
      <el-button size="mini" round @click="notAllowCollisionFunc" :disabled="disabled2">标注不避让Marker</el-button>
    </div>
    <div class="info">
      点击标注避让按钮，地图可以被marker避让了！
    </div>
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        //实时屏幕高度
        windowHeight: document.documentElement.clientHeight,
        map: null,
        allowCollision: false,
        layer: null,
        disabled1: false,
        disabled2: true
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
        // 设置一个图标对象
        let icon = {
          // 图标类型，现阶段只支持 image 类型
          type: 'image',
          // 图片 url
          image: 'https://a.amap.com/jsapi_demos/static/demo-center/marker/express2.png',
          // 图片尺寸
          size: [64, 30],
          // 图片相对 position 的锚点，默认为 bottom-center
          anchor: 'center',
        };
        let textStyle = {
          fontSize: 12,
          fontWeight: 'normal',
          fillColor: '#22886f',
          strokeColor: '#fff',
          strokeWidth: 2,
          fold: true,
          padding: '2, 5',
        };
        let LabelsData = [
          {
            name: '自提点1',
            position: [116.461009, 39.991443],
            zooms: [10, 20],
            opacity: 1,
            zIndex: 10,
            fold: true,
            icon,
            text: {
              // 要展示的文字内容
              content: '中邮速递易',
              // 文字方向，有 icon 时为围绕文字的方向，没有 icon 时，则为相对 position 的位置
              direction: 'right',
              // 在 direction 基础上的偏移量
              offset: [-20, -5],
              // 文字样式
              style: {
                // 字体大小
                fontSize: 12,
                // 字体颜色
                fillColor: '#22886f',
                //
                strokeColor: '#fff',
                strokeWidth: 2,
                fold: true,
                padding: '2, 5',
              }
            }
          },
          {
            name: '自提点2',
            position: [116.466994, 39.984904],
            zooms: [10, 20],
            opacity: 1,
            zIndex: 16,
            icon,
            text: {
              content: '丰巢快递柜-花家地北里',
              direction: 'right',
              offset: [-20, -5],
              style: textStyle
            }
          },
          {
            name: '自提点3',
            position: [116.472914, 39.987093],
            zooms: [10, 20],
            opacity: 1,
            zIndex: 8,
            icon,
            text: {
              content: '丰巢快递柜-中环南路11号院',
              direction: 'right',
              offset: [-20, -5],
              style: textStyle
            }
          },
          {
            name: '自提点4',
            position: [116.471814, 39.995856],
            zooms: [10, 20],
            opacity: 1,
            zIndex: 23,
            icon,
            text: {
              content: '丰巢快递柜-合生麒麟社',
              direction: 'right',
              offset: [-20, -5],
              style: textStyle
            }
          },
          {
            name: '自提点5',
            position: [116.469639, 39.986889],
            zooms: [10, 20],
            opacity: 1,
            zIndex: 6,
            icon,
            text: {
              content: '速递易快递柜-望京大厦',
              direction: 'right',
              offset: [-20, -5],
              style: textStyle
            }
          },
          {
            name: '自提点6',
            position: [116.467361, 39.996361],
            zooms: [10, 20],
            opacity: 1,
            zIndex: 5,
            icon,
            text: {
              content: 'E栈快递柜-夏都家园',
              direction: 'right',
              offset: [-20, -5],
              style: textStyle
            }
          },
          {
            name: '自提点7',
            position: [116.462327, 39.996071],
            zooms: [10, 20],
            opacity: 1,
            zIndex: 4,
            icon,
            text: {
              content: '丰巢自提柜-圣馨大地家园',
              direction: 'right',
              offset: [-20, -5],
              style: textStyle
            }
          },
          {
            name: '自提点8',
            position: [116.462349, 39.996067],
            zooms: [10, 20],
            opacity: 1,
            zIndex: 3,
            icon,
            text: {
              content: '丰巢快递-圣馨大地家园',
              direction: 'right',
              offset: [-20, -5],
              style: textStyle
            }
          },
          {
            name: '自提点9',
            position: [116.456474, 39.991563],
            zooms: [10, 20],
            zIndex: 2,
            opacity: 1,
            icon,
            text: {
              content: 'E栈快递柜-南湖渠西里',
              direction: 'right',
              offset: [-20, -5],
              style: textStyle
            }
          }
        ];

        let map = new AMap.Map('container', {
          zoom: 15.8,
          center: [116.469881, 39.993599],
          showIndoorMap: false,
        });

        let markers = [];
        this.layer = new AMap.LabelsLayer({
          zooms: [3, 20],
          zIndex: 1000,
          // collision: false,
          // 设置 allowCollision：true，可以让标注避让用户的标注
          allowCollision: this.allowCollision,
        });
        this.layer.add(markers);
        // 图层添加到地图
        map.add(this.layer);

        // 初始化 labelMarker
        for (let i = 0; i < LabelsData.length; i++) {
          var curData = LabelsData[i];
          curData.extData = {
            index: i
          };

          let labelMarker = new AMap.LabelMarker(curData);

          markers.push(labelMarker);

        }
        // 将 marker 添加到图层
        this.layer.add(markers);

        map.setFitView(null, false, [100, 150, 10, 10]);
      },

      allowCollisionFunc() {
        this.allowCollision = true;
        this.layer.setAllowCollision(true);
        this.toggleBtn();
      },

      notAllowCollisionFunc() {
        this.allowCollision = false;
        this.layer.setAllowCollision(false);
        this.toggleBtn();
      },

      toggleBtn() {
        if (this.allowCollision) {
         this.disabled1 = true
         this.disabled2 = false
        } else {
          this.disabled1 = false
          this.disabled2 = true
        }
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

  .input-item {
    position: absolute;
    background: white;
    padding: 5px 20px 10px;
    right: 30px;
    bottom: 30px;
  }

  .info {
    position: absolute;
    background: white;
    padding: 5px 20px 10px;
    right: 30px;
    top: 30px;
  }
</style>
