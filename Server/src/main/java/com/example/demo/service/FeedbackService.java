package com.example.demo.service;

import com.example.demo.dto.*;
import com.example.demo.entity.Beat;
import com.example.demo.entity.User;
import com.example.demo.repository.BeatRepository;
import com.example.demo.repository.FeedbackRepository;
import com.example.demo.repository.UserRepository;
import jakarta.annotation.Nullable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class FeedbackService {
    @Autowired
    UserRepository userRepository;

    @Autowired
    BeatRepository beatRepository;

    @Autowired
    FeedbackRepository feedbackRepository;
    public ResponseEntity<String> addFeedback(FeedbackDTO dto) {
        Optional<User> foundUser = userRepository.findById(dto.getUserId());
        Optional<Beat> foundBeat = beatRepository.findById(dto.getBeatId());
        Optional<Feedback> found = feedbackRepository.findByBeatFeedbackAndUserFeedback(foundBeat.get(),foundUser.get());
        if (found.isPresent()) {
            return new ResponseEntity<>("Already feedback",HttpStatus.NOT_IMPLEMENTED);
        } else if (foundBeat.isPresent() && foundUser.isPresent() ){
            Feedback feedback = new Feedback( dto.getContent(), foundUser.get(),foundBeat.get(),1);
            feedbackRepository.save(feedback);
            return new ResponseEntity<>("Feedback!",HttpStatus.OK);
        }
        return new ResponseEntity<>("Feedback failed!",HttpStatus.NOT_IMPLEMENTED);
    }


    public PaginationResponseDTO viewFeedback(Long id, int page) {
        Optional<User> foundUser = userRepository.findById(id);
        Pageable pageable = PageRequest.of(page-1,10);
        Page<Beat> beatList = beatRepository.findAllBeatSoldOut(foundUser.get().getId(),pageable);
        List<Beat> b = beatRepository.listAllBeatSoldOut(foundUser.get().getId());
        List<Feedback> feedback =new ArrayList<>();
        List<FeedbackResponseDTO> dto = new ArrayList<>();
        for (Beat i : beatList){
            Feedback f = new Feedback();
            f = feedbackRepository.findByBeatFeedback(i);
            if (f!=null){
                feedback.add(f);
            }
        }
        dto = getFeedbackResponseDTO(feedback);
        int pagecount = pageable.getPageNumber();
        int max = 0;
        if (b.size() % 10 != 0) {
            max = b.size() / 10 + 1;
        } else {
            max = b.size() / 10;
        }
        return new PaginationResponseDTO(dto,pagecount,max);

    }

    private UserResponeDTO getUser(User user){
        return new UserResponeDTO(user.getId(), user.getFullName());
    }
    private BeatResponseDTO getBeat(Beat beat){
        return new BeatResponseDTO(beat.getBeatName());
    }

    @Nullable
    private List<FeedbackResponseDTO> getFeedbackResponseDTO(List<Feedback> feedbacks){
        List<FeedbackResponseDTO> feedbackDTOS = new ArrayList<>();
        for (Feedback i : feedbacks){
            if (i.getContent()!=null){
                FeedbackResponseDTO dto = new FeedbackResponseDTO(
                        i.getId(),
                        i.getContent(),
                        getUser(i.getUserFeedback()),
                        i.getCreatedAt(),
                        getBeat(i.getBeatFeedback())
                );
                feedbackDTOS.add(dto);
            }

        }
        return feedbackDTOS;
    }

    public ResponseEntity<String> updateFeedback(FeedbackDTO dto) {
        Optional<Feedback> feedback = feedbackRepository.findById(dto.getId());
        if (feedback.isPresent()){
            feedback.get().setContent(dto.getContent());
            feedbackRepository.save(feedback.get());
            return new ResponseEntity<>("Updated!",HttpStatus.OK);
        }
        return new ResponseEntity<>("No update",HttpStatus.NOT_IMPLEMENTED);
    }

    public FeedbackResponseDTO viewOwnFeedback(Long id, Long id2) {
        Optional<User> foundUser = userRepository.findById(id);
        Optional<Beat> foundBeat = beatRepository.findById(id2);
       // Page<Feedback> feedbacks = feedbackRepository.findByUserFeedback(foundUser.get(),,pageable);
        Feedback f = feedbackRepository.findByUserFeedbackAndAndBeatFeedback(foundUser.get(),foundBeat.get());
        if (f != null){
            FeedbackResponseDTO feedbackResponseDTO = new FeedbackResponseDTO(
                    f.getId(),
                    f.getContent(),
                    getUser(f.getUserFeedback()),
                    f.getCreatedAt(),
                    getBeat(f.getBeatFeedback())
            );
            return feedbackResponseDTO;
        }
        else return null;

    }


}
