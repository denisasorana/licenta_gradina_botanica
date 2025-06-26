package com.licenta.gradina.Repository;

import com.licenta.gradina.clase.Galerie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GalerieRepository extends JpaRepository<Galerie, Long> {
}
