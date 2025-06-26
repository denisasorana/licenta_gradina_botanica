package com.licenta.gradina.Repository;

import com.licenta.gradina.clase.Eveniment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EvenimentRepository extends JpaRepository<Eveniment, Long> {
}
