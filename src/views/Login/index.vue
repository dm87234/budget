<script setup></script>

<template>
  <div class="login_container">
    <div class="wrapper">
      <div class="title">
        <h1>Budget Tracker</h1>
      </div>
      <div class="main">
        <div class="left">
          <p>
            最美記帳 <br />易用可靠的雲端記帳工具 <br />中小企業最安心的成長夥伴
          </p>
          <button>立即使用</button>
        </div>
        <div class="right">
          <img src="../../assets/images/computer.png" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login_container {
  height: 100%;
  background: url('../../assets/images/bg.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;

  .wrapper {
    width: 76%;
    height: 500px;
    // background: #bfa;
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .title {
      // background: rgb(96, 98, 230);
      margin-bottom: 70px;
      h1 {
        font-family: 'Protest Riot', sans-serif;
        font-size: 48px;
        color: #0f2470;
      }
    }
    .main {
      // background: #9cd;
      display: flex;
      align-items: center;
      .left {
        margin-right: 100px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
        p {
          font-size: 24px;
          text-align: center;
          line-height: 1.5;
        }
        button {
          border: none;
          outline: none;
          width: 150px;
          height: 40px;
          border-radius: 4px;
          background: $primary_color;
          color: $white_color;
          cursor: pointer;
        }
      }
      .right {
        img {
          width: 600px;
        }
      }
    }
  }
}
</style>
