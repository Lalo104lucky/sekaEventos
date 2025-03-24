package mx.edu.utez.seka_eventos.models.dto;

import mx.edu.utez.seka_eventos.models.entity.Usuario;

public class LoginIntoDTO {

    String token, tokenType;
    Usuario usuario;

    public LoginIntoDTO(String token, String tokenType, Usuario usuario) {
        this.token = token;
        this.tokenType = tokenType;
        this.usuario = usuario;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getTokenType() {
        return tokenType;
    }

    public void setTokenType(String tokenType) {
        this.tokenType = tokenType;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }
}
