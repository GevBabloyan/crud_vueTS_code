<template>
  <div id="body-page">
    <HeaderView />
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HeaderView from "./components/HeaderView.vue";

export default defineComponent({
  name: "App",
  components: { HeaderView },
  mounted() {
    this.checkUsersInCookies();
  },
  methods: {
    checkUsersInCookies(): void {
      this.$store.dispatch("A_USERS_IN_COOKI");
    },
  },
});
</script>

<style lang="scss">
@import "assets/css/global.css";
</style>
