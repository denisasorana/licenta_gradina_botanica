package com.licenta.gradina.Controller;

import com.licenta.gradina.clase.Abonament;
import com.licenta.gradina.clase.AbonamentDTO;
import com.licenta.gradina.Service.AbonamentService;
import com.licenta.gradina.Security.UserDetailsImpl;
import com.licenta.gradina.clase.CreateAbonamentRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/abonamente")
public class AbonamentController {

    @Autowired
    private AbonamentService abonamentService;

    @PostMapping("/cumpara")
    public ResponseEntity<?> cumparaAbonament(@RequestBody CreateAbonamentRequest request,
                                              @AuthenticationPrincipal UserDetailsImpl userDetails) {
        Abonament abonament = abonamentService.cumparaAbonament(request, userDetails.getUsername());

        AbonamentDTO dto = new AbonamentDTO(
                abonament.getId(),
                abonament.getTipAbonament(),
                abonament.getPretAbonament(),
                abonament.getDataCumpararii(),
                abonament.isPlatit()
        );

        return ResponseEntity.ok(dto);
    }

    @GetMapping("/abonamentele-mele")
    public ResponseEntity<?> getAbonamente(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        List<Abonament> abonamente = abonamentService.getAbonamenteUtilizator(userDetails.getUsername());

        List<AbonamentDTO> dtos = abonamente.stream().map(ab -> new AbonamentDTO(
                ab.getId(),
                ab.getTipAbonament(),
                ab.getPretAbonament(),
                ab.getDataCumpararii(),
                ab.isPlatit()
        )).collect(Collectors.toList());

        return ResponseEntity.ok(dtos);
    }
}
