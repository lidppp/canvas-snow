// 起始和结束角
const START = 0
const END = 2 * Math.PI

// 创建一个雪花类
class Snow {
  // static oldSnow = null;

  // 存放雪花数组
  snowArr = []
  // canvasDOM节点
  canDom
  // canvas容器
  can
  // 父元素容器
  can_parnet
  // 刷新函数id
  requestID
  // 绑定的事件, 解绑时要用
  Eresize = (e) => {
    this.resize(e)
  }
  Emousemove = (e) => {
    this.mousemove(e)
  }
  Emouseout = (e) => {
    this.mouseOffset = 0
  }

  // 鼠标移入偏移值
  mouseOffset = 0

  // 画布宽度
  width
  // 画布高度
  height

  // 配置
  option = {
    // 雪花落下的速度
    speed: 10,
    // 同屏展示的雪花数量
    num: 300,
    // 雪花的颜色
    color: '#ffffff',
    // 雪花外层颜色
    outColor: 'rgba(255,255,255,0.3)',
    // 雪花最大直径
    max: 8,
    // 雪花最小直径
    min: 3,
    // 默认开启鼠标事件
    defaultMouse: false,
  }

  // 构造函数
  constructor(can, option = {}) {
    // if(Snow.oldSnow){
    //     Snow.oldSnow.destroy();
    // }else{
    //     Snow.oldSnow = this;
    // }

    if (!can) {
      throw new Error('canvas DOM Node of undefined!')
    }
    // 保留canvas Dom对象的引用
    this.canDom = can
    // 获取canvas Dom对象父元素对象
    this.can_parnet = can.parentElement
    // 设置配置
    let strings = Object.keys(option)
    for (let i = 0; i < strings.length; i++) {
      if (option[strings[i]] !== undefined || option[strings[i]] !== null) {
        this.option[strings[i]] = option[strings[i]]
      }
    }
    // 获取canvas上下文对象
    this.can = this.canDom.getContext('2d')

    // 设置宽高
    this.resize()
    // 执行初始化对象
    this.init()
  }

  // 初始化
  init() {
    for (let i = 0; i < this.option.num; i++) {
      this.creatSnow(i, true)
    }
    this.move()

    window.addEventListener('resize', this.Eresize)
    this.option.defaultMouse && this.bindMouse()
  }

  // 创建雪花
  creatSnow(i, flag = false) {
    this.snowArr[i] = this.creatSnowFactory(flag)
  }

  // 创建雪花的工厂函数
  creatSnowFactory(flag) {
    let snowObj = {}
    // 设置大小信息,保存random变量, 用于渲染阴影
    let size = this.randomSize()
    snowObj.width = size.size
    snowObj.rand = size.rand
    // 设置位置信息
    let position = this.randomPosition(flag)
    snowObj.x = position.x
    snowObj.y = position.y
    snowObj.xmove = Math.floor(snowObj.rand * 100) % 3
    return snowObj
  }

  // 雪花移动函数
  move() {
    this.requestID = window.requestAnimationFrame(() => {
      this.clearCanvas()

      let snowArrCopy = [...this.snowArr]
      for (let i = 0; i < snowArrCopy.length; i++) {
        this.draw(snowArrCopy[i], i)
      }
      this.move()
    })
  }

  // 雪花绘制函数
  draw(options, index) {
    // 移动雪花
    let rand = options.rand / 3
    rand < 0.5 && (rand += 0.1)
    options.y += this.option.speed * rand
    switch (Math.abs(options.xmove)) {
      case 0:
        options.x += this.mouseOffset
        break
      case 1:
        options.x += (this.option.speed * rand) / 3 + this.mouseOffset
        break
      case 2:
        options.x -= (this.option.speed * rand) / 3 - this.mouseOffset
        break
    }

    // 判断边界是否超出
    if (
      options.y - options.width > this.height ||
      options.x - options.width < -1 * this.width ||
      options.x + options.width > 2 * this.width
    ) {
      return this.creatSnow(index)
    }

    // 开始绘制雪花
    this.can.beginPath()
    this.can.arc(options.x, options.y, options.width, START, END)
    // 创建径向渐变
    let lingrad = this.can.createRadialGradient(
      options.x,
      options.y,
      options.width / 4,
      options.x,
      options.y,
      options.width
    )
    lingrad.addColorStop(0, this.option.color)
    lingrad.addColorStop(1, this.option.outColor)

    this.can.strokeStyle = 'rgba(0,0,0,0)'
    this.can.fillStyle = lingrad

    this.can.globalAlpha = 0.2 + options.rand * 0.8
    this.can.fill()
    this.can.stroke()
  }

  // 生成随机大小函数
  randomSize() {
    !this.ranger && (this.ranger = this.option.max - this.option.min)
    let rand = Math.random()
    let size = this.option.min + this.ranger * rand
    return {
      size,
      rand,
    }
  }

  // 生成随机位置
  randomPosition(flag) {
    // x轴正常分配, y轴向上
    let randX = -1 * this.width + Math.random() * 2 * this.width
    let randY
    if (flag) {
      randY = Math.random() * this.height
    } else {
      randY = 0 - Math.random() * 200
    }
    return {
      x: randX,
      y: randY,
    }
  }

  // 重置宽高
  resize() {
    // 保存宽高位置信息
    this.width = this.can_parnet.offsetWidth
    this.height = this.can_parnet.offsetHeight

    // 根据父元素对象设置canvas
    this.canDom.setAttribute('width', this.width + 'px')
    this.canDom.setAttribute('height', this.height + 'px')
  }

  // 清空画布
  clearCanvas() {
    this.can.clearRect(0, 0, this.width, this.height)
  }

  // 鼠标移动处理事件
  mousemove(e) {
    this.mouseOffset = e.movementX
  }

  // 开启鼠标事件
  bindMouse() {
    if(this.option.bindMouse){
        return
    }
    this.option.bindMouse = true
    this.canDom.addEventListener('mousemove', this.Emousemove)
    this.canDom.addEventListener('mouseout', this.Emouseout)
  }
  // 解绑鼠标事件
  unbindMouse() {
    if(!this.option.bindMouse){
        return
    }
    this.option.bindMouse = false
    this.canDom.removeEventListener('mousemove', this.Emousemove)
    this.canDom.removeEventListener('mouseout', this.Emouseout)
  }

  // 销毁方法
  destroy() {
    window.removeEventListener('resize', this.Eresize)
    this.unbindMouse()
    window.cancelAnimationFrame(this.requestID)
    this.clearCanvas()
  }
}
