package com.auth.backend.service;

import com.cloudinary.Cloudinary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.auth.backend.entity.User;
import com.auth.backend.repository.UserRepository;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;
@Service
public class UserService {

    @Autowired
    private UserRepository repo;

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private Cloudinary cloudinary;

    public void save(User user) {
        repo.save(user);
    }

    public User findByEmail(String email) {
        return repo.findByEmail(email);
    }

    public boolean login(String email, String password) {
        User user = repo.findByEmail(email);
        return user != null && user.isVerified()
                && user.getPassword().equals(password);
    }

    // SEND OTP
    public void sendOtp(String email, int otp) {
        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setTo(email);
        msg.setSubject("OTP Verification");
        msg.setText("Your OTP is: " + otp);
        mailSender.send(msg);
    }

    // UPLOAD PROFILE IMAGE
    public User uploadProfileImage(String email, MultipartFile file) throws IOException {
        User user = repo.findByEmail(email);
        if (user == null) throw new RuntimeException("User not found");

        Map uploadResult = cloudinary.uploader().upload(
                file.getBytes(),
                Map.of(
                        "folder", "profile-images",
                        "public_id", email.replaceAll("[^a-zA-Z0-9]", "_"),
                        "overwrite", true
                )
        );

        user.setProfileImage(uploadResult.get("secure_url").toString());
        return repo.save(user);
    }

    // UPDATE PROFILE (NO @Autowired HERE ❗)
    public User updateProfile(String email, User updatedUser) {
        User user = repo.findByEmail(email);
        if (user == null) {
            throw new RuntimeException("User not found");
        }

        user.setName(updatedUser.getName());
        user.setPhone(updatedUser.getPhone());
        user.setGender(updatedUser.getGender());
        user.setDob(updatedUser.getDob());

        return repo.save(user);
    }
}
