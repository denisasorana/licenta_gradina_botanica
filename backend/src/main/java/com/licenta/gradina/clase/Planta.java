package com.licenta.gradina.clase;

import jakarta.persistence.*;

@Entity
@Table(name="plante")
public class Planta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idPlante;

    private String numePlanta;
    @Column(length = 2000)
    private String descrierePlanta;
    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String imaginePlanta;
    private String categoriePlanta;

    public Planta(String numePlanta, String descrierePlanta, String imaginePlanta, String categoriePlanta) {
        this.numePlanta = numePlanta;
        this.descrierePlanta = descrierePlanta;
        this.imaginePlanta = imaginePlanta;
        this.categoriePlanta = categoriePlanta;
    }

    public Planta() {}

    public Long getId() {
        return idPlante         ;
    }

    public void setId(Long id) {
        this.idPlante = id;
    }

    public String getNumePlanta() {
        return numePlanta;
    }

    public void setNumePlanta(String numePlanta) {
        this.numePlanta = numePlanta;
    }

    public String getDescrierePlanta() {
        return descrierePlanta;
    }

    public void setDescrierePlanta(String descrierePlanta) {
        this.descrierePlanta = descrierePlanta;
    }

    public String getImaginePlanta() {
        return imaginePlanta;
    }

    public void setImaginePlanta(String imaginePlanta) {
        this.imaginePlanta = imaginePlanta;
    }

    public String getCategoriePlanta() {
        return categoriePlanta;
    }

    public void setCategoriePlanta(String categoriePlanta) {
        this.categoriePlanta = categoriePlanta;
    }
}
