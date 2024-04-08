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

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "SongPlaylists")
public class SongPlaylist {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "Name")
    private String name;

    @Column(name = "Status")
    private int status;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
    }


    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "owner")
    private User user;

    @ManyToMany
    @JsonIgnore
    @JoinTable(
            name = "songofplaylist",
            joinColumns = {@JoinColumn(
                    name = "playlistId")},
            inverseJoinColumns = {@JoinColumn(
                    name = "songId")}
    )
    private Set<Song> songsinplaylist = new HashSet<>();

    @JsonIgnore
    public void setUser(final User user) {
        this.user = user;
    }

    public SongPlaylist(String name, User user, Set<Song> songsinplaylist, int status) {
        this.name = name;
        this.status = status;
        this.user = user;
        this.songsinplaylist = songsinplaylist;
    }
}