package com.example.demo.controller;

import com.example.demo.dto.PlaylistDTO;
import com.example.demo.dto.PlaylistResponseDTO;

import com.example.demo.service.SongPlaylistService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1/playlist")
public class SongPlaylistController {

    @Autowired
    private SongPlaylistService songPlaylistService;

    // create Playlist
    @GetMapping("/user/{id}/new")
    public ResponseEntity<String> createPlaylist (@Valid @PathVariable Long id, @Valid @RequestParam("name") String name){
        return this.songPlaylistService.createPlaylist(id, name);
    }

    // create and add
    @PostMapping("/user/{id}/newadd")
    public ResponseEntity<String> createPlaylistAndAdd (@Valid @PathVariable Long id, @Valid @RequestBody PlaylistDTO playlistDTO){
        return this.songPlaylistService.createPlaylistAndAdd(id, playlistDTO);
    }

    // add song
    @PostMapping("/user/{id}")
    public ResponseEntity<String> addtoPlaylist (@Valid @PathVariable Long id, @Valid @RequestBody PlaylistDTO playlistDTO){
        return this.songPlaylistService.addtoPlaylist(id, playlistDTO);
    }

    // update Playlist
    @PatchMapping("/user/{id}")
    public ResponseEntity<String> updatePlaylist (@Valid @PathVariable Long id, @Valid @RequestBody PlaylistDTO playlistDTO){
        return this.songPlaylistService.updatePlaylist(id, playlistDTO);
    }

    // remove song
    @PutMapping("/user/{id}")
    public ResponseEntity<String> removeSong (@Valid @PathVariable Long id, @Valid @RequestBody PlaylistDTO playlistDTO){
        return this.songPlaylistService.removeSong(id, playlistDTO);
    }

    // delete Playlist
    @DeleteMapping("/user/{userid}/{name}")
    public ResponseEntity<String> deletePlaylist (@Valid @PathVariable Long userid,@Valid @PathVariable String name){
        return this.songPlaylistService.deletePlaylist(name, userid);
    }

    // view
    @GetMapping("/user/{userid}")
    public ResponseEntity<List<PlaylistResponseDTO>> viewAll (@Valid @PathVariable Long userid){
        return ResponseEntity.ok(this.songPlaylistService.viewAll(userid));
    }

    // view detail
    @GetMapping("/user/{userid}/{name}/detail")
    public ResponseEntity<PlaylistResponseDTO> viewDetail (@Valid @PathVariable Long userid, @Valid @PathVariable String name){
        return ResponseEntity.ok(this.songPlaylistService.viewDetail(userid, name));
    }
}
