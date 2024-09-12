<script setup lang="ts">
import Menu from './components/Menu.vue'


</script>

<template>
    <div class="flex">
        <Menu></Menu>
        <div class="h-screen flex-1 flex-col justify-between border-e bg-white">
            <router-view></router-view>
        </div>
    </div>
</template>

<style scoped></style>
