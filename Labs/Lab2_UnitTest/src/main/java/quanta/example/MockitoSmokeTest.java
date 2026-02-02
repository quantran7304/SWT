package quanta.example;

import org.testng.annotations.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class MockitoSmokeTest {

    interface Repo {
        String getName();
    }

    @Mock Repo repo;

    @Test
    void mockitoWorks() {
        when(repo.getName()).thenReturn("OK");
        assertEquals("OK", repo.getName());
    }
}
