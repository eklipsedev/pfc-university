<template>
    <select 
        :id="id" 
        :name="name">
        <option 
            v-for="option in options" 
            :key="option.value" 
            :value="value">
            {{ value }}
        </option>
    </select>
</template>

<script>
export default {
    props: {
        id: {
            type: String,
            required: true,
            default: null
        },
        name: {
            type: String,
            required: true,
            default: null
        },
        value: {
            type: String,
            required: true,
            default: null
        }
    }
}
</script>