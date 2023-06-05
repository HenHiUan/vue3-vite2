<script setup>
  import { ref } from 'vue'
  const dot = ref(new Array(36).fill('dot'))
  // console.log(dot)
</script>
<template>
  <div class="loading">
    <div :class="dot" v-for="(dot, index) in dot" :key="index"></div>
  </div>
</template>
<style lang="scss" scoped>
$boxSize: 10px;
$contentSize: 150px;
$n: 36;
$deg: 360deg / $n;
$ani-duration: 2000ms;
.loading {
  width: $contentSize;
  height: $contentSize;
  margin: 50px auto;
  position: relative;
  border-radius: 50%;
  .dot{
    position: absolute;
    left: 50%;
    top: 50%;
    width: $boxSize;
    height: $boxSize;
    margin-left: -$boxSize / 2;
    margin-top: -$boxSize / 2;
    perspective: 70px;
    transform-style: preserve-3d;
    &::before, &::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
    &::before {
      background-color: #a3e3ed;
      top: -100%;
      animation: moveBlack $ani-duration infinite;
    }
    &::after {
      background-color: #eecfcf;
      top: 100%;
      animation: moveWhite $ani-duration infinite;
    }
  }
  $num: 1;
  @while $num <= $n {
    .dot:nth-child(#{$num}) {
      transform:rotate($deg * $num) translateY(-$contentSize / 2);
      &::before, &::after {
        animation-delay: -$ani-duration / $n * 6 * $num;
      }
    }
    $num: $num + 1;
  }
}

@keyframes moveBlack {
  0% {
    animation-timing-function: ease-in;
  }
  25% {
    transform: translate3d(0,100%,$boxSize);
    animation-timing-function: ease-out;
  }
  50% {
    transform: translate3d(0,200%,0);
    animation-timing-function: ease-in;
  }
  75% {
    transform: translate3d(0,100%,-$boxSize);
    animation-timing-function: ease-out;
  }
}
@keyframes moveWhite {
  0% {
    animation-timing-function: ease-in;
  }
  25% {
    transform: translate3d(0,-100%,-$boxSize);
    animation-timing-function: ease-out;
  }
  50% {
    transform: translate3d(0,-200%,0);
    animation-timing-function: ease-in;
  }
  75% {
    transform: translate3d(0,-100%,$boxSize);
    animation-timing-function: ease-out;
  }
}
</style>