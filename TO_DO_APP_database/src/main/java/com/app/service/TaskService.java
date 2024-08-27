package com.app.service;

import com.app.model.Task;
import com.app.repository.TaskRepo;

import java.util.List;

public class TaskService {
    TaskRepo taskRepo = new TaskRepo();
    public void addTask(Task task) {
        taskRepo.addTask(task);
    }

    public List<Task> getAllTask(int id) {
        return taskRepo.getAllTask(id);
    }

    public void deleteTask(int taskId) {
        taskRepo.deleteTask(taskId);
    }

    public void updateTask(Task task) {
        taskRepo.updatetask(task);
    }
}
