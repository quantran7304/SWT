import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvFileSource;
import quanta.example.AccountService;

import static org.junit.jupiter.api.Assertions.*;

class AccountServiceTest {

    private final AccountService service = new AccountService();

    @Test
    @DisplayName("isValidEmail returns true for valid email")
    void testIsValidEmailValid() {
        assertTrue(service.isValidEmail("john@example.com"));
    }

    @Test
    @DisplayName("isValidEmail returns false for invalid email")
    void testIsValidEmailInvalid() {
        assertFalse(service.isValidEmail("bobmail.com"));
    }

    @ParameterizedTest(name = "Register[{index}] username={0}, expected={3}")
    @CsvFileSource(resources = "/test-data.csv", numLinesToSkip = 1)
    @DisplayName("registerAccount - data driven from CSV")
    void testRegisterAccountFromCsv(String username, String password, String email, boolean expected) {
        assertEquals(expected, service.registerAccount(username, password, email));
    }
}
