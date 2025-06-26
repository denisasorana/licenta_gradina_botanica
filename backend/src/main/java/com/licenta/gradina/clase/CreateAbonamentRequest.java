package com.licenta.gradina.clase;

import java.time.LocalDate;
import java.util.Date;

public class CreateAbonamentRequest {
    private String tipAbonament;
    private int pretAbonament;
    private LocalDate dataActivare;

    public String getTipAbonament() {
        return tipAbonament;
    }

    public void setTipAbonament(String tipAbonament) {
        this.tipAbonament = tipAbonament;
    }

    public int getPretAbonament() {
        return pretAbonament;
    }

    public void setPretAbonament(int pretAbonament) {
        this.pretAbonament = pretAbonament;
    }

    public LocalDate getDataActivare() {
        return dataActivare;
    }

    public void setDataActivare(LocalDate dataActivare) {
        this.dataActivare = dataActivare;
    }
}
