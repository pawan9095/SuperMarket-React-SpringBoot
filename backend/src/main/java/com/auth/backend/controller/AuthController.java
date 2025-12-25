package com.auth.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.auth.backend.entity.User;
import com.auth.backend.service.UserService;

@RestController
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserService service;

    // SIGNUP
    @PostMapping("/signup")
    public String signup(@RequestBody User user) {
        int otp = (int) (Math.random() * 900000) + 100000;

        user.setOtp(otp);
        user.setVerified(false);
        service.save(user);
        service.sendOtp(user.getEmail(), otp);

        return "OTP_SENT";
    }

    // VERIFY OTP
    @PostMapping("/verify-otp")
    public String verifyOtp(@RequestBody User req) {
        User user = service.findByEmail(req.getEmail());

        if (user != null && user.getOtp() == req.getOtp()) {
            user.setVerified(true);
            user.setOtp(0);
            service.save(user);
            return "VERIFIED success";
        }
        return "INVALID_OTP";
    }

    // LOGIN ✅
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {

        User dbUser = service.findByEmail(user.getEmail());

        if (dbUser == null) {
            return ResponseEntity.status(401).body("USER_NOT_FOUND");
        }

        if (!dbUser.isVerified()) {
            return ResponseEntity.status(401).body("NOT_VERIFIED");
        }

        if (!dbUser.getPassword().equals(user.getPassword())) {
            return ResponseEntity.status(401).body("WRONG_PASSWORD");
        }

        dbUser.setPassword(null); // security
        return ResponseEntity.ok(dbUser); // ✅ SUCCESS
    }

}

