package com.javaweb.model;

import java.time.LocalDateTime;

public class PaymentDTO {
    private Integer paymentId;
    private Integer userId;
    private Integer membershipId;
    private Integer rentalContractId;
    private String receivedBy;
    private Double amount;
    private String status;
    private LocalDateTime paymentDate;
    private String transactionCode;
    private String note;

    // Getters and setters
    public Integer getPaymentId() { return paymentId; }
    public void setPaymentId(Integer paymentId) { this.paymentId = paymentId; }
    public Integer getUserId() { return userId; }
    public void setUserId(Integer userId) { this.userId = userId; }
    public Integer getMembershipId() { return membershipId; }
    public void setMembershipId(Integer membershipId) { this.membershipId = membershipId; }
    public Integer getRentalContractId() { return rentalContractId; }
    public void setRentalContractId(Integer rentalContractId) { this.rentalContractId = rentalContractId; }
    public String getReceivedBy() { return receivedBy; }
    public void setReceivedBy(String receivedBy) { this.receivedBy = receivedBy; }
    public Double getAmount() { return amount; }
    public void setAmount(Double amount) { this.amount = amount; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public LocalDateTime getPaymentDate() { return paymentDate; }
    public void setPaymentDate(LocalDateTime paymentDate) { this.paymentDate = paymentDate; }
    public String getTransactionCode() { return transactionCode; }
    public void setTransactionCode(String transactionCode) { this.transactionCode = transactionCode; }
    public String getNote() { return note; }
    public void setNote(String note) { this.note = note; }
}