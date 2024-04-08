package com.example.demo.controller;

import com.example.demo.dto.BeatRequestRequestDTO;
import com.example.demo.dto.BeatRequestResponseDTO;
import com.example.demo.dto.IncomeResponseDTO;
import com.example.demo.entity.BeatRequest;
import com.example.demo.service.BeatRequestService;
import com.example.demo.validationgroups.BeatValidation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
    @RequestMapping(path = {"/api/v1/request/beat"})
public class BeatRequestController {
    @Autowired
    private BeatRequestService service;

    @PostMapping("/new")
    public ResponseEntity<String> addNewRequest(@RequestBody BeatRequestRequestDTO dto){
        return service.addNew(dto);
    }
    @PutMapping()
    public ResponseEntity<String> updateARequest(@RequestBody BeatRequestRequestDTO dto){
        return service.updateOrder(dto);
    }
    @PutMapping("/request")
    public ResponseEntity<String> acceptRequest(@RequestBody BeatRequestRequestDTO dto){
        return service.acceptRequest(dto);
    }

    @PutMapping({"/price"})
    public ResponseEntity<String> acceptPrice(@RequestBody BeatRequestRequestDTO dto){
        return service.acceptPrice(dto);
    }

    @PutMapping({"/beat/full"})
    public ResponseEntity<String> acceptBeatFull(@RequestBody BeatRequestRequestDTO dto){
        return service.acceptBeatFull(dto);
    }

    @PutMapping({"/beat/demo"})
    public ResponseEntity<String> acceptBeatDemo(@RequestBody BeatRequestRequestDTO dto){
        return service.acceptBeatDemo(dto);
    }

    @PutMapping({"/reject/request"})
    public ResponseEntity<String> rejectRequest(@RequestBody BeatRequestRequestDTO dto){
        return service.rejectRequest(dto);
    }

    @PutMapping({"/reject/beat"})
    public ResponseEntity<String> rejectBeat(@RequestBody BeatRequestRequestDTO dto){
        return service.rejectBeat(dto);
    }

    @PatchMapping({"/demo"})
    public ResponseEntity<String> updateBeatDemo(@RequestPart(value = "file", required = false) MultipartFile sound, @Validated(BeatValidation.UpdateBeat.class) @RequestPart("json") BeatRequestRequestDTO dto) {
        return this.service.sendBeatDemo(sound, dto);
    }

    @PatchMapping({"/full"})
    public ResponseEntity<String> updateBeatFull(@RequestPart(value = "file", required = false) MultipartFile sound, @Validated(BeatValidation.UpdateBeat.class) @RequestPart("json") BeatRequestRequestDTO dto) {
        return this.service.sendBeatFull(sound, dto);
    }

    @GetMapping({"/customer/{id}"})
    public ResponseEntity<List<BeatRequestResponseDTO>> getAllInCus(@PathVariable Long id){
        return this.service.viewAllInCus(id);
    }
    @GetMapping({"/musician/{id}"})
    public ResponseEntity<List<BeatRequestResponseDTO>> getAllInMs(@PathVariable Long id){
        return this.service.viewAllInMs(id);
    }


    @GetMapping({"/detail/{id}"})
    public ResponseEntity<BeatRequestResponseDTO> viewDetail(@PathVariable Long id){
        return this.service.viewDetail(id);
    }



    @GetMapping({"/musician/detail/{id}/{user}"})
    public ResponseEntity<BeatRequestResponseDTO> viewDetailByMS(@PathVariable Long id,@PathVariable Long user){
        return this.service.viewDetailByMS(id,user);
    }


    @GetMapping({"/customer/detail/{id}/{user}"})
    public ResponseEntity<BeatRequestResponseDTO> viewDetailByCus(@PathVariable Long id,@PathVariable Long user){
        return this.service.viewDetailByCus(id,user);
    }
    @GetMapping({"/all/{id}"})
    public ResponseEntity<List<BeatRequestResponseDTO>> viewAllBeatRequestPurchased(@PathVariable Long id){
        return this.service.viewAllBeatRequestPurchased(id);
    }



    @GetMapping({"/income/{id}"})
    public ResponseEntity<IncomeResponseDTO> totalIncome(@PathVariable Long id){
        return this.service.totalIncome(id);
    }

    @GetMapping({"/income/detail/{id}"})
    public ResponseEntity<List<IncomeResponseDTO>> viewIncomeDetail(@PathVariable Long id){
        return this.service.viewIncomeDetail(id);
    }


}