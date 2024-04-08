//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//

package com.example.demo.repository;

import com.example.demo.entity.Song;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SongRepository extends JpaRepository<Song, Long> {
    // Customer Song
    @Query("select s from Song s where s.userUploadSong.Id = :id and s.status = 1")
    List<Song> findUserSongByUserUploadSong(Long id);
    @Query("select s from Song s where s.songname like %:songName% and s.status = 1 and s.userUploadSong.Id = :id")
    List<Song> findUserSongByName(String songName, Long id);
    @Query("select s from Song s where s.userUploadSong.Id = :userid and s.Id = :songid and s.status = 1")
    Optional<Song> findUserSongByUserUploadSongAndSongId(Long userid, Long songid);
    @Query("select s from Song s join s.genresofsong sg where sg.name = :genreName and s.status = 1 and s.userUploadSong.Id = :id order by s.Id asc")
    List<Song> findUserSongByGenreName(String genreName, Long id);
    @Query("select s from Song s where s.userUploadSong.Id = :userid and s.Id = :songid and s.status = 1")
    Optional<Song> findUserSongByUser (Long songid, Long userid);

    // Song
    @Query("select s from Song s join s.userUploadSong u where s.status = 1 and u.status = 1 ")
    List<Song> findAllSong();

    @Query("select s from Song s join s.genresofsong sg where sg.name = :genreName and s.status = 1 order by s.Id asc")
    List<Song> findSongsByGenreName(String genreName);

    @Query("select s from Song s join s.userUploadSong u where s.songname like %:songName% and s.status = 1 and u.status =1 ")
    List<Song> findSongsbyName(String songName);

    @Query("select s from Song s where s.status = 1 and s.userUploadSong.fullName = :name order by s.Id asc")
    List<Song> findSongByUserUploadSongName(String name);

    @Query("select s from Song s join s.likedByUsers sl where s.status = 1 and sl.Id = :iduser and s.Id = :idsong")
    Song findSongLikeByUser(Long iduser, long idsong);

    @Query("select s from Song s where s.status = -1")
    List<Song> findSongBanned();

    Optional<Song> findSongByIdAndStatus(Long id, int status);

    // Song report

    @Query("select distinct s from Song s join fetch s.songReports sr where s.status = 1 or s.status = -1 order by s.status desc")
    List<Song> findSongBeenReport();

}
