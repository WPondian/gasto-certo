<script setup lang="ts">
import Mensagem from './components/Mensagem.vue';
import Menu from './components/Menu.vue'

import { provide, ref } from 'vue';

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

    console.log(`test`)
}

// Definindo o tipo da função


// Usando `provide` para fornecer a função para os filhos
provide<MinhaFuncaoType>('mostrarMensagem', mostrarMensagem);

provide('mostrarMensagem', mostrarMensagem);

</script>

<template>
    <Mensagem :mostrar="dadosMensagem.mostrar" :texto="dadosMensagem.texto" :tempo="dadosMensagem.tempo"
        :tipo="dadosMensagem.tipo">
    </Mensagem>
    <div class="flex">
        <Menu></Menu>
        <div class="h-screen flex-1 flex-col justify-between border-e bg-white">
            <router-view></router-view>
        </div>
    </div>
</template>

<style scoped></style>
