package com.todolist.persistence;

import java.time.ZonedDateTime;

import com.todolist.model.TaskStatus;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class TaskBean {

	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	private String id;

	@Column(nullable = false)
	private String title;

	@Column(nullable = false)
	private ZonedDateTime createdAt;

	@Column(nullable = false)
	@Enumerated(EnumType.STRING)
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
