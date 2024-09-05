<script setup lang="ts">

</script>
<template>
    <div class="flex h-screen w-16 flex-col justify-between border-e bg-white">
        <div>
            <div class="inline-flex size-16 items-center justify-center">
                <span class="grid size-10 place-content-center rounded-lg bg-gray-100 text-xs text-gray-600">
                    L
                </span>
            </div>

            <div class="border-t border-gray-100">
                <div class="px-2">
                    <ul class="space-y-1 border-t border-gray-100 pt-4">
                        <li class="py-1">
                            <router-link to="/" class="group relative flex justify-center px-2 py-3 text-gray-500 rounded-full
                                hover:bg-blue-100 hover:text-gray-700">
                                <font-awesome-icon icon="fa-solid fa-house" size="xl" />

                                <span
                                    class="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-blue-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible">
                                    Início
                                </span>
                            </router-link>
                        </li>
                        <li class="py-1">
                            <router-link to="/gastos" class="group relative flex justify-center px-2 py-3 text-gray-500 rounded-full
                                hover:bg-blue-100 hover:text-gray-700">
                                <font-awesome-icon icon="fa-solid fa-file-invoice-dollar" size="xl" />

                                <span
                                    class="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-blue-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible">
                                    Gastos
                                </span>
                            </router-link>
                        </li>
                        <li class="py-1">
                            <a href="#"
                                class="group relative flex justify-center rounded-full px-2 py-3 text-gray-500 hover:bg-blue-100 hover:text-gray-700">
                                <font-awesome-icon icon="fa-solid fa-user" size="xl" />
                                <span
                                    class="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-blue-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible">
                                    Pessoa
                                </span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>