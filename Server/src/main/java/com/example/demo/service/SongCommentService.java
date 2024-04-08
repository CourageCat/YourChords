package com.example.demo.service;

import com.example.demo.dto.CommentSongDTO;
import com.example.demo.dto.CommentSongResponseDTO;
import com.example.demo.entity.*;
import com.example.demo.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class SongCommentService {

    @Autowired
    private SongRepository songRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SongCommentRepository songCommentRepository;

    // comment
    public ResponseEntity<String> commentSong(CommentSongDTO dto) {
        Optional<User> foundUser = userRepository.findUserByIdAndStatus(dto.getUserId(), 1);
        if (foundUser.isPresent()) {
            Optional<Song> foundSong = this.songRepository.findSongByIdAndStatus(dto.getSongId(), 1);
            if (foundSong.isPresent()) {
                Song song = foundSong.get();
                Optional<SongComment> foundParentCommnent = this.songCommentRepository.findParentCommentById(dto.getParentId());
                if (foundParentCommnent.isPresent()) {
                    SongComment comment = new SongComment(dto.getContent(),
                            foundUser.get(),
                            song,
                            foundParentCommnent.get());
                    this.songCommentRepository.save(comment);
                    song.setCmt(song.getCmt() + 1);
                    this.songRepository.save(song);
                    return new ResponseEntity<>("Reply Comment Successfully", HttpStatus.OK);
                }
                SongComment comment = new SongComment(dto.getContent(),
                        foundUser.get(),
                        song,
                        null);
                this.songCommentRepository.save(comment);
                song.setCmt(song.getCmt() + 1);
                this.songRepository.save(song);
                return new ResponseEntity<>("Comment Successfully", HttpStatus.OK);
            }
        }
        return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
    }

    // update
    public ResponseEntity<String> updateComment(CommentSongDTO dto, Long id) {
        Optional<User> foundUser = this.userRepository.findUserByIdAndStatus(dto.getUserId(), 1);
        if (foundUser.isPresent()) {
            Optional<SongComment> foundComment = this.songCommentRepository.findSongCommentByIdAndCommentByUsers(id, foundUser.get());
            if (foundComment.isPresent()) {
                SongComment comment = foundComment.get();
                comment.setContent(dto.getContent());
                this.songCommentRepository.save(comment);
                return new ResponseEntity<>("Updated Comment Successfully!", HttpStatus.OK);
            }
            return new ResponseEntity<>("Comment has been deleted!", HttpStatus.NOT_IMPLEMENTED);
        }
        return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
    }

    // delete
    public ResponseEntity<String> deleteComment(CommentSongDTO dto, Long id) {
        Optional<User> foundUser = this.userRepository.findUserByIdAndStatus(dto.getUserId(), 1);
        if (foundUser.isPresent()) {
            Optional<Song> foundSound = this.songRepository.findSongByIdAndStatus(dto.getSongId(), 1);
            if (foundSound.isPresent()) {
                Song song = foundSound.get();
                Optional<SongComment> foundComment = this.songCommentRepository.findSongCommentByIdAndCommentByUsers(id, foundUser.get());
                if (foundComment.isPresent()) {
                    SongComment commentToDelete = foundComment.get();
                    deleteSubComments(commentToDelete);
                    Long remainingComment = this.songCommentRepository.countBySongOfComment(song);
                    song.setCmt(remainingComment.intValue());
                    this.songRepository.save(song);
                    return new ResponseEntity<>("Deleted Comment Successfully!", HttpStatus.OK);
                }
                return new ResponseEntity<>("Comment not found!", HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>("Song not found!", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>("User not found!", HttpStatus.NOT_FOUND);
    }

    private void deleteSubComments(SongComment comment) {
        List<SongComment> subComments = this.songCommentRepository.findByParentComment(comment);
        for (SongComment subComment : subComments) {
            deleteSubComments(subComment);
        }
        this.songCommentRepository.delete(comment);
    }

    // view
    public List<CommentSongResponseDTO> viewComment(Long id) {
        Optional<Song> foundSong = this.songRepository.findSongByIdAndStatus(id, 1);
        if (foundSong.isPresent()) {
            List<SongComment> songComments = this.songCommentRepository.findSongCommentsBySongOfCommentAndParentCommentIsNull(foundSong.get());
            if (!songComments.isEmpty()) {
                List<CommentSongResponseDTO> dtoList = new ArrayList<>();
                for (SongComment value : songComments) {
                    CommentSongResponseDTO parentComment = new CommentSongResponseDTO(
                            value.getId(),
                            null,
                            value.getContent(),
                            value.getCommentByUsers().getId(),
                            value.getCommentByUsers().getUsername(),
                            value.getSongOfComment().getId(),
                            value.getCreatedAt(),
                            getSubComment(value),
                            value.getCommentByUsers().getAvatar()
                    );
                    dtoList.add(parentComment);
                }
                return dtoList;
            }
            return null;
        }
        return null;
    }

    private List<CommentSongResponseDTO> getSubComment(SongComment comment) {
        List<SongComment> subList = this.songCommentRepository.findByParentComment(comment);
        if (!subList.isEmpty()) {
            List<CommentSongResponseDTO> subCommentDtos = new ArrayList<>();
            for (SongComment value : subList) {
                CommentSongResponseDTO dto = new CommentSongResponseDTO(
                        value.getId(),
                        value.getParentComment().getId(),
                        value.getContent(),
                        value.getCommentByUsers().getId(),
                        value.getCommentByUsers().getUsername(),
                        value.getSongOfComment().getId(),
                        value.getCreatedAt(),
                        getSubComment(value),
                        value.getCommentByUsers().getAvatar());
                subCommentDtos.add(dto);
            }
            return subCommentDtos;
        }
        return null;
    }
}
