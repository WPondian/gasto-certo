<template>
    <div>
        <h2>User list</h2>
        <ul>
            <li v-for="persons in props.persons" :key="persons.id">
                {{ persons.name }}
            </li>
        </ul>
    </div>
</template>
<script export default setup lang="ts">
import { PropType } from 'vue';
import { PersonInterface } from '../types/Person';

const props = defineProps({
    persons: {
        required: true,
        type: Array as PropType<PersonInterface[]>
    }
})


</script>
<style scoped></style>