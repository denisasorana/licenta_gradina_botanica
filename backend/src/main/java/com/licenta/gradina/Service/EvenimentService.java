package com.licenta.gradina.Service;

import com.licenta.gradina.clase.Eveniment;
import com.licenta.gradina.Repository.EvenimentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EvenimentService {

    @Autowired
    private EvenimentRepository evenimentRepository;

    public List<Eveniment> getAllEvenimente() {
        return evenimentRepository.findAll();
    }

    public Optional<Eveniment> getEvenimentById(Long id) {
        return evenimentRepository.findById(id);
    }

    public Eveniment saveEveniment(Eveniment eveniment) {
        return evenimentRepository.save(eveniment);
    }

    public void deleteEveniment(Long id) {
        evenimentRepository.deleteById(id);
    }

    public Eveniment updateEveniment(Long id, Eveniment updatedEveniment) {
        return evenimentRepository.findById(id)
                .map(e -> {
                    e.setNumeEveniment(updatedEveniment.getNumeEveniment());
                    e.setDataEveniment(updatedEveniment.getDataEveniment());
                    e.setOraEveniment(updatedEveniment.getOraEveniment());
                    return evenimentRepository.save(e);
                })
                .orElse(null);
    }
}
