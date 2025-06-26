package com.licenta.gradina.clase;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "abonamente")
public class Abonament {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id")
    private User user;

    private String tipAbonament;
    private int pretAbonament;
    private LocalDate dataCumpararii;

    @Column(nullable = false)
    private boolean platit = false;

    public Abonament() {}

    public Abonament(User user, String tipAbonament, int pretAbonament, LocalDate dataCumpararii) {
        this.user = user;
        this.tipAbonament = tipAbonament;
        this.pretAbonament = pretAbonament;
        this.dataCumpararii = dataCumpararii;
        this.platit = true;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

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
