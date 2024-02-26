<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { addCateBudgetAPI, updateCateBudgetAPI } from '@/api/budget'
import { isBudgetOk } from '@/utils/moneyFormat'
const isBudgetCateEdit = ref(false)
const props = defineProps({
  cateItem: Object,
  year: String,
  month: String
})
const input = ref()
const emit = defineEmits(['success'])
const onBudgetCateEdit = () => {
  input.value = props.cateItem.budget
  isBudgetCateEdit.value = true
}
const onBudgetCateOk = async () => {
  if (props.cateItem.id) {
    if (!isBudgetOk(input.value)) {
      return ElMessage.error('預算只能是正整數或0')
    }
    const { data } = await updateCateBudgetAPI({
      id: props.cateItem.id,
      budget: input.value
    })
    if (data.status !== 0) {
      return ElMessage.error('服務異常')
    }
    emit('success')
  } else {
    if (!isBudgetOk(input.value)) {
      return ElMessage.error('預算只能是正整數或0')
    }
    const { data } = await addCateBudgetAPI({
      categoryId: props.cateItem.cateId,
      budget: input.value,
      budgetYear: props.year,
      budgetMonth: props.month
    })
    if (data.status !== 0) {
      return ElMessage.error('服務異常')
    }
    emit('success')
  }
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
            maxlength="9"
            style="width: 120px; font-size: 16px"
            :formatter="
              (value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            "
            :parser="(value) => value.replace(/\$\s?|(,*)/g, '')"
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
