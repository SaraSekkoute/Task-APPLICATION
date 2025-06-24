package com.example.crudapplications.services;

import com.example.crudapplications.exception.ResourceNotFoundException;
import com.example.crudapplications.models.Task;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.crudapplications.repositories.ProductRepository;
import com.example.crudapplications.repositories.TaskRepository;
import com.example.crudapplications.repositories.UtilisateurRepository;

import java.util.List;

@Service
public class TaskService {
    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private UtilisateurRepository UtilisateurRepository;

    @Autowired
    private ProductRepository productRepository;

    public List<Task> getAll() {
        return taskRepository.findAll();
    }

    public Task getById(Long id) {
        return taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found with ID: " + id));
    }

    public Task create(Task task) {
        validateRelations(task);
        return taskRepository.save(task);
    }

    public Task update(Long id, Task updatedTask) {
        Task existing = getById(id);
        existing.setTitle(updatedTask.getTitle());
        existing.setDescription(updatedTask.getDescription());
        existing.setAssignedUser(updatedTask.getAssignedUser());
        existing.setRelatedProduct(updatedTask.getRelatedProduct());
        validateRelations(existing);
        return taskRepository.save(existing);
    }

    public void delete(Long id) {
        Task existing = getById(id);
        taskRepository.delete(existing);
    }

    private void validateRelations(Task task) {
        if (task.getAssignedUser() != null && !UtilisateurRepository.existsById(task.getAssignedUser().getId())) {
            throw new ResourceNotFoundException("Assigned Utilisateur not found.");
        }
        if (task.getRelatedProduct() != null && !productRepository.existsById(task.getRelatedProduct().getId())) {
            throw new ResourceNotFoundException("Related product not found.");
        }
    }
}
