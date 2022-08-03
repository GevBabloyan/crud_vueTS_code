<template>
  <div
    id="alert"
    :class="[{ active: arrayAlert.show }, arrayAlert.msgType, 'alertBox']"
  >
    <p>{{ arrayAlert.msg }}</p>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "AlertView",
  props: {
    arrayAlert: {
      type: Object,
      required: false,
    },
  },
  watch: {
    "arrayAlert.show"() {
      setTimeout(() => {
        this.$emit("changeShow");
      }, 2000);
    },
  },
});
</script>

<style lang="scss">
.alertBox {
  width: max-content;
  height: 0;
  overflow: hidden;
  position: fixed;
  top: 20px;
  right: 2%;
  padding: 6px 12px;
  border-radius: 7px;
  color: white;
  z-index: 1;
  pointer-events: none;
}
.alertBox.active {
  height: auto;
  animation: showAlert 0.3s;
}
@keyframes showAlert {
  from {
    top: 5px;
  }
  to {
    top: 20px;
  }
}
.alertBox.active.success {
  background-color: #551a8b;
}
.alertBox.active.error {
  background-color: red;
}
</style>
