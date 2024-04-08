package com.example.demo.service;

import com.example.demo.dto.ChordCollectionDTO;
import com.example.demo.dto.ChordCollectionResponseDTO;
import com.example.demo.dto.ChordResponseDTO;
import com.example.demo.dto.UserResponeDTO;
import com.example.demo.entity.ChordBasic;
import com.example.demo.entity.ChordCollection;
import com.example.demo.entity.User;
import com.example.demo.repository.ChordBasicRepository;
import com.example.demo.repository.ChordCollectionRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class ChordCollectionService {

    @Autowired
    private ChordCollectionRepository chordCollectionRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ChordBasicRepository chordRepository;


    public List<ChordCollection> findAllColletion(Long id) {
        Optional<User> userEntity = userRepository.findById(id);
        List<ChordCollection> collection = chordCollectionRepository.findAll();
        if (userEntity == null || collection.isEmpty()) {
            return null;
        } else {
            List<ChordCollection> collectionEntity = new ArrayList<>();
            for (ChordCollection chordCollection : collection) {
                //userCollection is username in User Entity
                User t = chordCollection.getUserCollection();
                if (t != null && t.getId().equals(userEntity.get().getId())) {
                    ChordCollection ownCollection = new ChordCollection(
                            chordCollection.getId(),
                            chordCollection.getName(),
                            chordCollection.getDescription(),
                            chordCollection.getStatus(),
                            chordCollection.getCreatedAt());
                    collectionEntity.add(ownCollection);
                }
            }
            return collectionEntity;
        }
    }

    private UserResponeDTO getUser(User user) {
        return new UserResponeDTO(user.getId(), user.getUsername(), user.getFullName(), user.getPhoneNumber(), user.getMail());
    }

    public ChordCollectionResponseDTO getDetail(Long id) {
        Optional<ChordCollection> foundCollections = chordCollectionRepository.findByCollectionId(id);
        if (foundCollections.isPresent()) {
            ChordCollection collection = foundCollections.get();
            ChordCollectionResponseDTO collectionResponse = new ChordCollectionResponseDTO();
            collectionResponse.setChordCollectionId(collection.getId());
            collectionResponse.setName(collection.getName());
            collectionResponse.setDescription(collection.getDescription());
            collectionResponse.setChords(getChords(collection.getId()));
            collectionResponse.setUsername(getUser(collection.getUserCollection()));
            return collectionResponse;
        }
        return null;


    }

    public List<ChordResponseDTO> getChords(Long id) {
        List<Long> chords = this.chordRepository.findByCollection(id);
        if (chords.isEmpty()) {
            return null;
        } else {
            List<ChordResponseDTO> chordResponseDTOS = new ArrayList<>();
            for (int i = 0; i < chords.size(); i++) {
                ChordBasic basic = this.chordRepository.findByChordId(chords.get(i));
                chordResponseDTOS.add(new ChordResponseDTO(
                        basic.getChordId(),
                        basic.getChordName(),
                        basic.getImage(),
                        basic.getChordKey(),
                        basic.getSuffix(),
                        basic.getType(),
                        basic.getDescription()));
            }
            return chordResponseDTOS;
        }
    }

    public ResponseEntity<String> addToCollection(ChordCollectionDTO chordCollectionDTO) {
        Optional<User> user = userRepository.findById(chordCollectionDTO.getUserId());
        if (user == null) {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        } else {
            if (chordCollectionDTO.getFlag().equals("Create new collection")) {
                Optional<ChordCollection> foundName = chordCollectionRepository.findByUserCollection(user.get(), chordCollectionDTO.getName());
                if (foundName.isPresent()) {
                    return new ResponseEntity<>("Collection name is present!", HttpStatus.NOT_IMPLEMENTED);
                }
                ChordCollection collection = new ChordCollection();
                Set<ChordBasic> chords = collection.getChordsofcollections();
                for (Long chordId : chordCollectionDTO.getChordId()) {
                    ChordBasic chord = chordRepository.findByChordId(chordId);
                    if (chord != null) {
                        chords.add(chord);
                    }
                }
                collection.setName(chordCollectionDTO.getName());
                collection.setStatus(0);
                collection.setDescription(chordCollectionDTO.getDescription());
                collection.setUserCollection(user.get());
                collection.setChordsofcollections(chords);
                chordCollectionRepository.save(collection);

            } else {
                Optional<ChordCollection> findCollection = chordCollectionRepository.findByName(chordCollectionDTO.getName());
                Set<ChordBasic> chords = findCollection.get().getChordsofcollections();
                for (Long chordId : chordCollectionDTO.getChordId()) {
                    ChordBasic chord = chordRepository.findByChordId(chordId);
                    if (chord != null) {
                        chords.add(chord);
                    }
                }
                findCollection.get().setChordsofcollections(chords);
                chordCollectionRepository.save(findCollection.get());
            }
            return new ResponseEntity<>("Add successfully", HttpStatus.OK);
        }
    }


    public ResponseEntity<String> removeChord(ChordCollectionDTO chordCollectionDTO) {
        User user = userRepository.findByUsername(chordCollectionDTO.getUsername());
        if (user == null) {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        } else {
            Optional<ChordCollection> findCollection = chordCollectionRepository.findByName(chordCollectionDTO.getName());
            ChordCollection collection = findCollection.get();
            Set<ChordBasic> chords = findCollection.get().getChordsofcollections();
            for (Long chordId : chordCollectionDTO.getChordId()) {
                ChordBasic chord = chordRepository.findByChordId(chordId);
                if (chord != null) {
                    chords.remove(chord);
                }
            }
            collection.setChordsofcollections(chords);
            chordCollectionRepository.save(collection);

        }
        return new ResponseEntity<>("Remove successfully", HttpStatus.OK);

    }

    public ResponseEntity<String> deleteCollection(ChordCollectionDTO chordCollectionDTO) {
        User user = userRepository.findByUsername(chordCollectionDTO.getUsername());
        if (user == null) {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        } else {
            Optional<ChordCollection> findCollection = chordCollectionRepository.findByName(chordCollectionDTO.getName());
            Set<ChordBasic> chords = findCollection.get().getChordsofcollections();
            chords.removeAll(chords);
            chordCollectionRepository.deleteById(findCollection.get().getId());
        }
        return new ResponseEntity<>("Delete successfully", HttpStatus.OK);
    }

}
