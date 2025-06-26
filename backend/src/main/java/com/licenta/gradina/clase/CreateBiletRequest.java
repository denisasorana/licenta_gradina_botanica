package com.licenta.gradina.clase;

import java.time.LocalDate;

public class CreateBiletRequest {
    private int nrBileteAdulti;
    private int nrBileteStudenti;
    private int nrBiletePensionari;
    private int nrBileteCopii;
    private LocalDate dataRezervare;


    public int getNrBileteAdulti() { return nrBileteAdulti; }
    public void setNrBileteAdulti(int nrBileteAdulti) { this.nrBileteAdulti = nrBileteAdulti; }

    public int getNrBileteStudenti() { return nrBileteStudenti; }
    public void setNrBileteStudenti(int nrBileteStudenti) { this.nrBileteStudenti = nrBileteStudenti; }

    public int getNrBiletePensionari() { return nrBiletePensionari; }
    public void setNrBiletePensionari(int nrBiletePensionari) { this.nrBiletePensionari = nrBiletePensionari; }

    public int getNrBileteCopii() { return nrBileteCopii; }
    public void setNrBileteCopii(int nrBileteCopii) { this.nrBileteCopii = nrBileteCopii; }

    public LocalDate getDataRezervare() {
        return dataRezervare;
    }

    public void setDataRezervare(LocalDate dataRezervare) {
        this.dataRezervare = dataRezervare;
    }
}