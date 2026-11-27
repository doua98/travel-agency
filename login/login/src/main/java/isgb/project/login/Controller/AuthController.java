package isgb.project.login.Controller;

import isgb.project.login.DTO.LoginRequest;
import isgb.project.login.DTO.LoginResponse;
import isgb.project.login.Model.Utilisateur;
import isgb.project.login.Service.AuthService;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody LoginRequest request) {

        try {
            LoginResponse response =
                    authService.login(request);

            return ResponseEntity.ok(response);

        } catch (RuntimeException e) {

            return ResponseEntity.status(401)
                    .body(e.getMessage());
        }
    }
    @PostMapping("/register")
    public ResponseEntity<?> register(
            @RequestBody Utilisateur user) {

        try {
            return ResponseEntity.ok(
                    authService.inscrire(user)
            );

        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(e.getMessage());
        }
    }
}