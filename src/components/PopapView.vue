<template>
  <div id="Popap" :class="[{ active: PopapProps.show }]">
    <div class="popapBox">
      <div class="popapOpacity"></div>
      <div class="popap">
        <slot name="headerPopap"></slot>
        <slot name="bodyPopap"></slot>
        <slot name="footerPopap"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "PopapView",
  props: {
    PopapProps: {
      type: Object,
      required: true,
    },
  },
  methods: {
    closePopap(): void {
      this.$emit("closePopap");
    },
    onClickWindow(event: Event): void {
      const target = event.target as HTMLBodyElement;
      if (target.className === "popapOpacity") this.closePopap();
    },
  },
  watch: {
    "PopapProps.show"(): void {
      if (this.PopapProps.show)
        setTimeout(() => {
          document.body.addEventListener("click", this.onClickWindow);
        }, 500);
      else document.body.removeEventListener("click", this.onClickWindow);
    },
  },
});
</script>

<style lang="scss">
#Popap.active {
  display: block;
}
#Popap {
  border: solid 1px black;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: none;

  .popapBox {
    position: relative;

    .popapOpacity {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100vh;
      background-color: black;
      opacity: 0.5;
    }
    .popap {
      position: absolute;
      border: 1px solid black;
      background-color: white;
      padding: 15px 50px;
      top: 50vh;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>
