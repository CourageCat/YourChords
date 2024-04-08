package com.example.demo.controller;

import com.example.demo.dto.CommentBeatDTO;
import com.example.demo.dto.CommentBeatResponseDTO;
import com.example.demo.service.BeatCommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/comment/beat")
@CrossOrigin(origins =  "*")
public class BeatCommentController {
    @Autowired
    private BeatCommentService service;

    @GetMapping("/{id}")
    public List<CommentBeatResponseDTO> viewComment(@PathVariable Long id){
        return service.viewComment(id);
    }

    @PostMapping("/addComment")
    public ResponseEntity<String> addComment(@RequestBody CommentBeatDTO commentBeatDTO){
        return service.addComment(commentBeatDTO);
    }

    @PutMapping("")
    public ResponseEntity<String> updateComment(@RequestBody CommentBeatDTO commentBeatDTO){
        return service.updateComment(commentBeatDTO);
    }

    @DeleteMapping("")
    public ResponseEntity<String> deleteComment(@RequestBody CommentBeatDTO commentBeatDTO){
        return service.deleteComment(commentBeatDTO);
    }
}
