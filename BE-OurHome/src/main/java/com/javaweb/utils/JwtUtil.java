package com.javaweb.utils;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
public class JwtUtil {

    // Dùng chuỗi >= 32 ký tự hoặc dùng secretKeyFromString()
    private static final String SECRET_STRING = "thisIsASecretKeyWithAtLeast32Chars!1234";

    // Tạo key từ chuỗi
    private static final SecretKey SECRET_KEY = Keys.hmacShaKeyFor(SECRET_STRING.getBytes(StandardCharsets.UTF_8));

    public static String generateToken(String email, String role) {
        return Jwts.builder()
                .setSubject(email)
                .claim("role", role) // ✅ Thêm claim role vào token
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 86400000)) // 1 ngày
                .signWith(SECRET_KEY, SignatureAlgorithm.HS256)
                .compact();
    }


    public static String extractEmail(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(SECRET_KEY)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public static boolean isTokenExpired(String token) {
        Date expiration = Jwts.parserBuilder()
                .setSigningKey(SECRET_KEY)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getExpiration();
        return expiration.before(new Date());
    }
}