//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//

package com.example.demo.repository;

import com.example.demo.dto.Feedback;
import com.example.demo.entity.Beat;
import com.example.demo.entity.Order;
import com.example.demo.entity.Song;
import com.example.demo.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BeatRepository extends JpaRepository<Beat, Long> {
    @Query("SELECT b FROM Beat b WHERE b.beatName like %:name% and b.status=1")
    List<Beat> findByBeatName(String name);

    Optional<Beat> findNameByBeatName(String beatName);

    @Query("select b from Beat b where b.userName.Id = :id and b.userName.status = 1 and b.status = 1 or b.status = 0 order by b.Id")
    Page<Beat> findUserBeatByUsername(Long id, Pageable pageable);

    @Query("select b from Beat b where b.userName.Id = :id and b.userName.status = 1 and (b.status = -1 or b.status = 1) order by b.Id")
    Page<Beat> findMSBeat(Long id, Pageable pageable);

    @Query("select b from Beat b where b.userName.Id = :id and b.userName.status = 1 and (b.status = -1 or b.status = 1) order by b.Id")
    List<Beat> findMSBeat(Long id);

    @Query("select b from Beat b where b.userName.Id = :id and b.userName.status = 1 and b.status = 1 or b.status = 0 order by b.Id")
    List<Beat> listUserBeatByUsername(Long id);

    List<Beat> findByOrderByStatusDesc();
    @Query("SELECT b.userName from Beat b ")
    List<User> findAllUser();

    Page<Beat> findBeatByOrderBeat(Order id, Pageable pageable);

    @Query("select b from Beat b join b.userSet u where b.status = 1 and u.Id = :iduser and b.Id = :idBeat")
    Beat findBeatLikeByUser(Long iduser, long idBeat);

    List<Beat> findBeatByOrderBeat(Order id);

    @Query("SELECT b.Id FROM Beat b join b.userSet u where u.Id =:id")
    List<Long> findUserLiked(Long id);


    @Query("SELECT b FROM Beat b WHERE b.status = 1")
    Page<Beat> findAllBeat(Pageable pageable);


    @Query("SELECT b FROM Beat b join b.userName u WHERE b.status = 1 and u.status = 1")
    List<Beat> findAllListBeat();
    @Query("SELECT b FROM Beat b join b.userName u where b.status = -1 and u.Id = :id")
    Page<Beat> findAllBeatSoldOut(Long id, Pageable pageable);

    @Query("SELECT b FROM Beat b join b.userName u where b.status = -1 and u.Id = :id")
    List<Beat> listAllBeatSoldOut(Long id);


    @Query("SELECT b FROM Beat b join b.userName u where b.status = -1 and u.Id = :id")
    List<Beat> findBeatSoldOut(Long id);


    Beat findBeatById(Long Id);
    @Query("SELECT b FROM Beat b WHERE b.userName=:username")
    Optional<Beat> findBeatByUserName(Long username);

    @Query("select b from Beat b where b.userName.fullName like %:name% and b.status = 1 order by b.Id")
    List<Beat> findBeatByMusician (String name);

    @Query("select b from Beat b join b.genresofbeat bg where bg.name = :genreName and b.status = 1 order by b.Id asc")
    List<Beat> findBeatsByGenreName(String genreName);
}
