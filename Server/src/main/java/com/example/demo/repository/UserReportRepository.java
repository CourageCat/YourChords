package com.example.demo.repository;

import com.example.demo.entity.User;
import com.example.demo.entity.UserReport;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserReportRepository extends JpaRepository<UserReport,Long> {

    List<UserReport> findByIdReportedUser(Long id);

    Page<UserReport> findAll(Pageable pageable);

    @Query("select distinct r.idReportedUser from UserReport r ")
    List<Long> findReportedUser();

    UserReport findUserReportsByIdReportedUser(Long id);

   // List<User> findBy


}
