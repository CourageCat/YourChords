package com.example.demo.repository;

import com.example.demo.entity.BeatRequest;
import com.example.demo.entity.MusicianRequest;
import com.example.demo.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BeatRequestRepository extends JpaRepository<BeatRequest,Long> {
    List<BeatRequest> findAllByUserRequest(User user);
    BeatRequest findByRequestId(MusicianRequest id);

    List<BeatRequest> findByUserRequestAndStatus(User user, int status);
}
