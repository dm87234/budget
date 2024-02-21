<script setup></script>
<template>
  <div class="addCateBtnContainer">
    <el-button class="addBtn">
      <slot></slot>
    </el-button>
  </div>
</template>

<style lang="scss" scoped>
.addCateBtnContainer {
  width: 100px;
  margin-left: auto;
  margin-top: 20px;
  .addBtn {
    width: 100px;
    background: $button_color;
    color: white;
    @include transition_ease;
    &:hover {
      background: white;
      color: $button_color;
    }
  }
}
</style>
