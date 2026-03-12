package com.javaweb.builder;

import java.util.Date;

public class UserBuilder {
    private  int userID;
    private  String password;
    private  String firstName;
    private  String lastName;
    private Date birthday;
    private  String phone;
    private  String email;
    private  String role;
    private  Date createdAt;

    private UserBuilder(Builder builder) {
        this.userID = builder.userID;
        this.password = builder.password;
        this.firstName = builder.firstName;
        this.lastName = builder.lastName;
        this.birthday = builder.birthday;
        this.phone = builder.phone;
        this.email = builder.email;
        this.role = builder.role;
        this.createdAt = builder.createdAt;
    }

    public int getUserID() {
        return userID;
    }

    public String getPassword() {
        return password;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public Date getBirthday() {
        return birthday;
    }

    public String getPhone() {
        return phone;
    }

    public String getEmail() {
        return email;
    }

    public String getRole() {
        return role;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public static class Builder {
        private int userID;
        private String password;
        private String firstName;
        private String lastName;
        private Date birthday;
        private String phone;
        private String email;
        private String role;
        private Date createdAt;

        public Builder setUserID(int userID) {
            this.userID = userID;
            return this;
        }

        public Builder setPassword(String password) {
            this.password = password;
            return this;
        }

        public Builder setFirstName(String firstName) {
            this.firstName = firstName;
            return this;
        }

        public Builder setLastName(String lastName) {
            this.lastName = lastName;
            return this;
        }

        public Builder setBirthday(Date birthday) {
            this.birthday = birthday;
            return this;
        }

        public Builder setPhone(String phone) {
            this.phone = phone;
            return this;
        }

        public Builder setEmail(String email) {
            this.email = email;
            return this;
        }

        public Builder setRole(String role) {
            this.role = role;
            return this;
        }

        public Builder setCreatedAt(Date createdAt) {
            this.createdAt = createdAt;
            return this;
        }

        public UserBuilder build() {
            return new UserBuilder(this);
        }
    }

}
