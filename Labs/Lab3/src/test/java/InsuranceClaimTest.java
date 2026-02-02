import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import quanta.example.InsuranceClaim;

class InsuranceClaimTest {

    @Test
    @DisplayName("GIVEN valid input WHEN create claim THEN status is PENDING")
    void shouldCreateClaimSuccessfully() {
        // GIVEN + WHEN
        InsuranceClaim claim = new InsuranceClaim("C001", 1000);

        // THEN
        assertEquals("C001", claim.getClaimId());
        assertEquals(1000.0, claim.getAmount(), 0.0001);
        assertEquals(InsuranceClaim.ClaimStatus.PENDING, claim.getClaimStatus());
    }

    @Test
    @DisplayName("GIVEN negative amount WHEN create claim THEN throw IllegalArgumentException")
    void shouldRejectNegativeAmount() {
        assertThrows(IllegalArgumentException.class,
                () -> new InsuranceClaim("C002", -100));
    }

    @Test
    @DisplayName("GIVEN blank claimId WHEN create claim THEN throw IllegalArgumentException")
    void shouldRejectBlankClaimId() {
        assertThrows(IllegalArgumentException.class,
                () -> new InsuranceClaim("   ", 100));
    }

    @Test
    @DisplayName("GIVEN pending claim WHEN process to APPROVED THEN return true and status becomes APPROVED")
    void shouldApprovePendingClaim() {
        // GIVEN
        InsuranceClaim claim = new InsuranceClaim("C003", 1000);

        // WHEN
        boolean result = claim.processClaim(InsuranceClaim.ClaimStatus.APPROVED);

        // THEN
        assertTrue(result);
        assertEquals(InsuranceClaim.ClaimStatus.APPROVED, claim.getClaimStatus());
    }

    @Test
    @DisplayName("GIVEN approved claim WHEN process again THEN return false and status unchanged")
    void shouldNotProcessWhenNotPending() {
        // GIVEN
        InsuranceClaim claim = new InsuranceClaim("C004", 1000);
        claim.processClaim(InsuranceClaim.ClaimStatus.APPROVED);

        // WHEN
        boolean result = claim.processClaim(InsuranceClaim.ClaimStatus.REJECTED);

        // THEN
        assertFalse(result);
        assertEquals(InsuranceClaim.ClaimStatus.APPROVED, claim.getClaimStatus());
    }

    @Test
    @DisplayName("GIVEN pending claim WHEN process with null THEN throw IllegalArgumentException")
    void shouldRejectNullStatus() {
        // GIVEN
        InsuranceClaim claim = new InsuranceClaim("C005", 1000);

        // WHEN + THEN
        assertThrows(IllegalArgumentException.class, () -> claim.processClaim(null));
    }

    @Test
    @DisplayName("GIVEN approved claim WHEN calculate payout THEN return 85 percent of amount")
    void shouldCalculateCorrectPayoutWhenApproved() {
        // GIVEN
        InsuranceClaim claim = new InsuranceClaim("C006", 1000);
        claim.processClaim(InsuranceClaim.ClaimStatus.APPROVED);

        // WHEN
        double payout = claim.calculatePayout();

        // THEN
        assertEquals(850.0, payout, 0.0001);
    }

    @Test
    @DisplayName("GIVEN pending claim WHEN calculate payout THEN return 0")
    void shouldReturnZeroPayoutWhenPending() {
        InsuranceClaim claim = new InsuranceClaim("C007", 1000);
        assertEquals(0.0, claim.calculatePayout(), 0.0001);
    }

    @Test
    @DisplayName("GIVEN rejected claim WHEN calculate payout THEN return 0")
    void shouldReturnZeroPayoutWhenRejected() {
        InsuranceClaim claim = new InsuranceClaim("C008", 1000);
        claim.processClaim(InsuranceClaim.ClaimStatus.REJECTED);
        assertEquals(0.0, claim.calculatePayout(), 0.0001);
    }

    @Test
    @DisplayName("GIVEN pending claim WHEN update amount THEN return true and amount updated")
    void shouldUpdateAmountWhenPending() {
        // GIVEN
        InsuranceClaim claim = new InsuranceClaim("C009", 1000);

        // WHEN
        boolean result = claim.updateClaimAmount(2000);

        // THEN
        assertTrue(result);
        assertEquals(2000.0, claim.getAmount(), 0.0001);
    }

    @Test
    @DisplayName("GIVEN approved claim WHEN update amount THEN return false and amount unchanged")
    void shouldNotUpdateAmountAfterApproval() {
        // GIVEN
        InsuranceClaim claim = new InsuranceClaim("C010", 1000);
        claim.processClaim(InsuranceClaim.ClaimStatus.APPROVED);

        // WHEN
        boolean result = claim.updateClaimAmount(2000);

        // THEN
        assertFalse(result);
        assertEquals(1000.0, claim.getAmount(), 0.0001);
    }

    @Test
    @DisplayName("GIVEN negative new amount WHEN update THEN throw IllegalArgumentException")
    void shouldRejectNegativeUpdateAmount() {
        // GIVEN
        InsuranceClaim claim = new InsuranceClaim("C011", 1000);

        // WHEN + THEN
        assertThrows(IllegalArgumentException.class, () -> claim.updateClaimAmount(-1));
    }
}
