package com.example.demo.controller;

import com.example.demo.dto.ReportDTO;
import com.example.demo.dto.ReportSongResponseDTO;
import com.example.demo.service.SongReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/v1/report")
public class SongReportController {

    @Autowired
    private SongReportService songReportService;

    @PostMapping
    public ResponseEntity<String> reportSong(@RequestBody ReportDTO reportDTO){
        return this.songReportService.report(reportDTO);
    }

    @GetMapping("/song/{id}")
    public ResponseEntity<List<ReportSongResponseDTO>> viewReport (@PathVariable Long id){
        return ResponseEntity.ok(this.songReportService.viewReport(id));
    }
}
