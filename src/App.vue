<script setup lang="ts">
import Mensagem from './components/Mensagem.vue';
import Menu from './components/Menu.vue'

import { provide, ref } from 'vue';
import ModalConfirmacao from './components/ModalConfirmacao.vue';

interface DadosMensagem {
    texto: string;
    tipo: string;
    tempo: number;
    mostrar: boolean;
}

type MinhaFuncaoType = (texto: string, tipo: string, tempo: number) => void;

let dadosMensagem = ref<DadosMensagem>({
    texto: '' as string,
    tipo: '' as string,
    tempo: 4000 as number,
    mostrar: false as boolean
})

function mostrarMensagem(texto: string = '', tipo: string = '', tempo: number = 4000,): void {
    dadosMensagem.value.texto = texto;
    dadosMensagem.value.tipo = tipo;
    dadosMensagem.value.tempo = tempo;
    dadosMensagem.value.mostrar = true;
}

function handleUpdate() {
    dadosMensagem.value.mostrar = false;
};

provide<MinhaFuncaoType>('mostrarMensagem', mostrarMensagem);

provide('mostrarMensagem', mostrarMensagem);

</script>

<template>
    <ModalConfirmacao>
    </ModalConfirmacao>
    <Mensagem :mostrar="dadosMensagem.mostrar" :texto="dadosMensagem.texto" :tempo="dadosMensagem.tempo"
        :tipo="dadosMensagem.tipo" @update-value="handleUpdate">
    </Mensagem>
    <div class="flex">
        <!-- <div class="bg-green-400 h-80 w-48"></div>
        <div class="bg-blue-400 h-80 w-48"></div> -->
        <Menu></Menu>
        <router-view></router-view>
    </div>
</template>

<style scoped>
.invalido {
    border: 1px solid rgb(221, 22, 22) !important;
}

.validado {
    border: 1px solid rgb(25, 206, 55) !important;
}
</style>
