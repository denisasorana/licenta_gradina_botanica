package com.licenta.gradina.clase;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

@Entity
@Table(name = "utilizatori")

public class User  {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nume;
    private String prenume;
    private String email;
    private String password;

    @Enumerated(EnumType.STRING)
    private Rol rol;

    public User(String nume, String prenume, String email, String password, Rol rol) {
        this.nume = nume;
        this.prenume = prenume;
        this.email = email;
        this.password = password;
        this.rol = rol;
    }

    public User() {}

    public Long getId() {
        return id;
    }
    @JsonProperty("nume")
    public String getNume() {
        return nume;
    }
    public String getPrenume() {
        return prenume;
    }
    public String getEmail() {
        return email;
    }
    public String getPassword() {
        return password;
    }

    public void setNume(String nume) {
        this.nume = nume;
    }
    public void setPrenume(String prenume) {
        this.prenume = prenume;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public void setPassword(String password) {
        this.password = password;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Rol getRol() {
        return rol;
    }

    public void setRol(Rol rol) {
        this.rol = rol;
    }
}