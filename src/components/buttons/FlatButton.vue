<template>
  <button class="flat-button" v-if="component === 'button'">
    <slot></slot>
  </button>
  <router-link class="flat-button" v-else :to="to">
    <slot></slot>
  </router-link>
</template>

<script lang="ts">
import Vue from "vue";

const FlatButtonProps = Vue.extend({
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

export default class FlatButton extends FlatButtonProps {}
</script>
