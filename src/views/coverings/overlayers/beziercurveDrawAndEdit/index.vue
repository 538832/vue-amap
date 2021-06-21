<template>
  <div class="app-container" :style="{ height: windowHeight - 50 + 'px' }">
    <div id="container"></div>
    <div class="input-card">
      <div class="box">
        <el-button size="mini" round @click="open">开始编辑</el-button>
      </div>
      <div class="box">
        <el-button size="mini" round @click="close">结束编辑</el-button>
      </div>
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
        bezierCurveEditor: null
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
        let that = this;
        let map = new AMap.Map("container", {
          center: [116.397637, 39.900001],
          zoom: 14
        });

        let path = [//每个弧线段有两种描述方式
          [116.37, 39.91],//起点
          //第一段弧线
          [116.380298, 39.907771, 116.38, 39.90],//控制点，途经点
          //第二段弧线
          [116.385298, 39.907771, 116.40, 39.90],//控制点，途经点//弧线段有两种描述方式1
          //第三段弧线
          [//弧线段有两种描述方式2
            [116.392872, 39.887391],//控制点
            [116.40772, 39.909252],//控制点
            [116.41, 39.89]//途经点
          ],
          //第四段弧线
          [116.423857, 39.889498, 116.422312, 39.899639, 116.425273, 39.902273]
          //控制点，控制点，途经点，每段最多两个控制点
        ];

        let bezierCurve = new AMap.BezierCurve({
          path: path,
          isOutline: true,
          outlineColor: '#ffeeff',
          borderWeight: 3,
          strokeColor: "#3366FF",
          strokeOpacity: 1,
          strokeWeight: 6,
          // 线样式还支持 'dashed'
          strokeStyle: "solid",
          // strokeStyle是dashed时有效
          strokeDasharray: [10, 10],
          lineJoin: 'round',
          lineCap: 'round',
          zIndex: 50,
        })

        map.add(bezierCurve);
        // 缩放地图到合适的视野级别
        map.setFitView([bezierCurve])

        that.bezierCurveEditor = new AMap.BezierCurveEditor(map, bezierCurve)

        that.bezierCurveEditor.on('addnode', function (event) {
          that.$message({
            message: '触发事件：addnode',
            type: 'warning'
          });
        })

        that.bezierCurveEditor.on('adjust', function (event) {
          that.$message({
            message: '触发事件：adjust',
            type: 'warning'
          });
        })

        that.bezierCurveEditor.on('removenode', function (event) {
          that.$message({
            message: '触发事件：removenode',
            type: 'warning'
          });
        })

        that.bezierCurveEditor.on('end', function (event) {
          that.$message({
            message: '触发事件：end',
            type: 'warning'
          });
          // event.target 即编辑后的曲线对象
        })
      },

      //开始编辑
      open() {
        this.bezierCurveEditor.open()
      },

      //结束编辑
      close() {
        this.bezierCurveEditor.close()
      }
    }
  }
</script>

<style scoped>
  #app-container {
    width: 100%;
    position: relative;
  }

  #container {
    width: 100%;
    height: 100%;
  }

  .input-card {
    position: absolute;
    background: white;
    padding: 10px;
    right: 30px;
    bottom: 30px;
  }
  .input-card .box{
    margin: 10px 0;
  }
</style>
