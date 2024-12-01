<template>
  <input
    type="text"
    :value="modelValue"
    @input="
      $emit('update:modelValue', ($event.target as HTMLInputElement).value)
    "
  />
</template>

<script lang="ts">
export default {
  props: ["modelValue"],
};
</script>
