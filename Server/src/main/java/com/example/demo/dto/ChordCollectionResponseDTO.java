package com.example.demo.dto;

import com.example.demo.entity.ChordBasic;
import com.example.demo.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class ChordCollectionResponseDTO {
    private String name;
    private int status;
    private UserResponeDTO username;
    private String description;
    private long chordCollectionId;
    private String flag;
    private List<ChordResponseDTO> chords;

    @Override
    public String toString() {
        return "ChordCollectionResponseDTO{" +
                "name='" + name + '\'' +
                ", status=" + status +
                ", username=" + username +
                ", description='" + description + '\'' +
                ", chordCollectionId=" + chordCollectionId +
                ", flag='" + flag + '\'' +
                ", chords=" + chords +
                '}';
    }
}
