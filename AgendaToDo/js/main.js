import { Task } from "./models/Task.js";
import { fetchTasks , post, put} from "./components/communication.js";

import { todoForm, upDateForm, tableBody , tasks } from "./components/variables.js";


//Inicializa as tarefas na tela
document.addEventListener("DOMContentLoaded", () => {
	try {
		fetchTasks();
	} catch (error) {
		alert("Não foi possível carregar a aplicação");
	}
});

todoForm.addEventListener('submit', async (ev) => {
    ev.preventDefault();

    let title = document.querySelector("#task-title").value;
    let description = document.querySelector("#task-description").value;

    const task = new Task(title, description);

	post(task, tasks, tableBody);

	todoForm.reset();

});

upDateForm.addEventListener('submit', async (ev) => {
	ev.preventDefault();

	let idToUpdateBanco = Number(document.querySelector("#idtask-ToUpdate").value);
	let idToUpdateArray = idToUpdateBanco - 1;
	let newTitle = document.querySelector('#update-title').value;
	let newDescription = document.querySelector('#update-description').value;
	let status = document.querySelector(".status-update").textContent;

	console.log({idToUpdateArray, idToUpdateBanco, newTitle, newDescription, status})

})
