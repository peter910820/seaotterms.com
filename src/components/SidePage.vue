<template>
    aaa
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