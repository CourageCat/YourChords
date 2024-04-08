package com.example.demo.service;

import com.example.demo.dto.*;
import com.example.demo.entity.Song;
import com.example.demo.entity.SongPlaylist;
import com.example.demo.entity.User;
import com.example.demo.repository.SongPlaylistRepository;
import com.example.demo.repository.SongRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class SongPlaylistService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private SongRepository songRepository;
    @Autowired
    private SongPlaylistRepository songPlaylistRepository;

    private List<SongResponseDTO> getSongs(SongPlaylist playlist) {
        List<SongResponseDTO> dtos = new ArrayList<>();
        for (Song value : playlist.getSongsinplaylist()) {
            SongResponseDTO dto = new SongResponseDTO(value.getId(),
                    value.getSongname(),
                    value.getSinger(),
                    value.getCreatedAt(),
                    value.getUserUploadSong().getId(),
                    value.getUserUploadSong().getFullName(),
                    value.getTotalLike(),
                    value.getView(),
                    value.getRating(),
                    value.getStatus());
            dtos.add(dto);
        }
        return dtos;
    }

    // create
    public ResponseEntity<String> createPlaylist(Long id, String name) {
        Optional<User> foundUser = this.userRepository.findUserByIdAndStatus(id, 1);
        if (foundUser.isPresent()) {
            Optional<SongPlaylist> foundPlaylist = this.songPlaylistRepository.findUserSongPlaylistByName(name, foundUser.get().getId());
            if (foundPlaylist.isPresent()) {
                return new ResponseEntity<>("Playlist is already created", HttpStatus.NOT_IMPLEMENTED);
            } else {
                SongPlaylist playlist = new SongPlaylist(name,
                        foundUser.get(),
                        null,
                        1);
                this.songPlaylistRepository.save(playlist);
                return new ResponseEntity<>("Playlist is created successfully", HttpStatus.OK);
            }
        }
        return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
    }

    // create and add
    public ResponseEntity<String> createPlaylistAndAdd(Long id, PlaylistDTO playlistDTO) {
        Optional<User> foundUser = this.userRepository.findUserByIdAndStatus(id, 1);
        if (foundUser.isPresent()) {
            Optional<SongPlaylist> foundPlaylist = this.songPlaylistRepository.findUserSongPlaylistByName(playlistDTO.getName(), foundUser.get().getId());
            if (foundPlaylist.isPresent()) {
                return new ResponseEntity<>("Playlist is already created", HttpStatus.NOT_IMPLEMENTED);
            } else {
                SongPlaylist playlist = new SongPlaylist(playlistDTO.getName(),
                        foundUser.get(),
                        null,
                        1);
                Set<Song> songs = new HashSet<>();
                Optional<Song> foundSong = this.songRepository.findSongByIdAndStatus(playlistDTO.getSongid(), 1);
                if (foundSong.isPresent()) {
                    songs.add(foundSong.get());
                    playlist.setSongsinplaylist(songs);
                    this.songPlaylistRepository.save(playlist);
                    return new ResponseEntity<>("Playlist is created successfully", HttpStatus.OK);
                }
                return new ResponseEntity<>("Song not found", HttpStatus.OK);
            }
        }
        return new ResponseEntity<>("User not found", HttpStatus.NOT_IMPLEMENTED);
    }


    // add
    public ResponseEntity<String> addtoPlaylist(Long id, PlaylistDTO playlistDTO) {
        Optional<User> foundUser = this.userRepository.findUserByIdAndStatus(id, 1);
        if(foundUser.isPresent()) {
            Optional<SongPlaylist> foundPlaylist = this.songPlaylistRepository.findUserSongPlaylistByName(playlistDTO.getName(), foundUser.get().getId());
            if(foundPlaylist.isPresent()){
                Optional<Song> foundSong = this.songRepository.findSongByIdAndStatus(playlistDTO.getSongid(), 1);
                if(foundSong.isPresent()){
                    Set<Song> songs = foundPlaylist.get().getSongsinplaylist();
                    songs.add(foundSong.get());
                    foundPlaylist.get().setSongsinplaylist(songs);
                    this.songPlaylistRepository.save(foundPlaylist.get());
                    return new ResponseEntity<>("Add successfully!", HttpStatus.OK);
                }
                return new ResponseEntity<>("Song not found", HttpStatus.OK);
            }
            return new ResponseEntity<>("Playlist not found", HttpStatus.NOT_IMPLEMENTED);
        }
        return new ResponseEntity<>("User not found", HttpStatus.NOT_IMPLEMENTED);
    }

    // update
    public ResponseEntity<String> updatePlaylist(Long id, PlaylistDTO playlistDTO) {
        Optional<User> foundUser = this.userRepository.findUserByIdAndStatus(id, 1);
        if (foundUser.isPresent()) {
            Optional<SongPlaylist> foundPlaylist = this.songPlaylistRepository.findUserSongPlaylistByName(playlistDTO.getName(), foundUser.get().getId());
            if (foundPlaylist.isPresent()) {
                SongPlaylist playlist = foundPlaylist.get();
                playlist.setName(playlistDTO.getNewname());
                this.songPlaylistRepository.save(playlist);
                return new ResponseEntity<>("Update Successfully", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Playlist does not exist", HttpStatus.NOT_IMPLEMENTED);
            }
        }
        return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
    }

    // delete
    public ResponseEntity<String> deletePlaylist(String name, Long userid) {
        Optional<User> foundUser = this.userRepository.findUserByIdAndStatus(userid, 1);
        if (foundUser.isPresent()) {
            Optional<SongPlaylist> foundPlaylist = this.songPlaylistRepository.findUserSongPlaylistByName(name, userid);
            if (foundPlaylist.isPresent()) {
                this.songPlaylistRepository.delete(foundPlaylist.get());
                return new ResponseEntity<>("Delete Successfully!", HttpStatus.OK);
            }
                return new ResponseEntity<>("Playlist does not exist or Playlist was already deleted", HttpStatus.NOT_IMPLEMENTED);
        }
        return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
    }

    // remove
    public ResponseEntity<String> removeSong(Long id, PlaylistDTO playlistDTO){
        Optional<User> foundUser = this.userRepository.findUserByIdAndStatus(id, 1);
        if(foundUser.isPresent()){
            Optional<SongPlaylist> foundPlaylist = this.songPlaylistRepository.findUserSongPlaylistByName(playlistDTO.getName(), foundUser.get().getId());
            if(foundPlaylist.isPresent()){
                Set<Song> songs = foundPlaylist.get().getSongsinplaylist();
                Optional<Song> foundSong = this.songRepository.findSongByIdAndStatus(playlistDTO.getSongid(), 1);
                if(foundSong.isPresent()){
                    songs.remove(foundSong.get());
                    foundPlaylist.get().setSongsinplaylist(songs);
                    this.songPlaylistRepository.save(foundPlaylist.get());
                    return new ResponseEntity<>("Remove Successfully!", HttpStatus.OK);
                }
                return new ResponseEntity<>("Song not found", HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>("Playlist not found", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
    }

    // view
    public List<PlaylistResponseDTO> viewAll(Long userid) {
        Optional<User> foundUser = this.userRepository.findUserByIdAndStatus(userid, 1);
        if (foundUser.isPresent()) {
            List<SongPlaylist> foundPlaylists = this.songPlaylistRepository.findSongPlaylistsByUser(foundUser.get());
            if (!foundPlaylists.isEmpty()) {
                List<PlaylistResponseDTO> dtos = new ArrayList<>();
                for (SongPlaylist value : foundPlaylists) {
                    PlaylistResponseDTO dto = new PlaylistResponseDTO(value.getId(),
                            value.getName(),
                            value.getUser().getId(),
                            value.getCreatedAt(),
                            value.getSongsinplaylist().size());
                    dtos.add(dto);
                }
                return dtos;
            }
            return null;
        }
        return null;
    }

    // view detail
    public PlaylistResponseDTO viewDetail(Long userid, String name) {
        Optional<User> foundUser = this.userRepository.findUserByIdAndStatus(userid, 1);
        if (foundUser.isPresent()) {
            Optional<SongPlaylist> foundPlaylists = this.songPlaylistRepository.findSongPlaylistByUserAndName(foundUser.get(), name);
            if (foundPlaylists.isPresent()) {
                SongPlaylist playlist = foundPlaylists.get();
                return new PlaylistResponseDTO(playlist.getId(),
                        playlist.getName(),
                        playlist.getUser().getId(),
                        playlist.getCreatedAt(),
                        getSongs(playlist));
            }
            return null;
        }
        return null;
    }
}
