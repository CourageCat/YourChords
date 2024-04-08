package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderResponseDTO {
    private Long Id;
    private UserResponeDTO userId;
    private double price;
    private List<BeatResponseDTO> beatId;
    private LocalDateTime createAt;

    public OrderResponseDTO(Long id, UserResponeDTO userId, double price) {
        Id = id;
        this.userId = userId;
        this.price = price;
    }

    public OrderResponseDTO(UserResponeDTO userId, LocalDateTime createAt) {
        this.userId = userId;
        this.createAt = createAt;
    }
}
