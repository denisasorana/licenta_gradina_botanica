package com.licenta.gradina.clase;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name="eveniment")
public class Eveniment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idEveniment;

    private String numeEveniment;
    @Column(length = 2000)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
    private LocalDate dataEveniment;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm")
    private LocalTime oraEveniment;

    public Eveniment(String numeEveniment, LocalDate dataEveniment, LocalTime oraEveniment)
    { this.numeEveniment = numeEveniment;
        this.dataEveniment = dataEveniment;
        this.oraEveniment = oraEveniment;
    }

    public Eveniment() {}

    public Long getIdEveniment() {
        return idEveniment;
    }

    public void setIdEveniment(Long idEveniment) {
        this.idEveniment = idEveniment;
    }

    public LocalTime getOraEveniment() {
        return oraEveniment;
    }

    public void setOraEveniment(LocalTime oraEveniment) {
        this.oraEveniment = oraEveniment;
    }

    public String getNumeEveniment() {
        return numeEveniment;
    }

    public void setNumeEveniment(String numeEveniment) {
        this.numeEveniment = numeEveniment;
    }

    public LocalDate getDataEveniment() {
        return dataEveniment;
    }

    public void setDataEveniment(LocalDate dataEveniment) {
        this.dataEveniment = dataEveniment;
    }
}
