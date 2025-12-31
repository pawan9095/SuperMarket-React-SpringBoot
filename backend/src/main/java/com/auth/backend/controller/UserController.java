package com.auth.backend.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.auth.backend.entity.User;
import com.auth.backend.service.UserService;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserService service;

    // 🔹 GET PROFILE
    @GetMapping("/me")
    public User getProfile(@RequestParam String email) {
        User user = service.findByEmail(email);
        user.setPassword(null); // security
        return user;
    }

    // 🔹 UPDATE PROFILE
    @PutMapping("/profile")
    public User updateProfile(
            @RequestParam String email,
            @RequestBody User user
    ) {
        User updated = service.updateProfile(email, user);
        updated.setPassword(null);
        return updated;
    }

    // 🔹 UPLOAD IMAGE
    @PostMapping("/profile-image")
    public User uploadImage(
            @RequestParam String email,
            @RequestParam("image") MultipartFile image
    ) throws IOException {
        User updated = service.uploadProfileImage(email, image);
        updated.setPassword(null);
        return updated;
    }
}
