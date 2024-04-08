package com.example.demo.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "MusicianRequest")
public class MusicianRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "msRequest")
    private User msRequest;

    @OneToMany(mappedBy = "requestId")
    @JsonIgnore
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private List<BeatRequest> beatRequestId = new ArrayList();

    public MusicianRequest(User msRequest, List<BeatRequest> beatRequestId) {
        this.msRequest = msRequest;
        this.beatRequestId = beatRequestId;
    }
}
