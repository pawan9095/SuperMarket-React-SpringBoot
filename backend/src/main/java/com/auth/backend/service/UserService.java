package com.auth.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.auth.backend.entity.User;
import com.auth.backend.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository repo;

    @Autowired
    private JavaMailSender mailSender;

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

    // ✅ SEND OTP TO GMAIL
    public void sendOtp(String email, int otp) {
        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setTo(email);
        msg.setSubject("OTP Verification");
        msg.setText("Your OTP is: " + otp);
        mailSender.send(msg);
    }
}
