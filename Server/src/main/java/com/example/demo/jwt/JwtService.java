package com.example.demo.jwt;

import ch.qos.logback.classic.Logger;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.example.demo.entity.User;
import com.example.demo.security.SecretKey;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Date;
@Service
@Slf4j
public class JwtService {

    private final String secretKey = SecretKey.getSecret_key();

    public String generateToken(User user){
        Algorithm algorithm = Algorithm.HMAC256(secretKey.getBytes());
        return JWT.create()
                .withSubject(user.getId().toString())
                .withExpiresAt(new Date(System.currentTimeMillis() + 100*60*1000))
                .withClaim("username", user.getUsername())
                .withClaim("role", user.getRole())
                .withClaim("fullName",user.getFullName())
                .withClaim("phoneNumber",user.getPhoneNumber())
                .withClaim("mail",user.getMail())
                .withClaim("avatar",user.getAvatar())

                .sign(algorithm);
    }

//    public String refreshToken(Customer user) {
//        Algorithm algorithm = Algorithm.HMAC256(secretKey.getBytes());
//        return JWT.create()
//                .withSubject(user.getUsername())
//                .withExpiresAt(new Date(System.currentTimeMillis() + 100 * 60 * 1000))
//                .withClaim("password", user.getPassword())
//                .withClaim("role", user.getRole())
//                .sign(algorithm);
//    }

//    public boolean validateToken(String authToken) {
//        try {
//            Jwts.parser().setSigningKey(secretKey).parseClaimsJws(authToken);
//            return true;
//        } catch (MalformedJwtException ex) {
//            log.error("Invalid JWT token");
//        } catch (ExpiredJwtException ex) {
//            log.error("Expired JWT token");
//        } catch (UnsupportedJwtException ex) {
//            log.error("Unsupported JWT token");
//        } catch (IllegalArgumentException ex) {
//            log.error("JWT claims string is empty.");
//        }
//        return false;
//    }
}
