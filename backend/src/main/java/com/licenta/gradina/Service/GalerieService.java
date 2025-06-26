package com.licenta.gradina.Service;

import com.licenta.gradina.Repository.GalerieRepository;
import com.licenta.gradina.clase.Galerie;
import com.licenta.gradina.clase.GalerieDTO;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GalerieService {

    private final GalerieRepository galerieRepository;

    public GalerieService(GalerieRepository galerieRepository) {
        this.galerieRepository = galerieRepository;
    }

    public List<Galerie> getAllImages() {
        return galerieRepository.findAll();
    }

    public Galerie saveImage(Galerie galerie) {
        return galerieRepository.save(galerie);
    }


    public Galerie saveImageFromDTO(GalerieDTO dto) {
        Galerie galerie = new Galerie(dto.getImagine(), dto.getMimeType());
        return galerieRepository.save(galerie);
    }

    public void deleteImage(Long id) {
        galerieRepository.deleteById(id);
    }

    public Optional<Galerie> getImageById(Long id) {
        return galerieRepository.findById(id);
    }
}
