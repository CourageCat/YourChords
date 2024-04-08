package com.example.demo.repository;

import com.example.demo.entity.BeatRating;
import com.example.demo.entity.Song;
import com.example.demo.entity.SongRating;
import com.example.demo.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SongRatingRepository extends JpaRepository<SongRating, Long> {


    Optional<SongRating> findSongRatingBySongOfRatingAndRateByUser(Song song, User user);

    List<SongRating> findAllBySongOfRating(Song song);
}
