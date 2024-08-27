package com.app.controller;

import com.app.model.Task;
import com.app.service.TaskService;
import java.util.List;
public class TaskController {
    TaskService taskService = new TaskService();
    public void addTask(Task task) {
        taskService.addTask(task);
    }

    public List<Task> getAllTask(int id) {
       return taskService.getAllTask(id);
    }

    public void deleteTask(int taskId) {
        taskService.deleteTask(taskId);
    }

    public void updateTask(Task task) {
        taskService.updateTask(task);
    }
}
