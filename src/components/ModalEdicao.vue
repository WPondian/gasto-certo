<template>
    <div v-if="codigoGasto" data-dialog-backdrop="modal" data-dialog-backdrop-close="true"
        class="inset-0 z-[999] fixed grid h-screen w-screen place-items-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300">
        <div data-dialog="modal" class="relative m-4 p-4 w-2/5 min-w-[40%] max-w-[40%] rounded-lg bg-white shadow-sm">
            <div class="flex shrink-0 items-center justify-center pb-4 text-3xl font-medium text-slate-800">
            <h3>Edição de gasto</h3>
        </div>
            <div class="flex shrink-0 items-center justify-center pb-4 text-xl font-medium text-slate-800">
                <form id="cadastroGasto" autocomplete="off" class="w-2/4 mb-0 mt-2 max-w-md space-y-4">
                    <div class="py-1 px-5">
                        <label for="nomeGasto" class="block font-medium text-gray-700"> Nome*: </label>

                        <input type="text" v-model="gasto.nome" id="nomeGasto" placeholder="Informe o nome do gasto..."
                            class="mt-1 w-full rounded-lg border-padrao-campo text-base font-semibold focus:ring-0 focus:outline-none focus:border-teal-400 p-2"
                            required />
                    </div>
                    <div class="py-1 px-5">
                        <label for="categoriaGasto" class="block font-medium text-gray-700"> Categoria*: </label>
                        <select name="categoriaGasto" id="categoriaGasto" v-model="gasto.categoria" required
                            class="mt-1 w-full text-base rounded-lg border-padrao-campo cursor-pointer font-semibold focus:ring-0 focus:outline-none focus:border-teal-400 p-2">
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
                    <div class="py-1 px-5">
                        <label for="origemGasto" class="block font-medium text-gray-700"> Origem*: </label>

                        <input type="text" v-model="gasto.origem" id="origemGasto"
                            placeholder="Informe a origem do gasto..."
                            class="mt-1 w-full text-base rounded-lg border-padrao-campo font-semibold focus:ring-0 focus:outline-none focus:border-teal-400 p-2"
                            required />
                    </div>
                    <div class="py-1 px-5">
                        <label for="valorGasto" class="block font-medium text-gray-700"> Valor*: </label>
                        <input type="text" v-model="gasto.valor" v-money3="config" id="valorGasto" maxlength="10"
                            placeholder="Informe a origem do gasto..."
                            class="mt-1 w-full text-base rounded-lg border-padrao-campo font-semibold focus:ring-0 focus:outline-none focus:border-teal-400 p-2"
                            required />
                    </div>
                    <div class="py-1 px-5">
                        <div class="relative">
                            <label for="dataGasto" class="block font-medium text-gray-700"> Data*: </label>
                            <VueDatePicker id="dataGasto" :format="format"
                                class="mt-1 text-base rounded-md border-padrao-campo font-semibold"
                                :enable-time-picker="false" placeholder="Data" v-model="gasto.data_gasto">
                            </VueDatePicker>
                        </div>
                    </div>
                    <div class="flex pt-6 items-center justify-center">
                        <button type="button" @click="fechaModalEdicao"
                            class="inline-block rounded-xl mr-6 bg-red-700 px-5 py-2 mt-2 text-white font-medium focus:outline-none focus:ring hover:bg-red-600  hover:px-7 hover:py-3 hover:mt-0 ease-in duration-300">
                            <font-awesome-icon icon="fa-solid fa-left-long" />
                            Cancelar
                        </button>
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
import { onUpdated,inject, ref } from 'vue';
import { useRouter } from 'vue-router';
import { GastoInterface } from '../types/Gasto';

const router = useRouter();

interface Props {
    codigoGasto: number,
}

const config: object = {
    prefix: 'R$ ',
    thousands: '.',
    decimal: ',',
    precision: 2,
    disableNegative: true,
};

const props = defineProps<Props>();
let codigoGasto = ref<number>();

let gasto = ref<GastoInterface>({
    id: 0,
    nome: '',
    valor: '',
    origem: '',
    data_gasto: '',
    categoria: ''
});

const format = (date:Date):string =>  {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${day}/${month < 10 ? '0' + month : month}/${year}`;
}

onUpdated(() => {
    if(codigoGasto.value != props.codigoGasto){
        codigoGasto.value = props.codigoGasto;
        props.codigoGasto != 0 && reqBuscarDadosGasto();
    }
});

type MinhaFuncaoType = (texto: string, tipo: string, tempo: number) => void;

const mostrarMensagem = inject<MinhaFuncaoType>('mostrarMensagem', () => { });
const abrirCarregando = inject('abrirCarregando', () => { });
const fecharCarregando = inject('fecharCarregando', () => { });

async function reqBuscarDadosGasto() {
    await fetch(`https://api-gasto-certo.vercel.app/api/buscar-gastos?codigo=${codigoGasto.value}`)
        .then(response => response.ok ? response.json() : Promise.reject(response))
        .then((retorno) => {

            if (retorno.error) {
                console.error(retorno.error);
                return mostrarMensagem('Erro ao listar gastos!', 'error', 4000);
            }

            retorno.result.forEach((element: GastoInterface) => {
                gasto.value.id = element.id;
                gasto.value.nome = element.nome;
                gasto.value.categoria = element.categoria;
                gasto.value.origem = element.origem;
                gasto.value.valor = element.valor;   
                gasto.value.data_gasto = element.data_gasto;
            });
        });
}


async function enviarDados() {
    abrirCarregando();

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

            setTimeout(() => {
                fecharCarregando();
                router.push('/gastos');

            }, 4000);
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

function fechaModalEdicao() {
    emit('fechar-modal-edicao');
}

const emit = defineEmits(['fechar-modal-edicao']);

</script>

<style></style>