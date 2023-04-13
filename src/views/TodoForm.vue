<template>
	<form @submit.prevent="addTodo">
		<div class="form field is-grouped mb-5">
			<div class="control is-expanded">
				<input id="add" class="input" type="text" placeholder="Escriba una tarea" v-model="newTodoContent" />
			</div>
			<div class="control">
				<button :disabled="newTodoContent == false" class="button is-primary">
					Agregar
				</button>
			</div>
		</div>
	</form>
	
</template>
<script setup>
import { ref } from "vue";
import { collection } from "firebase/firestore";
import { addDoc } from "firebase/firestore";
import { db } from "@/firebase";

const todosRef = collection(db, "todos");

/**
 * addTodo
 */

const newTodoContent = ref("");

const addTodo = () => {
	addDoc(todosRef, {
		content: newTodoContent.value,
		done: false,
		date: Date.now(),
	});
	newTodoContent.value = "";
};
</script>
<style>

body{
	background: #333;
}

.form {
	width: 90%;
	padding: 0% 5% 1% 5%;
}

.form input{
	border-radius: 1em;
}

@media screen and (max-width: 900px) {
	.form {
		width: 60%;
	}
}

@media (max-width: 700px) {
	.form {
		width: 45%;
	}
}

@media (max-width: 600px) {
	.form {
		width: 33%;
		padding: 0 2%;
	}
}

@media (max-width: 500px) {
	.form {
		width: 26%;
		padding: 0 1%;
	}
}

.control {
	width: auto;
}
</style>
