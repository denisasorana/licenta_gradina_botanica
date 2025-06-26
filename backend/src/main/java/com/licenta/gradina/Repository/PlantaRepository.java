package com.licenta.gradina.Repository;

import com.licenta.gradina.clase.Planta;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PlantaRepository extends JpaRepository<Planta, Long> {
    List<Planta> findPlantasByCategoriePlantaContainsIgnoreCase(String categoria);

    Optional<Planta> findPlantaById(Long id);
}
