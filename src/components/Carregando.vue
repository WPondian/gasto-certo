<template>
    <div v-if="mostrar" data-dialog-backdrop="modal" data-dialog-backdrop-close="true"
        class="inset-0 z-[999] fixed grid h-screen w-screen place-items-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity">
        <div class="w-full">
            <div id="box" class="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4">
                <div class="box-circle">
                    <svg>
                        <circle cx="70" cy="70" r="70"></circle>
                        <circle cx="70" cy="70" r="70"></circle>
                    </svg>
                </div>
                <div class="carregando flex flex-col">
                    <h2 class="font-semibold mt-5">Carregando...</h2>
                    <img class="inline-block mt-3 coin" src="../assets/icon-carregando.png" alt="icone moeda rodando">
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

import { onUpdated, ref } from 'vue';

interface Props {
    mostrar: boolean,
}

const props = defineProps<Props>();
let mostrar = ref<boolean>(false);

onUpdated(() => {
    mostrar.value = props.mostrar;
})

</script>

<style>
#box {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 20px;
    padding: 15px;
}

.box-circle svg {
    width: 150px;
    height: 150px;
    position: relative;
}

circle {
    width: 150px;
    height: 150px;
    fill: none;
    stroke: black;
    stroke-width: 10;
    transform: translate(5px, 5px);
    stroke-dasharray: 440;
}

circle:nth-child(1) {
    stroke-dasharray: 440;
    stroke-dashoffset: 0;
    stroke: rgb(102, 102, 102);
}

circle:nth-child(2) {
    stroke: rgb(45 212 191);
    animation: rotacaoCarregando 5s forwards infinite;
}

.carregando {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
}

.coin {
    animation: rotacaoMoeda 2s linear infinite;
}

@keyframes rotacaoMoeda {
    0% {
        transform: rotateY(0deg);
    }

    100% {
        transform: rotateY(360deg);
    }
}

@keyframes rotacaoCarregando {
    0% {
        stroke-dashoffset: 440;
    }

    100% {
        stroke-dashoffset: 0;
    }
}
</style>