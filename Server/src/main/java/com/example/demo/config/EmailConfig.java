package com.example.demo.config;


import com.example.demo.security.SecretKey;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.annotation.PropertySources;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import java.util.Properties;

@Getter
@Configuration
@PropertySources({@PropertySource("classpath:application.properties")})
public class EmailConfig {

    private final String email = SecretKey.getEmail();
    private final String pass = SecretKey.getEmail_password();


    @Value("${spring.mail.host}")
    private String host;

    @Value("${spring.mail.port}")
    private int port;

    @Value("${spring.mail.properties.mail.smtp.auth}")
    private boolean auth;

    @Value("${spring.mail.properties.mail.smtp.starttls.enable}")
    private boolean startTlsEnable;

    @Bean
    public JavaMailSender javaMailSender() {
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        mailSender.setHost(getHost());
        mailSender.setPort(getPort());
        mailSender.setUsername(email);
        mailSender.setPassword(pass);

        Properties props = mailSender.getJavaMailProperties();
        props.put("mail.smtp.auth", isAuth());
        props.put("mail.smtp.starttls.enable", isStartTlsEnable());

        return mailSender;
    }

}
