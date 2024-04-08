package com.example.demo.repository;

import com.example.demo.entity.Song;
import com.example.demo.entity.SongReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SongReportRepository extends JpaRepository<SongReport, Long> {

    List<SongReport> findSongReportsBySongOfReport(Song song);

}
