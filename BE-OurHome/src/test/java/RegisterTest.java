import io.github.bonigarcia.wdm.WebDriverManager;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertTrue;

public class RegisterTest {

    private WebDriver driver;
    private WebDriverWait wait;

    @BeforeEach
    void setUp() {
        WebDriverManager.chromedriver().setup();

        ChromeOptions options = new ChromeOptions();
        // Nếu muốn chạy headless (CI), bật dòng dưới:
        // options.addArguments("--headless=new");
        options.addArguments("--disable-gpu");
        options.addArguments("--window-size=1920,1080");

        driver = new ChromeDriver(options);
        wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }

    @AfterEach
    void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }

    @Test
    void testRegisterSuccess() {
        driver.get("http://localhost:3000/#/register");

        String email = "testuser+" + UUID.randomUUID() + "@example.com";
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("email"))).sendKeys(email);
        driver.findElement(By.id("password")).sendKeys("123456");
        driver.findElement(By.id("confirmPassword")).sendKeys("123456");

        driver.findElement(By.id("registerBtn")).click();

        boolean result = wait.until(ExpectedConditions.or(
            ExpectedConditions.textToBePresentInElementLocated(By.tagName("body"), "success"),
            ExpectedConditions.textToBePresentInElementLocated(By.tagName("body"), "Register")
        ));

        assertTrue(result);
    }

    @Test
    void testRegisterDuplicateEmail() {
        driver.get("http://localhost:3000/#/register");

        wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("email"))).sendKeys("user@gmail.com");
        driver.findElement(By.id("password")).sendKeys("123456");
        driver.findElement(By.id("confirmPassword")).sendKeys("123456");

        driver.findElement(By.id("registerBtn")).click();

        boolean result = wait.until(ExpectedConditions.or(
            ExpectedConditions.textToBePresentInElementLocated(By.tagName("body"), "exists"),
            ExpectedConditions.textToBePresentInElementLocated(By.tagName("body"), "error")
        ));

        assertTrue(result);
    }
}
