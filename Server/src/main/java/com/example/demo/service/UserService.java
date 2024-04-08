//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//

package com.example.demo.service;

import com.example.demo.dto.BeatRequestResponseDTO;
import com.example.demo.dto.RegisterDTO;
import com.example.demo.dto.UserDTO;
import com.example.demo.dto.UserResponeDTO;
import com.example.demo.entity.*;
import com.example.demo.repository.BeatRequestRepository;
import com.example.demo.repository.MusicianRequestRepository;
import com.example.demo.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.RandomStringUtils;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    private BeatRequestRepository beatRequestRepository;

    @Autowired
    private MusicianRequestRepository musicianRequestRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private EmailService emailService;

    @Autowired
    private GoogleCloudService service;

    public int countBeatRequestRejected(Long id){
        int count = 0;
        Optional<User> foundUser  = userRepository.findById(id);
        if (foundUser.isPresent()){
            List<MusicianRequest> listOrder  = musicianRequestRepository.findAllByMsRequest(foundUser.get());
            List<BeatRequestResponseDTO> list  =new ArrayList<>();
            for (MusicianRequest i :listOrder){
                BeatRequest b  = new BeatRequest();
                b = beatRequestRepository.findByRequestId(i);
                if(b.getStatus() == -2){
                    count ++;
                }
            }
            return count;
        }
        return count;
    }

    private ResponseEntity<String> getStringResponseEntity(MultipartFile image, User user) {
        if (image != null && !image.isEmpty()) {
            if (uploadFile(image, user)) return new ResponseEntity<>("Update Failed!", HttpStatus.NOT_IMPLEMENTED);
            this.userRepository.save(user);
            return new ResponseEntity<>("Update Successfully", HttpStatus.OK);
        }
        this.userRepository.save(user);
        return new ResponseEntity<>("Update Successfully", HttpStatus.OK);
    }

    private boolean uploadFile(MultipartFile image, User user) {
        String path = this.service.uploadFile(image, user.getId(), "avatar", "full", user.getObjectName());
        if (path == null) {
            return true;
        }
        String fileName = this.extractObjectNameFromUrl(path);
        user.setAvatar(path);
        user.setObjectName(fileName);
        return false;
    }

    private String extractObjectNameFromUrl(String fullUrl) {
        if (fullUrl.startsWith("https://storage.googleapis.com/mychordproject/")) {
            int startIndex = "https://storage.googleapis.com/mychordproject/".length();
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
            Optional<User> foundMail = this.userRepository.findUserMail(registerDTO.getEmail());
            if (foundMail.isPresent()) {
                if (foundMail.get().getStatus() == -1 && !isTokenValid(foundMail.get().getActivationToken().getExpiryDate())) {
                    return getStringResponseEntity(registerDTO);
                }
                return new ResponseEntity<>("Email is already signed up", HttpStatus.NOT_IMPLEMENTED);
            }
            return getStringResponseEntity(registerDTO);
        }
        return new ResponseEntity<>("Username is already signed up", HttpStatus.NOT_IMPLEMENTED);
    }

    @NotNull
    private ResponseEntity<String> getStringResponseEntity(RegisterDTO registerDTO) {
        String token = RandomStringUtils.randomAlphanumeric(64);
        User user = new User(registerDTO.getUserName(),
                this.passwordEncoder.encode(registerDTO.getPassword()),
                registerDTO.getFullName(),
                registerDTO.getEmail(),
                registerDTO.getRole(),
                User.Gender.MALE,
                -1, 0);
        ActivationToken activationToken = new ActivationToken(token, LocalDateTime.now().plusMinutes(30), user);
        user.setActivationToken(activationToken);
        this.userRepository.save(user);
        this.emailService.sendEmail(registerDTO.getEmail(),
                "Activate Your Account",
                "http://localhost:3000/registeractivation?activetoken=" + token);
        if (user.getRole().equals("MS")) {
            MusicianInformation information = new MusicianInformation();
            user.setInformation(information);
            this.userRepository.save(user);
        }
        return new ResponseEntity<>("Signup Successfully", HttpStatus.OK);
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
            dto.setAddress(user.getAddress());
            dto.setUsername(user.getUsername());
            dto.setFullName(user.getFullName());
            dto.setGender(user.getGender().toString());
            dto.setAvatar(user.getAvatar());
            dto.setCreateAt(user.getCreatedAt());
            dto.setPhone(user.getPhoneNumber());
            dto.setMail(user.getMail());

            if (user.getRole().equals("MS")) {
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
    public ResponseEntity<String> banUser(UserDTO userDTO) {
        Optional<User> foundUser = this.userRepository.findUserByIdAndStatus(userDTO.getId(), 1);
        if (foundUser.isPresent()) {
            User user = foundUser.get();
            user.setStatus(0);
            this.userRepository.save(user);
            this.emailService.sendEmailForBan(user.getMail(), "YOU GOT BANNED", userDTO.getContent());
            return new ResponseEntity<>("Ban Successfully", HttpStatus.OK);
        }
        return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
    }

    // Banned User
    public ResponseEntity<String> warnUser(UserDTO userDTO) {
        Optional<User> foundUser = this.userRepository.findUserByIdAndStatus(userDTO.getId(), 1);
        if (foundUser.isPresent()) {
            User user = foundUser.get();
            this.emailService.sendEmailForWarn(user.getMail(), "WARNING!", userDTO.getContent());
            return new ResponseEntity<>("Warn Successfully", HttpStatus.OK);
        }
        return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
    }

    public ResponseEntity<String> unbanUser(UserDTO userDTO) {
        Optional<User> foundUser = this.userRepository.findUserByIdAndStatus(userDTO.getId(), 0);
        if (foundUser.isPresent()) {
            User user = foundUser.get();
            user.setStatus(1);
            this.userRepository.save(user);
            this.emailService.sendEmailForUnBan(user.getMail(), "YOU GOT UNBANNED");
            return new ResponseEntity<>("Unban Successfully", HttpStatus.OK);
        }
        return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
    }


    // Update Admin Info
    public ResponseEntity<String> updateAdminInfo(UserDTO userDTO) {
        Optional<User> foundUser = this.userRepository.findById(userDTO.getId());
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
    public ResponseEntity<String> updateUserInfo(UserDTO userDTO, MultipartFile image) {
        Optional<User> foundUser = this.userRepository.findUserByIdAndStatus(userDTO.getId(), 1);
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
    public ResponseEntity<String> updateMusicianInfo(UserDTO userDTO, MultipartFile image) {
        Optional<User> foundUser = this.userRepository.findUserByIdAndStatus(userDTO.getId(), 1);
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
    public List<User> searchByUserName(String name) {
        List<User> userEntity = this.userRepository.searchByUserName(name);
        return userEntity.isEmpty() ? null : userEntity;
    }

    // Get All User
    public List<UserResponeDTO> getAllUsers() {
        List<UserResponeDTO> userResponeDTOList = new ArrayList<>();
        List<User> u = userRepository.findAllByOrderByStatusDesc();
        UserResponeDTO dto;
        for (User user : u) {
            dto = new UserResponeDTO(
                    user.getId(),
                    user.getUsername(),
                    user.getFullName(),
                    user.getGender().toString(),
                    user.getRole(),
                    user.getMail(),
                    user.getStatus(),
                    user.getCreatedAt(),
                    user.getPhoneNumber(),
                    user.getAvatar());
            if (user.getRole().equals("MS")) {
                MusicianInformation information = user.getInformation();
                dto.setProfessional(information.getProfessional());
                dto.setYear(information.getYear());
                dto.setPrize(information.getPrize());
            }
            userResponeDTOList.add(dto);
        }
       return userResponeDTOList;
    }

    // View all name of musician
    public List<String> viewallnamemusician() {
        List<String> names = this.userRepository.findAllNameOfMusician();
        if (!names.isEmpty()) {
            return names;
        }
        return null;
    }

    public List<UserResponeDTO> listUserBanned() {
        List<User> users = userRepository.findAllByStatus(0);
        List<UserResponeDTO> dtos = new ArrayList<>();
        for (User us : users) {
            UserResponeDTO dto = new UserResponeDTO(
                    us.getId(),
                    us.getUsername(),
                    us.getRole(),
                    us.getMail(),
                    us.getCreatedAt(),
                    us.getStatus(),
                    us.getAvatar()
            );
            dtos.add(dto);
        }
        return dtos;
    }

    public List<UserResponeDTO> listMusicianBreaksPolicy(){
        List<User> users = userRepository.findAll();
        List<UserResponeDTO> dtos = new ArrayList<>();
        for(User us : users){
            if(countBeatRequestRejected(us.getId()) >= 3){
                UserResponeDTO dto = new UserResponeDTO(
                        us.getId(),
                        us.getUsername(),
                        us.getFullName(),
                        us.getRole(),
                        us.getMail(),
                        us.getStatus(),
                        us.getAvatar(),
                        us.getCreatedAt()
                );
                dtos.add(dto);
            }
        }
        return dtos;
    }

}
