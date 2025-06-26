package com.licenta.gradina.clase;

import java.time.LocalDate;

public class BiletDTO {
    private Long id;
    private int nrBileteAdulti;
    private int nrBileteStudenti;
    private int nrBiletePensionari;
    private int nrBileteCopii;
    private double pretTotal;
    private LocalDate dataCumpararii;
    private boolean platit;

    public BiletDTO() {
    }

    public BiletDTO(Long id, int nrBileteAdulti, int nrBileteStudenti, int nrBiletePensionari,
                    int nrBileteCopii, double pretTotal, LocalDate dataCumpararii, boolean platit) {
        this.id = id;
        this.nrBileteAdulti = nrBileteAdulti;
        this.nrBileteStudenti = nrBileteStudenti;
        this.nrBiletePensionari = nrBiletePensionari;
        this.nrBileteCopii = nrBileteCopii;
        this.pretTotal = pretTotal;
        this.dataCumpararii = dataCumpararii;
        this.platit = platit;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getNrBileteAdulti() {
        return nrBileteAdulti;
    }

    public void setNrBileteAdulti(int nrBileteAdulti) {
        this.nrBileteAdulti = nrBileteAdulti;
    }

    public int getNrBileteStudenti() {
        return nrBileteStudenti;
    }

    public void setNrBileteStudenti(int nrBileteStudenti) {
        this.nrBileteStudenti = nrBileteStudenti;
    }

    public int getNrBiletePensionari() {
        return nrBiletePensionari;
    }

    public void setNrBiletePensionari(int nrBiletePensionari) {
        this.nrBiletePensionari = nrBiletePensionari;
    }

    public int getNrBileteCopii() {
        return nrBileteCopii;
    }

    public void setNrBileteCopii(int nrBileteCopii) {
        this.nrBileteCopii = nrBileteCopii;
    }

    public double getPretTotal() {
        return pretTotal;
    }

    public void setPretTotal(double pretTotal) {
        this.pretTotal = pretTotal;
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
