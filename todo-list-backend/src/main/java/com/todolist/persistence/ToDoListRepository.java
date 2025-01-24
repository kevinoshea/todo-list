package com.todolist.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ToDoListRepository extends JpaRepository<TaskBean, String> {
}
