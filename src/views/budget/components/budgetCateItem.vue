<script setup>
import { ref } from 'vue'
const isBudgetCateEdit = ref(false)
const props = defineProps({
  message: Object
})
const input = ref(props.message.cateBudget)
const onBudgetCateEdit = () => {
  // console.log(props.message.id)
  isBudgetCateEdit.value = true
}
const onBudgetCateOk = () => {
  isBudgetCateEdit.value = false
}
</script>
<template>
  <div class="budgetCateItem">
    <div class="leftIcon">
      <slot name="icon"></slot>
    </div>
    <div class="right">
      <div class="top">
        <div>
          <slot name="cateName"></slot>
        </div>

        <div>
          <span v-if="!isBudgetCateEdit">
            <slot name="cateBudget"></slot>
          </span>
          <el-input
            v-else
            v-model="input"
            style="width: 120px; font-size: 16px"
          />
          <font-awesome-icon
            v-if="!isBudgetCateEdit"
            :icon="['fas', 'pencil']"
            @click="onBudgetCateEdit"
          />
          <font-awesome-icon
            v-else
            :icon="['fas', 'circle-check']"
            @click="onBudgetCateOk"
          />
        </div>
      </div>

      <div>
        <slot name="progress"></slot>
      </div>
      <div class="bottom">
        <div>剩餘: <slot name="remains"></slot></div>
        <div>支出: <slot name="cost"></slot></div>
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
  .fa-pencil {
    color: #576955;
  }
  .fa-circle-check {
    color: #ff2d2d;
  }
  .leftIcon {
    font-size: 50px;
  }
  .right {
    flex: 1;
    .top,
    .bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 8px 0;
    }
    .top {
      .fa-pencil,
      .fa-circle-check {
        margin-left: 5px;
      }
    }
  }
}
</style>
