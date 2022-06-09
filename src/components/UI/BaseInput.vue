<template>
    <input 
        v-model="fieldValue"
        :type="fieldType" 
        :name="fieldName"
        :placeholder="fieldPlaceholder" 
        :id="fieldId" 
    />
</template>

<script>
export default {
    data() {
        return {
            fieldValue: this.value,
            fieldType: this.type,
            fieldName: this.name,
            fieldPlaceholder: this.placeholder,
            fieldId: this.id
        }
    },
    props: {
        value: {
            required: false
        },
        type: {
            type: String,
            required: true,
            default: 'text'
        },
        name: {
            type: String,
            required: true,
            default: null
        },
        placeholder: {
            type: String,
            required: false,
            default: null
        },
        id: {
            type: String,
            required: false,
            default: null
        }
    },
}
</script>