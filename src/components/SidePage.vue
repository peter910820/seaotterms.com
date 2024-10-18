<template>
  <div class="row">
    <div class="col">
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
    props: {
    msg: String
    }
})
export default class SidePage extends Vue {
    msg!: string
}
</script>

<style scoped>
.row{
  margin: 10px;
  max-height: 370px;
  height: 370px;
  border: 2px solid black;
  border-radius: 5px;
  padding-top: 20px;
}
</style>