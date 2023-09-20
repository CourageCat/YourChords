package com.example.demo.service.implement;

import com.example.demo.dto.LoginDTO;
import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.response.ResponseObject;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public String addUser(User user) {
        User us = new User(user.getUsername(),this.passwordEncoder.encode(user.getPass()),user.getFullName(),user.getMail(),user.getRoleID());
        userRepository.save(us);
        return us.getUsername();
    }

    @Override
    public ResponseObject loginUser(LoginDTO loginDTO) {
        String msg = "";
        User user = userRepository.findUserByUsername(loginDTO.getUsername());
        if (user != null) {
            String password = loginDTO.getPassword();
            String encodedPassword = user.getPass();
            Boolean isPwdRight = passwordEncoder.matches(password, encodedPassword);
            if (isPwdRight) {
                Optional<User> us = userRepository.findUserByUsernameAndPass(loginDTO.getUsername(), encodedPassword);
                if (us.isPresent()) {
                    return new ResponseObject("OK", "Login Success", us);
                } else {
                    return new ResponseObject("Failed","Login Failed", "");
                }
            } else {
                return new ResponseObject("Failed","password Not Match", "");
            }
        }else {
            return new ResponseObject("Failed","username Not Match", "");
        }
    }
}