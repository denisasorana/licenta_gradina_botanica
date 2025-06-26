package com.licenta.gradina.Controller;

import com.licenta.gradina.Repository.RecenzieRepository;
import com.licenta.gradina.clase.Recenzie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/Recenzii")
@CrossOrigin
public class RecenzieController {

    private final RecenzieRepository recenzieRepository;

    public RecenzieController(RecenzieRepository recenzieRepository) {
        this.recenzieRepository = recenzieRepository;
    }

    @PostMapping("/adauga")
    public ResponseEntity<String> adaugaRecenzie(@RequestBody Recenzie recenzie) {
        recenzieRepository.save(recenzie);
        return ResponseEntity.ok("Recenzie salvată cu succes.");
    }

    @GetMapping
    public List<Recenzie> toateRecenziile() {
        return recenzieRepository.findAll();
    }
}
