package com.example.crudapplications.controllers;

import jakarta.validation.Valid;
import com.example.crudapplications.models.Utilisateur;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.crudapplications.services.UtilisateurService;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UtilisateurController {
    @Autowired
    private UtilisateurService userService;

    @GetMapping
    public List<Utilisateur> getAll() {
        return userService.getAll();
    }

    @GetMapping("/{id}")
    public Utilisateur getById(@PathVariable Long id) {
        return userService.getById(id);
    }

    @PostMapping
    public ResponseEntity<Utilisateur> create(@Valid @RequestBody Utilisateur user) {
        return new ResponseEntity<>(userService.create(user), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public Utilisateur update(@PathVariable Long id, @Valid @RequestBody Utilisateur user) {
        return userService.update(id, user);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        userService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
