<script setup></script>

<template>
  <div class="common-layout">
    <el-container>
      <el-aside>
        <div class="top">
          <font-awesome-icon :icon="['fas', 'bars']" />
        </div>
        <div class="middle">
          <font-awesome-icon :icon="['fas', 'house']" />
          <font-awesome-icon :icon="['fas', 'magnifying-glass-dollar']" />
          <font-awesome-icon :icon="['fas', 'chart-column']" />
          <font-awesome-icon :icon="['fas', 'gear']" />
        </div>
        <div class="bottom">
          <font-awesome-icon :icon="['fas', 'right-from-bracket']" />
        </div>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
.common-layout {
  height: 100%;
  background: #f8d1b4;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
  .el-container {
    height: 90%;
    // border: 1px solid rebeccapurple;
    .el-aside {
      font-size: 30px;
      color: $white_color;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      padding-top: 30px;
      padding-bottom: 30px;
      width: 100px;
      background: #e37b58;
      border-radius: 20px 0 0 20px;
      @include transition_ease;

      &:hover {
        width: 200px;
      }
      .middle {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 50px;
      }
    }

    .el-main {
      padding: 0;
      background: #fdf7eb;
      border-radius: 0 20px 20px 0;
    }
  }
}
</style>
