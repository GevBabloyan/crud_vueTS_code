<template>
  <AlertView :arrayAlert="arrayAlert" v-on:changeShow="closeAlert($event)" />
  <div class="login-page">
    <div class="container-login" @keydown.enter="btnLogin">
      <h2 class="title-page">
        {{ getLocalizationtxt.userPage.authorization }}
      </h2>
      <div class="row-input row-email">
        <input
          type="email"
          v-model="email"
          autofocus
          @paste="$event.preventDefault()"
          @input="handlingFormInput($event, 'email', 5)"
          class="input-form"
          v-bind:placeholder="getLocalizationtxt.userPage.email"
        />
        <p :class="errorEmail" class="error-input email">
          {{ getLocalizationtxt.userPage.emailError }}
        </p>
      </div>
      <div class="row-input row-password">
        <input
          :type="typePassword"
          v-model="password"
          @paste="$event.preventDefault()"
          @input="handlingFormInput($event, 'password', 5)"
          maxlength="32"
          class="input-form"
          v-bind:placeholder="getLocalizationtxt.userPage.password"
        />
        <img
          src="@/assets/icons/eye.svg"
          @click="changeInputType"
          class="icon-eye"
        />
        <p :class="errorPassword" class="error-input password">
          {{ getLocalizationtxt.userPage.passwordError }}
        </p>
      </div>
      <button class="btn-form blue" @click="btnLogin">
        {{ getLocalizationtxt.userPage.send }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AlertView from "@/components/AlertView.vue";
import { emptyValidation, emailValidation } from "@/plugins/Validation";
import Languages from "@/types/Localization/Language/Languages";

export default defineComponent({
  name: "LoginView",
  components: { AlertView },
  data() {
    return {
      email: "",
      errorEmail: "",
      password: "",
      errorPassword: "",
      typePassword: "password",
      loginClicked: true,
      logged: false,
      arrayAlert: {
        msg: "",
        msgType: "",
        show: false,
      },
    };
  },
  computed: {
    getLocalizationtxt(): Languages {
      return this.$store.getters["localizationInfo"];
    },
  },
  methods: {
    handlingFormInput(
      event: InputEvent,
      typeValidation: string,
      minLength: number
    ): void {
      if (typeValidation === "email")
        this.errorEmail = emailValidation(this.email) ? "true" : "false";
      else {
        let errorCheckedEmpty: boolean = emptyValidation(
          this.password,
          minLength
        );
        this.errorPassword = errorCheckedEmpty ? "true" : "false";
      }
    },
    changeInputType(): void {
      this.typePassword = this.typePassword == "text" ? "password" : "text";
    },
    btnLogin(): void {
      if (this.loginClicked) {
        if (this.errorEmail === "true" && this.errorPassword === "true") {
          const data: {
            id: null;
            email: string;
            password: string;
          } = {
            id: null,
            email: this.email,
            password: this.password,
          };
          this.$store.dispatch("A_CHECK_LOGIN", data);
          this.checkLogin();
        } else if (!this.errorEmail || !this.errorPassword) {
          this.arrayAlert.show = true;
          this.arrayAlert.msg = this.getLocalizationtxt.alertPage.empty_info;
          this.arrayAlert.msgType = "error";
        }
        this.loginClicked = false;
        setTimeout(() => {
          this.loginClicked = true;
        }, 1000);
      }
    },
    checkLogin(): void {
      this.logged = this.$store.getters["checkLogin"];
      if (this.logged) this.$router.push("/persons");
      else {
        this.arrayAlert.show = true;
        this.arrayAlert.msg = this.getLocalizationtxt.alertPage.error_login;
        this.arrayAlert.msgType = "error";
      }
    },
    closeAlert(): void {
      this.arrayAlert.show = false;
      this.arrayAlert.msg = "";
    },
  },
});
</script>

<style lang="scss" scoped>
.login-page {
  transform: translate(-50%, -50%);
  position: absolute;
  top: 50%;
  left: 50%;

  .container-login {
    border: solid 1px #dee2e6;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 35px;
    animation: openForm 0.5s;

    @keyframes openForm {
      0% {
        transform: translate(20%, 0px);
      }
      100% {
        transform: translate(0px, 0px);
      }
    }

    .title-page {
      margin-bottom: 20px;
    }

    .icon-eye {
      width: 15px;
      cursor: pointer;
      position: absolute;
      top: 7px;
      right: 5px;
    }
  }
}
</style>
