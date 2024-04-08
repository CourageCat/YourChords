package com.example.demo.validator;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.FIELD, ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = YearMaxValidator.class)
public @interface YearMax {
    String message() default "The year must be less than or equal to the current year";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
