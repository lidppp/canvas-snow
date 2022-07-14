import Snow from "./snow.js";
let snow;

window.onload = function () {
  let wcolor = 'rgba(255,255,255,1)'
  let woutColor = 'rgba(255,255,255,0.3)'

  // 初始化
  let element = document.querySelector('#can')
  snow = new Snow(element, getvalue())

  // 销毁事件
  document.querySelector('.destroy').onclick = () => {
    snow.destroy()
    snow = null
  }

  // layui颜色选择框
  layui.use('colorpicker', function () {
    var colorpicker = layui.colorpicker
    //渲染
    colorpicker.render({
      elem: '#test1', //绑定元素
      alpha: true,
      color: wcolor,
      format: 'rgb',
      done: function (Ecolor) {
        wcolor = Ecolor
        getvalue()
      },
    })

    colorpicker.render({
      elem: '#test2', //绑定元素
      alpha: true,
      color: woutColor,
      format: 'rgb',
      done: function (Ecolor) {
        woutColor = Ecolor
        getvalue()
      },
    })
  })

  document.querySelector('.start').onclick = () => {
    snow && snow.destroy()
    snow = new Snow(element, getvalue())
  }

  // 绑定所有input的change事件
  let listOf = document.querySelectorAll('input')
  for (let i = 0; i < listOf.length; i++) {
    listOf[i].addEventListener('input', function () {
      getvalue()
    })
  }

  // 输出json  获取值
  function getvalue() {
    let speed = parseInt(document.querySelector('#speed').value)
    let num = parseInt(document.querySelector('#num').value)
    let max = parseInt(document.querySelector('#max').value)
    let min = parseInt(document.querySelector('#min').value)
    let defaultMouse =
      document.querySelector("input[type='radio'][name='mouse']:checked").value === 'true'

    let mouseReverse = document.querySelector("input[type='radio'][name='mouseReverse']:checked").value === 'true'
    let color = wcolor,
      outColor = woutColor
    let obj = {
      speed,
      num,
      color,
      max,
      min,
      outColor,
      defaultMouse,
      mouseReverse
    }

    document.querySelector('#options').value = JSON.stringify(obj, null, '\t')

    return obj
  }

  document.querySelector('.show').onclick = function () {
    document.querySelector('.sitting').style = 'display:block'
    document.querySelector('.show').style = 'display:none'
  }
  document.querySelector('.hidden').onclick = function () {
    document.querySelector('.sitting').style = 'display:none'
    document.querySelector('.show').style = 'display:block'
  }

  // 绑定鼠标事件
  document.querySelector('.bind').onclick = function () {
    snow && snow.bindMouse()
  }
  // 解绑鼠标事件
  document.querySelector('.unbind').onclick = function () {
    snow && snow.unbindMouse()
  }
}
