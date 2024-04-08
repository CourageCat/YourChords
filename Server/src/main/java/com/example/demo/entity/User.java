//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//

package com.example.demo.entity;

import com.example.demo.dto.Feedback;
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

    @Column(length = Integer.MAX_VALUE)
    private String avatar;

    @Column(length = Integer.MAX_VALUE)
    private String objectName;

    @Column(name = "Date")
    private LocalDateTime createdAt;

    @Column(name =  "report")
    private int report;
    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
    }

    @OneToMany(mappedBy = "userName")
    @JsonIgnore
    @JsonInclude(Include.NON_NULL)
    private List<Beat> beats = new ArrayList();

    @OneToMany(mappedBy = "msRequest")
    @JsonIgnore
    @JsonInclude(Include.NON_NULL)
    private List<MusicianRequest> musicianRequest = new ArrayList();

    @OneToMany(mappedBy = "userRequest")
    @JsonIgnore
    @JsonInclude(Include.NON_NULL)
    private List<BeatRequest> beatRequest = new ArrayList();

    @OneToMany(mappedBy = "userOrder")
    @JsonIgnore
    @JsonInclude(Include.NON_NULL)
    private List<Order> orders = new ArrayList();

    @OneToMany(mappedBy = "userUploadSong")
    @JsonIgnore
    @JsonInclude(Include.NON_NULL)
    private List<Song> songs = new ArrayList();

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

    @OneToMany(mappedBy = "userRatingBeat")
    @JsonIgnore
    private Set<BeatRating> beatRatings;

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

    @OneToMany(mappedBy = "rateByUser")
    @JsonIgnore
    private Set<SongRating> rateSongs;

    @OneToMany(mappedBy = "commentByUsers")
    @JsonIgnore
    private Set<SongComment> commentSongs;

    @OneToMany(mappedBy = "reportByUsers")
    @JsonIgnore
    private Set<SongReport> reportSongs;

    @OneToMany(mappedBy = "reportByUser")
    @JsonIgnore
    private Set<UserReport> reportUser;

    @OneToMany(mappedBy = "userCollection")
    @JsonIgnore
    @JsonInclude(Include.NON_NULL)
    private List<ChordCollection> chordCollections = new ArrayList();

    @OneToMany(mappedBy = "userCommentBeat")
    @JsonIgnore
    private Set<BeatComment> beatComments;

    @OneToMany(mappedBy = "userFeedback")
    @JsonIgnore
    private Set<Feedback> beatFeedback;

    @OneToOne (cascade = CascadeType.ALL)
    @JsonIgnore
    @JoinColumn (name = "msId")
    private MusicianInformation information;

    @OneToOne (cascade = CascadeType.ALL)
    @JsonIgnore
    @JoinColumn (name = "activeToken")
    private ActivationToken activationToken;

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
        return "Customer{Id=" + this.Id + ", username='" + this.username + "', pass='" + this.password + "', fullName='" + this.fullName + "', mail='" + this.mail + "', roleID='" + this.role + "', status=" + this.status + ", address='" + this.address + "', phoneNumber='" + this.phoneNumber + "'}";
    }

    public User(String username, String password, String fullName, String mail, String role, Gender gender, int status, int report) {
        this.username = username;
        this.password = password;
        this.fullName = fullName;
        this.mail = mail;
        this.role = role;
        this.gender = gender;
        this.status = status;
        this.report = report;
    }

    public enum Gender {
        MALE,
        FEMALE
    }
}
