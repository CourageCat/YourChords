package com.example.demo.service;

import com.example.demo.dto.GenreDTO;
import com.example.demo.dto.GenreResponseDTO;
import com.example.demo.entity.Genre;
import com.example.demo.repository.GenreRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Transactional
@RequiredArgsConstructor
@Slf4j
@Service
public class GenreService {

    @Autowired
    private GenreRepository genreRepository;

    public List<GenreResponseDTO> findAllGenre() {
        List<Genre> genres = this.genreRepository.findAll();
        if (!genres.isEmpty()) {
            List<GenreResponseDTO> dtos = new ArrayList<>();
            for (Genre value : genres) {
                GenreResponseDTO dto = new GenreResponseDTO(
                        value.getId(),
                        value.getName(),
                        value.getDescription()
                );
                dtos.add(dto);
            }
            return dtos;
        }
        return null;
    }

    public ResponseEntity<String> addGerne (GenreDTO genreDTO){
        Optional<Genre> foundGenre = Optional.ofNullable(this.genreRepository.findByName(genreDTO.getName()));
        if(foundGenre.isEmpty()){
            Genre genre = new Genre(genreDTO.getName(), genreDTO.getDescription());
            this.genreRepository.save(genre);
            return new ResponseEntity<>("Add được rồi đó Hiển", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Add ko được rồi, check lại database", HttpStatus.NOT_IMPLEMENTED);
        }
    }
}
