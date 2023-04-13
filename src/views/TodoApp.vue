<template id="app">
	<div class="container is-max-widescreen">
		<section class="header-todo hero is-link">
			<div class="hero-body">
				<p class="title">To Do List</p>
				<p class="subtitle">{{ hoy.toDateString() }}</p>
			</div>
			<todo-form />
		</section>
		<section class="badass-todo">

			<!--form enctype="multipart/form-data">
		<div class="upload-input is-info">
		<input
			class="btn btnGeneral"
			ref="img"
			@change="clickImagen()"
			type="file"
			id="file"
			name="file"
			accept="image/*"
		>
		<button @click="subirImagen()">Submit</button>
		</div>
	</form-->

			<!--form @submit.prevent="addTodo">
		<div class="field is-grouped mb-5">
			<div class="control is-expanded">
				<input
				class="input"
				type="text"
				placeholder="Agregue su tarea"
				v-model="newTodoContent"
			/>
			</div>
			<div class="control">
			<button
				:disabled="newTodoContent == false"
				class="button is-primary"
			>
				Agregar
			</button>
			</div>
		</div>
		</form-->

			<div class="card mb-2" v-for="todo in todos" :key="todo"
				:class="{ 'has-background-grey-light': todo.done == true }">
				<div class="card-content">
					<div class="content">
						<div class="columns is-mobile is-vcentered">
							<div class="column" :class="{ 'has-text-grey line-through': todo.done }">
								{{ todo.content }}
							</div>
							<div class="column is-5 has-text-right">
								<button class="button is-primary" :class="{ 'has-background-warning': todo.done == true }"
									@click="toggleDone(todo.id)">
									&check;
								</button>
								<button class="button is-danger ml-2" @click="deteleTodo(todo.id)">
									&cross;
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>
<script setup>
/**
 * imports
 */
import TodoForm from "./TodoForm.vue"
import { ref, onMounted, reactive } from "vue";
import { v4 as uuidv4 } from "uuid";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { addDoc, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { uploadBytes, ref as reference } from "firebase/storage";

const hoy = new Date();
console.log(hoy)
/**
 * Firebase refs
 */

const todosRef = collection(db, "todos");
const todosOrdered = query(todosRef, orderBy("date", "desc"));

/**
 * todos
 */

const todos = ref([
	// {
	//   id:'id1',
	//   content:'Shave my button',
	//   done:false
	// },
	// {
	//   id:'id2',
	//   content:'Wash the dishes',
	//   done:true
	// },
	// {
	//   id:'id3',
	//   content:'Play Game',
	//   done:false
	// }
]);

onMounted(() => {
	onSnapshot(todosRef, (querySnapshot) => {
		const fbTodos = [];
		querySnapshot.forEach((doc) => {
			const todo = {
				id: doc.id,
				content: doc.data().content,
				done: doc.data().done,
			};
			fbTodos.push(todo);
		});
		todos.value = fbTodos;
	});
});

/**
 * addTodo
 */

/**
 * deleteTodo
 */

const deteleTodo = (id) => {
	deleteDoc(doc(db, "todos", id));
};

/**
 * toggleDone
 */

const toggleDone = (id) => {
	const index = todos.value.findIndex((todo) => todo.id === id);
	updateDoc(doc(db, "todos", id), {
		done: !todos.value[index].done,
	});
};

let imagenes = ref([]);
let img = ref(null);
let imagen = null;

const clickImagen = async () => {
	imagenes.value.push(img.value.files[0]);
};

const subirImagen = async () => {
	let numero = 1;
	for (let image of imagenes.value) {
		await uploadBytes(reference(st, "imagenes/"), image).then((snapshot) => {
			// console.log("Imagenes guardadas");
		});
		numero++;
	}
};
</script>

<style>
@import "bulma/css/bulma.min.css";

.header-todo {
	width: 1500px;
	height: 300px;
	margin: 0;
}

.badass-todo {
	width: 600px;
	padding: 30px;
	margin: 0 auto;
	background: #333;
	border-radius: 1em;
}

@media (max-width: 500px) {
	.badass-todo {
		width: 400px;
	}
}

.line-through {
	text-decoration: line-through;
}
</style>
