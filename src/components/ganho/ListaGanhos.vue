<template>
    <div class="grid grid-cols-12 w-full">
        <div class="col-span-10 col-start-2 ">
            <div class="row flex justify-end items-end my-32 mb-5">
                <div class="grupo">
                    <router-link to="/ganhos-cadastro"
                        class="inline-block rounded-xl min-h bg-gray-700 px-7 py-1.5 text-white font-bold focus:outline-none focus:ring hover:text-teal-400 hover:px-8 hover:py-2 ease-in duration-300"
                        href="#">
                        <font-awesome-icon icon="fa-solid fa-plus" /> Adicionar Ganho
                    </router-link>
                </div>
            </div>
            <div class="row flex items-center p-12 rounded-lg justify-center" style="background: #edf2f7;">
                <section class="bg-white py-10 px-4 lg:px-16 w-full"> 
                    <div class="container mx-auto">
                        <h1 class="text-2xl  text-center font-bold pb-12 sm:text-3xl uppercase">Atividades de ganho</h1>
                        <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-28 lg:gap-y-16">
                            <div v-for="ganho in listaDadosTabelaGanho" :key="ganho.id" class="relative group h-48 flex flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
                                <a href="#" class="block">
                                    <div class="h-28">
                                        <div
                                            class="absolute -top-20 lg:top-[-10%] left-[5%] z-40  group-hover:top-[-40%] group-hover:opacity-[0.9] duration-300 w-[90%] h-48  rounded-xl justify-items-center align-middle" :style="{backgroundColor: ganho.cor_renda}">
                                            <img :src="ganho.caminho_imagem"
                                                class="w-36 h-36  mt-6 m-auto" alt="Automotive" title="Automotive" loading="lazy"
                                                width="200" height="200">
                                        </div>
                                    </div>
                                    <div class="p-6 z-10 w-full">
                                        <p
                                            class="mb-2 inline-block text-tg text-center w-full text-xl font-sans font-semibold leading-snug tracking-normal   antialiased">
                                            {{ganho.nome}}
                                        </p>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

import { onMounted, ref, inject, watch, Ref } from 'vue';
import { GanhoInterface } from '../../types/Ganho';

let nomeGanhoFiltro = ref<string>('');
let codigoRemoverGanho = ref<number>(0);
let codigoEdicaoGanho = ref<number>(0);

type FuncaoMensagemType = (texto: string, tipo: string, tempo: number) => void;
type FuncaoModalType = (texto: string, titulo: string) => void;

interface modalInjection {
    valorRetornadoModal: Ref<boolean>;
    atualizaModal: (newLocation: boolean) => void;
}

let listaDadosTabelaGanho = ref<GanhoInterface[]>();

const mostrarMensagem = inject<FuncaoMensagemType>('mostrarMensagem', () => { });

const modalInjection = inject<modalInjection>('valorModal');

if (!modalInjection) {
    throw new Error("modal injection not provided");
}

const { valorRetornadoModal, atualizaModal } = modalInjection;

async function listarDadosTabelaGanhos() {
    await fetch(`https://api-gasto-certo.vercel.app/api/buscar-ganhos?nome=${nomeGanhoFiltro.value}`)
        .then(response => response.ok ? response.json() : Promise.reject(response))
        .then((retorno) => {

            if (retorno.error) {
                console.error(retorno.error);
                return mostrarMensagem('Erro ao listar ganhos!', 'error', 4000);
            }

            listaDadosTabelaGanho.value = retorno.result;
        });
}

async function deletarGanho() {
    let idGanho: Pick<GanhoInterface, "id"> = {
        id: codigoRemoverGanho.value as number
    };

    await fetch(`https://api-ganho-certo.vercel.app/api/deletar-ganho/${idGanho.id}?deletar-ganho`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(response => response.ok ? response.json() : Promise.reject(response))
        .then(async (retorno) => {

            if (retorno.error) {
                console.error(retorno.error);
                return mostrarMensagem('Erro ao remover ganho!', 'error', 4000);
            }

            mostrarMensagem('ganho removido com sucesso!', 'success', 4000);
            atualizaModal(false);
            await listarDadosTabelaGanhos();
        });
}

onMounted(async () => {
    await listarDadosTabelaGanhos();
})

watch(valorRetornadoModal, async (novoValor) => {
    if (novoValor) {
        await deletarGanho();
    }
});

</script>

<style>
select:invalid {
    color: rgb(156, 156, 156);
}

tbody tr:hover.shadowNow {
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
}

.efeito-ativado {
    border: 1px solid red;
}

.tooltip {
    visibility: hidden;
    position: absolute;
}

.has-tooltip:hover .tooltip {
    visibility: visible;
    z-index: 50;
}
</style>