package com.example.crudapplications;

import com.example.crudapplications.models.*;
import com.example.crudapplications.models.Utilisateur;
import com.example.crudapplications.repositories.*;
import com.example.crudapplications.repositories.UtilisateurRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class CrudApplicationsApplication {

    public static void main(String[] args) {
        SpringApplication.run(CrudApplicationsApplication.class, args);
    }


    @Bean
    public CommandLineRunner loadData(
            ProductRepository productRepo,
            UtilisateurRepository userRepo,
            TaskRepository taskRepo) {
        return args -> {
            Product p1 = new Product();
            p1.setName("Ordinateur Portable");
            p1.setPrice(1200.0);
            productRepo.save(p1);

            Product p2 = new Product();
            p2.setName("Imprimante");
            p2.setPrice(250.0);
            productRepo.save(p2);

            
            Utilisateur u1 = new Utilisateur();
            u1.setName("Sara Sekkoute");
            u1.setEmail("sara@example.com");
            userRepo.save(u1);

            Utilisateur u2 = new Utilisateur();
            u2.setName("Yassine");
            u2.setEmail("yassine@example.com");
            userRepo.save(u2);

            Task t1 = new Task();
            t1.setTitle("Livrer produit");
            t1.setDescription("Livrer l’ordinateur au client.");
            t1.setAssignedUser(u1);
            t1.setRelatedProduct(p1);
            taskRepo.save(t1);

            Task t2 = new Task();
            t2.setTitle("Installer imprimante");
            t2.setDescription("Installation chez le client.");
            t2.setAssignedUser(u2);
            t2.setRelatedProduct(p2);
            taskRepo.save(t2);

            System.out.println(" Données de test insérées !");
        };
    }

}
