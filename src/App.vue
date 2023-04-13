<template>
<todo-app/>
</template>

<script>
import TodoApp from '../src/views/TodoApp.vue'

export default{
	components:{ TodoApp },
	name:'App'
}
</script>
<style>
body{
	background: #333;
}
</style>