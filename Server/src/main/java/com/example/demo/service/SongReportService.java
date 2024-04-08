package com.example.demo.service;

import com.example.demo.dto.ReportDTO;
import com.example.demo.dto.ReportSongResponseDTO;
import com.example.demo.dto.SongReportResponseDTO;
import com.example.demo.entity.Song;
import com.example.demo.entity.SongReport;
import com.example.demo.entity.User;
import com.example.demo.repository.SongReportRepository;
import com.example.demo.repository.SongRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class SongReportService {

    @Autowired
    private SongReportRepository songReportRepository;

    @Autowired
    private SongRepository songRepository;

    @Autowired
    private UserRepository userRepository;

    // report a song
    public ResponseEntity<String> report (ReportDTO reportDTO){
        Optional<User> foundUser = this.userRepository.findUserByIdAndStatus(reportDTO.getUserId(), 1);
        if(foundUser.isPresent()){
            Optional<Song> foundSong = this.songRepository.findSongByIdAndStatus(reportDTO.getSongId(), 1);
            if(foundSong.isPresent()){
                Song song = foundSong.get();
                SongReport report = new SongReport(reportDTO.getContent(),
                        foundSong.get(),
                        foundUser.get());
                this.songReportRepository.save(report);
                song.setReport(song.getReport() + 1);
                this.songRepository.save(song);
                return new ResponseEntity<>("Report Successfully!", HttpStatus.OK);
            }
            return new ResponseEntity<>("Song not found!", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>("User not found!", HttpStatus.NOT_FOUND);
    }

    // view report of a song
    public List<ReportSongResponseDTO> viewReport (Long id){
        Optional<Song> foundSong = this.songRepository.findSongByIdAndStatus(id, 1);
        if(foundSong.isPresent()){
            Song song = foundSong.get();
            List<SongReport> foundReports = this.songReportRepository.findSongReportsBySongOfReport(song);
            if(!foundReports.isEmpty()){
                List<ReportSongResponseDTO> dtos = new ArrayList<>();
                for (SongReport value: foundReports) {
                    ReportSongResponseDTO dto = new ReportSongResponseDTO(value.getId(),
                            value.getReportByUsers().getId(),
                            value.getReportByUsers().getUsername(),
                            value.getContent(),
                            value.getCreatedAt());
                    dtos.add(dto);
                }
                return dtos;
            }
            return null;
        }
        return null;
    }

    // view song been reported
    public List<SongReportResponseDTO> viewSongsReported (){
        List<Song> foundSongs = this.songRepository.findSongBeenReport();
        if(!foundSongs.isEmpty()){
            List<SongReportResponseDTO> dtos = new ArrayList<>();
            for (Song value: foundSongs){
                SongReportResponseDTO dto = new SongReportResponseDTO(value.getId(),
                        value.getSongname(),
                        value.getUserUploadSong().getId(),
                        value.getUserUploadSong().getFullName(),
                        value.getCreatedAt(),
                        value.getStatus(),
                        value.getSongReports().size());
                dtos.add(dto);
            }
            return dtos;
        }
        return null;
    }
}
