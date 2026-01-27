import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvFileSource;
import quanta.example.Account;
import quanta.example.AccountService;

import static org.junit.jupiter.api.Assertions.*;

class AccountServiceTest {

    private final AccountService service = new AccountService();

    // 1) Test riêng cho email
    @Test
    @DisplayName("isValidEmail - valid email returns true")
    void testIsValidEmailValid() {
        assertTrue(service.isValidEmail("john@example.com"));
    }

    @Test
    @DisplayName("isValidEmail - invalid email returns false")
    void testIsValidEmailInvalid() {
        assertFalse(service.isValidEmail("bobmail.com"));
        assertFalse(service.isValidEmail(""));
        assertFalse(service.isValidEmail(null));
    }

    // 2) Test riêng cho username
    @Test
    @DisplayName("isValidUsername - username must be at least 3 characters")
    void testIsValidUsername() {
        assertTrue(service.isValidUsername("abc"));
        assertFalse(service.isValidUsername("ab"));
        assertFalse(service.isValidUsername(""));
        assertFalse(service.isValidUsername(null));
    }

    // 3) Test riêng cho password rule
    @Test
    @DisplayName("isValidPassword - >6 chars and includes upper/lower/special")
    void testIsValidPassword() {
        assertTrue(service.isValidPassword("Pass@123"));
        assertFalse(service.isValidPassword("password"));   // thiếu hoa + đặc biệt
        assertFalse(service.isValidPassword("PASSWORD@"));  // thiếu thường
        assertFalse(service.isValidPassword("Pass1234"));   // thiếu đặc biệt
        assertFalse(service.isValidPassword("Pa@1"));       // quá ngắn
        assertFalse(service.isValidPassword(null));
    }

    // 4) Test đăng ký dựa trên file CSV (yêu cầu đề)
    @ParameterizedTest(name = "Register[{index}] username={0}, expected={3}")
    @CsvFileSource(resources = "/test-data.csv", numLinesToSkip = 1)
    @DisplayName("registerAccount - data driven from CSV")
    void testRegisterAccountFromCsv(String username, String password, String email, boolean expected) {
        boolean actual = service.registerAccount(username, password, email);
        assertEquals(expected, actual);
    }

    // 5) Test đúng theo đề: registerAccount(Account)
    @Test
    @DisplayName("registerAccount(Account) - returns true for valid account")
    void testRegisterAccountWithAccountObject() {
        Account acc = new Account("john123", "Pass@123", "john@example.com");
        assertTrue(service.registerAccount(acc));
    }
}
