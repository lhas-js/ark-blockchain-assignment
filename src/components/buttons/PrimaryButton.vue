<template>
  <button class="primary-button" v-if="component === 'button'">
    <slot></slot>
  </button>
  <router-link class="primary-button" v-else :to="to"
    ><slot></slot
  ></router-link>
</template>

<script lang="ts">
import Vue from "vue";

const PrimaryButtonProps = Vue.extend({
  props: {
    component: {
      type: String,
      default: "link"
    },
    to: {
      type: String
    }
  }
});

export default class PrimaryButton extends PrimaryButtonProps {}
</script>
