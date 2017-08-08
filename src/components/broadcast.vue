<template>
	<div class="broadcast">
		<xheader @back='back' :title="'讨论'"></xheader>
    <navbottom></navbottom>
  </div>
</template>

<script>
  import xheader from '@/components/public/header'
  import navbottom from '@/components/navBottom'
  export default{
    components: {
      xheader,
      navbottom
    },
    methods: {
      back () {
        this.$router.go(-1)
      }
    }
  }

</script>
