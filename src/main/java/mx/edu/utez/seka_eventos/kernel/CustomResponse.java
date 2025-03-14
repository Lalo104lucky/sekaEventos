package mx.edu.utez.seka_eventos.kernel;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class CustomResponse {

    private Map<String, Object> body;

    public ResponseEntity<?> getOkResponse(Object data) {
        body = new HashMap<>();
        body.put("message", "Operación exitosa");
        body.put("status", "OK");
        if (data != null) {
            body.put("data", data);
        }

        return new ResponseEntity<>(body, HttpStatus.OK);
    }

    public ResponseEntity<?> getCreatedResponse(Object message) {
        body = new HashMap<>();
        body.put("message", message);
        body.put("status", "CREATED");

        return new ResponseEntity<>(body, HttpStatus.CREATED);
    }

    public ResponseEntity<?> get400Response(int code) {
        body = new HashMap<>();
        body.put("message", code == 400 ? "No se pudo realizar la operación" : "No se encontró el recurso solicitado");
        body.put("status", code == 400 ? "BAD REQUEST" : "NOT FOUND");

        return new ResponseEntity<>(body, code == 400 ? HttpStatus.BAD_REQUEST : HttpStatus.NOT_FOUND);
    }
}
