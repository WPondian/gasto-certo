<script setup lang="ts">

</script>
<template>
    <div class="h-screen w-16 border-e">
        <div>
            <div class="border-t border-gray-100">
                <div class="px-2">
                    <ul class="space-y-1 border-t border-gray-100 pt-4">
                        <li class="py-1">
                            <router-link to="/" class="group relative flex justify-center px-2 py-3 text-gray-500 rounded-full
                                hover:bg-teal-400 hover:text-gray-700">
                                <font-awesome-icon icon="fa-solid fa-house" size="xl" />

                                <span
                                    class="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-teal-400 font-semibold px-2 py-1.5 text-white group-hover:visible">
                                    Início
                                </span>
                            </router-link>
                        </li>
                        <li class="py-1">
                            <router-link to="/gastos" class="group relative flex justify-center px-2 py-3 text-gray-500 rounded-full
                                hover:bg-teal-400 hover:text-gray-700">
                                <font-awesome-icon icon="fa-solid fa-cart-shopping" size="xl" />

                                <span
                                    class="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-teal-400 font-semibold px-2 py-1.5 text-white group-hover:visible">
                                    Gastos
                                </span>
                            </router-link>
                        </li>
                        <li class="py-1">
                            <router-link to="/ganhos"
                                class="group relative flex justify-center rounded-full px-2 py-3 text-gray-500 hover:bg-teal-400 hover:text-gray-700">
                                <font-awesome-icon icon="fa-solid fa-hand-holding-dollar" size="xl"/>
                                <span
                                    class="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-teal-400 font-semibold px-2 py-1.5 text-white group-hover:visible">
                                    Ganhos
                                </span>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>