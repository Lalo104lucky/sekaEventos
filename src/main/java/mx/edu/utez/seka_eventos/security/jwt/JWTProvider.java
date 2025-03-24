package mx.edu.utez.seka_eventos.security.jwt;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;

@Service
public class JWTProvider {

    @Value("Lq32wI1Xv5ZGrTYpLIODlnXXWYCNT1HcGJ9Z9em1z4k")
    private String secret;
    @Value("604800")
    private int expiration;
    private final String TOKEN_HEADER = "Authorization";
    private final String TOKEN_TYPE = "Bearer ";

    private Key getSignKey(){
        byte[] keyBytes = Decoders.BASE64.decode(secret);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String generateToken(Authentication auth){
        UserDetails usuario = (UserDetails) auth.getPrincipal();
        Claims claims = Jwts.claims().setSubject(usuario.getUsername());
        Date tokenCreateTime = new Date();
        Date tokenValidity = new Date(
                tokenCreateTime.getTime() + expiration * 1000
        );
        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(new Date())
                .setExpiration(tokenValidity)
                .signWith(getSignKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    private Claims parseJwtClaims(String token){
        return Jwts.parserBuilder()
                .setSigningKey(getSignKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public String resolveToken(HttpServletRequest req){
        String bearerToken = req.getHeader(TOKEN_HEADER);
        if(bearerToken != null && bearerToken.startsWith(TOKEN_TYPE)){
            return bearerToken.replace(TOKEN_TYPE, "");
        }
        //bearerToken.substring(TOKEN_TYPE.length());
        return null;
    }

    public Claims resolveClaims(HttpServletRequest req){
        try{
            String token = resolveToken(req);
            if(token != null){
                return parseJwtClaims(token);
            }
            return null;
        } catch (ExpiredJwtException e){
            throw  e;
        } catch (Exception e){
            throw e;
        }
    }

    public boolean validateClaims(Claims claims, String token){
        try {
            parseJwtClaims(token);
            return claims.getExpiration().after(new Date());
        } catch (MalformedJwtException | UnsupportedJwtException | ExpiredJwtException e){
            e.printStackTrace();
        } catch (Exception e){
            e.printStackTrace();
        }
        return false;
    }
}
