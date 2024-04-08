package com.example.demo.repository;

import com.example.demo.entity.ChordBasic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChordBasicRepository extends JpaRepository<ChordBasic,Long> {
    @Query("SELECT c FROM ChordBasic c where c.chordKey=:chordKey and c.suffix=:chordSuffix and c.type=:chordType")
    List<ChordBasic> findChord(String chordKey, String chordSuffix,String chordType);

    List<ChordBasic> findByType(String chordType);

//   @Query("SELECT c FROM ChordBasic c where c.chordId = :id")
   ChordBasic findByChordId(Long id);

    @Query("SELECT c.chordId FROM ChordBasic c JOIN c.collections cl WHERE cl.id=:id")
    List<Long> findByCollection(Long id);

    List<ChordBasic> findByChordName(String name);

    @Query("SELECT cb.chordName FROM ChordBasic cb JOIN cb.songs s WHERE s.Id = :id")
    List<String> findBySong(Long id);

    ChordBasic findByChordNameAndType(String name, String type);

    @Query("SELECT c.image FROM ChordBasic c JOIN c.collections cl WHERE cl.id=:id")
    List<String> findImageByCollection(Long id);

    List<ChordBasic> findChordBasicsByType(String type);
}
