<script setup lang="ts">
import Mensagem from './components/Mensagem.vue';
import Menu from './components/Menu.vue'

import { provide, ref } from 'vue';
import ModalConfirmacao from './components/ModalConfirmacao.vue';
import Carregando from './components/Carregando.vue';

// --------------------------------------------------------------------------------

type FuncaoMensagemType = (texto: string, tipo: string, tempo: number) => void;
type FuncaoModalType = (texto: string, titulo: string) => void;

interface DadosMensagem {
    texto: string;
    tipo: string;
    tempo: number;
    mostrar: boolean;
}

let dadosMensagem = ref<DadosMensagem>({
    texto: '' as string,
    tipo: '' as string,
    tempo: 4000 as number,
    mostrar: false as boolean
});

interface DadosModal {
    texto: string;
    titulo: string;
    mostrar: boolean;
}

let dadosModal = ref<DadosModal>({
    texto: '' as string,
    titulo: '' as string,
    mostrar: false as boolean
});

let valorRetornadoModal = ref<boolean>(false);


let mostrarCarregamento = ref<boolean>(false);

// --------------------------------------------------------------------------------

function mostrarMensagem(texto: string = '', tipo: string = '', tempo: number = 4000,): void {
    dadosMensagem.value.texto = texto;
    dadosMensagem.value.tipo = tipo;
    dadosMensagem.value.tempo = tempo;
    dadosMensagem.value.mostrar = true;
}

function atualizaMensagem() {
    dadosMensagem.value.mostrar = false;
};

function abrirModal(titulo: string = '', texto: string = ''): void {
    dadosModal.value.titulo = texto;
    dadosModal.value.texto = titulo;
    dadosModal.value.mostrar = true;
}

function atualizaModal(valorModal: boolean) {
    dadosModal.value.mostrar = false;
    valorRetornadoModal.value = valorModal;
}

function abrirCarregamento() {
    mostrarCarregamento.value = true;
}

function fecharCarregando() {
    mostrarCarregamento.value = false;
}

provide('valorModal', { valorRetornadoModal, atualizaModal });
provide<FuncaoMensagemType>('mostrarMensagem', mostrarMensagem);
provide<FuncaoModalType>('abrirModal', abrirModal);
provide('abrirCarregamento', abrirCarregamento);
provide('fecharCarregando', fecharCarregando);

</script>

<template>
    <Carregando :mostrar="mostrarCarregamento">
    </Carregando>
    <ModalConfirmacao @retorna-valor-modal="atualizaModal" :titulo="dadosModal.titulo" :texto="dadosModal.texto"
        :mostrar="dadosModal.mostrar">
    </ModalConfirmacao>
    <Mensagem :mostrar="dadosMensagem.mostrar" :texto="dadosMensagem.texto" :tempo="dadosMensagem.tempo"
        :tipo="dadosMensagem.tipo" @update-value="atualizaMensagem">
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
