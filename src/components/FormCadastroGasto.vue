<template>
    <div class="grid grid-cols-12 w-full">
        <div class="col-span-4 col-start-5 content-center">
            <div class="border py-10 rounded-2xl shadow-2xl">
                <div class="mx-auto max-w-lg text-center">
                    <h1 class="text-2xl font-bold sm:text-3xl uppercase">Cadastro de Gasto</h1>

                    <p class="mt-4 text-gray-500 font-medium">
                        Por favor, informe dados do gasto.
                    </p>
                </div>

                <form id="cadastroGasto" autocomplete="off" class="mx-auto mb-0 mt-2 max-w-md space-y-4">
                    <div class="py-1">
                        <label for="nomeGasto" class="block font-medium text-gray-700"> Nome*: </label>

                        <input type="text" v-model="nomeGasto" id="nomeGasto" placeholder="Informe o nome do gasto..."
                            class="mt-1 w-full rounded-lg border-padrao-campo text-gray-600 font-semibold focus:ring-0 focus:outline-none focus:border-teal-400 p-2"
                            required />
                    </div>
                    <div class="py-1">
                        <label for="categoriaGasto" class="block font-medium text-gray-700"> Categoria*: </label>
                        <select name="categoriaGasto" id="categoriaGasto" v-model="categoriaGasto" required
                            class="mt-1 w-full rounded-lg border-padrao-campo text-gray-600 cursor-pointer font-semibold focus:ring-0 focus:outline-none focus:border-teal-400 p-2">
                            <option class="text-gray-600 font-semibold bg-gray-200" value="" disabled selected>Selecione
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
                    <div class="py-1">
                        <label for="origemGasto" class="block font-medium text-gray-700"> Origem*: </label>

                        <input type="text" v-model="origemGasto" id="origemGasto"
                            placeholder="Informe a origem do gasto..."
                            class="mt-1 w-full rounded-lg border-padrao-campo text-gray-600 font-semibold focus:ring-0 focus:outline-none focus:border-teal-400 p-2"
                            required />
                    </div>
                    <div class="py-1">
                        <label for="valorGasto" class="block font-medium text-gray-700"> Valor*: </label>
                        <input type="text" v-model="valorGasto" v-money3="config" id="valorGasto" maxlength="10"
                            placeholder="Informe a origem do gasto..."
                            class="mt-1 w-full rounded-lg border-padrao-campo text-gray-600 font-semibold focus:ring-0 focus:outline-none focus:border-teal-400 p-2"
                            required />
                    </div>
                    <div class="py-1">
                        <div class="relative">
                            <label for="dataGasto" class="block font-medium text-gray-700"> Data*: </label>
                            <VueDatePicker id="dataGasto"
                                class="mt-1 rounded-md border-padrao-campo text-gray-600 font-semibold"
                                :enable-time-picker="false" placeholder="Data" v-model="dataGasto">
                            </VueDatePicker>
                        </div>
                    </div>
                    <div class="flex pt-6 items-center justify-center">
                        <router-link to="/gastos" id="btnCancelarCadastro"
                            class="inline-block rounded-xl mr-6 bg-red-700 px-5 py-2 mt-2 text-white font-medium focus:outline-none focus:ring hover:bg-red-600  hover:px-7 hover:py-3 hover:mt-0 ease-in duration-300">
                            <font-awesome-icon icon="fa-solid fa-left-long" />
                            Cancelar
                        </router-link>
                        <button type="button" @click="enviarDados"
                            class="inline-block rounded-xl bg-gray-700 px-7 py-2 mt-2 text-white font-medium focus:outline-none focus:ring hover:bg-gray-600 hover:px-8 hover:py-3 hover:mt-0 ease-in duration-300">
                            Cadastrar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { unformat } from 'v-money3';
import { inject, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const config: object = {
    prefix: 'R$ ',
    thousands: '.',
    decimal: ',',
    precision: 2,
    disableNegative: true,
};

let nomeGasto = ref<string>('');
let origemGasto = ref<string>('');
let valorGasto = ref<string>('');
let categoriaGasto = ref<string>('');
let dataGasto = ref<string>('');


// Definindo o tipo da função que será injetada
type MinhaFuncaoType = (texto: string, tipo: string, tempo: number) => void;

// Injetando a função fornecida pelo pai
const mostrarMensagem = inject<MinhaFuncaoType>('mostrarMensagem', () => { });
const abrirCarregamento = inject('abrirCarregamento', () => { });

async function enviarDados() {
    if (!validarDadosCadastro()) {
        return;
    }

    const dados: object = {
        nomeGasto: nomeGasto.value as string,
        origemGasto: origemGasto.value as string,
        categoriaGasto: categoriaGasto.value as string,
        valorGasto: unformat(valorGasto.value, config) as string,
        dataGasto: dataGasto.value as string,
    };


    await fetch('https://api-gasto-certo.vercel.app/api/cadastrar-gasto', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    }).then(response => response.ok ? response.json() : Promise.reject(response))
        .then((retorno) => {
            if (retorno.error) {
                console.error(retorno.error);
                return mostrarMensagem('Erro ao cadastrar gastos!', 'error', 4000);
            }

            router.push('/gastos')
        });
}

function validarDadosCadastro(): boolean {
    let camposObrigatorios: Element[] = Array.from(document.querySelectorAll('input[required], select[required]'));

    let camposValidados: boolean = true;

    camposObrigatorios.reverse().forEach((campo) => {
        if (campo instanceof HTMLInputElement || campo instanceof HTMLSelectElement) {
            campo.value = campo.value.trim();
            campo.classList.add('validado');
            campo.classList.remove('invalido');

            if (!campo.value || campo.value == 'R$ 0,00') {
                abrirCarregamento();
                mostrarMensagem('Preencha os campos obrigatorios!', 'warning', 4000);
                campo.classList.remove('validado');
                campo.classList.add('invalido');
                campo.focus();
                camposValidados = false;
            }
        }
    })

    if (camposValidados && !dataGasto.value) {
        mostrarMensagem('Por favor, informe a data do gasto!', 'warning', 4000);
        camposValidados = false;
    }

    return camposValidados;
}

</script>

<style>
.border-padrao-campo {
    border: 2px solid #666464;
}

.invalido {
    border: 2px solid rgb(221, 22, 22) !important;
}

.validado {
    border: 2px solid rgb(25, 206, 55) !important;
}

#btnCancelarCadastro {
    min-width: 133px;
}
</style>