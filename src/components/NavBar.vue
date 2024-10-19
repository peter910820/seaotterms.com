<template>
  <nav>
    <div class="nav-wrapper">
      <a href="#!" class="brand-logo">
        <img alt="Vue logo" src="@/assets/logo.png" />
      </a>
      <a href="#" data-target="mobile-demo" class="sidenav-trigger"
        ><i class="material-icons">menu</i></a
      >
      <ul class="right hide-on-med-and-down">
        <li><a href="sass.html">Sass</a></li>
        <li><a href="badges.html">Components</a></li>
        <li><a href="collapsible.html">Javascript</a></li>
        <li><a href="mobile.html">Mobile</a></li>
      </ul>
    </div>
  </nav>

  <ul class="sidenav" id="mobile-demo">
    <li><a href="sass.html">Sass</a></li>
    <li><a href="badges.html">Components</a></li>
    <li><a href="collapsible.html">Javascript</a></li>
    <li><a href="mobile.html">Mobile</a></li>
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
