package quanta.example;

import java.util.regex.Pattern;

public class AccountService {

    private static final Pattern EMAIL_PATTERN =
            Pattern.compile("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$");

    // > 6 ký tự (>=7), có 1 hoa, 1 thường, 1 đặc biệt
    private static final Pattern PASSWORD_PATTERN =
            Pattern.compile("^(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z0-9]).{7,}$");

    public boolean isValidEmail(String email) {
        if (email == null) return false;
        String e = email.trim();
        if (e.isEmpty()) return false;
        return EMAIL_PATTERN.matcher(e).matches();
    }

    public boolean isValidUsername(String username) {
        if (username == null) return false;
        return username.trim().length() >= 3;
    }

    public boolean isValidPassword(String password) {
        if (password == null) return false;
        return PASSWORD_PATTERN.matcher(password).matches();
    }

    // Theo đề: boolean registerAccount()
    // => mình làm đúng theo Account object
    public boolean registerAccount(Account account) {
        if (account == null) return false;
        return isValidUsername(account.getUsername())
                && isValidPassword(account.getPassword())
                && isValidEmail(account.getEmail());
    }

    // Thêm overload để test CSV tiện hơn
    public boolean registerAccount(String username, String password, String email) {
        return isValidUsername(username) && isValidPassword(password) && isValidEmail(email);
    }
}
