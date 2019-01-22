<template>
  <div id="lineBlock">
    {{line.name}}
    <img v-if="line.user" class="star" src="../../../img/voit.png">
    <p v-if="line.user">x{{line.count}}</p>
    <button v-if="line.admin" class="cansel"> <img src="../../../img/ok.png"></button>
    <button v-if="line.admin" class="add"> <img src="../../../img/no.png"></button>
    <button class="view" @click="openViewIdea">View</button>
  </div>
</template>
<script>
import { actions } from "../../store";
export default {
  name: "lineBlock",
  props: ["line",],
  computed: {
    getMenu() {
      return this.$store.getters.getMenu;
    }
  },
  methods: {
    setMenu(type) {
      this.$store.dispatch(actions.setMenu, type);
    },
    openViewIdea(){
       this.$emit('openViewIdea');
    }
    
  }
};
</script>

<style lang="scss" scoped>
#lineBlock {
  height: 68px;
  padding: 0 22px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  color: #5b5a5a;
  background-color: rgb(248, 249, 250);
  border-top: 1px solid rgb(232, 232, 232);
  .star {
    margin-left: auto;
    margin-right: 20px;
  }
  .view {
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    border-radius: 4px;
    background-color: rgb(144, 212, 0);
    width: 106px;
    height: 44px;
    color: #fffdfc;
    font-size: 18px;
    cursor: pointer;
  }
  .cansel {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    background-color: rgb(90, 184, 199);
    width: 44px;
    height: 44px;
    border:none;
    cursor: pointer;
    margin-right: 20px;
  }
  p {
    font-size: 18px;
    color: #5b5a5a;
    margin-right: 20px;
  }
  .add {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    background-color: rgb(237, 115, 14);
    width: 44px;
    height: 44px;
    border:none;
    cursor: pointer;
    margin-right: 20px;
  }
}
</style>