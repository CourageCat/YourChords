package com.example.demo.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class BeatRequestResponseDTO {
    private Long id;
        private String description;
        private String beatName;
        private Long msId;
        private Double price;
    UserResponeDTO userRequest;
    UserResponeDTO musician;
    private LocalDateTime creatAt;
    private int status;
    private String beatDemo;
    private String beatFull;

    public BeatRequestResponseDTO(Long id, UserResponeDTO userRequest, String beatName, UserResponeDTO musician, LocalDateTime creatAt, int status) {
        this.id = id;
        this.userRequest = userRequest;
        this.beatName = beatName;
        this.musician = musician;
        this.creatAt = creatAt;
        this.status = status;


    }
    public BeatRequestResponseDTO(Long id, UserResponeDTO userRequest, String beatName, UserResponeDTO musician, LocalDateTime creatAt, int status, String beatDemo) {
        this.id = id;
        this.userRequest = userRequest;
        this.beatName = beatName;
        this.musician = musician;
        this.creatAt = creatAt;
        this.status = status;
        this.beatDemo = beatDemo;

    }
    public BeatRequestResponseDTO(Long id, UserResponeDTO userRequest, String beatFull, String beatName, UserResponeDTO musician, LocalDateTime creatAt, int status) {
        this.id = id;
        this.userRequest = userRequest;
        this.beatName = beatName;
        this.musician = musician;
        this.creatAt = creatAt;
        this.status = status;
        this.beatFull = beatFull;

    }

    public BeatRequestResponseDTO(Long id, String description , String beatName, Double price, String beatSoundFull, String beatSoundDemo, int status, LocalDateTime creatAt) {
        this.id = id;
        this.description = description;
        this.beatName = beatName;
        this.price = price;
        this.beatFull = beatSoundFull;
        this.beatDemo = beatSoundDemo;
        this.status = status;
        this.creatAt = creatAt;
    }

}
