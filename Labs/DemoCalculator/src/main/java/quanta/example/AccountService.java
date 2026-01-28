package quanta.example;

import java.util.regex.Pattern;

public class AccountService {

    private static final Pattern EMAIL_PATTERN =
            Pattern.compile("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$");

    public boolean isValidEmail(String email) {
        if (email == null) return false;
        return EMAIL_PATTERN.matcher(email.trim()).matches();
    }

    public boolean registerAccount(String username, String password, String email) {
        if (username == null || username.trim().isEmpty()) return false;
        if (password == null || password.length() <= 6) return false; // Password > 6 ký tự
        return isValidEmail(email);
    }
}
