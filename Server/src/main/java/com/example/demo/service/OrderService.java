package com.example.demo.service;

import com.example.demo.dto.BeatResponseDTO;
import com.example.demo.dto.OrderDTO;
import com.example.demo.dto.OrderResponseDTO;
import com.example.demo.dto.UserResponeDTO;
import com.example.demo.entity.Beat;
import com.example.demo.entity.Order;
import com.example.demo.entity.User;
import com.example.demo.repository.BeatRepository;
import com.example.demo.repository.OrderRepository;
import com.example.demo.repository.UserRepository;
import org.aspectj.weaver.ast.Or;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService {
    @Autowired
    private BeatRepository beatRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OrderRepository orderRepository;

    public ResponseEntity<String> orderBeat(OrderDTO orderDTO, Long Id) {
        List<Long> listBeat = orderDTO.getBeatId();
        List<Beat> beats= new ArrayList<>();
        double totalPrice = 0;
        Optional<User> user=userRepository.findById(Id);
        if (user.isPresent() && !listBeat.isEmpty()){
            for (Long beat : listBeat) {
                Beat foundBeat = beatRepository.findBeatById(beat);
                if (foundBeat.getStatus() == -1) {
                    return new ResponseEntity<>("Beat bought", HttpStatus.NOT_IMPLEMENTED);
                }
                totalPrice += foundBeat.getPrice();
                beats.add(foundBeat);
                foundBeat.setStatus(-1);
            }
            Double price = totalPrice;
            Order newOrder=new Order(beats,user.get(),price);
            orderRepository.save(newOrder);
            setOrderId(newOrder);
            return new ResponseEntity<>("Payment Successfullly", HttpStatus.OK);
        }
        return new ResponseEntity<>("Oder failed", HttpStatus.NOT_IMPLEMENTED);
    }

    private void setOrderId (Order order){
        List<Beat> beats = order.getBeats();
        for (Beat value : beats) {
            Optional<Beat> foundBeat = Optional.ofNullable(this.beatRepository.findBeatById(value.getId()));
            if (foundBeat.isPresent()){
                Beat beat = foundBeat.get();
                beat.setOrderBeat(order);
                this.beatRepository.save(beat);
            }
        }
    }

    public List<Order> findOrder (Long id){
        List<Order> orderEntity =  orderRepository.findOrderByUserID(id);
        return  orderEntity;
    }

    private UserResponeDTO getUser(User user)
    {
        return new UserResponeDTO(user.getId(), user.getFullName());
    }
    private BeatResponseDTO getBeat(Beat beat){
        return new BeatResponseDTO(beat.getBeatName(),
                getUser(beat.getUserName()),
                beat.getPrice());
    }

    public OrderResponseDTO getInfor(Order order){
        Optional<Order> foundOrder = orderRepository.findById(order.getOrderId());
        if (foundOrder.isPresent()){
            OrderResponseDTO dto = new OrderResponseDTO(
                    getUser(order.getUserOrder()),
                    order.getCreatedAt());
            return dto;
        }
        else return null;
    }


    public List<OrderResponseDTO> getAllOrder(Long id) {
        Optional<User> foundUser = userRepository.findById(id);
        List<OrderResponseDTO> dtos = new ArrayList<>();
        List<BeatResponseDTO> beatResponseDTOS = new ArrayList<>();
        if (foundUser.isPresent()){
            List<Order> orders = orderRepository.findOrderByUserID(foundUser.get().getId());
            for (Order o : orders){
                OrderResponseDTO responseDTO = new OrderResponseDTO(
                        o.getOrderId(),
                        getUser(o.getUserOrder()),
                        o.getPrice()
                );
                for (Beat b : o.getBeats()){
                    BeatResponseDTO beat = new BeatResponseDTO(
                            b.getBeatName(),
                            getUser(b.getUserName()),
                            b.getPrice()
                    );
                    beatResponseDTOS.add(beat);
                }
                responseDTO.setBeatId(beatResponseDTOS);
                dtos.add(responseDTO);
            }
            return dtos;
        }
        return null;
    }
















}
