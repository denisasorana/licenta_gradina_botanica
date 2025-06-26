package com.licenta.gradina.clase;

import jakarta.persistence.*;

@Entity
public class Recenzie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nume;

    private String mesaj;

    public Recenzie() {}

    public Recenzie(String nume, String mesaj) {
        this.nume = nume;
        this.mesaj = mesaj;
    }


    public Long getId() {
        return id;
    }

    public String getNume() {
        return nume;
    }

    public void setNume(String nume) {
        this.nume = nume;
    }

    public String getMesaj() {
        return mesaj;
    }

    public void setMesaj(String mesaj) {
        this.mesaj = mesaj;
    }
}
