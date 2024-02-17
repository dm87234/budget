<script setup></script>

<template>
  <div class="categoryContainer">
    <div class="categoryItem">
      <div class="emoji">
        <slot name="emoji"></slot>
      </div>
      <div>
        <slot name="cateName"></slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.categoryContainer {
  cursor: pointer;
  margin-top: 20px;
  position: relative;
  .categoryItem {
    width: 80px;
    height: 80px;
    border: 1px solid #ddd;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    .emoji {
      font-size: 34px;
    }
  }
}
</style>
