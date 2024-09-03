<template>
    <div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-lg text-center">
            <h1 class="text-2xl font-bold sm:text-3xl">Cadastro de Gasto</h1>

            <p class="mt-4 text-gray-500">
                Por favor, informe dados do gasto.
            </p>
        </div>

        <form action="#" class="mx-auto mb-0 mt-8 max-w-md space-y-4">
            <div>
                <label for="nomeGasto" class="sr-only">Nome do gasto:</label>

                <div class="relative">
                    <input type="text" name="nomeGasto"
                        class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                        placeholder="Coloque o nome do gasto" />
                    <span class="absolute inset-y-0 end-0 grid place-content-center px-4">
                        <font-awesome-icon icon="fa-solid fa-basket-shopping" />
                    </span>
                </div>
            </div>

            <div>
                <label for="valorGasto" class="sr-only">Valor gasto:</label>

                <div class="relative">
                    <input type="number" class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                        placeholder="R$ 00,00" />

                    <span class="absolute inset-y-0 end-0 grid place-content-center px-4">
                        <font-awesome-icon icon="fa-solid fa-hand-holding-dollar" />
                    </span>
                </div>
            </div>

            <div class="flex items-center justify-between">
                <button type="submit"
                    class="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white">
                    Cadastrar
                </button>
            </div>
        </form>
    </div>
</template>

<script>
export default {

}
</script>

<style></style>