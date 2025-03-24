<template>
    <div v-if="mostrar" data-dialog-backdrop="modal" data-dialog-backdrop-close="true"
        class="inset-0 z-10 fixed grid h-screen w-screen place-items-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300">
        <div data-dialog="modal" class="relative m-4 p-4 w-2/5 min-w-[40%] max-w-[40%] rounded-lg bg-white shadow-sm">
            <div class="flex shrink-0 items-center justify-center pb-4 text-xl font-medium text-slate-800">
                <h3 class="font-bold">{{ props.titulo }}</h3>
            </div>
            <div
                class="flex relative justify-center border-t border-slate-200 py-20 leading-normal text-slate-700 font-light">
                <p class="font-medium">{{ props.texto }}</p>
            </div>
            <div class="flex shrink-0 flex-wrap items-center pt-4 justify-end">
                <button data-dialog-close="true"
                    class="inline-block rounded-xl mr-6 bg-red-700 px-5 py-2 mt-2 text-white font-medium focus:outline-none focus:ring hover:bg-red-600 ease-in duration-300"
                    type="button" @click="retornarValorEscolhido(false)">
                    Cancelar
                </button>
                <button data-dialog-close="true"
                    class="inline-block rounded-xl bg-gray-700 px-7 py-2 mt-2 text-white font-medium focus:outline-none focus:ring hover:bg-gray-600 ease-in duration-300"
                    type="button" @click="retornarValorEscolhido(true)">
                    Confirmar
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

import { onUpdated, ref } from 'vue';

interface Props {
    mostrar: boolean,
    titulo: string,
    texto: string,
}
const props = defineProps<Props>();
let mostrar = ref<boolean>(false);

onUpdated(() => {
    mostrar.value = props.mostrar;
})

function retornarValorEscolhido(valorEscolhido: boolean) {
    emit('retorna-valor-modal', valorEscolhido);
}

const emit = defineEmits(['retorna-valor-modal']);

</script>

<style></style>