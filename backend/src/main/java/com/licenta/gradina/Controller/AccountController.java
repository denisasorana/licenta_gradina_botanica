package com.licenta.gradina.Controller;

import com.licenta.gradina.clase.User;
import com.licenta.gradina.clase.UserDTO;
import com.licenta.gradina.Repository.UserRepository;
import com.licenta.gradina.Security.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/contul-meu")
@CrossOrigin
public class AccountController {

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    public AccountController(UserRepository userRepository, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
    }

    @GetMapping
    public ResponseEntity<?> contulMeu(
            @RequestHeader("Authorization") String authHeader
    ) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.badRequest().body("Lipsește sau e invalid header-ul Authorization");
        }
        String token = authHeader.substring(7);
        String email = jwtUtil.extractEmail(token);

        Optional<User> optionalUser = userRepository.findByEmail(email);
        if (optionalUser.isEmpty()) {
            return ResponseEntity.status(404).body("Utilizator neidentificat");
        }
        User user = optionalUser.get();
        UserDTO dto = new UserDTO(user.getNume(), user.getPrenume(), user.getEmail());
        return ResponseEntity.ok(dto);
    }
}