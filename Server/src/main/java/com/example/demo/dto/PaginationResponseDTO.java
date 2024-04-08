package com.example.demo.dto;

import lombok.*;

import java.util.List;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor


public class PaginationResponseDTO {
    private List<?> dtoList;
    private int pageCount;
    private int max;
}