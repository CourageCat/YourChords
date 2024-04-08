package com.example.demo.repository;

import com.example.demo.entity.Song;
import com.example.demo.entity.SongComment;
import com.example.demo.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public interface SongCommentRepository extends JpaRepository<SongComment, Long> {
    Optional<SongComment> findParentCommentById(Long id);

    List<SongComment> findSongCommentsBySongOfCommentAndParentCommentIsNull(Song song);

    List<SongComment> findByParentComment(SongComment comment);

    Optional<SongComment> findSongCommentByIdAndCommentByUsers(Long id, User user);

    Long countBySongOfComment(Song song);

}
