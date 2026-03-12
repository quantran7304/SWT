package com.javaweb.repository.impl;

import com.javaweb.repository.entity.OTPEntity;
import com.javaweb.repository.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public interface OTPRepositoryImpl extends JpaRepository<OTPEntity, Integer> {

    @Query("SELECT o FROM OTPEntity o WHERE o.email = :email ORDER BY o.expiredAt DESC")
    Optional<OTPEntity> findLatestOtpByEmail(@Param("email") String email);

    @Transactional
    @Modifying
    @Query("DELETE FROM OTPEntity o WHERE o.email = :email")
    void deleteByEmail(@Param("email") String email);
}
