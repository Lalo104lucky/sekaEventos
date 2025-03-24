package mx.edu.utez.seka_eventos.services;

import mx.edu.utez.seka_eventos.kernel.CustomResponse;
import mx.edu.utez.seka_eventos.models.dao.TipoEventoRepository;
import mx.edu.utez.seka_eventos.models.dto.TipoEventoDTO;
import mx.edu.utez.seka_eventos.models.entity.TIpoEvento;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

@Service
public class TipoEventoService {

    private final TipoEventoRepository repository;
    private final CustomResponse customResponse;

    public TipoEventoService(TipoEventoRepository repository, CustomResponse customResponse) {
        this.repository = repository;
        this.customResponse = customResponse;
    }

    @Transactional(readOnly = true)
    public ResponseEntity<?> findAll() {
        List<TIpoEvento> tipoEventos = repository.findAll();
        return customResponse.getOkResponse(tipoEventos);
    }

    @Transactional(readOnly = true)
    public ResponseEntity<?> findById(Long id) {
        Optional<TIpoEvento> foundTipoEvento = repository.findById(id);
        if (foundTipoEvento.isEmpty()) {
            return customResponse.get400Response(404);
        }
        return customResponse.getOkResponse(foundTipoEvento.get());
    }

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<?> register(TipoEventoDTO tipoEventoDTO) {
        TIpoEvento tipoEvento = new TIpoEvento();
        tipoEvento.setNombre(tipoEventoDTO.getNombre());
        return customResponse.getCreatedResponse(repository.save(tipoEvento));
    }

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<?> update(TipoEventoDTO tipoEventoDTO) {
        Optional<TIpoEvento> foundTipoEvento = repository.findById(tipoEventoDTO.getId_tipoevento());
        if (foundTipoEvento.isEmpty()) {
            return customResponse.get400Response(404);
        }
        TIpoEvento tipoEvento = foundTipoEvento.get();
        tipoEvento.setNombre(tipoEventoDTO.getNombre());
        return customResponse.getOkResponse(repository.save(tipoEvento));
    }

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<?> delete(Long id) {
        Optional<TIpoEvento> foundTipoEvento = repository.findById(id);
        if (foundTipoEvento.isEmpty()) {
            return customResponse.get400Response(404);
        }
        repository.deleteById(id);
        return customResponse.getOkResponse("Tipo de evento eliminado");
    }

}
