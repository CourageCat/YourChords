package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table (name = "MusicianInformation")
public class MusicianInformation {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "professional")
    private String professional;

    @Column(name = "prize")
    private String prize;

    @Column (name = "YearOfOperation")
    private int year;

    @OneToOne(mappedBy = "information")
    private User user;

    public MusicianInformation(String professional, String prize, int year) {
        this.professional = professional;
        this.prize = prize;
        this.year = year;
    }
}
