<template>
  <ui-modal id="modals-new-idea" ref="modal" dismissOn="esc close-button">
    <div class="body">
      <div class="header">
        New idea
        <img src="../../img/help.png">
      </div>
      <div class="information">
        <input placeholder="Enter a shot name of the idea">
        <textarea placeholder="Enter a full description of the idea"/>
      </div>
      <div class="footer">
        <button @click="cancel" class="cansel">Save</button>
        <button @click="cancel" class="add">Send</button>
      </div>
    </div>
  </ui-modal>
</template>

<script>
export default {
  name: "modals-new-idea",

  data() {
    return {};
  },

  methods: {
    open() {
      this.$refs["modal"].open();
    },

    cancel() {
      this.$refs["modal"].close();
    }
  }
};
</script>
<style lang="scss" scoped>
.body {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #f8f9fa;
  .header {
    height: 57px;
    padding: 0 22px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
    color: #5b5a5a;
    background-color: rgb(248, 249, 250);
    box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.17);
    img {
      cursor: pointer;
    }
  }
  .information {
    padding: 22px 22px;
    flex:1;
    box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.17);
    textarea {
      border: 1px solid rgb(232, 232, 232);
      height: 368px;
      width: 694px;
      border-radius: 4px;
      background: none;
      padding: 10px;
    }
    input {
      border: 1px solid rgb(232, 232, 232);
      height: 26px;
      width: 694px;
      border-radius: 4px;
      background: none;
      padding: 10px;
      margin-bottom: 20px;
    }
  }
  .footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 22px;
    .cansel {
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
      background-color: rgb(90, 184, 199);
      width: 106px;
      height: 44px;
      border: none;
      cursor: pointer;
      margin-right: 20px;
      font-size: 18px;
      color: white;
      margin-left: auto;
    }

    .add {
      font-size: 18px;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
      background-color: #90d400;
      width: 106px;
      height: 44px;
      border: none;
      cursor: pointer;
    }
  }
}
</style>
