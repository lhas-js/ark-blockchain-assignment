<template>
  <button class="primary-button" v-if="component === 'button'">
    <slot></slot>
  </button>
  <router-link class="primary-button" v-else :to="to"
    ><slot></slot
  ></router-link>
</template>

<script>
export default {
  props: {
    component: {
      type: String,
      default: "link"
    },
    to: {
      type: String
    }
  }
};
</script>
