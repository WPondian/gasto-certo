<template>
    <div class="grid grid-cols-12 w-full">
        <div class="col-span-4 col-start-5 content-center">
            <div class="border py-10 rounded-2xl shadow-2xl">
                <div class="mx-auto max-w-lg text-center">
                    <h1 class="text-2xl font-bold sm:text-3xl uppercase">Cadastrar Fonte de Renda</h1>
                </div>

                <form id="cadastroGasto" @submit.prevent="cadastrarRenda" autocomplete="off" class="mx-auto mb-0 mt-2 max-w-md space-y-4">
                    <div class="py-4 mx-4">
                        <label for="nomeRenda" class="block font-medium text-gray-700">Nome*: </label>

                        <input type="text" v-model="nomeRenda" id="nomeRenda" placeholder="Informe o nome da fonte de renda."
                            class="mt-1 w-full rounded-lg border-padrao-campo text-gray-600 font-semibold focus:ring-0 focus:outline-none focus:border-teal-400 p-2"
                            required />
                    </div>
                    <div class="pb-4 mx-4">
                        <label for="corRenda" class="block font-medium text-gray-700">Selecione a cor de fundo*: </label>
                        <input
                            type="color"
                            id="corRenda"
                            v-model="corRenda"
                            class="mt-1 w-full cursor-pointer rounded-lg border-padrao-campo focus:ring-0 focus:outline-none focus:border-teal-400 p-2 h-12"
                            required
                        />
                    </div>
                    <div class="border-2 mx-4 rounded-lg border-gray-700 hover:border-teal-400 p-10 pb-4 text-center" :style="{backgroundColor: corRenda}">
                        <div v-if="imagePreview" class="mt-4 text-center">
                            <p class="mb-4">Preview da Imagem:</p>
                            <img :src="imagePreview" alt="Imagem Preview" class="w-full mx-auto mb-4 h-auto rounded min-w-[144px] max-w-[144px] min-h-[144px] max-h-[144px]"/>
                        </div>
                        <div class="text-gray-700 font-semibold pb-10 pt-5" v-else>
                            <p>Por favor, selecione uma imagem de tamanho 144x144.</p>
                        </div>
                        <input @change="onFileChange" type="file" id="image" accept="image/*" class="border p-2 w-full hidden" required />
                        <label for="image" class="inline-block cursor-pointer rounded-xl bg-gray-700 px-7 py-2 mt-2 text-white font-medium focus:outline-none focus:ring hover:bg-gray-600 ease-in duration-300" type="submit">{{imagePreview ? 'Alterar Imagem' : 'Enviar Imagem' }}</label>
                    </div>
                    <div class="flex pt-6 items-center justify-center">
                        <router-link to="/ganhos" id="btnCancelarCadastro"
                            class="inline-block rounded-xl mr-6 bg-red-700 px-5 py-2 mt-2 text-white font-medium focus:outline-none focus:ring hover:bg-red-600  hover:px-7 hover:py-3 hover:mt-0 ease-in duration-300">
                            <font-awesome-icon icon="fa-solid fa-left-long" />
                            Cancelar
                        </router-link>
                        <button type="submit"
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
let corRenda = ref<string>('#FFFFFF');
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

    if (!file) {
        image.value = null;
        imagePreview.value = '';
        return;
    }
    
    if (!file.type.startsWith('image/')) {
        mostrarMensagem?.('O arquivo selecionado não é uma imagem!', 'warning', 4000);
        image.value = null;
        imagePreview.value = '';
        return;
    }

    const reader = new FileReader();

    reader.onload = (event) => {
        const img = new Image();
        
        img.onload = () => {
            const width = img.width;
            const height = img.height;

            console.log(width)
            console.log(height)
            
            if (width != 144 || height != 144) {
                mostrarMensagem?.('A imagem deve ter o tamanho de 144x144 pixels!', 'warning', 4000);
                image.value = null;
                imagePreview.value = '';
                return;
            }
            
            image.value = file;
            imagePreview.value = img.src;
        };

        img.src = event.target?.result as string;
    };

    reader.readAsDataURL(file);
};

const cadastrarRenda = async () => {
    if (!image.value){
        return mostrarMensagem('Por favor, adicione uma imagem!', 'warning', 4000);
    }

    abrirCarregando();
    
    const formData = new FormData();
    formData.append('nome', nomeRenda.value);
    formData.append('corRenda', corRenda.value);
    formData.append('image', image.value);

    
    await fetch('https://api-gasto-certo.vercel.app/api/cadastro-ganho', {
        method: 'POST',
        body: formData
    })
    .then(response => response.ok ? response.json() : Promise.reject(response))
        .then((retorno) => {
            if (retorno.error) {
                nomeRenda.value = '';
                corRenda.value = '#FFFFFF';
                image.value = null;
                console.error(retorno.error);
                return mostrarMensagem('Erro ao cadastrar fonte de renda!', 'error', 4000);
            }

            nomeRenda.value = '';
            corRenda.value = '#FFFFFF';
            image.value = null;

            setTimeout(() => {
                fecharCarregando();
                router.push('/ganhos');

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