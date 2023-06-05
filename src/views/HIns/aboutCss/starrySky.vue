<script setup>
</script>
<template>
  <div class="starrySky">
    <div class="layer1"></div>
    <div class="layer2"></div>
    <div class="layer3"></div>
    <div class="layer4"></div>
    <div class="layer5"></div>
    <!-- <div class="title">广告位招租</div> -->
  </div>
</template>
<style lang="scss" scoped>
  @function getShadows($n) {
    $shadows:'#{random(100)}vw #{random(100)}vh #fff';
    @for $i from 2 through $n {
      $shadows:'#{$shadows},#{random(100)}vw #{random(100)}vh #fff';
    }
    @return unquote($shadows)
  };
  .starrySky{
    height: 100%;
    width: 100%;
    position: relative;
    background: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%);
    overflow: hidden;
    .title {
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      color: #fff;
      text-align: center;
      font-family: 'lato', sans-serif;
      font-weight: 300;
      font-size: 50px;
      letter-spacing: 10px;
      margin-top: -60px;
      padding-left: 10px;
      background: linear-gradient(white, #38495a);
      background-clip: text;
      -webkit-background-clip: text;
      color: transparent; 
    };
    $duration: 1000s;
    $count: 1000;
    @for $i from 1 through 10 {
      .layer#{$i}{
        $size:#{$i}px;
        $duration: floor($duration / 2);
        $count: floor($count / 2);
        position: absolute;
        height: $size;
        width: $size;
        border-radius: 50%;
        left: 0;
        top: 0;
        box-shadow: getShadows($count);
        animation: moveUp $duration linear infinite;
        &::after{
          content: '';
          position: absolute;
          left: 0;
          top: 100vh;
          border-radius: inherit;
          box-shadow: inherit;
          width: $size;
          height: $size;
        }
      }
    }
  };
  @keyframes moveUp {
    100%{
      transform: translateY(-100vh);
    }
  }
</style>