<template>
  <nav>
    <div class="nav-wrapper">
      <a href="/" class="brand-logo">
        <img alt="Vue logo" src="@/assets/logo.png" />
      </a>
      <a href="#" data-target="mobile-demo" class="sidenav-trigger"
        ><i class="material-icons">menu</i></a
      >
      <ul class="right hide-on-med-and-down">
        <li><a href="./">Home</a></li>
        <li><a href="./article">Article</a></li>
        <li>
          <a
            href="https://github.com/peter910820/seaotterms.com-backend"
            target="blank"
          >
            Backend-repo</a
          >
        </li>
        <li><a href="./login">Login</a></li>
      </ul>
    </div>
  </nav>

  <ul class="sidenav" id="mobile-demo">
    <li><a href="./">Home</a></li>
    <li><a href="./article">Article</a></li>
    <li>
      <a
        href="https://github.com/peter910820/seaotterms.com-backend"
        target="blank"
      >
        Backend-repo</a
      >
    </li>
    <li><a href="./login">Login</a></li>
  </ul>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";

export default class NavBar extends Vue {}
</script>

<style scoped>
.brand-logo img {
  max-width: 50px;
  vertical-align: middle;
}
</style>
