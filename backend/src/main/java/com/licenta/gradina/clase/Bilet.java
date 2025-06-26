package com.licenta.gradina.clase;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "bilete")
public class Bilet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id")
    private User user;

    private int nrBileteAdulti;
    private int nrBileteStudenti;
    private int nrBiletePensionari;
    private int nrBileteCopii;
    private double pretTotal;
    private LocalDate dataCumpararii;

    @Column(nullable = false)
    private boolean platit = true;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public int getNrBileteAdulti() { return nrBileteAdulti; }
    public void setNrBileteAdulti(int nrBileteAdulti) { this.nrBileteAdulti = nrBileteAdulti; }

    public int getNrBileteStudenti() { return nrBileteStudenti; }
    public void setNrBileteStudenti(int nrBileteStudenti) { this.nrBileteStudenti = nrBileteStudenti; }

    public int getNrBiletePensionari() { return nrBiletePensionari; }
    public void setNrBiletePensionari(int nrBiletePensionari) { this.nrBiletePensionari = nrBiletePensionari; }

    public int getNrBileteCopii() { return nrBileteCopii; }
    public void setNrBileteCopii(int nrBileteCopii) { this.nrBileteCopii = nrBileteCopii; }

    public double getPretTotal() { return pretTotal; }
    public void setPretTotal(double pretTotal) { this.pretTotal = pretTotal; }

    public LocalDate getDataCumpararii() { return dataCumpararii; }
    public void setDataCumpararii(LocalDate dataCumpararii) { this.dataCumpararii = dataCumpararii; }

    public boolean isPlatit() { return platit; }
    public void setPlatit(boolean platit) { this.platit = platit; }
}
