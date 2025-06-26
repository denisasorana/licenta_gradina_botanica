package com.licenta.gradina.Controller;

import com.licenta.gradina.clase.Planta;
import com.licenta.gradina.Repository.PlantaRepository;
import com.licenta.gradina.Service.PlantaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/plante")
@CrossOrigin
public class PlantaController {

    @Autowired
    private PlantaService plantaService;

    @Autowired
    private PlantaRepository plantaRepository;


    @GetMapping("/all")
    public ResponseEntity<List<Planta>> getAllPlante() {
        List<Planta> plante = plantaService.getAll();
        return new ResponseEntity<>(plante, HttpStatus.OK);
    }


    @GetMapping("/{type}")
    public ResponseEntity<List<Planta>> getPlantasByType(@PathVariable String type) {
        List<Planta> plantas = plantaService.getPlants(type);
        return new ResponseEntity<>(plantas, HttpStatus.OK);
    }


    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deletePlanta(@PathVariable Long id) {
        Optional<Planta> plantaOptional = plantaRepository.findPlantaById(id);
        if (plantaOptional.isPresent()) {
            plantaService.deletePlanta(plantaOptional.get());
            return new ResponseEntity<>("Planta " + id + " deleted", HttpStatus.OK);
        }
        return new ResponseEntity<>("Planta " + id + " not found", HttpStatus.NOT_FOUND);
    }

    @PostMapping
    public ResponseEntity<Planta> adaugaPlanta(@RequestBody Planta planta) {
        Planta salvata = plantaService.adaugaPlanta(planta);
        return new ResponseEntity<>(salvata, HttpStatus.CREATED);
    }



    @PostMapping("/upload")
    public ResponseEntity<Planta> adaugaPlantaCuImagine(
            @RequestParam("numePlanta") String nume,
            @RequestParam("descrierePlanta") String descriere,
            @RequestParam("categoriePlanta") String categorie,
            @RequestParam("imagine") MultipartFile imagine) {

        try {

            String base64Image = java.util.Base64.getEncoder().encodeToString(imagine.getBytes());

            Planta planta = new Planta();
            planta.setNumePlanta(nume);
            planta.setDescrierePlanta(descriere);
            planta.setCategoriePlanta(categorie);
            planta.setImaginePlanta(base64Image);

            return new ResponseEntity<>(plantaService.adaugaPlanta(planta), HttpStatus.CREATED);
        } catch (IOException e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Planta> actualizeazaPlanta(
            @PathVariable Long id,
            @RequestBody Planta plantaNoua) {
        Optional<Planta> plantaExistenta = plantaRepository.findPlantaById(id);
        if (plantaExistenta.isPresent()) {
            Planta p = plantaExistenta.get();
            p.setNumePlanta(plantaNoua.getNumePlanta());
            p.setDescrierePlanta(plantaNoua.getDescrierePlanta());
            p.setCategoriePlanta(plantaNoua.getCategoriePlanta());
            p.setImaginePlanta(plantaNoua.getImaginePlanta());

            return new ResponseEntity<>(plantaService.adaugaPlanta(p), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }




}
