package com.example.demo.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "SongReport")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SongReport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "LONGTEXT")
    private String content;

    @Column(name = "created_at")
    private LocalDateTime createdAt;
    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
    }

    @ManyToOne
    @JsonIgnore
    @JoinColumn (name = "songId")
    private Song songOfReport;

    @ManyToOne
    @JsonIgnore
    @JoinColumn (name = "userId")
    private User reportByUsers;

    public SongReport(String content, Song songOfReport, User reportByUsers) {
        this.content = content;
        this.songOfReport = songOfReport;
        this.reportByUsers = reportByUsers;
    }
}
