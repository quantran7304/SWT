package com.javaweb.repository.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "Payment")
public class PaymentEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "PaymentID")
    private Integer paymentId;

    @Column(name = "UserID")
    private Integer userId;

    @Column(name = "MembershipID")
    private Integer membershipId;

    @Column(name = "RentalContractID")
    private Integer rentalContractId;

    @Column(name = "ReceivedBy")
    private String receivedBy;

    @Column(name = "Amount")
    private Double amount;

    @Column(name = "Status")
    private String status;

    @Column(name = "PaymentDate")
    private LocalDateTime paymentDate;

    @Column(name = "TransactionCode")
    private String transactionCode;

    @Column(name = "Note")
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