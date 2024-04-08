package com.example.demo.service;

import com.example.demo.dto.BeatRatingDTO;
import com.example.demo.entity.Beat;
import com.example.demo.entity.BeatRating;
import com.example.demo.entity.User;
import com.example.demo.repository.BeatRatingRepository;
import com.example.demo.repository.BeatRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BeatRatingService {
    @Autowired
    BeatRepository beatRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    BeatRatingRepository beatRatingRepository;

    public ResponseEntity<String> addRating(Long userID, Long beatID, BeatRatingDTO dto) {
        Optional<Beat> beat = beatRepository.findById(beatID);
        Optional<User> user = userRepository.findById(userID);
        BeatRating foundRating = beatRatingRepository.findBeatRatingByBeatRatingAndUserRatingBeat(beat.get(), user.get());

        if (foundRating != null) {
            beatRatingRepository.delete(foundRating);
            foundRating.setRating(dto.getRate());
             beat.get().setTotalRating(beat.get().getTotalRating() - 1);
            beatRepository.save(beat.get());
            if (beat.get().getTotalRating() != 0) {
                List<BeatRating> rating = beatRatingRepository.findAllByBeatRating(beat.get());
                Double newRating = total(rating);
                beat.get().setRating(newRating);
                beatRepository.save(beat.get());
            }
        }
        BeatRating beatRating = new BeatRating(user.get(), beat.get(), dto.getRate());
        beat.get().setRating((double) Math.round(((beat.get().getRating() * beat.get().getTotalRating() + dto.getRate()) / (beat.get().getTotalRating() + 1)) * 10) /10);
        beat.get().setTotalRating(beat.get().getTotalRating() + 1);
        beatRatingRepository.save(beatRating);
        beatRepository.save(beat.get());
        return new ResponseEntity<>("Rating!", HttpStatus.OK);
    }

    private Double total(List<BeatRating> beat) {
        int tmp = 0;
        for (BeatRating i : beat) {
            tmp += i.getRating();
        }
        return (double) Math.round( tmp / beat.size() *10)/10;
    }
}
