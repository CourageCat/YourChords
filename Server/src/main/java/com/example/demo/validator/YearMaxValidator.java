package com.example.demo.validator;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.time.Year;

public class YearMaxValidator implements ConstraintValidator<YearMax, Integer> {

    @Override
    public void initialize(YearMax constraintAnnotation) {
        ConstraintValidator.super.initialize(constraintAnnotation);
    }

    @Override
    public boolean isValid(Integer value, ConstraintValidatorContext context) {
        if (value == null) {
            return true;
        }

        int currentYear = Year.now().getValue();
        return value <= currentYear;
    }
}
