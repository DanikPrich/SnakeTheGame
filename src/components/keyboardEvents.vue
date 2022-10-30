<template>
  <div></div>
</template>
  
<script>
  export default {
    created() {
      const component = this;
      this.handler = function (e) {
        component.$emit('keyup', e);
      }
      window.addEventListener('keyup', this.handler);
    },
    beforeDestroy() {
      window.removeEventListener('keyup', this.handler);
    }
  }
</script>
  
<style lang="scss" scoped>
  div {
    display: none;
  }
</style>