import { createTaskRow } from "./renders.js";
import { tasks, tableBody } from "./variables.js";

//Faz a rendereização das linhas no html após uma chamada get no banco
async function fetchTasks() {
    const response = await fetch('http://localhost:3000/task').then(res => res.json());

    response.forEach((item) => {
        const task = {
            id: item.id,
            title:item.title,
            description: item.description,
            createdAt:item.createdAt,
            concluded: item.concluded
        }

        tasks.push(task);
    });

    tasks.forEach((item) => {
        createTaskRow(item, tableBody)
    });
}



//Concluir uma tarefa
async function toCompleteTask(taskId, indexArray) {
    const response = await fetch(`http://localhost:3000/task/${taskId}`).then(res => res.json());
    response.concluded = true;

    const updatedTask = await put(response);

    tasks[indexArray] = updatedTask;
}

async function toReOpenTask(taskId, indexArray) {
    const response = await fetch(`http://localhost:3000/task/${taskId}`).then(res => res.json());
    response.concluded = false;

    const updatedTask = await put(response);

    tasks[indexArray] = updatedTask;
}


//Atualizar uma task
async function put(task) {
    const response = await fetch(
        `http://localhost:3000/task/${task.id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
    }
    ).then((res) => res.json());

    return response;
}

//criar uma nova task fazendo o post
async function post(task) {

    const response = await fetch("http://localhost:3000/task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(task)
    }).then(res => res.json());

    tasks.push(response);
    createTaskRow(response);
}

export {fetchTasks, toCompleteTask, toReOpenTask, put, post};
