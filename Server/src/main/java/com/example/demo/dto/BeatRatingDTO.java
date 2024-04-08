package com.example.demo.dto;

import lombok.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BeatRatingDTO {
    private Long id;
    private Long userId;
    private Long beatId;
    private int rate;

    public BeatRatingDTO(Long userId, Long beatId, int rate) {
        this.userId = userId;
        this.beatId = beatId;
        this.rate = rate;
    }
}
