<script setup></script>
<template>
  <div class="settingsItem">
    <div class="settingsName">
      <slot></slot>
    </div>
    <input maxlength="40" type="text" class="settingsInp" />
    <font-awesome-icon :icon="['fas', 'pencil']" />
  </div>
</template>

<style lang="scss" scoped>
.settingsItem {
  color: $text_color;
  font-size: 18px;
  .settingsName {
    margin-bottom: 20px;
  }
  .settingsInp {
    width: 80%;
    border: none;
    outline: none;
    border-bottom: 1px dashed $text_color;
    font-size: 18px;
    padding-left: 10px;
  }
}
</style>
