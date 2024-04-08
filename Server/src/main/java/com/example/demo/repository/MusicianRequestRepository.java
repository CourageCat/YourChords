package com.example.demo.repository;

import com.example.demo.entity.MusicianRequest;
import com.example.demo.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MusicianRequestRepository extends JpaRepository<MusicianRequest, Long> {
    List<MusicianRequest> findAllByMsRequest(User user);

    MusicianRequest findByMsRequest(User user);
}
