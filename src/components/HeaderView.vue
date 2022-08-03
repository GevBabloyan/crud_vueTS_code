<template>
  <div id="nav">
    <div
      :class="['btn-open-mobile-menu', { show: showNavbar }]"
      @click="showNavbar = !showNavbar"
    >
      <div class="black-line top"></div>
      <div class="black-line center"></div>
      <div class="black-line bottom"></div>
    </div>
    <div
      class="pc-mobile-content d-flex align-items-center justify-content-between"
      :class="{ show: showNavbar }"
    >
      <div>
        <h3>{{ pageTitle }}</h3>
      </div>
      <div class="links-content d-flex align-items-center">
        <div :class="[{ 'd-none': checkUserLogged }, 'header-out']">
          <router-link to="/register" class="link-page">{{
            getLocalizationtxt.userPage.registration
          }}</router-link>
          <router-link to="/" class="link-page">{{
            getLocalizationtxt.userPage.authorization
          }}</router-link>
        </div>
        <div :class="[{ 'd-none': !checkUserLogged }, 'header-in']">
          <button class="btn-exit" @click="logout">
            {{ getLocalizationtxt.headerPage.exit }}
          </button>
        </div>
        <select
          v-model="localizationSelected"
          @change="changeLocalization($event.target.value)"
          class="select-language"
        >
          <option class="options-lng">EN</option>
          <option class="options-lng">РУ</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Languages from "@/types/Localization/Language/Languages";
import Query from "@/types/Table/Query";

export default defineComponent({
  name: "HeaderView",
  data() {
    return {
      showNavbar: true,
    };
  },
  mounted() {
    window.addEventListener("resize", this.windowResize);
    this.windowResize();
  },
  computed: {
    pageTitle(): string {
      return this.getLocalizationtxt.titlesPage[
        this.$route.meta.title as string
      ];
    },
    localizationSelected(): void {
      return this.$store.getters["getLocalizationSelected"];
    },
    getLocalizationtxt(): Languages {
      return this.$store.getters["localizationInfo"];
    },
    checkUserLogged(): boolean {
      return this.$store.getters["checkLogin"];
    },
  },
  methods: {
    windowResize(): void {
      if (window.innerWidth <= 425) this.showNavbar = false;
    },
    changeLocalization(value: string): void {
      this.$store.dispatch("A_CHANGE_LOCALIZATION", {
        selectedLng: value,
      });
    },
    logout() {
      this.$store.dispatch("A_LOGOUT").then(() => {
        this.$router.push("/");
      });
    },
  },
  watch: {
    $route(to, from) {
      if (from.name) this.showNavbar = false;
    },
  },
});
</script>

<style lang="scss">
* {
  font-family: sans-serif;
}
.d-none {
  display: none;
}

#nav {
  margin-bottom: 50px;
  padding: 10px 2%;
  border-bottom: 1px solid black;

  .btn-open-mobile-menu {
    display: none;
    height: 12px;

    .black-line {
      width: 20px;
      height: 2px;
      background: black;
      border-radius: 5px;
      position: relative;
    }
    .black-line.top,
    .black-line.center {
      margin-bottom: 3px;
    }
    .black-line.top,
    .black-line.bottom {
      transition: 0.5s;
    }
  }
  .btn-open-mobile-menu.show {
    .black-line.top {
      transform: rotateZ(45deg);
      top: 7px;
    }
    .black-line.center {
      display: none;
    }
    .black-line.bottom {
      transform: rotateZ(-45deg);
      top: 2px;
    }
  }

  .link-page {
    margin-right: 10px;
    color: black;
    text-decoration: unset;
  }
  .link-page.router-link-active {
    color: #0d6efd;
  }
  .link-page:last-child {
    margin-right: 0;
  }

  .btn-exit {
    background: unset;
    border: none;
    font-size: 16px;
    cursor: pointer;
  }

  .select-language {
    background: unset;
    border: none;
    color: black;
    margin-left: 15px;
    font-size: 16px;
    cursor: pointer;
    outline: none;
  }
}

@media only screen and (max-width: 425px) {
  #nav {
    margin-bottom: 40px;
    padding: 8px 2%;

    .btn-open-mobile-menu {
      display: block;
    }

    .pc-mobile-content {
      left: -100%;
      min-width: 100vw;
      position: absolute;
      background-color: white;
      padding: 10px 2%;
      top: 30px;
      flex-direction: column;
      align-items: flex-start;
      transition: 0.5s;
      justify-content: flex-start;
      min-height: 100vh;
      z-index: 1;

      .links-content {
        flex-direction: column;
        align-items: flex-start;
        margin-top: 5px;

        .link-page {
          display: block;
        }
        .select-language {
          margin-left: 0;
          margin-top: 5px;
        }
      }
    }
    .pc-mobile-content.show {
      left: 0;
    }
  }
}
</style>
