<template>
    <div class="grid grid-cols-12 w-full">
        <div class="col-span-10 col-start-2 ">
            <div class="row flex justify-center my-20">
                <h1 class="text-2xl font-bold sm:text-3xl uppercase">Listagem de Gastos</h1>
            </div>
            <div class="row flex justify-between items-end mb-5">
                <div class="grupo grid grid-cols-3 content-end items-end gap-3">
                    <div>
                        <label for="nomeGasto" class="block font-medium text-gray-700">Nome*: </label>

                        <input type="text" v-model="nomeGasto" id="nomeGasto" placeholder="Informe a origem do gasto..."
                            class="mt-1 w-full rounded-lg border-padrao-campo text-gray-600 font-semibold focus:ring-0 focus:outline-none focus:border-teal-400 px-3 py-1"
                            required />
                    </div>
                    <div>
                        <label for="categoriaGasto" class="block font-medium text-gray-700">Categoria*: </label>
                        <select name="categoriaGasto" id="categoriaGasto" placeholder="Informe a origem do gasto..."
                            v-model="categoriaGasto" required
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
                        <button type="button"
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
            <div class="overflow-x-auto rounded-t-lg rounded-lg border border-gray-200">
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
                        <tr v-for="dadosGasto in listaDadosTabelaGasto" :key="dadosGasto.id"
                            @mouseenter="efeitoLinhaTabela($event, true)"
                            @mouseleave="efeitoLinhaTabela($event, false)">
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
                                    <button type="button"
                                        class="inline-block px-2.5 py-1 rounded-full bg-gray-700 text-white font-medium focus:outline-none focus:ring hover:bg-red-600">
                                        <font-awesome-icon icon=" fa-solid fa-trash" />
                                    </button>
                                </div>
                                <div class='has-tooltip'>
                                    <span
                                        class='tooltip rounded shadow-lg p-1 bg-gray-700 text-white text-sm font-medium -mt-8 ml-2'>Editar</span>
                                    <button type="button"
                                        class="inline-block px-2 py-1 ml-4 rounded-full bg-gray-700 text-white font-medium focus:outline-none focus:ring hover:bg-teal-500">
                                        <font-awesome-icon icon="fa-regular fa-pen-to-square" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { format } from 'v-money3';
import { onMounted, ref } from 'vue';
import { GastoInterface } from '../types/Gasto';

let nomeGasto = ref<string>('');
let categoriaGasto = ref<string>('');

const config: object = {
    prefix: 'R$ ',
    suffix: '',
    thousands: '.',
    decimal: ',',
    precision: 2,
    disableNegative: true,
}

let listaDadosTabelaGasto = ref<GastoInterface[]>();

async function listarDadosTabelaGastos() {
    await fetch('http://localhost:3000/listar')
        .then(response => response.ok ? response.json() : Promise.reject(response))
        .then((result) => {
            result.forEach((element: GastoInterface) => {
                element.data_gasto = formatarDataBR(element.data_gasto);
                element.valor = format(element.valor, config);
            });

            listaDadosTabelaGasto.value = result;
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

function efeitoLinhaTabela(event: MouseEvent, ativaDesativa: boolean): void {
    const target = event.target as HTMLElement;
    target.classList.remove('efeito-ativado');

    if (ativaDesativa) {
        target.classList.add('efeito-ativado');
    }

}

onMounted(async () => {
    await listarDadosTabelaGastos();
})
</script>

<style>
select:invalid {
    color: rgb(156, 156, 156);
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