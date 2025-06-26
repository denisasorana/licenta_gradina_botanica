package com.licenta.gradina.Service;

import com.licenta.gradina.clase.CreateBiletRequest;
import com.licenta.gradina.Repository.BiletRepository;
import com.licenta.gradina.clase.Bilet;
import com.licenta.gradina.clase.User;
import com.licenta.gradina.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BiletService {

    @Autowired
    private BiletRepository biletRepository;

    @Autowired
    private UserRepository userRepository;

    public Bilet cumparaBilet(CreateBiletRequest request, String emailUser) {
        User user = userRepository.findByEmail(emailUser)
                .orElseThrow(() -> new RuntimeException("Utilizatorul nu a fost găsit"));

        int totalBilete = request.getNrBileteAdulti() + request.getNrBileteStudenti()
                + request.getNrBiletePensionari() + request.getNrBileteCopii();

        double pretBilet = (totalBilete > 10) ? 10 : 15;
        double total = totalBilete * pretBilet;

        Bilet bilet = new Bilet();
        bilet.setUser(user);
        bilet.setNrBileteAdulti(request.getNrBileteAdulti());
        bilet.setNrBileteStudenti(request.getNrBileteStudenti());
        bilet.setNrBiletePensionari(request.getNrBiletePensionari());
        bilet.setNrBileteCopii(request.getNrBileteCopii());
        bilet.setPretTotal(total);
        bilet.setDataCumpararii(request.getDataRezervare());
        bilet.setPlatit(true);

        return biletRepository.save(bilet);
    }

    public List<Bilet> getBileteleUtilizatorului(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return biletRepository.findAllByUser(user);
    }
}
