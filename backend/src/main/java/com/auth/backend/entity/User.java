package com.auth.backend.entity;

import java.time.LocalDate;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "users")
@Getter
@Setter
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    private int otp;
    private boolean verified;

    // 🔹 NEW PROFILE FIELDS
    private String name;
    private String phone;
    private LocalDate dob;
    private String gender;

    // 🔹 STORE ONLY IMAGE FILENAME
    private String profileImage;
}
