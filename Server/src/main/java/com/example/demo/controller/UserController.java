//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//

package com.example.demo.controller;

import com.example.demo.dto.UserDTO;
import com.example.demo.dto.UserResponeDTO;
import com.example.demo.service.EmailService;
import com.example.demo.service.UserService;
import com.example.demo.validationgroups.UpdateValidation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(path = {"/api/v1/user"})
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private EmailService emailService;

    @GetMapping("/active")
    public ResponseEntity<String> activeAccount(@RequestParam("activetoken") String token){
        return this.userService.activateUserAccount(token);
    }

    // Update Customer Info
    @PatchMapping("/customer")
    public ResponseEntity<String> updateUserInfo(@RequestPart(value = "file", required = false)MultipartFile image, @Validated(UpdateValidation.Customer.class) @RequestPart("json") UserDTO userDTO){
        return this.userService.updateUserInfo(userDTO, image);
    }

    // Get detail Customer
    @GetMapping("/{id}")
    public ResponseEntity<UserResponeDTO> getDetailUser_User(@PathVariable Long id){
        return ResponseEntity.ok(this.userService.getDetailUser_User(id));
    }

    // Update Musician Info
    @PatchMapping("/musician")
    public ResponseEntity<String> updateMusicianInfo(@RequestPart(value = "file", required = false)MultipartFile image, @Validated(UpdateValidation.Musician.class) @RequestPart("json") UserDTO userDTO){
        return this.userService.updateMusicianInfo(userDTO, image);
    }

    @GetMapping("/musician/name")
    public ResponseEntity<List<String>> viewAllMusicianName(){
        return ResponseEntity.ok(this.userService.viewallnamemusician());
    }

    @PostMapping("/contactus")
    public ResponseEntity<String> contactUs(@RequestBody UserDTO userDTO){
        return this.emailService.sendEmailContact(userDTO.getEmail(), "Contact From User", userDTO.getFullName(), userDTO.getPhone(), userDTO.getEmail(), userDTO.getContent());
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
