import io.github.bonigarcia.wdm.WebDriverManager;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

import static org.junit.jupiter.api.Assertions.assertTrue;

public class LoginTest {

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
        wait = new WebDriverWait(driver, Duration.ofSeconds(15));
    }

    @AfterEach
    void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }

    private WebElement findEmailInput() {
        By[] selectors = new By[]{
            By.id("email"),
            By.cssSelector("input[type=email]"),
            By.cssSelector("input[name=email]"),
            By.cssSelector("input[id*='email']"),
            By.cssSelector("input[placeholder*='Email']"),
            By.cssSelector("input[placeholder*='email']")
        };

        for (By selector : selectors) {
            try {
                return wait.until(ExpectedConditions.visibilityOfElementLocated(selector));
            } catch (Exception ignored) {
                // try next selector
            }
        }
        return null;
    }

    private boolean loadLoginPage() {
        // First load the app root to ensure the SPA has been initialized.
        driver.get("http://localhost:3000/");

        // If the login form is not visible immediately, attempt to navigate via a "Login" link/button.
        try {
            WebElement loginLink = wait.until(ExpectedConditions.elementToBeClickable(
                By.xpath("//a[contains(translate(., 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), 'login')] | //button[contains(translate(., 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), 'login')]")));
            loginLink.click();
        } catch (Exception ignored) {
            // no clickable login link found, proceed to try URLs directly
        }

        String[] loginUrls = {
            "http://localhost:3000/login",
            "http://localhost:3000/#/login",
            "http://localhost:3000/#login"
        };

        for (String url : loginUrls) {
            driver.get(url);
            if (findEmailInput() != null) {
                return true;
            }
        }

        return false;
    }

    private void fillLoginForm(String email, String password) {
        WebElement emailInput = findEmailInput();
        if (emailInput == null) {
            throw new IllegalStateException("Cannot find email input on login page");
        }

        emailInput.clear();
        emailInput.sendKeys(email);

        // try common password field selectors
        By[] passwordSelectors = new By[]{
            By.id("password"),
            By.cssSelector("input[type=password]"),
            By.cssSelector("input[name=password]"),
            By.cssSelector("input[id*='pass']")
        };

        WebElement passwordInput = null;
        for (By sel : passwordSelectors) {
            try {
                passwordInput = wait.until(ExpectedConditions.visibilityOfElementLocated(sel));
                break;
            } catch (Exception ignored) {
            }
        }

        if (passwordInput == null) {
            throw new IllegalStateException("Cannot find password input on login page");
        }
        passwordInput.clear();
        passwordInput.sendKeys(password);

        // click login button (multiple common selectors)
        By[] buttonSelectors = new By[]{
            By.id("loginBtn"),
            By.cssSelector("button[type=submit]"),
            By.cssSelector("button[aria-label*='login']"),
            By.xpath("//button[contains(translate(., 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), 'login')]")
        };

        for (By sel : buttonSelectors) {
            try {
                WebElement btn = wait.until(ExpectedConditions.elementToBeClickable(sel));
                btn.click();
                return;
            } catch (Exception ignored) {
            }
        }

        throw new IllegalStateException("Cannot find login button on login page");
    }

    @Test
    void testLoginSuccess() {
        assertTrue(loadLoginPage(), "Unable to load login page (check frontend routing)");

        fillLoginForm("user@gmail.com", "123456");

        wait.until(ExpectedConditions.urlContains("dashboard"));
        assertTrue(driver.getCurrentUrl().contains("dashboard"));
    }

    @Test
    void testLoginWrongPassword() {
        assertTrue(loadLoginPage(), "Unable to load login page (check frontend routing)");

        fillLoginForm("user@gmail.com", "wrongpass");

        boolean hasError = wait.until(ExpectedConditions.or(
            ExpectedConditions.textToBePresentInElementLocated(By.tagName("body"), "Invalid"),
            ExpectedConditions.textToBePresentInElementLocated(By.tagName("body"), "error")
        ));

        assertTrue(hasError);
    }

}