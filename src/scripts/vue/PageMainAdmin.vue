<template>
  <div id="page-main">
    <div class="body">
      <div class="header">
        Applied
        <img src="../../img/help.png">
      </div>
      <div class="body-block">
          <LineBlock  v-on:openViewIdea="openViewIdea" :line="line" :key="line.is" v-for="line in line1"/>
      </div>
      <div class="header margin">
        Rejected
        <img src="../../img/help.png">
      </div>
      <div class="body-block">
          <LineBlock  v-on:openViewIdea="openViewIdea" :line="line" :key="line.is" v-for="line in line2"/>
      </div>
      <div class="header margin">
        In processing
        <img src="../../img/help.png">
      </div>
      <div class="body-block">
          <LineBlock  v-on:openViewIdea="openViewIdea" :line="line" :key="line.is" v-for="line in line3"/>
      </div>
    </div>

    <modal-view-idea-admin ref="modal-view-idea-admin"/>
  </div>
</template>
<script>
import { actions } from "../store";

export default {
  name: "page-main",
  data() {
    return {
      line1: [
        {
          id: 1,
          name: "test1",
          count: "1",
          admin: false,
          user: false
        },
        {
          id: 2,
          name: "test2",
          count: "2",
          admin: false,
          user: false
        },
        {
          id: 3,
          name: "test3",
          count: "3",
          admin: false,
          user: false
        },
        {
          id: 4,
          name: "test4",
          count: "4",
          admin: false,
          user: false
        }
      ],
       line2: [
        {
          id: 5,
          name: "test5",
          count: "1",
          admin: false,
          user: false
        },
        {
          id: 6,
          name: "test6",
          count: "2",
          admin: false,
          user: false
        },
        {
          id: 7,
          name: "test7",
          count: "3",
          admin: false,
          user: false
        },
        {
          id: 8,
          name: "test8",
          count: "4",
          admin: false,
          user: false
        }
      ],
       line3: [
        {
          id: 9,
          name: "test9",
          count: "1",
          admin: true,
          user: true
        },
        {
          id: 10,
          name: "test10",
          count: "2",
          admin: true,
          user: true
        },
        {
          id: 11,
          name: "test11",
          count: "3",
          admin: true,
          user: true
        },
        {
          id: 12,
          name: "test12",
          count: "4",
          admin: true,
          user: true
        }
      ]
    };
  },
  methods: {
    openViewIdea() {
      this.$refs["modal-view-idea-admin"].open();
    }
  }
};
</script>

<style lang="scss" scoped>
#page-main {
  width: 760px !important;
  height: 637px !important;
  overflow-x: auto;
  background: #f0f3f5;
  font-family: "Roboto", sans-serif;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.05);
  &::-webkit-scrollbar{
    width:0px;
  }
  .margin {
    margin-top: 30px;
  }
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
}
</style>
