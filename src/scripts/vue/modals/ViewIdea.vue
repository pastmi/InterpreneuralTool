<template>
  <ui-modal id="modals-view-idea" ref="modal" dismissOn="esc close-button">
    <div class="body">
      <div class="header">
        A short name of the idea
        <img src="../../img/help.png">
      </div>
      <div class="text">
        A full description of the idea... Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias quas facere laudantium commodi, dolorum tempore at officia officiis in obcaecati iure possimus mollitia temporibus? Quidem, molestias quis? Velit, explicabo? Eum.
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Omnis quis delectus, eligendi magnam, quas pariatur dolorum, repellat natus neque illum eum eveniet atque? Dolores tenetur explicabo voluptatum voluptates molestias sed.
      </div>
      <div class="coment">
        <div class="coment-block">
          <img src="../../img/user3.png">
          <div class="text-block">
            <p class="name">Administrator</p>
            <p class="comment">Very nice!</p>
          </div>
        </div>
      </div>
      <div class="footer">
        <img class="star" src="../../../img/voit.png">
        <p>x10</p>
        <button @click="cancel" class="cansel">Save</button>
        <button @click="cancel" class="add">Send</button>
      </div>
    </div>
  </ui-modal>
</template>

<script>
export default {
  name: "modals-view-idea",

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
  .text {
    flex: 1;
    padding: 22px;
    font-size: 16px;
    color: #5b5a5a;
    border-bottom: 1px solid rgb(232, 232, 232);
  }
  .coment {
    padding: 16px 22px;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.05);
    .coment-block {
      display: flex;
      .text-block {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-left: 10px;
        .name {
          font-size: 14;
          color: #5b5a5a;
        }
        .comment {
          font-size: 14;
          color: #607d8b;
        }
      }
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
    }
    p {
      font-size: 18px;
      color: #5b5a5a;
      margin-left: 10px;
      margin-right: auto;
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
