package com.example.demo.Entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Setter
@Getter
@Table(name = "UserRole")
public class UserRole {
    @jakarta.persistence.Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;

  /*  @Column
    private Long userId;*/

    @Column
    private String roleName;


    @ManyToOne
    @JoinColumn(name="userId", nullable=false)
    private UserEntity user_role;


   @OneToMany(mappedBy ="role")
    private Set<Role> roles;

    public  Set<Role> getRoles(){
        return roles;
    }
}
