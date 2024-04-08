package com.example.demo.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Table(name = "UserReport")
@Entity
@Data
public class UserReport {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "LONGTEXT")
    private String content;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "ReportedUser")
    private Long idReportedUser;

    public UserReport(String content, Long idReportedUser, User reportByUser) {
        this.content = content;
        this.idReportedUser = idReportedUser;
        this.reportByUser = reportByUser;
    }

    public UserReport() {

    }

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
    }

    @ManyToOne
    @JsonIgnore
    @JoinColumn (name = "userId")
    private User reportByUser;

    @Override
    public String toString() {
        return "UserReport{" +
                "id=" + id +
                ", content='" + content + '\'' +
                ", createdAt=" + createdAt +
                ", idReportedUser=" + idReportedUser +
                ", reportByUser=" + reportByUser +
                '}';
    }
}
