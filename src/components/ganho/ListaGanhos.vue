<template>
    <div class="grid grid-cols-12 w-full">
        <div class="col-span-10 col-start-2 ">
            <div class="row flex justify-end items-end my-32 mb-5">
                <div class="grupo">
                    <router-link to="/gastos-cadastro"
                        class="inline-block rounded-xl bg-gray-700 px-7 py-1.5 text-white font-bold focus:outline-none focus:ring hover:text-teal-400 hover:px-8 hover:py-2 ease-in duration-300"
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
                            <div class="relative group h-48 flex   flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
                                <a href="#" class="block">
                                    <div class="h-28">
                                        <div
                                            class="absolute -top-20 lg:top-[-10%] left-[5%] z-40  group-hover:top-[-40%] group-hover:opacity-[0.9]   duration-300 w-[90%] h-48 bg-blue-500 rounded-xl justify-items-center align-middle">
                                            <img src="../../assets/ganho-trabalho.png"
                                                class="w-36 h-36  mt-6 m-auto" alt="Automotive" title="Automotive" loading="lazy"
                                                width="200" height="200">
                                        </div>
                                    </div>
                                    <div class="p-6 z-10 w-full">
                                        <p
                                            class="mb-2 inline-block text-tg text-center w-full text-xl font-sans font-semibold leading-snug tracking-normal   antialiased">
                                            Emprego
                                        </p>
                                    </div>
                                </a>
                            </div>

                            <div class="relative group h-48 flex flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
                                <a href="#" class="block">
                                    <div class="h-28">
                                        <div
                                            class="absolute -top-20 lg:top-[-10%] left-[5%] z-40 group-hover:top-[-40%] group-hover:opacity-[0.9]   duration-300 w-[90%] h-48 bg-red-500 rounded-xl justify-items-center align-middle">
                                            <img src="../../assets/ganho-youtube.png"
                                                class="w-36 h-36 mt-6 m-auto" alt="Toys and Baby Products"
                                                title="Toys and Baby Products" loading="lazy" width="200" height="200">
                                        </div>
                                    </div>
                                    <div class="p-6 z-10 w-full ">
                                        <p
                                            class="mb-2 inline-block text-tg text-center w-full text-xl font-sans font-semibold leading-snug tracking-normal   antialiased">
                                            Youtube
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
    <ModalEdicao @fechar-modal-edicao="fecharModalEdicao" @atualizar-lista-gastos="listarDadosTabelaGastos" :codigoGasto="codigoEdicaoGasto"></ModalEdicao>
</template>

<script setup lang="ts">
import ModalEdicao from '../gasto/ModalEdicaoGasto.vue';

import { format } from 'v-money3';
import { onMounted, ref, inject, watch, Ref } from 'vue';
import { GastoInterface } from '../../types/Gasto';

let nomeGastoFiltro = ref<string>('');
let categoriaGastoFiltro = ref<string>('');
let codigoRemoverGasto = ref<number>(0);
let codigoEdicaoGasto = ref<number>(0);

const fecharModalEdicao = () => {
    codigoEdicaoGasto.value = 0;
};


type FuncaoMensagemType = (texto: string, tipo: string, tempo: number) => void;
type FuncaoModalType = (texto: string, titulo: string) => void;

interface modalInjection {
    valorRetornadoModal: Ref<boolean>;
    atualizaModal: (newLocation: boolean) => void;
}

const config: object = {
    prefix: 'R$ ',
    suffix: '',
    thousands: '.',
    decimal: ',',
    precision: 2,
    disableNegative: true,
}

let listaDadosTabelaGasto = ref<GastoInterface[]>();

const mostrarMensagem = inject<FuncaoMensagemType>('mostrarMensagem', () => { });

const abrirModal = inject<FuncaoModalType>('abrirModal', () => { });

const modalInjection = inject<modalInjection>('valorModal');

if (!modalInjection) {
    throw new Error("modal injection not provided");
}

const { valorRetornadoModal, atualizaModal } = modalInjection;

async function abrirModalRemover(dadosGasto: GastoInterface) {
    codigoRemoverGasto.value = dadosGasto.id;
    abrirModal(`Deseja realmente remover o ganho ${dadosGasto.nome}, de valor ${dadosGasto.valor}`, 'Remover Ganho');
}

async function abrirModalEdicaoGasto(dadosGasto: GastoInterface) {
    codigoEdicaoGasto.value = dadosGasto.id;
}

async function listarDadosTabelaGastos() {
    await fetch(`https://api-gasto-certo.vercel.app/api/buscar-gastos?nomeGasto=${nomeGastoFiltro.value}&categoriaGasto=${categoriaGastoFiltro.value}`)
        .then(response => response.ok ? response.json() : Promise.reject(response))
        .then((retorno) => {

            if (retorno.error) {
                console.error(retorno.error);
                return mostrarMensagem('Erro ao listar gastos!', 'error', 4000);
            }

            retorno.result.forEach((element: GastoInterface) => {
                element.data_gasto = formatarDataBR(element.data_gasto);
                element.valor = format(element.valor, config);
            });

            listaDadosTabelaGasto.value = retorno.result;
        });
}

function formatarDataBR(stringData: string) {
    if (stringData) {
        const data = new Date(stringData);
        return data.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    }
    return "";
}

async function deletarGasto() {
    let idGasto: Pick<GastoInterface, "id"> = {
        id: codigoRemoverGasto.value as number
    };

    await fetch(`https://api-gasto-certo.vercel.app/api/deletar-gasto/${idGasto.id}?deletar-gasto`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(response => response.ok ? response.json() : Promise.reject(response))
        .then(async (retorno) => {

            if (retorno.error) {
                console.error(retorno.error);
                return mostrarMensagem('Erro ao remover gasto!', 'error', 4000);
            }

            mostrarMensagem('Gasto removido com sucesso!', 'success', 4000);
            atualizaModal(false);
            await listarDadosTabelaGastos();
        });
}

onMounted(async () => {
    await listarDadosTabelaGastos();
})

watch(valorRetornadoModal, async (novoValor) => {
    if (novoValor) {
        await deletarGasto();
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