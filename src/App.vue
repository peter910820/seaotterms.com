<template>
  <router-view />
</template>

<script setup lang="ts"></script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: rgba(245, 245, 220, 0.637);
  min-height: 100vh;
  margin-bottom: 0px !important;

  background: linear-gradient(
    -45deg,
    #667e297c,
    #63aa756e,
    #62558570,
    #10778a80
  );
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
