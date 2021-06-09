<template>
  <div class="app-container" :style="{ height: windowHeight - 50 + 'px' }">
    <div id="container">
    </div>
    <div id="btn">
      <el-button type="success" round @click="createMap">创建地图</el-button>
      <el-button type="danger" round @click="destroyMap">销毁地图</el-button>
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
        windowHeight: document.documentElement.clientHeight
      }
    },
    mounted() {
      // 当浏览器被重置大小时执行
      window.onresize = () => {
        return (() => {
          this.windowHeight = document.documentElement.clientHeight - 50;
        })()
      };
      //调用地图初始化方法
      this.initAMap()
    },
    methods: {
      initAMap() {
        let that = this

        function isLoaded() {
          try {
            var map = new AMap.Map('container');
            that.map = map
          } catch (e) {
            setTimeout(() => {
              isLoaded()
            }, 50)
          }
        }

        isLoaded()
      },

      //创建地图
      createMap() {
        // ⚠：请尽量不要进行地图的重新创建和销毁，
        // 如果有图层的隐藏和显示需求，请使用图层的 show/hide 方法。
        this.initAMap();
        this.$message({
          message: '地图创建成功',
          type: 'success'
        });
      },
      //销毁地图
      destroyMap() {
        this.map.destroy();
        this.$message({
          message: '地图已销毁',
          type: 'success'
        });
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

  #btn {
    position: absolute;
    right: 30px;
    bottom: 30px;
  }
</style>
