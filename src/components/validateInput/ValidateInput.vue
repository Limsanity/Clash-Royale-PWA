<template>
  <input
    v-model="value"
    :type="type"
    :placeholder="placeholder"
    @input="execValidate">
</template>

<script>
export default {
  name: 'ValidateInput',
  props: {
    type: String,
    placeholder: String,
    regExp: Object,
    input: String,
    isValidate: Boolean
  },
  data () {
    return {
      value: '',
      timer: null
    }
  },
  methods: {
    execValidate () {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        const isValidate = RegExp(this.regExp).test(this.value)
        this.$emit('update:input', this.value)
        this.$emit('update:isValidate', isValidate)
      }, 500)
    }
  }
}
</script>
