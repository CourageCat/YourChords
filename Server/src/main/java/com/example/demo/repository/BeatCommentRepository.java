package com.example.demo.repository;

import com.example.demo.entity.Beat;
import com.example.demo.entity.BeatComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BeatCommentRepository extends JpaRepository<BeatComment, Long> {

    BeatComment findParentCommentById(Long id);
  //  BeatComment findByUserCommentBeat(Long id);
    List<BeatComment> findByBeatCommentAndParentCommentIsNullAndStatus(Beat beatComment, int status);

    List<BeatComment> findByParentComment(BeatComment comment);
}
