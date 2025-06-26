package com.licenta.gradina.Controller;

import com.licenta.gradina.Service.GalerieService;
import com.licenta.gradina.clase.Galerie;
import com.licenta.gradina.clase.GalerieDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/galerie")
@CrossOrigin
public class GalerieController {

    private final GalerieService galerieService;

    public GalerieController(GalerieService galerieService) {
        this.galerieService = galerieService;
    }

    @GetMapping
    public List<Galerie> getAllImages() {
        return galerieService.getAllImages();
    }

    @PostMapping
    public Galerie addImage(@RequestBody GalerieDTO dto) {
        return galerieService.saveImageFromDTO(dto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteImage(@PathVariable Long id) {
        galerieService.deleteImage(id);
        return ResponseEntity.noContent().build();
    }
}
