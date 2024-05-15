package com.example.demo.controller;
import com.example.demo.service.CloudinaryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
@RestController
@RequestMapping("/api/v1/files")
public class CloudinaryController {
    private final CloudinaryService cloudinaryService;

    public CloudinaryController(CloudinaryService cloudinaryService) {
        this.cloudinaryService = cloudinaryService;
    }

    @PostMapping("/upload/image")
    public ResponseEntity<?> uploadImage(@RequestPart("file") MultipartFile file,
                                         @RequestPart("folder") String folderName) throws IOException {
        return ResponseEntity.ok(cloudinaryService.uploadFile(file, folderName));
    }

    @PostMapping("/upload/video")
    public ResponseEntity<?> uploadVideo(@RequestPart("file") MultipartFile file,
                                         @RequestPart("folder") String folderName) throws IOException {
        return ResponseEntity.ok(cloudinaryService.uploadVideo(file, folderName));
    }

    @DeleteMapping ("/delete/image")
    public ResponseEntity<?> deleteImages(@RequestPart("file") MultipartFile file,
                                         @RequestPart("folder") String folderName) throws IOException {
        return ResponseEntity.ok(cloudinaryService.deleteFile("your_chords/images/nee7spupd8skyrynzj5i", folderName));
    }
}
