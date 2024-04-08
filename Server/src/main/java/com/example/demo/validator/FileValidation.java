package com.example.demo.validator;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class FileValidation implements ConstraintValidator<File, byte[]> {
    @Override
    public void initialize(File constraintAnnotation) {
        ConstraintValidator.super.initialize(constraintAnnotation);
    }

    @Override
    public boolean isValid(byte[] bytes, ConstraintValidatorContext constraintValidatorContext) {
        return bytes != null;
    }
}
