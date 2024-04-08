package com.example.demo.service;

import com.example.demo.dto.ChordDTO;
import com.example.demo.dto.ChordResponseDTO;
import com.example.demo.entity.ChordBasic;
import com.example.demo.repository.ChordBasicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ChordBasicService {

    @Autowired
    private ChordBasicRepository chordBasicRepository;
    @Autowired
    private GoogleCloudService service;

    public ChordBasic findById(Long id){
        Optional<ChordBasic> foundChord=chordBasicRepository.findById(id);
        if (foundChord.isEmpty()){
            return null;
        }else {
            return chordBasicRepository.findById(id).orElseThrow();
        }
    }

    public List<ChordBasic> searchChord(String key, String suffix, String type){
        List<ChordBasic> chordEntity=chordBasicRepository.findChord(key, suffix, type);
        if (chordEntity.isEmpty()){
            return null;
        } else {
            for (ChordBasic value : chordEntity) {
                value.setImage(value.getImage());
            }
            return chordEntity;
        }
    }
    
    public ResponseEntity<String> uploadChord(MultipartFile image , ChordDTO chordDTO){
        Optional<ChordBasic> foundChord = Optional.ofNullable(this.chordBasicRepository.findByChordNameAndType(chordDTO.getName(), chordDTO.getType()));
        if(foundChord.isEmpty()){
            ChordBasic basic = new ChordBasic(chordDTO.getName(),
                    chordDTO.getKey(),
                    chordDTO.getSuffix(),
                    chordDTO.getScript(),
                    chordDTO.getType());
            this.chordBasicRepository.save(basic);
            String path = this.service.uploadFile(image, basic.getChordId(), "image", "full", null);
            basic.setImage(path);
            this.chordBasicRepository.save(basic);
        return new ResponseEntity<>("Add được rồi đó Hiển", HttpStatus.OK);
        } else {
        return new ResponseEntity<>("Add ko được rồi, check lại database", HttpStatus.NOT_IMPLEMENTED);
        }
    }

    public List<ChordResponseDTO> getGuitarChord(){
        List<ChordBasic> basics = this.chordBasicRepository.findChordBasicsByType("Guitar");
        if(!basics.isEmpty()){
            List<ChordResponseDTO> dtos = new ArrayList<>();
            for(ChordBasic value : basics){
                ChordResponseDTO dto = new ChordResponseDTO(value.getChordId(),
                        "[" + value.getChordName() + "]",
                        value.getImage());
                dtos.add(dto);
            }
            return dtos;
        }
        return null;
    }

    private List<ChordResponseDTO> getChordResponseDTO(List<ChordBasic> chordBasicList){
        if (chordBasicList.isEmpty())
            return null;
        else {
            List<ChordResponseDTO> dtos = new ArrayList<>();
            for (ChordBasic i : chordBasicList){
                ChordResponseDTO dto = new ChordResponseDTO(
                    i.getChordId(),
                        i.getChordName(),
                        i.getImage(),
                        i.getChordKey(),
                        i.getSuffix(),
                        i.getDescription(),
                        i.getType()
                );
                dtos.add(dto);
            }
            return dtos;
        }
    }

    public List<ChordResponseDTO> searchChordByType(String type) {
        List<ChordBasic> chordEntity=chordBasicRepository.findChordBasicsByType(type);
        if (chordEntity.isEmpty()){
            return null;
        } else {
            List<ChordResponseDTO> list = getChordResponseDTO(chordEntity);
            return list;
        }
    }
}
