package com.example.demo.database;

import com.example.demo.entity.Genre;
import com.example.demo.entity.User;
import com.example.demo.repository.BeatRepository;
import com.example.demo.repository.GenreRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class Database {
    @Bean
    CommandLineRunner initDatabase() {
        return new CommandLineRunner() {
            @Autowired
            private PasswordEncoder passwordEncoder;

            @Autowired
            private GenreRepository genreRepository;

            @Override
            public void run(String... args) throws Exception {

//                Customer admin = new Customer("admin", this.passwordEncoder.encode("1"), "toi la admin", "12323123", null,1);
//                admin.setRole("AD");
//
//                Customer musician = new Customer("music", this.passwordEncoder.encode("1"), "toi la musician", "12323123", null,1);
//                musician.setRole("MS");
//
//                Customer customer = new Customer("user", this.passwordEncoder.encode("1"), "toi la user", Customer.Gender.MALE , "12323123@gmail.com", null,null,"US",1);
//                customer.setRole("US");
//                userRepository.save(customer);

//                System.out.println("insert date: " + userRepository.save(admin));
//                System.out.println("insert date: " + userRepository.save(musician));
//                System.out.println("insert date: " + userRepository.save(customer));

//                genreRepository.save(new Genre("COUNTRY",null));
//                genreRepository.save(new Genre("POP",null));
//                genreRepository.save(new Genre("ROCK",null));

            }
        };
    }
}
