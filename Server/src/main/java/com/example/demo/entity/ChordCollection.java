//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//

package com.example.demo.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Chord Collection")
public class ChordCollection {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "Name")
    private String name;

    @Column(name = "Description")
    private String description;

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
    @JoinColumn(name = "userCollection")
    private User userCollection;

    @ManyToMany(cascade = {CascadeType.ALL})
    @JsonIgnore
    @JoinTable(
            name = "ChordInCollection",
            joinColumns = {@JoinColumn(
                    name = "collectonId")},
            inverseJoinColumns = {@JoinColumn(
                    name = "chordId")}
    )
    private Set<ChordBasic> chordsofcollections = new HashSet<>();

    @JsonIgnore
    public void setUserCollection(final User userCollection) {
        this.userCollection = userCollection;
    }

    public ChordCollection(String name, int status) {
        this.name = name;
        this.status = status;
    }

    public ChordCollection(Long id,String name,String description,  int status, LocalDateTime createdAt) {
        this.id=id;
        this.name = name;
        this.description=description;
        this.status = status;
        this.createdAt = createdAt;
    }

    public ChordCollection(String name, String description, int status, LocalDateTime createdAt, User userCollection, Set<ChordBasic> chordsofcollections) {
        this.name = name;
        this.description = description;
        this.status = status;
        this.createdAt = createdAt;
        this.userCollection = userCollection;
        this.chordsofcollections = chordsofcollections;
    }

    public ChordCollection(String name, int status, User userCollection) {
        this.name = name;
        this.status = status;
        this.userCollection = userCollection;
    }

    @Override
    public String toString() {
        return "ChordCollection{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", status=" + status +
                ", createdAt=" + createdAt +
                ", userCollection=" + userCollection +
                ", chords=" + chordsofcollections +
                '}';
    }
}
