<template>
  <div id="line">
    <canvas ref="canvas"></canvas>
  </div>
</template>
<script setup>
  import {onMounted, ref, onBeforeUnmount} from 'vue';
  const canvas = ref();
  let animate = null;
  let box = null;
  let mouseX = 0;
  let mouseY = 0;
  onMounted(()=>{
    init();
    const g = new Graph();
    g.draw();
  })
  onBeforeUnmount(()=>{
    cancelAnimationFrame(animate); //停止
  })

  class Point {
    constructor() {
      this.r = 2;
      this.x = getRandom(0, canvas.value.width - this.r/2);
      this.y = getRandom(0, canvas.value.height - this.r/2);
      this.xSpeed = getRandom(-50, 50);
      this.ySpeed = getRandom(-50, 50);
      this.lastDrawTime = null;
      this.followLen = 190; //吸附距离
    }

    // 线条连接鼠标
    mouseMove() {
      box = document.getElementById('line');
      box.onmousemove = e => {
        mouseX = e.offsetX;
        mouseY = e.offsetY;
        this.x = mouseX;
        this.y = mouseY;
      }
    }
    draw() {
      this.mouseMove();
      if(this.x != mouseX && this.y != mouseY){
        //更新坐标
        if(this.lastDrawTime) {
          // 计算新坐标
          const duration = (Date.now() - this.lastDrawTime)/1000;
          const xDis = this.xSpeed * duration,
                yDis = this.ySpeed * duration;
          let x = this.x + xDis,
              y = this.y + yDis;
          //临界值处理
          if(x > canvas.value.width - this.r/2) {
            x = canvas.value.width - this.r/2;
            this.xSpeed = -this.xSpeed;
          } else if(x < 0){
            x = 0;
            this.xSpeed = -this.xSpeed;
          }
          if(y > canvas.value.height - this.r/2) {
            y = canvas.value.height - this.r/2;
            this.ySpeed = -this.ySpeed;
          } else if(y < 0){
            y = 0;
            this.ySpeed = -this.ySpeed;
          }
          // 新坐标
          this.x = x;
          this.y = y;

          // 跟随鼠标坐标
          let lengthX = mouseX-this.x;
          let lengthY = mouseY-this.y;
          const distance = Math.sqrt(lengthX**2 + lengthY**2)
          if(distance > this.followLen && distance <= this.followLen + 2) {
            let proportion = this.followLen / distance;
            lengthX *= proportion;
            lengthY *= proportion;
            this.x = mouseX - lengthX;
            this.y = mouseY - lengthY;
          }
        }
      }
      const ctx = canvas.value.getContext('2d');
      ctx.beginPath();
      if(this.x != mouseX && this.y != mouseY){
        ctx.arc(this.x,this.y,this.r,0,Math.PI*2);
      }
      ctx.stroke(); 
      ctx.fillStyle = 'rgb(200,200,200)'
      ctx.fill();
      this.lastDrawTime = Date.now();
    }
  }
  class Graph {
    constructor(pointNumber = 50, maxDis = 200) {
      // pointNumber 点数量； maxDis 连线距离；
      this.points = new Array(pointNumber).fill(0).map(() => new Point());
      this.maxDis = maxDis;
    }
    draw(){
      animate = requestAnimationFrame(() => {
        this.draw();
      })
      // cancelAnimationFrame(animate); //停止
      const ctx = canvas.value.getContext('2d');
      ctx.clearRect(0,0,canvas.value.width,canvas.value.height);
      for(let i = 0; i < this.points.length; i++) {
        const p1 = this.points[i];
        p1.draw();
        for(let j = i+1; j < this.points.length; j++) {
          const p2 = this.points[j];
          const d = Math.sqrt((p1.x - p2.x)**2 + (p1.y - p2.y)**2);
          if(d > this.maxDis) {
            continue;
          };
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x,p2.y);
          ctx.strokeStyle = `rgba(200,200,200,${1-d/this.maxDis})` //线颜色
          ctx.stroke(); //画
        }
      }
    }
  }
  function init(){
    canvas.value.width = document.getElementById('line').clientWidth;
    canvas.value.height = document.getElementById('line').clientHeight;
  }
  function getRandom(min, max) {
    return Math.floor(Math.random() * (max + 1 - min) + min)
  }
  
</script>
<style lang="scss" scoped>
  #line{
    position: relative;
    height: 100%;
    width: 100%;
  }
  canvas {
    position: absolute;
    left: 0;
    top: 0;
    background-color: rgba(20,20,20,.9);
  }
</style>