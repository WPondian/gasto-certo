<template>
    <div v-if="props.mostrar" role="alert" class="absolute div-mensagem div-mensagem-teste rounded-xl border z-10 p-4"
        :class="corBg">
        <div class="flex">
            <span :class="corTexto">
                <font-awesome-icon v-if="props.tipo == 'success'" icon="fa-regular fa-circle-check" />
                <font-awesome-icon v-if="props.tipo == 'warning'" icon="fa-solid fa-triangle-exclamation" />
                <font-awesome-icon v-if="props.tipo == 'error'" icon="fa-solid fa-ban" />
            </span>

            <div class="flex-1">
                <strong class="block font-bold ml-1" :class="corTexto">{{ props.tipo == 'success' ? 'Sucesso' :
                    props.tipo == 'warning' ? 'Atenção' : 'Erro' }}</strong>

                <p class="mt-1 font-medium text-gray-700 ml-1">{{ props.texto }}</p>
            </div>

            <button @click="emit('update-value')" class="font-bold btn-fechar-mensagem text-gray-700">
                <font-awesome-icon icon="fa-regular fa-circle-xmark" size="lg" />
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">

import { onUpdated, ref } from 'vue';

interface Props {
    mostrar: boolean,
    texto: string,
    tipo: string,
    tempo: number
}

const props = defineProps<Props>();

let corTexto = ref<string>();
let corBg = ref<string>();
const emit = defineEmits(['update-value']);

onUpdated(() => {
    if (props.mostrar) {
        corTexto.value = props.tipo == 'success' ? 'text-green-600' : props.tipo == 'warning' ? 'text-yellow-500' : 'text-red-600';
        corBg.value = props.tipo == 'success' ? 'bg-green-50' : props.tipo == 'warning' ? 'bg-yellow-50' : 'bg-red-50';

        setTimeout(() => {
            emit('update-value');
        }, props.tempo)
    }
});

</script>

<style>
.div-mensagem {
    left: 50%;
    transform: translate(-50%, -50%);
    min-width: 450px;
    animation-name: descendo;
    animation-timing-function: ease-out;
    animation-duration: 2s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
}

.btn-fechar-mensagem {
    max-height: 20px;
}

@keyframes descendo {
    from {
        top: 0px;
    }

    to {
        top: 70px;
    }
}
</style>