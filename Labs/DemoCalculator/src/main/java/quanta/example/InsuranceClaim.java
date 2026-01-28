package quanta.example;

public class InsuranceClaim {
    private String claimId;
    private double amount;
    private String claimStatus;

    public InsuranceClaim(String id, double claimAmount) {
        if (id == null || id.isEmpty()) {
            throw new IllegalArgumentException("Claim ID cannot be null or empty");
        }
        if (claimAmount <= 0) {
            throw new IllegalArgumentException("Claim amount must be positive");
        }
        this.claimId = id;
        this.amount = claimAmount;
        this.claimStatus = "Pending";
    }

    public String getClaimId() {
        return claimId;
    }

    public double getAmount() {
        return amount;
    }

    public String getClaimStatus() {
        return claimStatus;
    }

    public boolean processClaim(String status) {
        if (status == null) {
            throw new IllegalArgumentException("Status cannot be null");
        }
        if (!"Pending".equals(this.claimStatus)) {
            return false;
        }
        this.claimStatus = status;
        return true;
    }

    public double calculatePayout() {
        if ("Approved".equals(this.claimStatus)) {
            return amount * 0.85;
        }
        return 0;
    }

    public void updateClaimAmount(double newAmount) {
        if (newAmount <= 0) {
            throw new IllegalArgumentException("Amount must be positive");
        }
        this.amount = newAmount;
    }

    @Override
    public String toString() {
        return "InsuranceClaim{" +
                "claimId='" + claimId + '\'' +
                ", amount=" + amount +
                ", claimStatus='" + claimStatus + '\'' +
                '}';
    }
}
