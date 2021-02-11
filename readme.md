# canvas下雪特效

目前已经基于类封装出来了, 如果需要在webpack(使用import进行导入)开发环境中用, 需要给类前面添加export default即可

## 预览

下载本项目后双击 index.html 浏览器打开即可 左上角有配置项以及配置的json



## 基础使用

本插件需要配合HTML进行使用, canvas的大小是它父元素的大小, 并且已经做了窗口大小改变进行自适应的操作

示例代码

```html
<style>
    * {
      margin: 0;
      padding: 0;
    }
    html,
    body{
      width: 100%;
      height: 100%;
    }
    
  .canvas-box {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }
</style>

<div class="canvas-box">
    <canvas id="can" width="100%" height="100%">
      您的浏览器不支持canvas, 请下载最新的浏览器
    </canvas>
</div>

<script src="snow.js"></script>
<script>
let element = document.querySelector('#can')
let snow = new Snow(element)
</script>
```

> new Snow(element, option)
>
> element 对象是canvas DOM对象
>
> option 需要传入的是一个对象

## option对象

| 对象key值    | 类型    | 默认值                | 作用                 | 备注                                                         |
| ------------ | ------- | --------------------- | -------------------- | ------------------------------------------------------------ |
| speed        | int     | 10                    | 雪花的下落速度       | 值越大速度越快, 每一帧运动下落的速度                         |
| num          | int     | 300                   | 同屏展示的雪花的数量 | 数量越大雪花越多(值太大的时候请注意canvas性能问题, 目前测试下来以笔者开发的电脑来说3000是峰值) |
| color        | string  | #ffffff               | 雪花颜色             | -                                                            |
| outColor     | string  | rgba(255,255,255,0.3) | 雪花阴影颜色         | -                                                            |
| max          | int     | 8                     | 雪花最大半径         | 雪花大小为随机生成, 所以需要区间范围值控制大小               |
| min          | int     | 3                     | 雪花最小半径         | -                                                            |
| defaultMouse | boolean | false                 | 是否开启鼠标移入跟随 | 开启之后鼠标向左雪花也会向左, 鼠标向右,雪花也会向右, 除此之外还可以手动开启或者关闭鼠标事件, 详见下方方法 |

## 方法

### 初始化

直接`let snow = new Snow(element, option)`即可

### 销毁

`snow.destroy()`

执行销毁后注意将自定义的变量`snow`赋值为null回收内存, 销毁后如果想要再次创建请重新创建Snow对象也就执行执行初始化

### 绑定鼠标事件

`snow.bindMouse()`

### 解绑鼠标事件

`snow.unbindMouse()`

