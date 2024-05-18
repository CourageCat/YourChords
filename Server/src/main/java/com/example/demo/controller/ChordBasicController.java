package com.example.demo.controller;

import com.example.demo.dto.ChordDTO;
import com.example.demo.dto.ChordResponseDTO;
import com.example.demo.dto.ChordUpdateDTO;
import com.example.demo.entity.ChordBasic;
import com.example.demo.repository.ChordBasicRepository;
import com.example.demo.service.ChordBasicService;
import jakarta.validation.Valid;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping(path = "/chord")
public class ChordBasicController {

    @Autowired
    ChordBasicRepository chordBasicRepository;

    @Autowired
    ChordBasicService chordBasicService;

    @GetMapping(path = "")
    public List<ChordBasic> getAllChords() {
        return chordBasicRepository.findAll();
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<ChordBasic> findById(@PathVariable Long id) {
        return ResponseEntity.ok(chordBasicService.findById(id));
    }

    @GetMapping(path = "/searchChord/{key}/{suffix}/{type}")
    public ResponseEntity<List<ChordBasic>> searchChord(@PathVariable String key, @PathVariable String suffix, @PathVariable String type) {
        return ResponseEntity.ok(chordBasicService.searchChord(key, suffix, type));
    }

    @GetMapping(path = "/searchChord/{type}")
    public ResponseEntity<List<ChordResponseDTO>> searchChordByType(@PathVariable String type) {
        return ResponseEntity.ok(chordBasicService.searchChordByType(type));
    }

    @PostMapping("")
    public ResponseEntity<String> uploadChord(@RequestPart("file") MultipartFile image, @Valid @RequestPart("json") ChordDTO chordDTO) throws IOException {
        return this.chordBasicService.uploadChord(image, chordDTO);
    }

    @PatchMapping("")
    public ResponseEntity<String> updateChord(@RequestPart("file") MultipartFile image, @RequestPart("json")ChordUpdateDTO chordUpdateDTO) throws IOException {
        return this.chordBasicService.updateChord(image, chordUpdateDTO);
    }

    @GetMapping("/guitar")
    public ResponseEntity<List<ChordResponseDTO>> getGuitarChord() {
        return ResponseEntity.ok(this.chordBasicService.getGuitarChord());
    }
}
