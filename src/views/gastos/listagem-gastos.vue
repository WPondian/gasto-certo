<template>
    <div class="grid grid-cols-1 gap-4 lg:grid-cols-6 lg:gap-8 h-full justify-center items-center">
        <div class=""></div>
        <div class="col-span-4 ">
            <div class="row mb-5">
                <router-link to="/gastos-cadastro"
                    class="group relative inline-flex items-center overflow-hidden rounded bg-gray-600 px-8 py-3 text-white focus:outline-none focus:ring hover:bg-gray-800"
                    href="#">
                    <span class="absolute -end-full transition-all group-hover:end-4">
                        <svg class="size-5 rtl:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </span>

                    <span class="text-sm font-bold transition-all group-hover:me-4">Informar Gasto</span>
                </router-link>
            </div>
            <div class="overflow-x-auto rounded-t-lg rounded-lg border border-gray-200">
                <table class="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                    <thead class="bg-gray-700">
                        <tr>
                            <th class="whitespace-nowrap text-left px-4 py-2 font-medium text-white">Nome</th>
                            <th class="whitespace-nowrap text-left px-4 py-2 font-medium text-white">Origem</th>
                            <th class="whitespace-nowrap text-left px-4 py-2 font-medium text-white">Data</th>
                            <th class="whitespace-nowrap text-left px-4 py-2 font-medium text-white">Valor</th>
                        </tr>
                    </thead>

                    <tbody class="divide-y divide-gray-200">
                        <tr v-for="dadosGasto in listaDadosTabelaGasto" :key="dadosGasto.id">
                            <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{{ dadosGasto.nome }}</td>
                            <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ dadosGasto.origem }}</td>
                            <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ dadosGasto.data_gasto }}</td>
                            <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ dadosGasto.valor }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class=""></div>
    </div>
</template>

<script>
import { format } from 'v-money3';
export default {
    data() {
        return {
            config: {
                prefix: 'R$ ',
                thousands: '.',
                suffix: '',
                decimal: ',',
                precision: 2,
                disableNegative: true,
            },
            listaDadosTabelaGasto: '',
        };
    },
    mounted() {
        this.listarDadosTabelaGastos();
    },
    methods: {
        async listarDadosTabelaGastos() {
            await fetch('http://localhost:3000/listar')
                .then(response => response.ok ? response.json() : Promise.reject(response))
                .then((result) => {
                    result.forEach(element => {
                        element.data_gasto = this.formatarDataBR(element.data_gasto);
                        element.valor = format(parseFloat(element.valor), this.config);
                    });
                    this.listaDadosTabelaGasto = result;
                });
        },
        formatarDataBR(stringData) {
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
    }
}
</script>

<style></style>