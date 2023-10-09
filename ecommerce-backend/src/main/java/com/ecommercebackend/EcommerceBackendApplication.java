package com.ecommercebackend;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class EcommerceBackendApplication {

    // Create a logger for this class
    private static final Logger log = LoggerFactory.getLogger(EcommerceBackendApplication.class);

    // Main method to start the Spring Boot application
    public static void main(String[] args) {
        SpringApplication.run(EcommerceBackendApplication.class, args);
    }

    /**
     * Define a command line runner to be executed after the application starts.
     * This runner logs a message indicating successful application startup.
     *
     * @return A CommandLineRunner instance to initialize the application.
     */
    @Bean
    public CommandLineRunner initializeApplication() {
        return (args) -> {
            // Log a message indicating successful application startup
            log.info("Application started successfully.");
        };
    }
}
