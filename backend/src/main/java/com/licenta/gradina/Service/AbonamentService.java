package com.licenta.gradina.Service;

import com.licenta.gradina.clase.Abonament;
import com.licenta.gradina.clase.User;
import com.licenta.gradina.clase.CreateAbonamentRequest;
import com.licenta.gradina.Repository.AbonamentRepository;
import com.licenta.gradina.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AbonamentService {

    @Autowired
    private AbonamentRepository abonamentRepository;

    @Autowired
    private UserRepository userRepository;

    public Abonament cumparaAbonament(CreateAbonamentRequest request, String emailUser) {
        User user = userRepository.findByEmail(emailUser)
                .orElseThrow(() -> new RuntimeException("Utilizatorul nu a fost găsit"));

        Abonament abonament = new Abonament();
        abonament.setUser(user);
        abonament.setTipAbonament(request.getTipAbonament());
        abonament.setPretAbonament(request.getPretAbonament());
        abonament.setDataCumpararii(request.getDataActivare());


        abonament.setPlatit(true);

        return abonamentRepository.save(abonament);
    }

    public List<Abonament> getAbonamenteUtilizator(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Utilizatorul nu a fost găsit"));
        return abonamentRepository.findAllByUser(user);
    }
}
