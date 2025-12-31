package com.auth.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.auth.backend.entity.User;
import com.auth.backend.service.UserService;

import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final UserService service;

    public AuthController(UserService service) {
        this.service = service;
    }

    // SIGNUP
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody User user) {
        int otp = (int) (Math.random() * 900000) + 100000;

        user.setOtp(otp);
        user.setVerified(false);
        service.save(user);
        service.sendOtp(user.getEmail(), otp);

        return ResponseEntity.ok(Map.of(
                "status", "OTP_SENT"
        ));
    }

    // VERIFY OTP
    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtp(@RequestBody User req) {
        User user = service.findByEmail(req.getEmail());

        if (user != null && user.getOtp() == req.getOtp()) {
            user.setVerified(true);
            user.setOtp(0);
            service.save(user);

            return ResponseEntity.ok(Map.of(
                    "status", "VERIFIED"
            ));
        }

        return ResponseEntity.badRequest().body(Map.of(
                "status", "INVALID_OTP"
        ));
    }

    // LOGIN
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

        dbUser.setPassword(null);
        return ResponseEntity.ok(dbUser);
    }
}
