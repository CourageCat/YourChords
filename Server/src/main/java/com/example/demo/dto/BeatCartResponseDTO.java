package com.example.demo.dto;

import com.example.demo.entity.Beat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class BeatCartResponseDTO {
    private List<Long> beat;
    private List<BeatResponseDTO> beatList;
    private Double totalAmount;
}
