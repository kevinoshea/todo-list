package com.todolist.model;

import java.util.List;

public class ToDoList {
	private List<Task> tasks;

	public List<Task> getTasks() {
		return this.tasks;
	}

	public void setTasks(final List<Task> tasks) {
		this.tasks = tasks;
	}
}
