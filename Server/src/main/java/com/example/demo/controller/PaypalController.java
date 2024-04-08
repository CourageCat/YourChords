package com.example.demo.controller;

import com.example.demo.dto.BeatRequestRequestDTO;
import com.example.demo.dto.BeatRequestResponseDTO;
import com.example.demo.dto.OrderDTO;
import com.example.demo.dto.PaymentDTO;
import com.example.demo.entity.User;
import com.example.demo.service.BeatRequestService;
import com.example.demo.service.OrderService;
import com.example.demo.service.PaypalService;
import com.paypal.api.payments.Links;
import com.paypal.api.payments.Payment;
import com.paypal.base.rest.PayPalRESTException;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = {"/api/v1/paypal"})
public class PaypalController {

    @Autowired
    private PaypalService paypalService;

    @Autowired
    private OrderService orderService;

    @Autowired
    private BeatRequestService beatRequestService;
    public static final String SUCCESS_URL = "success";
    public static final String CANCEL_URL = "cancel";

    public static final String URL = "http://localhost:3000/payment/";
    public static final String URLORDER = "http://localhost:3000/paymentorder/";

    @PostMapping
    public ResponseEntity<String> createPayment(@RequestBody PaymentDTO paymentRequest, HttpSession session) {
        try {
            Payment payment = this.paypalService.createPayment(
                    paymentRequest.getTotalprice(),
                    "USD",
                    paymentRequest.getDescription(),
                    URL + CANCEL_URL,
                    URL + SUCCESS_URL
            );

            for (Links links : payment.getLinks()) {
                if (links.getRel().equals("approval_url")) {
                    return ResponseEntity.status(HttpStatus.OK).body(links.getHref());
                }
            }
        } catch (PayPalRESTException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Payment creation failed");
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Payment creation failed");
    }

    @PostMapping("/order")
    public ResponseEntity<String> createPaymentOrder(@RequestBody PaymentDTO paymentRequest, HttpSession session) {
        try {
            Payment payment = this.paypalService.createPayment(
                    paymentRequest.getTotalprice(),
                    "USD",
                    paymentRequest.getDescription(),
                    URLORDER + CANCEL_URL,
                    URLORDER + SUCCESS_URL
            );

            for (Links links : payment.getLinks()) {
                if (links.getRel().equals("approval_url")) {
                    return ResponseEntity.status(HttpStatus.OK).body(links.getHref());
                }
            }
        } catch (PayPalRESTException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Payment creation failed");
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Payment creation failed");
    }

    @GetMapping("/user/" + CANCEL_URL)
    public ResponseEntity<String> cancelPayment() {
        return ResponseEntity.ok("Payment canceled!");
    }

    @PostMapping("/user/{id}/" + SUCCESS_URL)
    public ResponseEntity<String> successPayment(@Valid @PathVariable Long id, @Valid @RequestBody OrderDTO orderDTO) {
        try {
            Payment payment = paypalService.executePayment(orderDTO.getPaymentId(), orderDTO.getPayerID());
            if (payment.getState().equals("approved")) {
                return this.orderService.orderBeat(orderDTO, id);
            }
        } catch (PayPalRESTException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Payment execution failed");
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Payment execution failed");
    }
    @PostMapping("/user/order/" + SUCCESS_URL)
    public ResponseEntity<String> successPaymentOrder(@Valid @RequestBody BeatRequestRequestDTO beatRequestRequestDTO) {
        try {
            Payment payment = paypalService.executePayment(beatRequestRequestDTO.getPaymentId(), beatRequestRequestDTO.getPayerID());
            if (payment.getState().equals("approved")) {
                if(beatRequestRequestDTO.getFlag().equals("demo")){
                    return this.beatRequestService.acceptPrice(beatRequestRequestDTO);
                }
                return this.beatRequestService.acceptBeatFull(beatRequestRequestDTO);
            }
        } catch (PayPalRESTException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Payment execution failed");
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Payment execution failed");
    }


//    @ExceptionHandler(MethodArgumentNotValidException.class)
//    public ResponseEntity<String> handleValidationException(MethodArgumentNotValidException ex) {
//        String errorMessage = "Dữ liệu không hợp lệ: " + ex.getMessage();
//        return ResponseEntity.badRequest().body(errorMessage);
//    }

}


