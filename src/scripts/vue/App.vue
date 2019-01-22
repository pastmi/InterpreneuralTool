<template>
    <div id="app">
        <router-view ></router-view>
    </div>
</template>

<script>
export default {
    name: 'app',

}
</script>
<style lang="scss" >
    @import url('https://fonts.googleapis.com/css?family=Open+Sans');
    * {
        padding: 0px;
        margin: 0px;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    }

    #app {
        width: 100vw;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #f0f3f5;
    }
    //modals
    .ui-modal__container {
       background: #f8f9fa!important;
         width: 760px !important;
        height: 637px !important;
    }
    .ui-modal__body {
      height: 637px !important;
      padding: 0!important;
    }  
    .ui-modal__header {
        display: none!important;
    }
</style>

