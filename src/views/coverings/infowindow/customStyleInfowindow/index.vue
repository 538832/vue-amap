<template>
  <div class="app-container" :style="{ height: windowHeight - 50 + 'px' }">
    <div id="container"></div>
    <div class="info">
      点击地图上的点标记，打开所添加的自定义信息窗体
      <!--测试效果使用-->
      <!--<div style="background: white;width: 400px;border: 2px solid #ccc;padding: 10px;border-radius: 10px">
        &lt;!&ndash;顶部&ndash;&gt;
        <div style="width: 400px;height: 20px;line-height: 20px;">
          <span style="display: inline-block; vertical-align: middle;">方恒假日酒店  <span
            style="color:#F00;">价格:318</span></span>
          <img style="cursor:pointer; display:inline-block;vertical-align: middle;float: right;padding-right: 20px;padding-top: 5px"
            src="https://webapi.amap.com/images/close2.gif" alt="关闭">
        </div>
        <hr>

        &lt;!&ndash;左侧&ndash;&gt;
        <div style="float: left;height: 100px;margin: 5px 10px">
          <img src="http://tpc.googlesyndication.com/simgad/5843493769827749134">
        </div>
        &lt;!&ndash;右侧&ndash;&gt;
        <div style="font-size: 12px;width: 360px;">
          <div>地址：北京市朝阳区阜通东大街6号院3号楼东北8.3公里</div>
          <div style="margin: 5px 10px;">电话：010-64733333</div>
          <div style="margin: 5px 10px;color: #20a0ff"><a
            href='https://ditu.amap.com/detail/B000A8URXB?citycode=110105'>详细信息</a></div>
        </div>
      </div>-->
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
        infoWindow: null
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
        //地图初始化时，在地图上添加一个marker标记,鼠标点击marker可弹出自定义的信息窗体
        this.map = new AMap.Map("container", {
          resizeEnable: true,
          center: [116.481181, 39.989792],
          zoom: 16
        });

        this.addMarker();

        let content = [];
        //实例化信息窗体
        content.push("<div style=\"background: white;width: 400px;border: 2px solid #ccc;padding: 10px;border-radius: 10px\">\n" +
          "      <div style=\"width: 400px;height: 20px;line-height: 20px;\">\n" +
          "        <span style=\"display: inline-block; vertical-align: middle;\">方恒假日酒店  <span style=\"color:#F00;\">价格:318</span></span>\n" +
          "        <img id=\"closeX\" style=\"cursor:pointer; display:inline-block;vertical-align: middle;float: right;padding-right: 20px;padding-top: 5px\" src=\"https://webapi.amap.com/images/close2.gif\" alt=\"关闭\">\n" +
          "      </div>\n" +
          "      <hr>\n" +
          "      <div style=\"float: left;height: 100px;margin: 5px 10px\">\n" +
          "        <img src=\"http://tpc.googlesyndication.com/simgad/5843493769827749134\">\n" +
          "      </div>\n" +
          "      <div style=\"font-size: 12px;width: 360px;\">\n" +
          "        <div>地址：北京市朝阳区阜通东大街6号院3号楼东北8.3公里</div>\n" +
          "        <div style=\"margin: 5px 10px;\">电话：010-64733333</div>\n" +
          "        <div style=\"margin: 5px 10px;color: #20a0ff\"><a href='https://ditu.amap.com/detail/B000A8URXB?citycode=110105'>详细信息</a></div>\n" +
          "      </div>\n" +
          "    </div>");

        this.infoWindow = new AMap.InfoWindow({
          isCustom: true,  //使用自定义窗体
          content: content, //调用创建信息窗体的方法--信息窗体的内容
          offset: new AMap.Pixel(16, -45)
        });
        /*
            给信息窗体添加一个打开事件
            因为只有窗体打开了, 才会加载dom元素, 然后给dom元素绑定事件
            而且, 必须是通过id获取 同过class获取不到
            这一个弄了半天, 太难了
         */
        this.infoWindow.on('open', this.showInfoOpen)
      },

      //打开信息窗体
      showInfoOpen() {
        let closeX = document.getElementById("closeX")
        //方法一: 为dom元素绑定js事件
        closeX.onclick = this.closeInfoWindow
        //方法二: 为dom元素绑定js事件
        //.addEventListener("click", this.closeInfoWindow)
      },

      //添加marker标记
      addMarker() {
        let that = this;
        that.map.clearMap();
        let marker = new AMap.Marker({
          map: this.map,
          position: [116.481181, 39.989792]
        });
        //鼠标点击marker弹出自定义的信息窗体
        marker.on('click', function () {
          that.infoWindow.open(that.map, marker.getPosition());
        });
      },

      //关闭信息窗体
      closeInfoWindow() {
        this.map.clearInfoWindow();
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

  .info {
    position: absolute;
    background: white;
    padding: 10px;
    right: 30px;
    top: 30px;
  }
</style>
