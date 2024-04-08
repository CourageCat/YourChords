package com.example.demo.controller;

import com.example.demo.dto.PaginationResponseDTO;
import com.example.demo.dto.SongReportResponseDTO;
import com.example.demo.dto.UserDTO;
import com.example.demo.dto.UserResponeDTO;
import com.example.demo.entity.User;
import com.example.demo.service.SongReportService;
import com.example.demo.service.SongService;
import com.example.demo.service.UserService;
import com.example.demo.validationgroups.UpdateValidation;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(path = {"/api/v1/admin"})
public class AdminController {

    @Autowired
    private UserService userService;

    @Autowired
    private SongReportService songReportService;

    @Autowired
    private SongService songService;

    // Update Admin Info
    @PatchMapping
    public ResponseEntity<String> updateAdminInfo(@Validated(UpdateValidation.Admin.class) @RequestBody UserDTO userDTO){
        return this.userService.updateAdminInfo(userDTO);
    }

    //List all Customer in Admin
    @GetMapping("")
    public ResponseEntity<List<UserResponeDTO>> getAllUsers() {
        return ResponseEntity.ok(this.userService.getAllUsers());
    }



    //Get detail Customer
    @GetMapping(path = {"/{id}"})
    public ResponseEntity<User> getDetailUser_Admin(@Valid @PathVariable Long id) {
        return ResponseEntity.ok(this.userService.getDetailUser_Admin(id));
    }

    //Ban user
    @PostMapping("/user/ban")
    public ResponseEntity<String> banUser(@RequestBody UserDTO userDTO) {
        return this.userService.banUser(userDTO);
    }

    //Warn user
    @PostMapping("/user/warn")
    public ResponseEntity<String> warnUser(@RequestBody UserDTO userDTO) {
        return this.userService.warnUser(userDTO);
    }

    //Unban user
    @PostMapping("/user/unban")
    public ResponseEntity<String> unbanUser(@RequestBody UserDTO userDTO) {
        return this.userService.unbanUser(userDTO);
    }

    //Search user by name
    @GetMapping("/username")
    public ResponseEntity<List<User>> searchByUserName(@RequestParam("username") String name) {
        return ResponseEntity.ok(this.userService.searchByUserName(name));
    }

    @GetMapping("/report/song")
    public ResponseEntity<List<SongReportResponseDTO>> viewSongsBeenReport(){
        return ResponseEntity.ok(this.songReportService.viewSongsReported());
    }

    @PostMapping("/ban/song/{id}")
    public ResponseEntity<String> banSong(@PathVariable Long id){
        return this.songService.banSong(id);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)  // Nếu validate fail thì trả về 400
    public Map<String, String> handleBindException(MethodArgumentNotValidException ex) {

        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((objectError -> {
            String fieldName = ((FieldError) objectError).getField();
            String errorMsg = objectError.getDefaultMessage();
            errors.put(fieldName, errorMsg);
        }));
        return errors;
    }

    @GetMapping("/user/ban")
    public ResponseEntity<List<UserResponeDTO>> getAllBannedUser(){
        return ResponseEntity.ok(this.userService.listUserBanned());
    }

    @GetMapping("/musician/policy")
    public ResponseEntity<List<UserResponeDTO>> getAllMusicianBreaksPolicy(){
        return ResponseEntity.ok(this.userService.listMusicianBreaksPolicy());
    }

    @PostMapping("/musician/policy/{id}")
    public ResponseEntity<Integer> countRejectMusicianBeat(@PathVariable Long id){
        return ResponseEntity.ok(this.userService.countBeatRequestRejected(id));
    }
}
