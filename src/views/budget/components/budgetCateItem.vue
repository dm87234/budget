<script setup></script>
<template>
  <div class="budgetCateItem">
    <div class="leftIcon">🍽️</div>
    <div class="right">
      <div class="top">
        <div>飲食</div>
        <div>8000<font-awesome-icon :icon="['fas', 'pencil']" /></div>
      </div>
      <div>
        <el-progress :text-inside="true" :stroke-width="20" :percentage="70" />
      </div>
      <div class="bottom">
        <div>剩餘:7,300</div>
        <div>支出:800</div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.budgetCateItem {
  width: 45%;
  height: 80px;
  border: 1px solid #e4e7ed;
  background: #fff;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 5px 10px;
  gap: 15px;
  .leftIcon {
    font-size: 50px;
  }
  .right {
    flex: 1;
    .top,
    .bottom {
      display: flex;
      justify-content: space-between;
      margin: 8px 0;
    }
    .top {
      .fa-pencil {
        margin-left: 5px;
      }
    }
  }
}
</style>
