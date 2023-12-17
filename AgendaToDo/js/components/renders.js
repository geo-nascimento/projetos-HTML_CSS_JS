import { toCompleteTask } from "./communication.js";
import { tableBody, tasks } from "./variables.js";

export function createTaskRow(task) {
	//Td`s
	const taskRow = document.createElement("tr");
	taskRow.id = `taskRow-${task.id}`;

	const tdId = document.createElement("td");
	tdId.textContent = String(task.id);

	const tdTitle = document.createElement("td");
	tdTitle.textContent = String(task.title);

	const tdCreatedAt = document.createElement("td");
	const data = new Date(task.createdAt);
	tdCreatedAt.textContent = data.toLocaleString('pt-BR', {timeZone: 'UTC'});

	//Botões
	const tdBtns = document.createElement("td");

	const btnConcluded = document.createElement("button");
	btnConcluded.type = "button";
	btnConcluded.setAttribute("class", "btn-task");
	btnConcluded.classList.add("concluded");
	btnConcluded.title = "Concluir";
	btnConcluded.innerHTML = "<i class='bi bi-check2-circle'></i>";

	const btnDetatil = document.createElement("button");
	btnDetatil.type = "button";
	btnDetatil.setAttribute("class", "btn-task");
	btnDetatil.classList.add("detalhes");
	btnDetatil.title = "Detalhes";
	btnDetatil.innerHTML = "<i class='bi bi-arrow-right-square'></i>";

	const btnEdit = document.createElement("button");
	btnEdit.type = "button";
	btnEdit.setAttribute("class", "btn-task");
	btnEdit.classList.add("editar");
	btnEdit.title = "Editar";
	btnEdit.innerHTML = '<i class="bi bi-pencil"></i>';

	const btnDelete = document.createElement("button");
	btnDelete.type = "button";
	btnDelete.setAttribute("class", "btn-task");
	btnDelete.classList.add("excluir");
	btnDelete.title = "Excluir";
	btnDelete.innerHTML = '<i class="bi bi-trash3"></i>';

	tdBtns.append(btnConcluded, btnDetatil, btnEdit, btnDelete);

	taskRow.append(tdId, tdTitle, tdCreatedAt, tdBtns);

	tableBody.appendChild(taskRow);

	/*Eventos dos botões*/
	const taskIdbanco = Number(taskRow.id.slice(8));
	const taskIndexArray = taskIdbanco - 1;

	//Botão de concluir tarefa
	if (task.concluded) {
		taskRow.classList.add("task-complete");
		btnConcluded.classList.add("display-none");
	}

	btnConcluded.addEventListener("click", async () => {
		toCompleteTask(taskIdbanco, taskIndexArray);
		taskRow.classList.add("task-complete");
		btnConcluded.classList.add("display-none");
		const status = document.querySelector(".task-status");
		if (status.classList.contains('pendente')) {
			status.classList.add('task-complete');
			status.textContent = 'Concluída';
		}


	});

	//Botão de detalhamento
	btnDetatil.addEventListener('click', () => {

		const updateDiv = document.querySelector('.update-container')
		if (!updateDiv.classList.contains('display-none')) {
			updateDiv.classList.add('display-none');
		}

		toDetailTask(tasks[taskIndexArray]);
	});

	//Botão de edição
	btnEdit.addEventListener('click', () => {
		const descriptionTask = document.querySelector(".detail-container");

		if (!descriptionTask.classList.contains('display-none')) {
			descriptionTask.classList.add('display-none');
		}

		toEditTask(tasks[taskIndexArray]);

	});

}


function toDetailTask(task) {
	document.querySelector('.id-task').textContent = `#${task.id}`;
	document.querySelector('.title-task').textContent = task.title;

	const status = document.querySelector('.task-status');
	status.textContent = task.concluded ? 'Concluída':'Pendente';
	if(task.concluded) {
		status.classList.add('task-complete');
		status.classList.remove('pendente');

	} else {
		status.classList.remove("task-complete");
		status.classList.add("pendente");
	}

	const data = new Date(task.createdAt);
	document.querySelector('.data-value').textContent = data.toLocaleString('pt-BR', {timeZone:'UTC'});

	document.querySelector("#task-detail-description").value = task.description;

	document.querySelector('.detail-container').classList.remove('display-none');
}

function toEditTask(task) {
	document.querySelector(".id-task-update").value = task.id;
	document.querySelector('#update-title').value = task.title;
	document.querySelector('#update-description').value = task.description;
	const btnReOpen = document.querySelector(".btn-reOpen");

	const status = document.querySelector(".status-update");
	status.textContent = task.concluded ? 'Concluída':'Pendente'

	if (task.concluded) {
		status.classList.add("task-complete");
		status.classList.remove("pendente");
	} else {
		status.classList.remove("task-complete");
		status.classList.add("pendente");
	}


	if (task.concluded) {
		btnReOpen.classList.remove('display-none');
	} else {
		btnReOpen.classList.add("display-none");
	}

	document.querySelector('.update-container').classList.remove('display-none');

	console.log(task.id);
}

