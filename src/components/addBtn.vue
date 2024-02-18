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
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  .addBtn {
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
