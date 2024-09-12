<template>
    <div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-lg text-center">
            <h1 class="text-2xl font-bold sm:text-3xl">Cadastro de Gasto</h1>

            <p class="mt-4 text-gray-500">
                Por favor, informe dados do gasto.
            </p>
        </div>

        <form id="cadastroGasto" autocomplete="off" class="mx-auto mb-0 mt-8 max-w-md space-y-4">
            <div class="py-2">
                <label for="nomeGasto"
                    class="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-gray-600 focus-within:ring-1 focus-within:ring-gray-600">
                    <input type="text" id="nomeGasto" v-model="nomeGasto"
                        class="peer border-none bg-transparent placeholder-transparent focus:border-transparent py-1.5 px-2 focus:outline-none focus:ring-0"
                        placeholder="nomeGasto" />

                    <span
                        class="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                        Nome
                    </span>
                </label>
            </div>
            <div class="py-2">
                <label for="origemGasto"
                    class="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-gray-600 focus-within:ring-1 focus-within:ring-gray-600">
                    <input type="text" id="origemGasto" v-model="origemGasto"
                        class="peer border-none bg-transparent placeholder-transparent focus:border-transparent py-1.5 px-2 focus:outline-none focus:ring-0"
                        placeholder="origemGasto" />

                    <span
                        class="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                        Origem
                    </span>
                </label>
            </div>
            <div class="py-2">
                <label for="valorGasto"
                    class="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-gray-600 focus-within:ring-1 focus-within:ring-gray-600">
                    <input type="text" id="valorGasto" v-model="valorGasto" v-money3="config"
                        class="peer border-none bg-transparent placeholder-transparent focus:border-transparent py-1.5 px-2 focus:outline-none focus:ring-0"
                        placeholder="valorGasto" />

                    <span
                        class="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-1 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                        Valor*
                    </span>
                </label>
            </div>
            <div class="py-2">
                <div class="relative">
                    <VueDatePicker :enable-time-picker="false" placeholder="Data" v-model="dataGasto">
                    </VueDatePicker>
                </div>
            </div>
            <div class="flex items-center justify-center">
                <button type="button" @click="enviarDados"
                    class="inline-block rounded bg-gray-600 px-8 py-3 text-white focus:outline-none focus:ring hover:bg-gray-800">
                    Cadastrar
                </button>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import { unformat } from 'v-money3';
import { ref } from 'vue';
import { useRouter } from 'vue-router'


const router = useRouter()

let config = ref<object>({
    prefix: 'R$ ',
    thousands: '.',
    decimal: ',',
    precision: 2,
    disableNegative: true,
})

let nomeGasto = ref<string>('');
let origemGasto = ref<string>('');
let valorGasto = ref<string>('');
let dataGasto = ref<string>('');



async function enviarDados() {
    const dados: object = {
        nomeGasto: nomeGasto.value as string,
        origemGasto: origemGasto.value as string,
        valorGasto: unformat(valorGasto.value, config) as string,
        dataGasto: dataGasto.value as string,
    };

    try {
        const resposta = await fetch('http://localhost:3000/salvar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        });

        if (resposta.ok) {
            router.push('/gastos')
        } else {
            alert('Erro ao enviar dados!');
        }
    } catch (error) {
        console.error('Erro ao fazer a requisição:', error);
        alert('Erro ao enviar dados!');
    }
}


</script>

<style></style>