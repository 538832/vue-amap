<template>
  <div class="app-container" :style="{ height: windowHeight - 50 + 'px' }">
    <div id="container"></div>
  </div>
</template>

<script>
  import * as THREE from '@/utils/amap/three.js'

  export default {
    name: "index",
    data() {
      return {
        //实时屏幕高度
        windowHeight: document.documentElement.clientHeight,
        map: null,
        meshes: []
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
        this.map = new AMap.Map('container', {
          center: [116.54, 39.79],
          zooms: [2, 20],
          zoom: 14,
          viewMode: '3D',
          pitch: 50,
        });

        let camera;
        let renderer;
        let scene;
        // 数据转换工具
        let customCoords = this.map.customCoords;
        // 数据使用转换工具进行转换，这个操作必须要提前执行（在获取镜头参数 函数之前执行），否则将会获得一个错误信息。
        let data = customCoords.lngLatsToCoords([
          [116.52, 39.79],
          [116.54, 39.79],
          [116.56, 39.79],
        ]);

        // 创建 GL 图层
        let gllayer = new AMap.GLCustomLayer({
          // 图层的层级
          zIndex: 10,
          // 初始化的操作，创建图层过程中执行一次。
          init: (gl) => {
            // 这里我们的地图模式是 3D，所以创建一个透视相机，相机的参数初始化可以随意设置，因为在 render 函数中，每一帧都需要同步相机参数，因此这里变得不那么重要。
            // 如果你需要 2D 地图（viewMode: '2D'），那么你需要创建一个正交相机
            camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 100, 1 << 30);

            renderer = new THREE.WebGLRenderer({
              context: gl,  // 地图的 gl 上下文
              // alpha: true,
              // antialias: true,
              // canvas: gl.canvas,
            });

            // 自动清空画布这里必须设置为 false，否则地图底图将无法显示
            renderer.autoClear = false;
            scene = new THREE.Scene();

            // 环境光照和平行光
            let aLight = new THREE.AmbientLight(0xffffff, 0.3);
            let dLight = new THREE.DirectionalLight(0xffffff, 1);
            dLight.position.set(1000, -100, 900);
            scene.add(dLight);
            scene.add(aLight);


            let texture = new THREE.TextureLoader().load('https://a.amap.com/jsapi_demos/static/demo-center-v2/three.jpeg');
            texture.minFilter = THREE.LinearFilter;
            //  这里可以使用 three 的各种材质
            let mat = new THREE.MeshPhongMaterial({
              color: 0xfff0f0,
              depthTest: true,
              transparent: true,
              map: texture,
            });
            let geo = new THREE.BoxBufferGeometry(1000, 1000, 1000);
            for (let i = 0; i < data.length; i++) {
              const d = data[i];
              let mesh = new THREE.Mesh(geo, mat);
              mesh.position.set(d[0], d[1], 500);
              this.meshes.push({
                mesh,
                count: i,
              });
              scene.add(mesh);
            }
          },
          render: () => {
            // 这里必须执行！！重新设置 three 的 gl 上下文状态。
            renderer.state.reset();
            let {near, far, fov, up, lookAt, position} = customCoords.getCameraParams();

            // 2D 地图下使用的正交相机
            // let { near, far, top, bottom, left, right, position, rotation } = customCoords.getCameraParams();

            // 这里的顺序不能颠倒，否则可能会出现绘制卡顿的效果。
            camera.near = near;
            camera.far = far;
            camera.fov = fov;
            camera.position.set(...position);
            camera.up.set(...up);
            camera.lookAt(...lookAt);
            camera.updateProjectionMatrix();

            // 2D 地图使用的正交相机参数赋值
            // camera.top = top;
            // camera.bottom = bottom;
            // camera.left = left;
            // camera.right = right;
            // camera.position.set(...position);
            // camera.updateProjectionMatrix();

            renderer.render(scene, camera);
          },
        });
        this.map.add(gllayer);


        this.animate();

      },
      // 动画
      animate() {
        for (let i = 0; i < this.meshes.length; i++) {
          let {mesh, count} = this.meshes[i];
          count += 1;
          mesh.rotateZ(count / 180 * Math.PI);
        }
        this.map.render();
        requestAnimationFrame(this.animate);
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
