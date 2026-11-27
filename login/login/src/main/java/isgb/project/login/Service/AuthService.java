package isgb.project.login.Service;


import isgb.project.login.Model.Utilisateur;
import isgb.project.login.Repository.UtilisateurRepository;
import isgb.project.login.DTO.LoginRequest;
import isgb.project.login.DTO.LoginResponse;

import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;

@Service
public class AuthService {

    private final UtilisateurRepository repository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UtilisateurRepository repository,
                       PasswordEncoder passwordEncoder) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
    }

    public LoginResponse login(LoginRequest request) {

        Utilisateur user = repository
                .findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new RuntimeException("Email incorrect")
                );

        if (!passwordEncoder.matches(
                request.getPassword(),
                user.getPassword())) {

            throw new RuntimeException("Mot de passe incorrect");
        }

        return new LoginResponse(
                user.getId(),
                user.getNom(),
                user.getEmail(),
                "Connexion réussie"
        );
    }
    public String inscrire(Utilisateur user) {

        if (repository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email déjà utilisé");
        }

        user.setPassword(
                passwordEncoder.encode(user.getPassword())
        );

        repository.save(user);

        return "Utilisateur enregistré avec succès";
    }
}