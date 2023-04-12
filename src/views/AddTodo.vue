<template>
	<div class="hero-body">
			<p class="title">To Do List</p>
		</div>
	<form @submit.prevent="addTodo">
			<div class="field is-grouped mb-5">
				<div class="control is-expanded">
					<input class="input" type="text" placeholder="Add a todo" v-model="newTodoContent" />
				</div>
				<div class="control">
					<button :disabled="newTodoContent == false" class="button is-primary">
						Add
					</button>
				</div>
			</div>
		</form>
</template>
<script setup>
import { ref} from "vue";
import { collection } from "firebase/firestore";
import { addDoc} from "firebase/firestore";
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