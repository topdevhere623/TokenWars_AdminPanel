<template>
  <div :class="{ 'has-logo': showLogo }">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="true"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in menuList"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Logo from "./Logo";
import SidebarItem from "./SidebarItem";
import variables from "@/styles/variables.scss";
import store from "@/store";

export default {
  data() {
    return {
      menuList: [],
    };
  },
  components: { SidebarItem, Logo },
  computed: {
    ...mapGetters(["sidebar"]),
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo;
    },
    variables() {
      return variables;
    },
    isCollapse() {
      return !this.sidebar.opened;
    },
  },

  created() {
    this.getUserMenuFunc();
  },
  methods: {
    async getUserMenuFunc() {
      let res = await this.$http.getMenuList();
      if (res) {
        this.menuList = res;
      }
    },
    getSubNavFunc(path) {
      let arr = [];
      this.menuList.forEach((x) => {
        if (x.children && x.children.length > 0) {
          x.children.forEach((y) => {
            if (y.path == path) {
              arr = [
                { name: x.menuName, path },
                { name: y.menuName, path },
              ];
            }
          });
        } else {
          if (x.path == path) {
            arr = [{ name: x.menuName, path }];
          }
        }
      });

      this.$emit("func", arr);
    },
    goUrl(url) {
      if (this.$route.name !== url) {
        this.getSubNavFunc(url);
        this.$router.push({ name: url });
      }
    },
  },
};
</script>
