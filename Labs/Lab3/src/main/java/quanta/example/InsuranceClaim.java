package quanta.example;

public class InsuranceClaim {

    public enum ClaimStatus {
        PENDING,
        APPROVED,
        REJECTED
    }

    private static final double PAYOUT_RATE = 0.85;

    private final String claimId;
    private double amount;
    private ClaimStatus claimStatus;

    public InsuranceClaim(String claimId, double amount) {
        if (claimId == null || claimId.isBlank()) {
            throw new IllegalArgumentException("Claim ID must not be empty");
        }
        if (amount < 0) {
            throw new IllegalArgumentException("Claim amount must be >= 0");
        }
        this.claimId = claimId;
        this.amount = amount;
        this.claimStatus = ClaimStatus.PENDING;
    }

    public String getClaimId() {
        return claimId;
    }

    public double getAmount() {
        return amount;
    }

    public ClaimStatus getClaimStatus() {
        return claimStatus;
    }

    /**
     * Only allow transitions:
     * PENDING -> APPROVED or REJECTED
     */
    public boolean processClaim(ClaimStatus newStatus) {
        if (newStatus == null) {
            throw new IllegalArgumentException("Status must not be null");
        }

        if (claimStatus != ClaimStatus.PENDING) {
            return false;
        }

        if (newStatus != ClaimStatus.APPROVED && newStatus != ClaimStatus.REJECTED) {
            return false;
        }

        claimStatus = newStatus;
        return true;
    }

    /**
     * Payout only if APPROVED.
     */
    public double calculatePayout() {
        if (claimStatus == ClaimStatus.APPROVED) {
            return amount * PAYOUT_RATE;
        }
        return 0.0;
    }

    /**
     * Amount can be updated only while PENDING.
     */
    public boolean updateClaimAmount(double newAmount) {
        if (newAmount < 0) {
            throw new IllegalArgumentException("Amount must be >= 0");
        }

        if (claimStatus != ClaimStatus.PENDING) {
            return false;
        }

        amount = newAmount;
        return true;
    }
}
