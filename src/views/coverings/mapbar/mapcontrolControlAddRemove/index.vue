<template>
  <div class="app-container" :style="{ height: windowHeight - 50 + 'px' }">
    <div id="container"></div>
    <div class="input-item">
      <el-checkbox class="control" v-model="scaleStatus" @change="changeScaleStatus">比例尺</el-checkbox>
      <el-checkbox class="control" v-model="toolBarStatus" @change="changeToolBarStatus">工具条</el-checkbox>
      <el-checkbox class="control" v-model="controlBarStatus" @change="changeControlBarStatus">工具条方向盘</el-checkbox>
      <el-checkbox class="control" v-model="overViewStatus" @change="changeOverViewStatus">显示鹰眼</el-checkbox>
    </div>
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        map: null,
        //实时屏幕高度
        windowHeight: document.documentElement.clientHeight,
        scale: null,
        toolBar: null,
        controlBar: null,
        overView: null,
        scaleStatus: true,
        toolBarStatus: true,
        controlBarStatus: true,
        overViewStatus: true
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
        //控件
        this.scale = new AMap.Scale();

        this.toolBar = new AMap.ToolBar({
          position: {
            top: '110px',
            right: '40px'
          }
        });

        this.controlBar = new AMap.ControlBar({
          position: {
            top: '10px',
            right: '10px'
          }
        });

        this.overView = new AMap.HawkEye({
          opened: false
        });

        this.map = new AMap.Map("container", {
          viewMode: '3D',
          zoom: 11,
          pitch: 30
        });

        //给地图添加控件
        this.map.addControl(this.scale);
        this.map.addControl(this.toolBar);
        this.map.addControl(this.controlBar);
        this.map.addControl(this.overView);
      },
      changeScaleStatus() {
        if (this.scaleStatus) {
          this.scale.show()
        } else {
          this.scale.hide()

        }
      },
      changeToolBarStatus() {
        if (this.toolBarStatus) {
          this.toolBar.show()
        } else {
          this.toolBar.hide()
        }
      },
      changeControlBarStatus() {
        if (this.controlBarStatus) {
          this.controlBar.show()
        } else {
          this.controlBar.hide()
        }
      },
      changeOverViewStatus() {
        if (this.overViewStatus) {
          this.overView.show()
        } else {
          this.overView.hide()
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
    margin: 10px 30px 10px;
    padding: 10px 5px;
    left: 30px;
    top: 30px;
  }

  .input-item .control {
    display: block;
    padding: 5px 20px 10px;
  }
</style>
