package com.example.demo.controller;

import com.example.demo.dto.PaginationResponseDTO;
import com.example.demo.dto.ReportDTO;
import com.example.demo.dto.ReportResponseDTO;
import com.example.demo.dto.UserResponeDTO;
import com.example.demo.entity.UserReport;
import com.example.demo.service.UserReportService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/v1/report/user")
public class UserReportController {

    @Autowired
    UserReportService userReportService;

    @PostMapping
    public ResponseEntity<String> reportUser(@Valid @RequestBody ReportDTO reportDTO){
        return this.userReportService.report(reportDTO);
    }

    @GetMapping("/{id}")
    public ResponseEntity<List<ReportResponseDTO>> viewReport (@Valid @PathVariable Long id){
        return ResponseEntity.ok(this.userReportService.viewReport(id));
    }

    @GetMapping("")
    public ResponseEntity<List<UserResponeDTO>> getAll (){
        return ResponseEntity.ok(this.userReportService.listUserReported());
    }
    



}
