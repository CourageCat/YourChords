package com.example.demo.controller;

import com.example.demo.dto.GenreDTO;
import com.example.demo.dto.GenreResponseDTO;
import com.example.demo.service.GenreService;
import com.example.demo.service.GoogleCloudService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = {"/api/v1/genre"})
public class GenreController {

    @Autowired
    private GenreService genreService;
@Autowired
    GoogleCloudService service;

    // List all genres
    @GetMapping("")
    public ResponseEntity<List<GenreResponseDTO>> getAllGenre(){
        return ResponseEntity.ok(this.genreService.findAllGenre());
    }

    @PostMapping("")
    public ResponseEntity<String> addGenre(@Valid @RequestBody GenreDTO genreDTO){
        return this.genreService.addGerne(genreDTO);
    }

}
