package com.example.demo.service;

import com.example.demo.dto.*;
import com.example.demo.entity.BeatRequest;
import com.example.demo.entity.MusicianRequest;
import com.example.demo.entity.User;
import com.example.demo.repository.BeatRequestRepository;
import com.example.demo.repository.MusicianRequestRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class BeatRequestService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private GoogleCloudService service;

    @Autowired
    private BeatRequestRepository beatRequestRepository;

    @Autowired
    private MusicianRequestRepository musicianRequestRepository;

    public ResponseEntity<String> addNew(BeatRequestRequestDTO dto) {
        Optional<User> foundUser = userRepository.findById(dto.getUserRequest());
        Optional<User> foundMs = userRepository.findById(dto.getMsId());

        BeatRequest beat = new BeatRequest(
                dto.getDescription(),
                foundUser.get(),
                dto.getBeatName()
        );
        beatRequestRepository.save(beat);
        List<BeatRequest> list = new ArrayList<>();
        list.add(beat);
        MusicianRequest ms = new MusicianRequest(
                foundMs.get(),
                list
        );
        musicianRequestRepository.save(ms);
        beat.setRequestId(ms);
        beatRequestRepository.save(beat);
        return new ResponseEntity<>("Created!", HttpStatus.OK);
    }

    public ResponseEntity<String> updateOrder (BeatRequestRequestDTO dto){
        Optional<BeatRequest> foundOrder = beatRequestRepository.findById(dto.getId());
        if(foundOrder.isPresent()){
            foundOrder.get().setBeatName(dto.getBeatName());
            foundOrder.get().setDescription(dto.getDescription());
            beatRequestRepository.save(foundOrder.get());
            return new ResponseEntity<>("Updated!", HttpStatus.OK);
        }
        return null;
    }

    public ResponseEntity<String> acceptRequest(BeatRequestRequestDTO dto) {
        Optional<BeatRequest> found = beatRequestRepository.findById(dto.getId());
        if (found.isPresent()) {
            found.get().setPrice(dto.getPrice());
            found.get().setStatus(1);
            beatRequestRepository.save(found.get());
            return new ResponseEntity<>("Accept request!", HttpStatus.OK);
        }
        return null;
    }

    public ResponseEntity<String> acceptPrice(BeatRequestRequestDTO dto) {
        Optional<BeatRequest> found = beatRequestRepository.findById(dto.getId());
        if (found.isPresent()) {
            found.get().setStatus(2);
            beatRequestRepository.save(found.get());
            return new ResponseEntity<>("Accept price!", HttpStatus.OK);
        }
        return null;
    }

    public ResponseEntity<String> acceptBeatFull(BeatRequestRequestDTO dto) {
        Optional<BeatRequest> found = beatRequestRepository.findById(dto.getId());
        if (found.isPresent()) {
            found.get().setStatus(-1);
            beatRequestRepository.save(found.get());
            return new ResponseEntity<>("Accept beat!", HttpStatus.OK);
        }
        return null;
    }

    public ResponseEntity<String> acceptBeatDemo(BeatRequestRequestDTO dto) {
        Optional<BeatRequest> found = beatRequestRepository.findById(dto.getId());
        if (found.isPresent()) {
            found.get().setStatus(4);
            beatRequestRepository.save(found.get());
            return new ResponseEntity<>("Accept beat!", HttpStatus.OK);
        }
        return null;
    }

    public ResponseEntity<String> rejectRequest(BeatRequestRequestDTO dto) {
        Optional<BeatRequest> found = beatRequestRepository.findById(dto.getId());
        if (found.isPresent()) {
            found.get().setStatus(-3);
            beatRequestRepository.save(found.get());
            return new ResponseEntity<>("Reject request!", HttpStatus.OK);
        }
        return null;
    }

    public ResponseEntity<String> rejectBeat(BeatRequestRequestDTO dto) {
        Optional<BeatRequest> found = beatRequestRepository.findById(dto.getId());
        if (found.isPresent()) {
            found.get().setStatus(-2);
            beatRequestRepository.save(found.get());
            return new ResponseEntity<>("Reject beat!", HttpStatus.OK);
        }
        return null;
    }

    private String extractObjectNameFromUrl(String fullUrl) {
        if (fullUrl.startsWith("https://storage.googleapis.com/mychordproject/")) {
            int startIndex = "https://storage.googleapis.com/mychordproject/".length();
            return fullUrl.substring(startIndex);
        }
        return null;
    }
    public ResponseEntity<String> sendBeatDemo(MultipartFile sound, BeatRequestRequestDTO dto) {
        Optional<BeatRequest> found = beatRequestRepository.findById(dto.getId());
        Optional<User> foundUser = userRepository.findById(dto.getMsId());
        if (found.isPresent()){

//            if (sound != null) {
//
//                String pathfull = service.uploadFile(sound, foundUser.get().getId(), "audio", "full", found.get().getObjectName());
//                String objectfull = extractObjectNameFromUrl(pathfull);
//                found.get().setBeatSoundFull(pathfull);
//                found.get().setObjectName(objectfull);
//            }
            if (sound != null) {
                String pathdemo = service.uploadFile(sound, foundUser.get().getId(), "audio", "demo", found.get().getObjectNameDemo());
                String objectdemo = extractObjectNameFromUrl(pathdemo);
                found.get().setBeatSoundDemo(pathdemo);
                found.get().setObjectNameDemo(objectdemo);

            }
            found.get().setStatus(3);
            beatRequestRepository.save(found.get());
            return new ResponseEntity<>("Send!",HttpStatus.OK);
        }
        return null;
    }

    public ResponseEntity<String> sendBeatFull(MultipartFile sound, BeatRequestRequestDTO dto) {
        Optional<BeatRequest> found = beatRequestRepository.findById(dto.getId());
        Optional<User> foundUser = userRepository.findById(dto.getMsId());
        if (found.isPresent()){

            if (sound != null) {

                String pathfull = service.uploadFile(sound, foundUser.get().getId(), "audio", "full", found.get().getObjectName());
                String objectfull = extractObjectNameFromUrl(pathfull);
                found.get().setBeatSoundFull(pathfull);
                found.get().setObjectName(objectfull);
            }
//            if (sound != null) {
//                String pathdemo = service.uploadFile(sound, foundUser.get().getId(), "audio", "demo", found.get().getObjectNameDemo());
//                String objectdemo = extractObjectNameFromUrl(pathdemo);
//                found.get().setBeatSoundDemo(pathdemo);
//                found.get().setObjectNameDemo(objectdemo);
//
//            }
            found.get().setStatus(5);
            beatRequestRepository.save(found.get());
            return new ResponseEntity<>("Send!",HttpStatus.OK);
        }
        return null;
    }

    private UserResponeDTO getUser(User user){
        return new UserResponeDTO(user.getId(), user.getFullName());
    }

    private BeatRequestResponseDTO getBeatDTO(BeatRequest beat){
        Optional<MusicianRequest> ms = musicianRequestRepository.findById(beat.getRequestId().getId());
        Optional<User> foundUser = userRepository.findById(ms.get().getMsRequest().getId());
        BeatRequestResponseDTO dto = new BeatRequestResponseDTO(
                beat.getId(),
                getUser(beat.getUserRequest()),
                beat.getBeatName(),
                getUser(foundUser.get()),
                beat.getCreatedAt(),
                beat.getStatus()
        );
        return dto;
    }

    private BeatRequestResponseDTO getBeatResponseDTO(BeatRequest beat){
        Optional<MusicianRequest> ms = musicianRequestRepository.findById(beat.getRequestId().getId());
        Optional<User> foundUser = userRepository.findById(ms.get().getMsRequest().getId());
        BeatRequestResponseDTO dto = new BeatRequestResponseDTO(
                beat.getId(),
                beat.getDescription(),
                beat.getBeatName(),
                beat.getPrice(),
                beat.getBeatSoundFull(),
                beat.getBeatSoundDemo(),
                beat.getStatus(),
                beat.getCreatedAt()
        );
        return dto;
    }

    private BeatRequestResponseDTO getBeatDTOWithStatus(BeatRequest beat){
        Optional<MusicianRequest> ms = musicianRequestRepository.findById(beat.getRequestId().getId());
        Optional<User> foundUser = userRepository.findById(ms.get().getId());
        if (beat.getStatus() == 3){
            BeatRequestResponseDTO dto = new BeatRequestResponseDTO(
                    beat.getId(),
                    getUser(beat.getUserRequest()),
                    beat.getBeatName(),
                    getUser(foundUser.get()),
                    beat.getCreatedAt(),
                    beat.getStatus(),
                    beat.getBeatSoundDemo()
            );
            return dto;

        } else if (beat.getStatus() == -1) {
            BeatRequestResponseDTO dto = new BeatRequestResponseDTO(
                    beat.getId(),
                    getUser(beat.getUserRequest()),
                    beat.getBeatSoundFull()
                    ,
                    beat.getBeatName(),
                    getUser(foundUser.get()),
                    beat.getCreatedAt(),
                    beat.getStatus()
            );
            return dto;

        }
        return null;
    }

    public ResponseEntity<List<BeatRequestResponseDTO>> viewAllInCus(Long id){
        Optional<User> foundUser=userRepository.findById(id);
        if (foundUser.isPresent()){
            List<BeatRequest> list = beatRequestRepository.findAllByUserRequest(foundUser.get());
            List<BeatRequestResponseDTO> response = new ArrayList<>();
            for (BeatRequest i : list){
                response.add(getBeatDTO(i));
            }
            return new ResponseEntity<>(response,HttpStatus.OK);
        }
        return null;
    }

    public ResponseEntity<List<BeatRequestResponseDTO>> viewAllInMs(Long id){
        Optional<User> foundUser  = userRepository.findById(id);
        if (foundUser.isPresent()){
            List<MusicianRequest> listOrder  = musicianRequestRepository.findAllByMsRequest(foundUser.get());
            List<BeatRequestResponseDTO> list  =new ArrayList<>();
            for (MusicianRequest i :listOrder){
                BeatRequest b  = new BeatRequest();
                b = beatRequestRepository.findByRequestId(i);
                list.add(getBeatDTO(b));
            }
            return new ResponseEntity<>(list,HttpStatus.OK);
        }
        return null;
    }

    public ResponseEntity<BeatRequestResponseDTO> viewDetail(Long id){
        Optional<BeatRequest> foundOrder = beatRequestRepository.findById(id);
        if(foundOrder.isPresent()){
            BeatRequestResponseDTO b = getBeatResponseDTO(foundOrder.get());
            return new ResponseEntity<>(b,HttpStatus.OK);
        }
        return null;
    }

    public ResponseEntity<BeatRequestResponseDTO> viewDetailByCus(Long id, Long userId){
        Optional<BeatRequest> foundOrder = beatRequestRepository.findById(id);
        Optional<User> foundUser = userRepository.findById(userId);
        if(foundOrder.isPresent() && foundUser.isPresent()){
            if (foundOrder.get().getUserRequest().equals(foundUser.get())){
                BeatRequestResponseDTO b = getBeatResponseDTO(foundOrder.get());
                return new ResponseEntity<>(b,HttpStatus.OK);
            }
            else return null;
        }
        return null;
    }


    public ResponseEntity<BeatRequestResponseDTO> viewDetailByMS(Long id, Long userId){
        Optional<BeatRequest> foundOrder = beatRequestRepository.findById(id);
        Optional<User> foundUser = userRepository.findById(userId);
        Optional<MusicianRequest> foundMS = Optional.ofNullable(foundOrder.get().getRequestId());
        if(foundOrder.isPresent() && foundUser.isPresent() && foundMS.isPresent()){
            if (foundMS.get().getMsRequest().equals(foundUser.get())){
                BeatRequestResponseDTO b = getBeatResponseDTO(foundOrder.get());
                return new ResponseEntity<>(b,HttpStatus.OK);
            }
            else return null;
        }
        return null;
    }

    public ResponseEntity<List<BeatRequestResponseDTO>> viewAllBeatRequestPurchased(Long id){
        Optional<User> foundUser = userRepository.findById(id);
        if (foundUser.isPresent()){
            List<BeatRequestResponseDTO> list = new ArrayList<>();
            List<BeatRequest> beat = beatRequestRepository.findAllByUserRequest(foundUser.get());
            for (BeatRequest i : beat){
                if(i.getStatus() == -1) {
                    list.add(getBeatResponseDTO(i));
                }
            }
            return new ResponseEntity<>(list,HttpStatus.OK);
        }
        return null;
    }

    public ResponseEntity<IncomeResponseDTO> totalIncome(Long id){
        Optional<User> foundUser = userRepository.findById(id);
        Double price = 0.0;
        int beatReject=0;
        int beatAccept=0;
        if (foundUser.isPresent()){
            List<MusicianRequest> beat = musicianRequestRepository.findAllByMsRequest(foundUser.get());
            for (MusicianRequest i : beat){
                BeatRequest b = new BeatRequest();
                b = beatRequestRepository.findByRequestId(i);
                if (b.getStatus() == -1 && b!= null){
                    price += b.getPrice();
                    beatAccept++;
                } else if (b.getStatus() == -2 && b!= null ) {
                    price += b.getPrice()*0.15;
                    beatReject++;
                }
                else if (b.getStatus() == 3 && b!= null ) {
                    price += b.getPrice()*0.15;
                    beatReject++;
                }
                else if (b.getStatus() == 4 && b!= null ) {
                    price += b.getPrice()*0.15;
                    beatReject++;
                }
                else if (b.getStatus() == 5 && b!= null ) {
                    price += b.getPrice()*0.15;
                    beatReject++;
                }
            }
            IncomeResponseDTO response = new IncomeResponseDTO(
                    price,
                    beatReject,
                    beatAccept
            );
            return new ResponseEntity<>(response,HttpStatus.OK);
        }
        return null;
    }

    public ResponseEntity<List<IncomeResponseDTO>> viewIncomeDetail(Long id){
        Optional<User> foundUser = userRepository.findById(id);
        if (foundUser.isPresent()){
            List<IncomeResponseDTO> dtoList = new ArrayList<>();
            Double price = 0.0;
            List<MusicianRequest> beatEntity = musicianRequestRepository.findAllByMsRequest(foundUser.get());
            for (MusicianRequest i : beatEntity) {
                BeatRequest b = new BeatRequest();
                b = beatRequestRepository.findByRequestId(i);
                if (b.getStatus() == -1){
                    price = b.getPrice();
                }
                if (b.getStatus() == -2){
                    price = b.getPrice()*0.15;
                }
                if (b.getStatus() == 3){
                    price = b.getPrice()*0.15;
                }
                if(b.getStatus() == 4){
                    price = b.getPrice()*0.15;
                }
                if(b.getStatus() == 5){
                    price = b.getPrice()*0.15;
                }
                IncomeResponseDTO beat = new IncomeResponseDTO(
                        price,
                        b.getBeatName(),
                        getUser(b.getUserRequest()),
                        b.getCreatedAt(),
                        b.getStatus()
                );
                if(b.getStatus() == -1 || b.getStatus() == -2 || b.getStatus() == 3 || b.getStatus() == 4 || b.getStatus() == 5) {
                    dtoList.add(beat);
                }

            }
            return new ResponseEntity<>(dtoList,HttpStatus.OK);
        }
        return null;
    }

}