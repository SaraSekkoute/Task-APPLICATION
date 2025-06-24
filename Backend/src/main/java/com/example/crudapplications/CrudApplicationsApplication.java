package com.example.crudapplications;

import com.example.crudapplications.models.Utilisateur;
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
            UtilisateurRepository userRepo) {
        return args -> {

            
            Utilisateur u1 = new Utilisateur();
            u1.setName("Sara Sekkoute");
            u1.setEmail("sara@example.com");
            userRepo.save(u1);

            Utilisateur u2 = new Utilisateur();
            u2.setName("Yassine");
            u2.setEmail("yassine@example.com");
            userRepo.save(u2);


            System.out.println(" Données de test insérées !");
        };
    }

}
