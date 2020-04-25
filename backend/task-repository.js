const uuid = require('uuid');
class TaskRepository {
    constructor() {
        this.taskLists = {
            '69d1f29e-7de3-4567-9cbe-5ecfb8c7dd33': {
                id: '69d1f29e-7de3-4567-9cbe-5ecfb8c7dd33',
                title: 'First List',
                tasks: [
                    {
                        status: "open",
                        description: 'example task 1'
                    }
                ]
            },
            '2e35d683-f2f9-4f80-ba3c-b4d3b59995fa': {
                id: '2e35d683-f2f9-4f80-ba3c-b4d3b59995fa',
                title: 'Second List',
                tasks: [
                    {
                        status: 'done',
                        description: 'example task 2'
                    },
                    {
                        status: 'open',
                        description: 'example task 3'
                    }
                ]
            }
        };
    }

    createTaskList(data) {
        data.id = uuid.v4();
        this.taskLists.push(data);
        return new Promise((resolve) => {
            return resolve(data);
        });
    }

    fetchTaskLists() {
        return new Promise((resolve) => {
            resolve(this.taskLists);
        });
    }

    getTaskList(listId) {
        return new Promise((resolve, reject) => {
            const result = this.taskLists[listId];
            if (result)
                return resolve(result);
            return reject({ "message": `Could not find list with id:${listId}` });
        });

    }

    updateTaskList(listId, data) {
        return new Promise((resolve, reject) => {
            data.id = listId;
            this.taskLists[listId] = data;
            if (this.taskLists[listId])
                return resolve(data);
            return reject({ "message": `Could not update list with id:${listId}` });
        });
    }
}

module.exports = new TaskRepository();