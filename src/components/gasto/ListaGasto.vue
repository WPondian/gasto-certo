<template>
    <div class="grid grid-cols-12 w-full">
        <div class="col-span-10 col-start-2 ">
            <div class="row flex justify-center my-20">
                <h1 class="text-2xl font-bold sm:text-3xl uppercase">Listagem de Gastos</h1>
            </div>
            <div class="row flex justify-between items-end mb-5">
                <div class="grupo grid grid-cols-3 content-end items-end gap-3">
                    <div>
                        <label for="nomeGastoFiltro" class="block font-medium text-gray-700">Nome*: </label>

                        <input type="text" v-model="nomeGastoFiltro" id="nomeGastoFiltro"
                            placeholder="Informe a origem do gasto..." autocomplete="off"
                            class="mt-1 w-full rounded-lg border-padrao-campo text-gray-600 font-semibold focus:ring-0 focus:outline-none focus:border-teal-400 px-3 py-1"
                            required />
                    </div>
                    <div>
                        <label for="categoriaGastoFiltro" class="block font-medium text-gray-700">Categoria*: </label>
                        <select name="categoriaGastoFiltro" id="categoriaGastoFiltro"
                            placeholder="Informe a origem do gasto..." v-model="categoriaGastoFiltro" required
                            class="mt-1 w-full rounded-lg border-padrao-campo text-gray-600 cursor-pointer font-semibold focus:ring-0 focus:outline-none focus:border-teal-400 px-3 py-1">
                            <option class="text-gray-600 font-semibold" value="">Selecione
                                uma
                                opção...
                            </option>
                            <option class="text-gray-600 font-semibold" value="Comida">Comida</option>
                            <option class="text-gray-600 font-semibold" value="Lazer">Lazer</option>
                            <option class="text-gray-600 font-semibold" value="Investimento">Investimento</option>
                            <option class="text-gray-600 font-semibold" value="Custo Fixo">Custo Fixo</option>
                            <option class="text-gray-600 font-semibold" value="Aquisição">Aquisição</option>
                            <option class="text-gray-600 font-semibold" value="Mercado">Mercado</option>
                            <option class="text-gray-600 font-semibold" value="Cotidiano">Cotidiano</option>
                        </select>

                    </div>
                    <div>
                        <button type="button" @click="listarDadosTabelaGastos" v-if="listaDadosTabelaGasto?.length"
                            class="inline-block rounded-xl bg-gray-700 px-7 py-1.5 text-white font-medium focus:outline-none focus:ring hover:text-teal-400 hover:px-8 hover:py-2 hover:mt-0 ease-in duration-300">
                            Buscar
                        </button>
                    </div>
                </div>
                <div class="grupo">
                    <router-link to="/gastos-cadastro"
                        class="inline-block rounded-xl bg-gray-700 px-7 py-1.5 text-white font-bold focus:outline-none focus:ring hover:text-teal-400 hover:px-8 hover:py-2 ease-in duration-300"
                        href="#">
                        <font-awesome-icon icon="fa-solid fa-plus" /> Informar Gasto
                    </router-link>
                </div>
            </div>
            <div v-if="listaDadosTabelaGasto?.length"
                class="overflow-x-auto rounded-t-lg rounded-lg border border-gray-200">
                <table class="min-w-full divide-y-2 divide-gray-200 bg-white">
                    <thead class="bg-gray-700">
                        <tr>
                            <th class="whitespace-nowrap text-left px-4 py-2 font-medium text-white">Nome</th>
                            <th class="whitespace-nowrap text-left px-4 py-2 font-medium text-white">Origem</th>
                            <th class="whitespace-nowrap text-left px-4 py-2 font-medium text-white">Categoria</th>
                            <th class="whitespace-nowrap text-left px-4 py-2 font-medium text-white">Data</th>
                            <th class="whitespace-nowrap text-left px-4 py-2 font-medium text-white">Valor</th>
                            <th class="whitespace-nowrap text-center px-4 py-2 font-medium text-white">Ações</th>
                        </tr>
                    </thead>

                    <tbody class="divide-y divide-gray-200">
                        <tr v-for="dadosGasto in listaDadosTabelaGasto" :key="dadosGasto.id" class="shadowNow">
                            <td class="whitespace-nowrap px-4 font-medium text-gray-900">{{ dadosGasto.nome }}
                            </td>
                            <td class="whitespace-nowrap px-4 font-medium text-gray-700">{{ dadosGasto.origem }}</td>
                            <td class="whitespace-nowrap px-4 font-medium text-gray-700">{{ dadosGasto.categoria }}</td>
                            <td class="whitespace-nowrap px-4 font-medium text-gray-700">{{ dadosGasto.data_gasto }}
                            </td>
                            <td class="whitespace-nowrap px-4 font-medium text-gray-700">{{ dadosGasto.valor }}</td>
                            <td class="whitespace-nowrap flex justify-center text-center px-4 py-1 text-gray-700">
                                <div class='has-tooltip'>
                                    <span
                                        class='tooltip rounded shadow-lg p-1 bg-gray-700 text-white text-sm font-medium -mt-8 -ml-4'>Remover</span>
                                    <button type="button" @click="abrirModalRemover(dadosGasto)"
                                        class="inline-block px-2.5 py-1 rounded-full bg-gray-700 text-white font-medium focus:outline-none focus:ring hover:bg-red-600">
                                    </button>
                                </div>
                                <div class='has-tooltip'>
                                    <span
                                        class='tooltip rounded shadow-lg p-1 bg-gray-700 text-white text-sm font-medium -mt-8 ml-2'>Editar</span>
                                    <button type="button" @click="abrirModalEdicaoGasto(dadosGasto)"
                                        class="inline-block px-2 py-1 ml-4 rounded-full bg-gray-700 text-white font-medium focus:outline-none focus:ring hover:bg-teal-500">
                                        <font-awesome-icon icon="fa-regular fa-pen-to-square" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div v-if="!listaDadosTabelaGasto?.length" class="row flex justify-center mt-40">
                <h3 class="text-gray-400 font-semibold text-5xl">Nenhum Gasto Informado.</h3>
            </div>
        </div>
    </div>
    <ModalEdicaoGasto @fechar-modal-edicao="fecharModalEdicao" @atualizar-lista-gastos="listarDadosTabelaGastos" :codigoGasto="codigoEdicaoGasto"></ModalEdicaoGasto>
</template>

<script setup lang="ts">
import ModalEdicaoGasto from './ModalEdicaoGasto.vue';

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
    abrirModal(`Deseja realmente remover o gasto ${dadosGasto.nome}, de valor ${dadosGasto.valor}`, 'Remover Gasto');
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