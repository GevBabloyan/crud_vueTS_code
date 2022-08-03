<template>
  <AlertView :arrayAlert="arrayAlert" v-on:changeShow="closeAlert($event)" />
  <div class="register-page">
    <div class="container-register" @keydown.enter="btnRegister">
      <h2 class="title-page">
        {{ getLocalizationtxt.userPage.registration }}
      </h2>
      <div class="row-input">
        <input
          type="text"
          v-model="name"
          autofocus
          @paste="$event.preventDefault()"
          @input="handlingFormInput('string', 'name', 'errorName', 2)"
          class="input-form"
          :placeholder="getLocalizationtxt.userPage.name"
          maxlength="16"
        />
        <p :class="errorName" class="error-input name" ref="textErrorName">
          {{ getLocalizationtxt.userPage.nameError }}
        </p>
      </div>
      <div class="row-input">
        <input
          type="text"
          v-model="phone"
          @input="handlingFormInput('number', 'phone', 'errorPhone', 5)"
          @paste="$event.preventDefault()"
          class="input-form"
          :placeholder="getLocalizationtxt.userPage.phone"
          maxlength="16"
        />
        <p :class="errorPhone" class="error-input phone">
          {{ getLocalizationtxt.userPage.phoneError }}
        </p>
      </div>
      <div class="row-input">
        <input
          type="email"
          v-model="email"
          @input="handlingFormInput('email', 'email', 'errorEmail', 5)"
          @paste="$event.preventDefault()"
          class="input-form"
          :placeholder="getLocalizationtxt.userPage.email"
        />
        <p :class="errorEmail" class="error-input email">
          {{ getLocalizationtxt.userPage.emailError }}
        </p>
      </div>
      <div class="row-input">
        <input
          :type="typePassword"
          v-model="password"
          class="input-form"
          @input="handlingFormInput('password', 'password', 'errorPassword', 5)"
          maxlength="32"
          :placeholder="getLocalizationtxt.userPage.password"
          ref="inputPassword"
          @paste="$event.preventDefault()"
        />
        <img
          src="@/assets/icons/eye.svg"
          class="icon-eye"
          @click="changeInputType('typePassword')"
        />
        <p :class="errorPassword" class="error-input password">
          {{ getLocalizationtxt.userPage.passwordError }}
        </p>
      </div>
      <div class="row-input">
        <input
          :type="typeConfirmPassword"
          v-model="confirmPassword"
          class="input-form"
          @input="
            handlingFormInput(
              'confirmPassword',
              'confirmPassword',
              'confirmPasswordError',
              5
            )
          "
          maxlength="32"
          :placeholder="getLocalizationtxt.userPage.confirmPassword"
          @paste="$event.preventDefault()"
        />
        <img
          src="@/assets/icons/eye.svg"
          class="icon-eye"
          @click="changeInputType('typeConfirmPassword')"
        />
        <p :class="confirmPasswordError" class="error-input confirm-password">
          {{ getLocalizationtxt.userPage.confirmPasswordError }}
        </p>
      </div>
      <button class="btn-form blue" @click="btnRegister">
        {{ getLocalizationtxt.userPage.send }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Register from "@/types/User/Register";
import AlertView from "@/components/AlertView.vue";
import Languages from "@/types/Localization/Language/Languages";
import {
  replaceValue,
  emptyValidation,
  emailValidation,
} from "@/plugins/Validation";

export default defineComponent({
  name: "RegistrationView",
  components: { AlertView },
  data() {
    return {
      name: "",
      errorName: "",
      phone: "",
      errorPhone: "",
      email: "",
      errorEmail: "",
      password: "",
      errorPassword: "",
      typePassword: "password",
      typeConfirmPassword: "password",
      confirmPassword: "",
      confirmPasswordError: "",
      registerClicked: true,
      actionsEmailError: false,
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
      typeValidation: string,
      vModel: string,
      errorName: string,
      minLength: number
    ): void {
      if (typeValidation === "string" || typeValidation === "number") {
        if (typeValidation === "string") {
          this.name = replaceValue(this.name, typeValidation) as string;
          this.errorName = emptyValidation(this.name, minLength)
            ? "true"
            : "false";
        }
        if (typeValidation === "number") {
          this.phone = replaceValue(this.phone, typeValidation) as string;
          this.errorPhone = emptyValidation(this.phone, minLength)
            ? "true"
            : "false";
        }
      } else if (typeValidation === "email") {
        this.errorEmail = emailValidation(this.email) ? "true" : "false";
      } else if (typeValidation === "password") {
        this.errorPassword = emptyValidation(this.password, minLength)
          ? "true"
          : "false";
        if (this.confirmPasswordError)
          this.confirmPasswordError =
            emptyValidation(this.confirmPassword, minLength) &&
            this.confirmPassword === this.password
              ? "true"
              : "false";
      } else if (typeValidation === "confirmPassword") {
        this.confirmPasswordError =
          emptyValidation(this.confirmPassword, minLength) &&
          this.confirmPassword === this.password
            ? "true"
            : "false";
      }
    },
    changeInputType(input: string): void {
      if (input === "typePassword")
        this.typePassword = this.typePassword == "text" ? "password" : "text";
      else if (input === "typeConfirmPassword")
        this.typeConfirmPassword =
          this.typeConfirmPassword == "text" ? "password" : "text";
    },
    btnRegister(): void {
      if (this.registerClicked) {
        if (
          this.errorName === "true" &&
          this.errorPhone === "true" &&
          this.errorEmail === "true" &&
          this.errorPassword === "true" &&
          this.confirmPasswordError === "true"
        ) {
          const data: Register = {
            id: null,
            name: this.name,
            phone: this.phone,
            email: this.email,
            password: this.password,
          };
          this.$store.dispatch("A_REGISTER_NEW_USER", data);
          this.checkStateEmailError();
          if (!this.actionsEmailError) {
            this.$store.dispatch("A_AUTOLOGIN");
            this.$router.push("/persons");
          } else {
            this.arrayAlert.show = true;
            this.arrayAlert.msg = this.getLocalizationtxt.alertPage.error_email;
            this.arrayAlert.msgType = "error";
          }
          this.registerClicked = false;
          setTimeout(() => {
            this.registerClicked = true;
          }, 3000);
        } else if (
          this.errorName === "" ||
          this.errorPhone === "" ||
          this.errorEmail === "" ||
          this.errorPassword === "" ||
          this.confirmPasswordError === ""
        ) {
          this.arrayAlert.show = true;
          this.arrayAlert.msg = this.getLocalizationtxt.alertPage.empty_info;
          this.arrayAlert.msgType = "error";
        }
      }
    },
    checkStateEmailError(): void {
      this.actionsEmailError = this.$store.getters["checkStateEmailError"];
    },
    closeAlert(): void {
      this.arrayAlert.show = false;
      this.arrayAlert.msg = "";
    },
  },
});
</script>

<style lang="scss" scoped>
.register-page {
  transform: translate(-50%, -50%);
  position: absolute;
  top: 50%;
  left: 50%;

  .container-register {
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
