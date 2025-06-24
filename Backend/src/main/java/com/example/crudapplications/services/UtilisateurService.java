package com.example.crudapplications.services;

import com.example.crudapplications.exception.ResourceNotFoundException;
import com.example.crudapplications.models.Utilisateur;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.crudapplications.repositories.UtilisateurRepository;

import java.util.List;

@Service
public class UtilisateurService {
    @Autowired
    private UtilisateurRepository UtilisateurRepository;

    public List<Utilisateur> getAll() {
        return UtilisateurRepository.findAll();
    }

    public Utilisateur getById(Long id) {
        return UtilisateurRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Utilisateur not found with ID: " + id));
    }

    public Utilisateur create(Utilisateur Utilisateur) {
        return UtilisateurRepository.save(Utilisateur);
    }

    public Utilisateur update(Long id, Utilisateur updatedUtilisateur) {
        Utilisateur existing = getById(id);
        existing.setName(updatedUtilisateur.getName());
        existing.setEmail(updatedUtilisateur.getEmail());
        return UtilisateurRepository.save(existing);
    }

    public void delete(Long id) {
        Utilisateur existing = getById(id);
        UtilisateurRepository.delete(existing);
    }
}
