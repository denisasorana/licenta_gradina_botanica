package com.licenta.gradina.Repository;

import com.licenta.gradina.clase.Bilet;
import com.licenta.gradina.clase.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface BiletRepository extends JpaRepository<Bilet, Long> {
    List<Bilet> findAllByUser(User user);
}