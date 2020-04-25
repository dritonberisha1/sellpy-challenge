import BaseService from './base-service';
class TaskService extends BaseService {
    fetchTaskLists() {
        return this.apiGet({
            path: `lists`
        });
    }

    getTaskLists(listId) {
        return this.apiGet({
            path: `lists/${listId}`
        });
    }

    saveTaskToList(data) {
        return this.apiPost({
            path: `lists`,
            body: data
        });
    }

    updateTaskToList(listId, data) {
        return this.apiPut({
            path: `lists/${listId}`,
            body: data
        });
    }
}

export default new TaskService();