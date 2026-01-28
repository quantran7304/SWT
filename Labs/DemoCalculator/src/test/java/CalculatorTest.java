import quanta.example.Calculator;
import org.junit.jupiter.api.*; // gom @Test, @BeforeAll, @AfterAll, @BeforeEach, @AfterEach, TestInfo, DisplayName
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvFileSource;

import static org.junit.jupiter.api.Assertions.*;

public class CalculatorTest {

    static Calculator calculator;

    @BeforeAll
    static void initAll() {
        System.out.println("=== @BeforeAll: init calculator ===");
        calculator = new Calculator();
    }

    @AfterAll
    static void cleanupAll() {
        System.out.println("=== @AfterAll: cleanup calculator ===");
        calculator = null;
    }

    @BeforeEach
    void beforeEach(TestInfo info) {
        System.out.println(">>> @BeforeEach: " + info.getDisplayName());
    }

    @AfterEach
    void afterEach(TestInfo info) {
        System.out.println("<<< @AfterEach: " + info.getDisplayName());
    }

    @DisplayName("Test multiply from CSV file")
    @ParameterizedTest(name = "Test {index} => {0} * {1} = {2}")
    @CsvFileSource(resources = "/data.csv", numLinesToSkip = 1) // bỏ dòng header
    void testMultiplyFromFile(int a, int b, int expected) {
        int result = calculator.multiply(a, b);
        assertEquals(expected, result, () -> a + " * " + b + " should be " + expected);
    }

    @DisplayName("Kiểm tra phép cộng với hai số dương")
    @Test
    void testAddition() {
        assertEquals(5, calculator.add(2, 3), "Addition should return 5");
    }

    @DisplayName("Kiểm tra phép chia bình thường")
    @Test
    void testDivide() {
        assertEquals(2, calculator.divide(6, 3));
    }

    @DisplayName("Chia cho 0 phải ném IllegalArgumentException")
    @Test
    void testDivideByZero() {
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () ->
                calculator.divide(10, 0)
        );
        assertEquals("Cannot divide by zero", exception.getMessage());
    }
}
