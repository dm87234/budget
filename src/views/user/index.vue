<script setup>
import inputCom from './components/inputCom.vue'
import categoryCom from './components/categoryCom.vue'

const list = [
  {
    icon: '🍽️',
    cateName: '飲食'
  },
  {
    icon: '🍉',
    cateName: '飲料'
  },
  {
    icon: '🧡',
    cateName: '飲食'
  },
  {
    icon: '🎃',
    cateName: '飲食'
  },
  {
    icon: '⚾',
    cateName: '飲食'
  },
  {
    icon: '🔮',
    cateName: '玩具'
  },
  {
    icon: '🀄',
    cateName: '衣服'
  },
  {
    icon: '🎃',
    cateName: '飲食'
  },
  {
    icon: '⚾',
    cateName: '飲食'
  },
  {
    icon: '🔮',
    cateName: '玩具'
  },
  {
    icon: '🀄',
    cateName: '衣服'
  },
  {
    icon: '🎃',
    cateName: '飲食'
  },
  {
    icon: '⚾',
    cateName: '飲食'
  },
  {
    icon: '🔮',
    cateName: '玩具'
  },
  {
    icon: '🀄',
    cateName: '衣服'
  }
]
</script>

<template>
  <div class="settings_container">
    <div class="top">
      <h3 class="title">個人資料設定</h3>
      <el-card shadow="never">
        <inputCom>使用者名稱</inputCom>
        <inputCom>電子信箱</inputCom>
        <el-button class="resetPwdBtn" type="danger">重置密碼</el-button>
      </el-card>
    </div>
    <div class="bottom">
      <h3 class="title">分類設定</h3>
      <el-tabs type="border-card">
        <el-tab-pane label="支出類別">
          <categoryCom v-for="(item, index) in list" :key="index">
            <template #emoji>{{ item.icon }}</template>
            <template #cateName>{{ item.cateName }}</template>
          </categoryCom>
        </el-tab-pane>
        <el-tab-pane label="收入類別">Config</el-tab-pane>
        <div class="addCateBtnContainer">
          <el-button class="addCateBtn">新增類別</el-button>
        </div>
      </el-tabs>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.settings_container {
  // width: $container-width-lg;
  margin: 50px;
  .title {
    font-size: 26px;
    color: $text_color;
    margin-bottom: 20px;
  }
  .top {
    :deep(.el-card__body) {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 25px;
      align-items: end;

      .resetPwdBtn {
        width: 100px;
      }
    }
    margin-bottom: 20px;
  }
  .bottom {
    :deep(.el-tab-pane) {
      display: flex;
      flex-wrap: wrap;
      gap: 25px;
    }
    .addCateBtnContainer {
      display: flex;
      justify-content: flex-end;
      .addCateBtn {
        background: $button_color;
        color: white;
        @include transition_ease;
        &:hover {
          background: white;
          color: $button_color;
        }
      }
    }
  }
}
</style>
