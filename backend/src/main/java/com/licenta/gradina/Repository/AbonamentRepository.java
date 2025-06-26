package com.licenta.gradina.Repository;

import com.licenta.gradina.clase.Abonament;
import com.licenta.gradina.clase.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AbonamentRepository extends JpaRepository<Abonament, Long> {
    List<Abonament> findAllByUser(User user);
}
