<template>
    <div v-if="mostrar" data-dialog-backdrop="modal" data-dialog-backdrop-close="true"
        class="inset-0 z-[999] fixed grid h-screen w-screen place-items-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity">
        <div class="w-1/3">
            <span id="ProgressLabel" class="sr-only">Loading</span>

            <span role="progressbar" aria-labelledby="ProgressLabel" aria-valuenow="75"
                class="block rounded-full bg-gray-200">
                <span class="block barra-de-progresso h-3 rounded-full" style="width: 100%"></span>
            </span>
        </div>
    </div>
</template>

<script setup lang="ts">

import { onUpdated, ref } from 'vue';

interface Props {
    mostrar: boolean,
}

const props = defineProps<Props>();
let mostrar = ref<boolean>(false);

onUpdated(() => {
    mostrar.value = props.mostrar;
})

</script>

<style>
.barra-de-progresso {
    animation: progressAnimationStrike 5s infinite;
}

@keyframes progressAnimationStrike {
    from {
        --tw-gradient-from: rgb(45 212 191) var(--tw-gradient-to-position);
        --tw-gradient-to: #374151 var(--tw-gradient-from-position);
        background-image: repeating-linear-gradient(50deg, var(--tw-gradient-from) 0, var(--tw-gradient-from) 20px, var(--tw-gradient-to) 20px, var(--tw-gradient-to) 40px);

    }

    to {
        --tw-gradient-from: #374151 var(--tw-gradient-from-position);
        --tw-gradient-to: rgb(45 212 191) var(--tw-gradient-to-position);
        background-image: repeating-linear-gradient(50deg, var(--tw-gradient-from) 0, var(--tw-gradient-from) 20px, var(--tw-gradient-to) 20px, var(--tw-gradient-to) 40px);
    }
}
</style>