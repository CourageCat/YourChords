//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//

package com.example.demo.service;

import com.example.demo.dto.PaginationResponseDTO;
import com.example.demo.dto.RegisterDTO;
import com.example.demo.dto.UserDTO;
import com.example.demo.dto.UserResponeDTO;
import com.example.demo.entity.MusicianInformation;
import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.apache.commons.lang3.RandomStringUtils;

import org.springframework.security.core.parameters.P;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Transactional
@RequiredArgsConstructor
@Slf4j
@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private EmailService emailService;

    @Autowired
    private GoogleCloudService service;

    @NotNull
    private ResponseEntity<String> getStringResponseEntity(MultipartFile image, User user) {
        if(user.getAvatar().isEmpty()) {
            String path = this.service.uploadFile(image, user.getId(), "avatar", "full");
            String fileName = this.extractObjectNameFromUrl(path);
            user.setAvatar(path);
            user.setObjectName(fileName);
        } else {
            this.service.updateFile(image, user.getObjectName());
        }
        this.userRepository.save(user);
        return new ResponseEntity<>("Update Successfully", HttpStatus.OK);
    }

    private String extractObjectNameFromUrl(String fullUrl) {
        if (fullUrl.startsWith("https://storage.googleapis.com/")) {
            int startIndex = "https://storage.googleapis.com/".length();
            return fullUrl.substring(startIndex);
        }
        return null;
    }

    private boolean isTokenValid(LocalDateTime expiryDate) {
        LocalDateTime currentDateTime = LocalDateTime.now();
        return expiryDate != null && expiryDate.isAfter(currentDateTime);
    }

    // Sign Up
    public ResponseEntity<String> signup(RegisterDTO registerDTO) {
        Optional<User> foundUser = this.userRepository.findUserByUsername(registerDTO.getUserName());
        if (foundUser.isEmpty()) {
            Optional<String> mail = this.userRepository.findUserMail(registerDTO.getEmail());
            if (mail.isEmpty()) {
                try {
                    String token = RandomStringUtils.randomAlphanumeric(64);
                    User user = new User(registerDTO.getUserName(),
                            this.passwordEncoder.encode(registerDTO.getPassword()),
                            registerDTO.getEmail(),
                            registerDTO.getRole(),
                            1);
                   /* ActivationToken activationToken = new ActivationToken(token, LocalDateTime.now().plusHours(12), user);
                    user.setActivationToken(activationToken);*/
                    this.userRepository.save(user);
                   /* this.emailService.sendEmail(userDTO.getMail(),
                            "Activate Your Account",
                            "http://localhost:3000/registeractivation?activetoken=" + token);*/
                    if (user.getRole().equals("MS")) {
                        MusicianInformation information = new MusicianInformation();
                        user.setInformation(information);
                        this.userRepository.save(user);
                    }
                    return new ResponseEntity<>("Signup Successfully", HttpStatus.OK);
                } catch (IllegalArgumentException e) {
                    return new ResponseEntity<>("Invalid Gender Value", HttpStatus.BAD_REQUEST);
                }
            }
            return new ResponseEntity<>("Email is already signed up", HttpStatus.NOT_IMPLEMENTED);
        }
        return new ResponseEntity<>("Username is already signed up", HttpStatus.NOT_IMPLEMENTED);
    }

    // Active Account
    public ResponseEntity<String> activateUserAccount(String token) {
        User foundUser = this.userRepository.findByActivationToken(token);
        if (foundUser != null && foundUser.getStatus() == -1 && isTokenValid(foundUser.getActivationToken().getExpiryDate())) {
            foundUser.setStatus(1);
            userRepository.save(foundUser);
            return new ResponseEntity<>("Active Successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Active Failed", HttpStatus.BAD_REQUEST);
        }
    }

    // Admin Detail
    public User getDetailUser_Admin(Long id) {
        Optional<User> foundUser = this.userRepository.findById(id);
        if (foundUser.isPresent()) {
            return this.userRepository.findById(id).orElseThrow();
        }
        return null;
    }

    // User Detail
    public UserResponeDTO getDetailUser_User(Long id) {
        Optional<User> foundUser = this.userRepository.findById(id);
        if (foundUser.isPresent()) {
            User user = foundUser.get();
            UserResponeDTO dto = new UserResponeDTO();
            dto.setId(user.getId());
            dto.setUsername(user.getUsername());
            dto.setFullName(user.getFullName());
            dto.setGender(user.getGender().toString());
            dto.setCreateAt(user.getCreatedAt());
            dto.setPhone(user.getPhoneNumber());
            dto.setMail(user.getMail());
            if (user.getRole().equals("MS")){
                MusicianInformation information = user.getInformation();
                dto.setProfessional(information.getProfessional());
                dto.setYear(information.getYear());
                dto.setPrize(information.getPrize());
            }
            return dto;
        }
        return null;
    }

    // Banned User
    public ResponseEntity<String> banUser(UserDTO userDTO, Long id) {
        Optional<User> foundUser = this.userRepository.findUserByIdAndStatus(id, 1);
        if (foundUser.isPresent()) {
            User user = foundUser.get();
            user.setStatus(0);
            this.userRepository.save(user);
            this.emailService.sendEmailForBan(user.getMail(), "YOU GOT BANNED", userDTO.getContent());
            return new ResponseEntity<>("Ban Successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }
    }

    // Update Admin Info
    public ResponseEntity<String> updateAdminInfo(UserDTO userDTO, Long id) {
        Optional<User> foundUser = this.userRepository.findById(id);
        if (foundUser.isPresent()) {
            User.Gender gender = User.Gender.valueOf(userDTO.getGender());
            User user = foundUser.get();
            user.setFullName(userDTO.getFullName());
            user.setGender(gender);
            this.userRepository.save(user);
            return new ResponseEntity<>("Update Successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Update Failed", HttpStatus.NOT_IMPLEMENTED);
        }
    }

    // Update User Info
    public ResponseEntity<String> updateUserInfo(UserDTO userDTO, Long id, MultipartFile image) {
        Optional<User> foundUser = this.userRepository.findUserByIdAndStatus(id, 1);
        if (foundUser.isPresent()) {
            User.Gender gender = User.Gender.valueOf(userDTO.getGender());
            User user = foundUser.get();
            user.setFullName(userDTO.getFullName());
            user.setGender(gender);
            user.setPhoneNumber(userDTO.getPhone());
            user.setAddress(userDTO.getAddress());
            return getStringResponseEntity(image, user);
        } else {
            return new ResponseEntity<>("Update Failed", HttpStatus.NOT_IMPLEMENTED);
        }
    }

    // Update Musician Info
    public ResponseEntity<String> updateMusicianInfo(UserDTO userDTO, Long id, MultipartFile image) {
        Optional<User> foundUser = this.userRepository.findById(id);
        if (foundUser.isPresent()) {
            User.Gender gender = User.Gender.valueOf(userDTO.getGender());
            User user = foundUser.get();
            user.setFullName(userDTO.getFullName());
            user.setGender(gender);
            user.setPhoneNumber(userDTO.getPhone());
            user.setAddress(userDTO.getAddress());
            MusicianInformation information = user.getInformation();
            information.setPrize(userDTO.getPrize());
            information.setProfessional(userDTO.getProfessional());
            information.setYear(userDTO.getYear());
            return getStringResponseEntity(image, user);
        } else {
            return new ResponseEntity<>("Update Failed", HttpStatus.NOT_IMPLEMENTED);
        }
    }


    // Search User - username
    public List<User> searchByUserName(UserDTO userDTO) {
        List<User> userEntity = this.userRepository.searchByUserName(userDTO.getUsername());
        return userEntity.isEmpty() ? null : userEntity;
    }

    // Get All User
    public PaginationResponseDTO getAllUsers(int page) {
        List<UserResponeDTO> userResponeDTOList =new ArrayList<>();
        Pageable pageable = PageRequest.of(page-1,10);
        Page<User> userList = userRepository.findAllByOrderByStatusDesc(pageable);
        UserResponeDTO dto;
            for (User user : userList.getContent()){
                dto = new UserResponeDTO(
                        user.getId(),
                        user.getUsername(),
                        user.getFullName(),
                        user.getGender().toString(),
                        user.getRole(),
                        user.getMail(),
                        user.getStatus(),
                        user.getCreatedAt(),
                        user.getPhoneNumber());
                    if (user.getRole().equals("MS")){
                        MusicianInformation information = user.getInformation();
                        dto.setProfessional(information.getProfessional());
                        dto.setYear(information.getYear());
                        dto.setPrize(information.getPrize());
                    }
                userResponeDTOList.add(dto);
            }
            int pageCount =  pageable.getPageNumber();
            return new PaginationResponseDTO(userResponeDTOList,pageCount);

    }



}
