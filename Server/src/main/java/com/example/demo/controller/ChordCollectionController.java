package com.example.demo.controller;

import com.example.demo.dto.ChordCollectionDTO;
import com.example.demo.dto.ChordCollectionResponseDTO;
import com.example.demo.entity.ChordCollection;
import com.example.demo.repository.ChordCollectionRepository;
import com.example.demo.repository.SongRepository;
import com.example.demo.service.ChordCollectionService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/v1/chordcollection")
public class ChordCollectionController {
    @Autowired
    ChordCollectionRepository chordCollectionRepository;

    @Autowired
    ChordCollectionService chordCollectionService;

    //List own collection
    @GetMapping("/user/{id}")
    public ResponseEntity<List<ChordCollection>> getAllCollection(@PathVariable Long id)
    {
        return ResponseEntity.ok(chordCollectionService.findAllColletion(id));
    }

    //Get detail
    @GetMapping("/{id}")
    public ResponseEntity<ChordCollectionResponseDTO> findById(@PathVariable Long id){
        return ResponseEntity.ok(chordCollectionService.getDetail(id));
    }

    @PostMapping("/addchord")
    public ResponseEntity<String> addToCollection(@Valid @RequestBody ChordCollectionDTO collectionDTO){
        return chordCollectionService.addToCollection(collectionDTO);
    }

    @PostMapping("/remove")
    public ResponseEntity<String> removeChord(@Valid @RequestBody ChordCollectionDTO chordCollectionDTO){
        return chordCollectionService. removeChord(chordCollectionDTO);
    }

    @DeleteMapping("/delete")
    public  ResponseEntity<String> deleteCollection(@Valid @RequestBody ChordCollectionDTO chordCollectionDTO){
        return chordCollectionService.deleteCollection(chordCollectionDTO);
    }

}
