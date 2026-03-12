package com.javaweb.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor         // Constructor không tham số
@AllArgsConstructor
public class GoogleUserInfo {
    private boolean success;
    private String message;
    private Integer userId;
    private String email;
    private String name;
    private String picture;

    public String getPicture() {
        return picture;
    }

    public void setPicture(String picture) {
        this.picture = picture;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFirstName() {
        if (name != null && !name.isEmpty()) {
            String[] parts = name.split(" ", 2);
            return parts[0];
        }
        return "";
    }

    public String getLastName() {
        if (name != null && !name.isEmpty()) {
            String[] parts = name.split(" ", 2);
            return parts.length > 1 ? parts[1] : "";
        }
        return "";
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }
}