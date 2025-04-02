<template>
    <div class="grid grid-cols-12 w-full">
        <div class="col-span-4 col-start-5 content-center">
            <div class="border py-10 rounded-2xl shadow-2xl">
                <div class="mx-auto max-w-lg text-center">
                    <h1 class="text-2xl font-bold sm:text-3xl uppercase">Cadastrar Fonte de Renda</h1>
                </div>

                <form id="cadastroGasto" @submit.prevent="uploadImage" autocomplete="off" class="mx-auto mb-0 mt-2 max-w-md space-y-4">
                    <div class="py-4 mx-4">
                        <label for="nomeRenda" class="block font-medium text-gray-700"> Nome*: </label>

                        <input type="text" v-model="nomeRenda" id="nomeRenda" placeholder="Informe o nome da fonte de renda."
                            class="mt-1 w-full rounded-lg border-padrao-campo text-gray-600 font-semibold focus:ring-0 focus:outline-none focus:border-teal-400 p-2"
                            required />
                    </div>
                    <div class="border-2 mx-4 rounded-lg border-gray-700 hover:border-teal-400 p-10 pb-4 text-center">
                        <div v-if="imagePreview" class="mt-4">
                            <p class="mb-2">Preview da Imagem:</p>
                            <img :src="imagePreview" alt="Imagem Preview" class="w-full h-auto border rounded"/>
                        </div>
                        <div class="text-gray-700 font-semibold pb-10 pt-5" v-else>
                            <p>Nenhuma imagem carregada.</p>
                        </div>
                        <input @change="onFileChange" type="file" id="image" accept="image/*" class="border p-2 w-full hidden" required />
                        <label for="image" class="inline-block cursor-pointer rounded-xl bg-gray-700 px-7 py-2 mt-2 text-white font-medium focus:outline-none focus:ring hover:bg-gray-600 ease-in duration-300" type="submit">Enviar Imagem</label>
                    </div>
                    <div class="flex pt-6 items-center justify-center">
                        <router-link to="/ganhos" id="btnCancelarCadastro"
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
import { inject, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

let nomeRenda = ref<string>('');
let image = ref<File | null>(null);
let imagePreview = ref<string>('');

// Definindo o tipo da função que será injetada
type MinhaFuncaoType = (texto: string, tipo: string, tempo: number) => void;

// Injetando a função fornecida pelo pai
const mostrarMensagem = inject<MinhaFuncaoType>('mostrarMensagem', () => { });
const abrirCarregando = inject('abrirCarregando', () => { });
const fecharCarregando = inject('fecharCarregando', () => { });

const onFileChange = (e: Event) => {
      const file = (e.target as HTMLInputElement).files?.[0] || null;
      image.value = file;
};

const submitForm = async () => {
    if (!image.value) return;

    const formData = new FormData();
    formData.append('name', name.value);
    formData.append('image', image.value);

    try {
    const response = await axios.post('http://localhost:3000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    console.log('Registro salvo:', response.data);
    name.value = '';
    image.value = null;
    } catch (error) {
    console.error('Erro ao salvar:', error);
    }
};

async function enviarDados() {
    abrirCarregando();

    if (!validarDadosCadastro()) {
        return;
    }

    const dados: object = {
        nomeRenda: nomeRenda.value as string,
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
};

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