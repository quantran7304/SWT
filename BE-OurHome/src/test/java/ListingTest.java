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

import static org.junit.jupiter.api.Assertions.assertTrue;

public class ListingTest {

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
    void testViewPropertyList() {
        driver.get("http://localhost:3000/#/properties");

        boolean contains = wait.until(ExpectedConditions.or(
            ExpectedConditions.textToBePresentInElementLocated(By.tagName("body"), "Property"),
            ExpectedConditions.textToBePresentInElementLocated(By.tagName("body"), "price")
        ));

        assertTrue(contains);
    }

    @Test
    void testSearchPropertyByCity() {
        driver.get("http://localhost:3000/#/properties");

        wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("city"))).sendKeys("Hanoi");
        driver.findElement(By.id("searchBtn")).click();

        boolean contains = wait.until(ExpectedConditions.textToBePresentInElementLocated(By.tagName("body"), "Hanoi"));
        assertTrue(contains);
    }
}
