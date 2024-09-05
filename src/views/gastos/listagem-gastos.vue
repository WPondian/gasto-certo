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
                        <tr>
                            <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">John Doe</td>
                            <td class="whitespace-nowrap px-4 py-2 text-gray-700">24/05/1995</td>
                            <td class="whitespace-nowrap px-4 py-2 text-gray-700">24/05/1995</td>
                            <td class="whitespace-nowrap px-4 py-2 text-gray-700">Web Developer</td>
                        </tr>

                        <tr>
                            <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Jane Doe</td>
                            <td class="whitespace-nowrap px-4 py-2 text-gray-700">04/11/1980</td>
                            <td class="whitespace-nowrap px-4 py-2 text-gray-700">04/11/1980</td>
                            <td class="whitespace-nowrap px-4 py-2 text-gray-700">Web Designer</td>
                        </tr>

                        <tr>
                            <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Gary Barlow</td>
                            <td class="whitespace-nowrap px-4 py-2 text-gray-700">24/05/1995</td>
                            <td class="whitespace-nowrap px-4 py-2 text-gray-700">24/05/1995</td>
                            <td class="whitespace-nowrap px-4 py-2 text-gray-700">Singer</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="rounded-b-lg border-t border-gray-200 px-4 py-2">
                <ol class="flex justify-end gap-1 text-xs font-medium">
                    <li>
                        <a href="#"
                            class="inline-flex size-8 items-center justify-center rounded border border-gray-700 bg-white text-gray-900 rtl:rotate-180">
                            <span class="sr-only">Prev Page</span>
                            <svg xmlns="http://www.w3.org/2000/svg" class="size-3" viewBox="0 0 20 20"
                                fill="currentColor">
                                <path fill-rule="evenodd"
                                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                    clip-rule="evenodd" />
                            </svg>
                        </a>
                    </li>

                    <li>
                        <a href="#"
                            class="block size-8 rounded border border-gray-700 bg-white text-center leading-8 text-gray-900">
                            1
                        </a>
                    </li>

                    <li class="block size-8 rounded border-gray-700 bg-gray-700 text-center leading-8 text-white">
                        2
                    </li>

                    <li>
                        <a href="#"
                            class="block size-8 rounded border border-gray-700 bg-white text-center leading-8 text-gray-900">
                            3
                        </a>
                    </li>

                    <li>
                        <a href="#"
                            class="block size-8 rounded border border-gray-700 bg-white text-center leading-8 text-gray-900">
                            4
                        </a>
                    </li>

                    <li>
                        <a href="#"
                            class="inline-flex size-8 items-center justify-center rounded border border-gray-700 bg-white text-gray-900 rtl:rotate-180">
                            <span class="sr-only">Next Page</span>
                            <svg xmlns="http://www.w3.org/2000/svg" class="size-3" viewBox="0 0 20 20"
                                fill="currentColor">
                                <path fill-rule="evenodd"
                                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                    clip-rule="evenodd" />
                            </svg>
                        </a>
                    </li>
                </ol>
            </div>
        </div>
        <div class=""></div>
    </div>
</template>

<script>
export default {

}
</script>

<style></style>