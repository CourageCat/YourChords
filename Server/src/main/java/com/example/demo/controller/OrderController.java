package com.example.demo.controller;

import com.example.demo.dto.OrderDTO;
import com.example.demo.dto.OrderResponseDTO;
import com.example.demo.entity.Order;
import com.example.demo.service.OrderService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1/order")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @PostMapping("/user/{id}")
    public ResponseEntity<String> orderBeat(@Valid @RequestBody OrderDTO orderDTO, @PathVariable Long id){
        return orderService.orderBeat(orderDTO,id);
    }

    @GetMapping("{id}")
    public ResponseEntity<List<OrderResponseDTO>> getAllOrder(@PathVariable Long id){
        return ResponseEntity.ok(orderService.getAllOrder(id));
    }

}
