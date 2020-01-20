<template>
  <button
    @click="onClick"
    class="mx-auto block my-6 p-3 text-gray-500 hover:text-gray-600 border rounded border-gray-500 hover:border-gray-600"
  >
    Load More
  </button>
</template>

<script>
export default {
  props: {
    onClick: {
      type: Function,
      required: true
    }
  }
};
</script>

<style></style>
