package com.todolist.business;

import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.todolist.model.Task;
import com.todolist.model.TaskStatus;
import com.todolist.persistence.TaskBean;
import com.todolist.persistence.TaskBeanConverter;
import com.todolist.persistence.ToDoListRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class ToDoListService {
	private final ToDoListRepository repository;

	public ToDoListService(final ToDoListRepository repository) {
		this.repository = repository;
	}

	public List<Task> getList() {
		final Sort orderByCreatedAt = Sort.by(Sort.Order.asc("createdAt"));
		final List<TaskBean> taskBeans = this.repository.findAll(orderByCreatedAt);
		final List<Task> tasks = new ArrayList<Task>();
		for (final TaskBean taskBean : taskBeans) {
			tasks.add(TaskBeanConverter.fromBean(taskBean));
		}
		return tasks;
	}

	public Task addTask(@RequestBody final String title) {
		if (StringUtils.isBlank(title)) {
			throw new ValidationException("Title must not be blank");
		}
		final Task task = new Task();
		task.setTitle(title);
		task.setStatus(TaskStatus.NOT_DONE);
		task.setCreatedAt(ZonedDateTime.now());
		final TaskBean bean = this.repository.save(TaskBeanConverter.toBean(task));
		return TaskBeanConverter.fromBean(bean);
	}

	public Task updateTaskStatus(final String taskId, @RequestBody final TaskStatus status) {
		final TaskBean bean = this.repository.findById(taskId)
				.orElseThrow(() -> new ValidationException("Task with ID " + taskId + " does not exist"));
		bean.setStatus(status);
		final TaskBean updatedBean = this.repository.save(bean);
		return TaskBeanConverter.fromBean(updatedBean);
	}

	public void deleteTask(final String taskId) {
		this.repository.deleteById(taskId);
	}
}
