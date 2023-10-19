//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//

package com.example.demo.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.*;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "User")
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;

    @Column
    private String username;

    @Column
    private String password;

    @Column
    private String fullName;

    @Column
    @Enumerated(EnumType.STRING)
    private Gender gender;

    @Column
    private String mail;

    @Column
    private String role;

    @Column
    private int status;

    @Column
    private String address;

    @Column
    private String phoneNumber;

    @Column(name = "Date")
    private LocalDateTime createdAt;
    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
    }

    @OneToMany(mappedBy = "userName")
    @JsonIgnore
    @JsonInclude(Include.NON_NULL)
    private List<Beat> beats = new ArrayList();

    @OneToMany(mappedBy = "userOrder")
    @JsonIgnore
    @JsonInclude(Include.NON_NULL)
    private List<Order> orders = new ArrayList();

    @OneToMany(mappedBy = "userUploadSong")
    @JsonIgnore
    @JsonInclude(Include.NON_NULL)
    private List<Song> songs = new ArrayList();

    @OneToMany(mappedBy = "userFeedback")
    @JsonIgnore
    @JsonInclude(Include.NON_NULL)
    private List<FeedbackSong> feedbackSongs = new ArrayList();


    @ManyToMany(cascade = {CascadeType.ALL})
    @JsonIgnore
    @JoinTable(
            name = "BeatLike",
            joinColumns = {@JoinColumn(
                    name = "userId")},
            inverseJoinColumns = {@JoinColumn(
                    name = "beatId")}
    )
    private Set<Beat> beatSet = new HashSet<>();

    @ManyToMany(cascade = {CascadeType.ALL})
    @JsonIgnore
    @JoinTable(
            name = "RatingBeat",
            joinColumns = {@JoinColumn(
                    name = "userId")},
            inverseJoinColumns = {@JoinColumn(
                    name = "beatId")}
    )
    private Set<Beat> beatRating = new HashSet<>();

    @ManyToMany(cascade = {CascadeType.ALL})
    @JsonIgnore
    @JoinTable(
            name = "UserLikesSong",
            joinColumns = {@JoinColumn(
                    name = "userId")},
            inverseJoinColumns = {@JoinColumn(
                    name = "songId")}
    )
    private Set<Song> likedSongs = new HashSet<>();

    @OneToMany(mappedBy = "userCollection")
    @JsonIgnore
    @JsonInclude(Include.NON_NULL)
    private List<ChordCollection> chordCollections = new ArrayList();

    @OneToMany(mappedBy = "userCommentBeat")
    @JsonIgnore
    private Set<BeatComment> beatComments;

    @OneToOne (cascade = CascadeType.ALL)
    @JsonIgnore
    @JoinColumn (name = "msId")
    private MusicianInformation information;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }


    public String toString() {
        return "User{Id=" + this.Id + ", username='" + this.username + "', pass='" + this.password + "', fullName='" + this.fullName + "', mail='" + this.mail + "', roleID='" + this.role + "', status=" + this.status + ", address='" + this.address + "', phoneNumber='" + this.phoneNumber + "'}";
    }



    public User(String username, String password, String fullName, Gender gender, String mail, String address, String phoneNumber, String role, int status) {
        this.username = username;
        this.password = password;
        this.fullName = fullName;
        this.mail = mail;
        this.role = role;
        this.status = status;
        this.address = address;
        this.phoneNumber = phoneNumber;
    }

    public enum Gender {
        MALE,
        FEMALE
    }
}