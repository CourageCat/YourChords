package com.example.demo.controller;

import com.example.demo.dto.CommentSongDTO;
import com.example.demo.dto.CommentSongResponseDTO;
import com.example.demo.service.SongCommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = {"/api/v1/comment"})
public class SongCommentController {

    @Autowired
    private SongCommentService songCommentService;

    @PostMapping
    public ResponseEntity<String> comment (@RequestBody CommentSongDTO dto){
        return this.songCommentService.commentSong(dto);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<String> updateComment (@PathVariable Long id, @RequestBody CommentSongDTO dto){
        return this.songCommentService.updateComment(dto, id);
    }

    @PostMapping("/{id}")
    public ResponseEntity<String> deleteComment (@PathVariable Long id,@RequestBody CommentSongDTO dto){
        return this.songCommentService.deleteComment(dto, id);
    }

    @GetMapping("/song/{id}")
    public ResponseEntity<List<CommentSongResponseDTO>> viewComment (@PathVariable Long id){
        return ResponseEntity.ok(this.songCommentService.viewComment(id));
    }
}
