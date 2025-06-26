package com.licenta.gradina.Controller;

import com.licenta.gradina.Security.UserDetailsImpl;
import com.licenta.gradina.clase.BiletDTO;
import com.licenta.gradina.clase.CreateBiletRequest;
import com.licenta.gradina.Service.BiletService;
import com.licenta.gradina.clase.Bilet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/bilete")
public class BiletController {

    @Autowired
    private BiletService biletService;

    @PostMapping("/cumpara-bilete")
    public ResponseEntity<?> cumparaBilet(@RequestBody CreateBiletRequest request,
                                          @AuthenticationPrincipal UserDetailsImpl userDetails) {
        Bilet bilet = biletService.cumparaBilet(request, userDetails.getUsername());

        BiletDTO biletDTO = new BiletDTO(
                bilet.getId(),
                bilet.getNrBileteAdulti(),
                bilet.getNrBileteStudenti(),
                bilet.getNrBiletePensionari(),
                bilet.getNrBileteCopii(),
                bilet.getPretTotal(),
                bilet.getDataCumpararii(),
                bilet.isPlatit()
        );

        return ResponseEntity.ok(biletDTO);
    }

    @GetMapping("/biletele-mele")
    public ResponseEntity<?> getBileteleMele(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        List<Bilet> bilete = biletService.getBileteleUtilizatorului(userDetails.getUsername());

        List<BiletDTO> bileteDTO = bilete.stream()
                .map(b -> new BiletDTO(
                        b.getId(),
                        b.getNrBileteAdulti(),
                        b.getNrBileteStudenti(),
                        b.getNrBiletePensionari(),
                        b.getNrBileteCopii(),
                        b.getPretTotal(),
                        b.getDataCumpararii(),
                        b.isPlatit()
                ))
                .collect(Collectors.toList());

        return ResponseEntity.ok(bileteDTO);
    }
}
