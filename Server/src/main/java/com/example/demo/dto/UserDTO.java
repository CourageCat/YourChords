//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//

package com.example.demo.dto;

import com.example.demo.validationgroups.UpdateValidation;
import com.example.demo.validator.YearMax;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {

    private Long id;

//    @NotBlank (message = "Password must be not null")
//    @Size(min = 5, message = "Password must be at least 5 characters")
//    @Password(message = "Invalid password")
//    private String password;

    @Pattern(regexp = "(^$|[0-9]{10})", message = "Phone Number must be 10 or 11 characters", groups = {UpdateValidation.Admin.class, UpdateValidation.Customer.class, UpdateValidation.Musician.class})
    private String phone;

    private String gender;

    @NotNull(message = "Full Name must be not null", groups = {UpdateValidation.Admin.class, UpdateValidation.Customer.class, UpdateValidation.Musician.class})
    @NotBlank(message = "Full Name must be not blank", groups = {UpdateValidation.Admin.class, UpdateValidation.Customer.class, UpdateValidation.Musician.class})
    private String fullName;

    @NotNull(message = "Address must be not null", groups = {UpdateValidation.Customer.class, UpdateValidation.Musician.class})
    @NotBlank(message = "Address must be not blank", groups = {UpdateValidation.Customer.class, UpdateValidation.Musician.class})
    private String address;

    private String email;

    private String role;

    // Musician
    @NotNull(message = "Address must be not null", groups = {UpdateValidation.Musician.class})
    @NotBlank(message = "Address must be not blank", groups = {UpdateValidation.Musician.class})
    private String professional;

    @NotNull(message = "Prize must be not null", groups = {UpdateValidation.Musician.class})
    @NotBlank(message = "Prize must be not blank", groups = {UpdateValidation.Musician.class})
    private String prize;

    @NotNull(message = "Year must be not null", groups = {UpdateValidation.Musician.class})

    @YearMax(groups = {UpdateValidation.Musician.class})
    private int year;

    // Content
    private String content;
}
