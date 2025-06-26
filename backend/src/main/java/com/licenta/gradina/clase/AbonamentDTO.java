package com.licenta.gradina.clase;

import java.time.LocalDate;

public class AbonamentDTO {
    private Long id;
    private String tipAbonament;
    private double pretAbonament;
    private LocalDate dataCumpararii;
    private boolean platit;

    public AbonamentDTO() {
    }

    public AbonamentDTO(Long id, String tipAbonament, double pretAbonament, LocalDate dataCumpararii, boolean platit) {
        this.id = id;
        this.tipAbonament = tipAbonament;
        this.pretAbonament = pretAbonament;
        this.dataCumpararii = dataCumpararii;
        this.platit = platit;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTipAbonament() {
        return tipAbonament;
    }

    public void setTipAbonament(String tipAbonament) {
        this.tipAbonament = tipAbonament;
    }

    public double getPretAbonament() {
        return pretAbonament;
    }

    public void setPretAbonament(double pretAbonament) {
        this.pretAbonament = pretAbonament;
    }

    public LocalDate getDataCumpararii() {
        return dataCumpararii;
    }

    public void setDataCumpararii(LocalDate dataCumpararii) {
        this.dataCumpararii = dataCumpararii;
    }

    public boolean isPlatit() {
        return platit;
    }

    public void setPlatit(boolean platit) {
        this.platit = platit;
    }
}
