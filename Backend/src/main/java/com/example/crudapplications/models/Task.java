package com.example.crudapplications.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Entity
@Data
@Table(name = "task")

public class Task {
    @Id  @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Le titre ne doit pas être vide")
    private String title;

    private String description;

    @ManyToOne
    private Utilisateur assignedUser;

    @ManyToOne
    private Product relatedProduct;
}
