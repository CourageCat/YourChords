package com.example.demo.dto;

import lombok.Data;

@Data
public class BeatRequestRequestDTO {
    private Long id;
    private String description;
    private Long userRequest;
    private Long msId;
    private Double price;
    private String beatName;
    private String paymentId;
    private String payerID;
    private String flag;
}
