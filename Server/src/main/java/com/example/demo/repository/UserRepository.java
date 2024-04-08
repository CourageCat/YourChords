//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//

package com.example.demo.repository;

import com.example.demo.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findUserByUsername(String username);
    Optional<User> findUserByIdAndStatus(Long id, int status);
    Optional<User> findUserByUsernameAndStatus(String username, int status);
    Page<User> findAllByOrderByStatusDesc(Pageable pageable);
    List<User> findAllByOrderByStatusDesc();

    @Query("SELECT u from User u where u.Id =:id and (u.status=1 or u.status =0) order by u.createdAt DESC ")
    User findByIdOrderByCreatedAt(Long id);

    List<User> findAllByStatus (int status);

    @Query("SELECT u.fullName from User u where u.Id =:id and u.status = 1")
    String findUserName(Long id);
    @Query("select u from User u where u.mail = :mail")
    Optional<User> findUserMail(String mail);
    @Query("SELECT u FROM User u WHERE u.username = :username")
    User findByUsername(String username);
    @Query("SELECT u FROM User u WHERE u.fullName like %:fullName%")
    List<User> findByfullName(String fullName);
    @Query("SELECT u FROM User u WHERE u.username like %:username%")
    List<User> searchByUserName(String username);
    @Query("select a.user from ActivationToken a where a.token = :token")
    User findByActivationToken(String token);
    @Query("select u.fullName from User u where u.role = 'MS'")
    List<String> findAllNameOfMusician();
}
