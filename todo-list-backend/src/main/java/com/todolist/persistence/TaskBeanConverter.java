package com.todolist.persistence;

import org.springframework.beans.BeanUtils;

import com.todolist.model.Task;

public class TaskBeanConverter {
	public static TaskBean toBean(final Task task) {
		final TaskBean bean = new TaskBean();
		BeanUtils.copyProperties(task, bean);
		return bean;
	}

	public static Task fromBean(final TaskBean bean) {
		final Task task = new Task();
		BeanUtils.copyProperties(bean, task);
		return task;
	}
}
