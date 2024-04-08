package com.example.demo.controller;

import com.example.demo.dto.AuthenRequest;
import com.example.demo.dto.AuthenRespone;
import com.example.demo.dto.RegisterDTO;
import com.example.demo.jwt.JwtTokenProvider;
import com.example.demo.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;


@RestController
@RequestMapping(path = {"/api/auth"})
public class AuthenController {

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private UserService userService;

    // Register a new account
    @PostMapping(path = "/register")
    public ResponseEntity<String> register(@Valid @RequestBody RegisterDTO registerDTO){
        return this.userService.signup(registerDTO);
    }

    // Login to authentication
    @PostMapping(path = "/login")
    public ResponseEntity<AuthenRespone> login(@RequestBody AuthenRequest authenRequest){
        return ResponseEntity.ok(this.jwtTokenProvider.authenticate(authenRequest));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)  // Nếu validate fail thì trả về 400
    public ResponseEntity<Map<String, String>> handleBindException(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((objectError -> {
            String fieldName = ((FieldError) objectError).getField();
            String errorMsg = objectError.getDefaultMessage();
            errors.put(fieldName, errorMsg);
        }));
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errors);
    }
}
