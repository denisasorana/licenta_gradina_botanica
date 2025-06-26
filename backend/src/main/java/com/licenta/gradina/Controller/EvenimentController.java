package com.licenta.gradina.Controller;

import com.licenta.gradina.clase.Eveniment;
import com.licenta.gradina.Service.EvenimentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/servicii/calendar")
@CrossOrigin
public class EvenimentController {

    @Autowired
    private EvenimentService evenimentService;

    @GetMapping
    public List<Eveniment> getAllEvenimente() {
        return evenimentService.getAllEvenimente();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Eveniment> getEvenimentById(@PathVariable Long id) {
        return evenimentService.getEvenimentById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Eveniment createEveniment(@RequestBody Eveniment eveniment) {
        return evenimentService.saveEveniment(eveniment);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Eveniment> updateEveniment(@PathVariable Long id, @RequestBody Eveniment updated) {
        Eveniment result = evenimentService.updateEveniment(id, updated);
        if (result == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(result);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEveniment(@PathVariable Long id) {
        evenimentService.deleteEveniment(id);
        return ResponseEntity.noContent().build();
    }
}
