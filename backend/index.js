const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const taskRepository = require('./task-repository');

app.use(cors())

const PORT = 3001

app.use(bodyParser.json());

app.get('/lists', async (request, response) => {
    try {
        const results = await taskRepository.fetchTaskLists();
        return response.json(results);
    } catch (error) {
        console.log("failed_to_fetch_task_list:", error);
    }
});

app.get('/lists/:listId', async (request, response) => {
    try {
        const results = await taskRepository.getTaskList(request.params.listId);
        return response.json(results);
    } catch (error) {
        console.log("failed_to_get_task_list:", error);
    }
});

app.post('/lists', async (request, response) => {
    try {
        const results = await taskRepository.createTaskList(request.body);
        return response.json(results);
    } catch (error) {
        console.log("failed_to_fetch_task_list:", error);
    }
});

app.put('/lists/:listId', async (request, response) => {
    try {
        const results = await taskRepository.updateTaskList(request.params.listId, request.body);
        return response.json(results);
    } catch (error) {
        console.log("failed_to_fetch_task_list:", error);
    }
});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
