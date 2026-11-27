package isgb.project.login.DTO;

public class LoginResponse {

    private Long id;
    private String nom;
    private String email;
    private String message;

    public LoginResponse(Long id, String nom,
                         String email, String message) {
        this.id = id;
        this.nom = nom;
        this.email = email;
        this.message = message;
    }

    public Long getId() {
        return id;
    }

    public String getNom() {
        return nom;
    }

    public String getEmail() {
        return email;
    }

    public String getMessage() {
        return message;
    }
}