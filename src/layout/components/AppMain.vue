<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key" />
      </keep-alive>
    </transition>
  </section>
</template>

<script>
import vuescroll from "vuescroll";
export default {
  name: "AppMain",
  data() {
    return {
      ops: {
        bar: {
          background: "#ddd",
          keepShow: false,
          size: "3px",
          minSize: 0.2,
        },
      },
    };
  },
  components: {
    vuescroll,
  },
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews;
    },
    key() {
      return this.$route.path;
    },
  },
};
</script>

<style lang="scss" scoped>
.app-main {
  /* 50= navbar  50  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 10px;
}

// .chart-wrappers {
//   padding: 10px;
//   background-color: rgb(240, 242, 245);
//   .chart-wrapper {
//     background: #fff;
//     padding: 16px 16px 0;
//     margin-bottom: 32px;
//   }
// }

.fixed-header + .app-main {
  padding-top: 50px;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100vh - 94px);
  }

  .fixed-header + .app-main {
    padding-top: 94px;
  }
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
