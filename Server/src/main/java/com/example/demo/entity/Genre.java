//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//

package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Genre")
public class Genre {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;

    @Column(name = "name")
    private String name;

    @Column(name = "Description")
    private String description;

    @ManyToMany(mappedBy = "genresofbeat", cascade = {CascadeType.ALL})
    private Set<Beat> beats = new HashSet<>();

    @ManyToMany(mappedBy = "genresofsong",cascade = {CascadeType.ALL})
    private Set<Song> songs = new HashSet<>();

    public Genre(String name, String description) {
        this.name = name;
        this.description = description;
    }
}
