//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//

package com.example.demo.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Song")
public class Song {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;

    @Column(name = "SongName")
    private String songname;

    @Column(name = "Date")
    private LocalDateTime createdAt;

    @Column(name = "Singer")
    private String singer;

    @Column(name = "Tone")
    private String tone;

    @Column(name = "Description",columnDefinition = "LONGTEXT", length = Integer.MAX_VALUE)
    private String description;

    @Column(name = "VocalRange")
    private String vocalRange;

    @Column(name = "SongUrl")
    private String songUrl;

    @Column(name = "Status")
    private int status;

    @Column(name = "totalLike")
    private int totalLike ;

    @Column(name = "view")
    private int view;

    @Column(name = "rating")
    private double rating;

    @Column(name = "totalUserRating")
    private int totalUserRating;

    @Column(name = "cmt")
    private int cmt;

    @Column(name = "report")
    private int report;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "userUploadSong")
    private User userUploadSong;


    @ManyToMany(mappedBy = "likedSongs",cascade = {CascadeType.ALL})
    private Set<User> likedByUsers = new HashSet<>();

    @ManyToMany(cascade = {CascadeType.ALL})
    @JsonIgnore
    @JoinTable(
            name = "GenreSong",
            joinColumns = @JoinColumn(
                    name = "songId"),
            inverseJoinColumns = @JoinColumn(
                    name = "genreId")
    )
    private Set<Genre> genresofsong = new HashSet<>();

    @ManyToMany (cascade = {CascadeType.ALL})
    @JsonIgnore
    @JoinTable(name = "ChordOfSong",
            joinColumns = {@JoinColumn(
                    name = "songId")},
            inverseJoinColumns = {@JoinColumn(
                    name = "chordId")}
    )
    private Set<ChordBasic> chordsofsong = new HashSet<>();

    @ManyToMany(mappedBy = "songsinplaylist",cascade = {CascadeType.ALL})
    private Set<SongPlaylist> playlists = new HashSet<>();

    @OneToMany (mappedBy = "songOfRating")
    @JsonIgnore
    private Set<SongRating> songRatings;

    @OneToMany (mappedBy = "songOfComment")
    @JsonIgnore
    private Set<SongComment> songComments;

    @OneToMany (mappedBy = "songOfReport")
    @JsonIgnore
    private Set<SongReport> songReports;

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
    }

    @JsonIgnore
    public void setUserUploadSong(final User userUploadSong) {
        this.userUploadSong = userUploadSong;
    }

    public Song(String songname, String singer, String tone, String description, String vocalRange, String songUrl, User userUploadSong, Set<Genre> genresofsong, Set<ChordBasic> chordsofsong, int totalLike, int view, int rating, int totalUserRating, int cmt, int report, int status) {
        this.songname = songname;
        this.singer = singer;
        this.tone = tone;
        this.description = description;
        this.vocalRange = vocalRange;
        this.songUrl = songUrl;
        this.status = status;
        this.userUploadSong = userUploadSong;
        this.genresofsong = genresofsong;
        this.chordsofsong = chordsofsong;
        this.totalLike = totalLike;
        this.view = view;
        this.rating = rating;
        this.totalUserRating = totalUserRating;
        this.cmt = cmt;
        this.report = report;
    }
}
