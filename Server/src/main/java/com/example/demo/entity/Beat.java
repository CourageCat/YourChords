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

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Beat")
public class Beat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;

    @Column
    private String beatName;

    @Column
    private Double price;

    @Column
    private int status;

    @Column(length = Integer.MAX_VALUE)
    private String beatSoundDemo;

    @Column(length = Integer.MAX_VALUE)
    private String beatSoundFull;


    @Column
    private String description;

    @Column
    private int totalLike ;

    @Column
    private int view;

    @Column
    private int cmt;

    @Column
    private double rating;

    @Column
    private int totalRating;

    @Column
    private String vocalRange;

    @Column(length = Integer.MAX_VALUE)
    private String objectName;

    @Column(length = Integer.MAX_VALUE)
    private String objectNameDemo;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "userName")
    private User userName;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "orderBeat")
    private Order orderBeat;

    @ManyToMany(mappedBy = "beatSet",cascade = {CascadeType.ALL})
    private Set<User> userSet = new HashSet<>();

    @OneToMany (mappedBy = "beatRating")
    @JsonIgnore
    private Set<BeatRating> beatRatings;

    @ManyToMany(fetch = FetchType.LAZY)
    @JsonIgnore
    @JoinTable(name = "GenreBeat",
            joinColumns = {@JoinColumn(
                    name = "beatId")},
            inverseJoinColumns = {@JoinColumn(
                    name = "genreId")}
    )
    private Set<Genre>  genresofbeat = new HashSet<>();

    @Column(name = "created_at")
    private LocalDateTime createdAt;
    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
    }


    @OneToMany (mappedBy = "beatComment")
    @JsonIgnore
    private Set<BeatComment> beatComment;


    public Beat(Long id, String beatName, String beatSoundDemo, Double price, int status, Order orderBeat, LocalDateTime createdAt, int totalLike, int view) {
        this.Id=id;
        this.beatName = beatName;
        this.price = price;
        this.status=status;
        this.beatSoundDemo = beatSoundDemo;
        this.orderBeat = orderBeat;
        this.createdAt = createdAt;
        this.totalLike = totalLike;
        this.view = view;
       // this.beatLike = beatLike;
    }

    public Beat(String beatName, Double price, String description, User userName, Set<Genre> genresofbeat, String vocalRange, int totalLike, int view, int status, int cmt, double rating, int totalRating) {
        this.beatName = beatName;
        this.price = price;
        this.status = status;
        this.description = description;
        this.totalLike = totalLike;
        this.view = view;
        this.userName = userName;
        this.genresofbeat = genresofbeat;
        this.cmt = cmt;
        this.rating = rating;
        this.totalRating = totalRating;
        this.vocalRange = vocalRange;
    }

    public String toString() {
        return "Beat{Id=" + this.Id + ", beatName='" + this.beatName + "', price=" + this.price + ", status=" + this.status + ", beatSound='" + this.beatSoundDemo + "', userName=" + this.userName + "}";
    }
}
