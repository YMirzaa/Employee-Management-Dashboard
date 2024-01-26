package com.management.backend.type;

public enum BloodType {
    A_POSITIVE("A+"), A_NEGATIVE("A-"), B_POSITIVE("B+"), B_NEGATIVE("B-"), AB_POSITIVE("AB+"), AB_NEGATIVE("AB-"),
    ZERO_POSITIVE("0+"), ZERO_NEGATIVE("0-");

    private String value;

    private BloodType(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    public static BloodType fromValue(String value) {
        for (BloodType bloodType : values()) {
            if (bloodType.getValue().equals(value)) {
                return bloodType;
            }
        }
        return null;
    }
}
