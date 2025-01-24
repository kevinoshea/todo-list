package com.todolist.resource;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.todolist.business.ToDoListService;
import com.todolist.model.Task;
import com.todolist.model.TaskStatus;

@RestController
@RequestMapping("/todolist")
public class ToDoListResource {

	private final ToDoListService service;

	public ToDoListResource(final ToDoListService service) {
		this.service = service;
	}

	@GetMapping
	public List<Task> getList() {
		return this.service.getList();
	}

	@PostMapping
	public Task addTask(@RequestBody final String taskTitle) {
		return this.service.addTask(taskTitle);
	}

	@PostMapping("/tasks/{taskId}/update-status")
	public Task updateStatus(@PathVariable final String taskId, @RequestBody final TaskStatus status) {
		return this.service.updateTaskStatus(taskId, status);
	}

	@DeleteMapping("/tasks/{taskId}")
	public void delete(@PathVariable final String taskId) {
		this.service.deleteTask(taskId);
	}

}
