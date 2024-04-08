//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//

package com.example.demo.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderId;

    @Column(name = "Price")
    private Double price;

    @Column(name = "Date")
    private LocalDateTime createdAt;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "userOrder")
    private User userOrder;

    @OneToMany(mappedBy = "orderBeat")
    @JsonIgnore
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private List<Beat> beats = new ArrayList();

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
    }

    @JsonIgnore
    public void setUserOrder(final User userOrder) {
        this.userOrder = userOrder;
    }

    @JsonIgnore
    public void setBeats(final List<Beat> beats) {
        this.beats = beats;
    }

    public Order( List<Beat> beats, User userOrder,Double price ) {
        this.price = price;
        this.userOrder = userOrder;
        this.beats = beats;
    }

    @Override
    public String toString() {
        return "Order{" +
                "orderId=" + orderId +
                ", price=" + price +
                ", createdAt=" + createdAt +
                ", userOrder=" + userOrder +
                ", beats=" + beats +
                '}';
    }
}
