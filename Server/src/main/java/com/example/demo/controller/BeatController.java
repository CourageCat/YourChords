//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//

package com.example.demo.controller;

import com.example.demo.dto.*;
import com.example.demo.entity.Beat;
import com.example.demo.service.BeatService;
import com.example.demo.validationgroups.BeatValidation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping(path = {"/api/v1/beat"})
public class BeatController {

    @Autowired
    private BeatService beatService;

    // List own Beats in MS
    @GetMapping("/user/{id}/all")
    public ResponseEntity<List<BeatResponseDTO>> findAllOwnBeat(@PathVariable Long id) {
        return ResponseEntity.ok(this.beatService.findAllOwnBeat(id));
    }

    // List ms Beats in US
    @GetMapping("/user/musician/{id}/all/{page}")
    public ResponseEntity<PaginationResponseDTO> findAllMSBeat(@PathVariable Long id, @PathVariable int page) {
        return ResponseEntity.ok(this.beatService.findAllMsBeat(id,page));
    }

    // List all Beats in US
    @GetMapping("/all")
    public ResponseEntity<List<BeatResponseDTO>> findAllBeat() {
        return ResponseEntity.ok(this.beatService.findAllBeat());
    }

    // Get detail Beat US and MS
    @GetMapping("/{id}")
    public ResponseEntity<BeatResponseDTO> findById(@PathVariable Long id){
        return ResponseEntity.ok(this.beatService.getDetail(id));
    }

    // Search Beat by Name
    @GetMapping("/name/{name}")
    public ResponseEntity<List<BeatResponseDTO>> searchByBeatName(@PathVariable String name) {
        return ResponseEntity.ok(this.beatService.searchByBeatName(name));
    }

    // Search Beat by Musician
    @GetMapping("/musician/{name}")
    public ResponseEntity<List<BeatResponseDTO>> searchByMusician(@PathVariable String name) {
        return ResponseEntity.ok(this.beatService.searchByMusician(name));
    }

    // Search Beat by Genre
    @GetMapping("/genre/{name}")
    public ResponseEntity<List<BeatResponseDTO>> searchByGenre(@PathVariable String name) {
        return ResponseEntity.ok(this.beatService.searchByGenre(name));
    }

    //list beat bought in MS
    @GetMapping ("/musician/bought/{id}/{page}")
    public ResponseEntity<PaginationResponseDTO> beatSoldOut(@PathVariable Long id, @PathVariable int page){
        return ResponseEntity.ok(beatService.listBeatSoldOut(id,page));
    }

    //income in MS
    @GetMapping ("musician/beatSoldOut/income/{id}")
    public ResponseEntity<Double> income(@PathVariable Long id){
        return beatService.income(id);
    }

    //Add Beat in MS
    @PostMapping({""})
    public ResponseEntity<String> uploadBeat(@RequestPart("file1")MultipartFile full,@RequestPart("file2")MultipartFile demo, @Validated(BeatValidation.UploadBeat.class) @RequestPart("json") BeatDTO beatDTO) {
        return this.beatService.insertBeat(full, demo, beatDTO);
    }

    //Update beat in MS
    @PatchMapping({"/{id}"})
    public ResponseEntity<String> updateBeat(@RequestPart(value = "file1", required = false)MultipartFile sound, @RequestPart(value = "file2", required = false)MultipartFile sound2, @Validated(BeatValidation.UpdateBeat.class) @RequestPart("json") BeatDTO newBeat, @PathVariable Long id) {
            return this.beatService.updateBeat(sound, sound2, newBeat, id);
    }

    @PostMapping({"/cart/view"})
    public ResponseEntity<BeatCartResponseDTO> viewBeat(@RequestBody BeatCartResponseDTO responseDTO){
        return ResponseEntity.ok(this.beatService.cart(responseDTO));
    }

    @GetMapping("/rate/user/{userid}/{beatId}")
    public ResponseEntity<RatingResponseDTO> viewRateOfSongByUser (@PathVariable Long userid, @PathVariable Long beatId){
        return ResponseEntity.ok(this.beatService.checkRating(userid, beatId));
    }

    //like beat
    @PostMapping("/like/{id1}/{id2}")
    public  ResponseEntity<String> likeBeat(@PathVariable Long id1, @PathVariable Long id2){
        return beatService.likeBeat(id1, id2);
    }

    // Check Liked
    @GetMapping("/check/{userId}/{beatId}")
    public ResponseEntity<Boolean> checkLiked(@PathVariable Long userId,@PathVariable Long beatId){
        return this.beatService.isLiked(userId, beatId);
    }


    //delete beat by update status in MS
    @DeleteMapping({"/{id}"})
    public ResponseEntity<String> deleteBeat(@PathVariable Long id) {
        return this.beatService.deleteBeat(id);
    }

    @PutMapping({"/{id}"})
    public ResponseEntity<String> sellBeat(@PathVariable Long id) {
        return this.beatService.sellBeat(id);
    }

    //list beat that user bought
    @GetMapping ("user/{id}")
    public ResponseEntity<List<BeatResponseDTO>> beatPurchased (@PathVariable Long id){
        return ResponseEntity.ok( this.beatService.listBeatPurchased(id));
    }

    @GetMapping("user/beat/{id}")
    public ResponseEntity<BeatResponseDTO> getBeatPurchasedDetail(@PathVariable Long id){
        return ResponseEntity.ok(this.beatService.getBeatPurchasedDetail(id));
    }

    @GetMapping("user/demo/{id}")
    public BeatResponseDTO getDemoSound(@PathVariable Long id){
        return beatService.getDemoBeat(id);
    }

    @GetMapping("user/full/{id}")
    public BeatResponseDTO getFullSound(@PathVariable Long id){
        return beatService.getFullBeat(id);
    }

    @GetMapping("musician/full")
    public List<UserDTO> getName(){
        return beatService.listAllMusician();
    }
}
