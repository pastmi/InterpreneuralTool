<template>
  <ui-modal id="modal-view-idea-admin" ref="modal" dismissOn="esc close-button">
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
        <textarea placeholder="Enter a comment of idea"/>
      </div>
      <div class="footer">
        <img class="star" src="../../../img/voit.png">
        <p>x10</p>
        <button class="cansel-little">
          <img src="../../../img/ok.png">
        </button>
        <button class="add-little">
          <img src="../../../img/no.png">
        </button>
        <button @click="cancel" class="cansel">Back</button>
        <button @click="cancel" class="add">Send</button>
      </div>
    </div>
  </ui-modal>
</template>

<script>
export default {
  name: "modal-view-idea-admin",

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
    textarea {
      border: 1px solid rgb(232, 232, 232);
      height: 200px;
      width: 694px;
      border-radius: 4px;
      background: none;
      padding: 10px;
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
      margin-right: 20px;
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
    .cansel-little {
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
      background-color: rgb(90, 184, 199);
      width: 44px;
      height: 44px;
      border: none;
      cursor: pointer;
      margin-right: 20px;
    }
    .add-little {
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
      background-color: rgb(237, 115, 14);
      width: 44px;
      height: 44px;
      border: none;
      cursor: pointer;
      margin-right: 20px;
      margin-right: auto;
    }
  }
}
</style>
