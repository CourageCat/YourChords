package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ChordCollectionDTO {
    private String name;
    private int status;
    private String username;
    private String description;
    private List<Long> chordId;
    private long chordCollectionId;
    private String flag;

    @Override
    public String toString() {
        return "ChordCollectionDTO{" +
                "name='" + name + '\'' +
                ", status=" + status +
                ", username='" + username + '\'' +
                '}';
    }
}
