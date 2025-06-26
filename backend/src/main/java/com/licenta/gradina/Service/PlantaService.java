package com.licenta.gradina.Service;

import com.licenta.gradina.clase.Planta;
import com.licenta.gradina.Repository.PlantaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlantaService {

    @Autowired
    private PlantaRepository plantaRepository;


    public List<Planta> getPlants(String categoria) {
        return plantaRepository.findPlantasByCategoriePlantaContainsIgnoreCase(categoria);
    }


    public List<Planta> getAll() {
        return plantaRepository.findAll();
    }

    public void deletePlanta(Planta planta)
    {
        plantaRepository.delete(planta);
    }

    public Planta adaugaPlanta(Planta planta) {
        return plantaRepository.save(planta);
    }

}
