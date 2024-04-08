package com.example.demo.repository;

import com.example.demo.entity.Beat;
import com.example.demo.entity.BeatRating;
import com.example.demo.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BeatRatingRepository extends JpaRepository<BeatRating,Long> {
    BeatRating findBeatRatingByBeatRatingAndUserRatingBeat(Beat beat, User user);
    List<BeatRating> findAllByBeatRating(Beat beat);
}
