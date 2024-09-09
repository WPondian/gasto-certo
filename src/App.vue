<script setup lang="ts">
import Menu from './components/Menu.vue'
import { ref } from 'vue';
import type { PersonInterface } from './types/Person';

let age2 = ref<string>('leo');
let age = ref<number | string>(41);
let person = ref<PersonInterface>({
    id: 0,
    name: 'Willian',
    age: 26
});

let teste: PersonInterface = {
    id: 1,
    name: 'leo',
    age: 32
}


let arrayPeople = ref<PersonInterface[]>([
    {
        id: 0 as number,
        name: 'Willian' as string,
        age: 26 as number
    },
    {
        id: 1 as number,
        name: 'Isis' as string,
        age: 24 as number
    },
]);

</script>

<template>
    <div class="flex">
        <Menu></Menu>
        <h1>{{ person.name }}</h1>
        <div class="h-screen flex-1 flex-col justify-between border-e bg-white">
            <router-view></router-view>
        </div>
    </div>
</template>

<style scoped></style>
