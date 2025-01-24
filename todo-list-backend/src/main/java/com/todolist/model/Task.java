package com.todolist.model;

import java.time.ZonedDateTime;

public class Task {
	private String id;
	private String title;
	private ZonedDateTime createdAt;
	private TaskStatus status;

	public String getId() {
		return this.id;
	}

	public void setId(final String id) {
		this.id = id;
	}

	public String getTitle() {
		return this.title;
	}

	public void setTitle(final String title) {
		this.title = title;
	}

	public ZonedDateTime getCreatedAt() {
		return this.createdAt;
	}

	public void setCreatedAt(final ZonedDateTime createdAt) {
		this.createdAt = createdAt;
	}

	public TaskStatus getStatus() {
		return this.status;
	}

	public void setStatus(final TaskStatus status) {
		this.status = status;
	}
}
