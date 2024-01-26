package com.management.backend.security;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.management.backend.model.CorporateProfile;
import com.management.backend.model.Employee;
import com.management.backend.security.model.Authority;
import com.management.backend.security.model.JwtUserDetails;
import com.management.backend.security.repository.JwtAuthorityRepository;
import com.management.backend.security.repository.JwtUserDetailsRepository;
import com.management.backend.type.BloodType;
import com.management.backend.type.Gender;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class JwtUserDetailsService implements UserDetailsService {

    private final JwtUserDetailsRepository jwtUserDetailsRepository;
    private final JwtAuthorityRepository jwtAuthorityRepository;

    // Create an admin user at the beggining
    @PostConstruct
    public void init() {
        // Script to create 50 users
        jwtAuthorityRepository.save(Authority.builder().authority("ROLE_ADMIN").build());
        List<JwtUserDetails> userDetails = new ArrayList<>();
        for (int i = 0; i < 50; i++) {
            CorporateProfile corporateProfile = CorporateProfile.builder()
                    .recordNumber("12345678" + i)
                    .personnelCadre("test" + i)
                    .title("test" + i % 10)
                    .unit("test" + i % 10)
                    .assignment("test" + i % 10)
                    .workType("test" + i % 10)
                    .internalNumber("test" + i)
                    .roomNumber("test" + i)
                    .enterenceDate(LocalDate.of(1980 + i, (i % 12) + 1, i % 27 + 1))
                    .build();

            Employee employee1 = Employee.builder()
                    .email("test" + i + "@test.com")
                    .name("test" + i)
                    .lastName("test" + i)
                    .phoneNumber("12345678" + i)
                    .carPlate("34AB123" + i)
                    .tcNo("123456789" + i)
                    .address("test" + i)
                    .emergencyContactName("test" + i)
                    .emergencyContactPhoneNumber("12345678" + i)
                    .gender(Gender.MALE)
                    .bloodType(BloodType.AB_POSITIVE)
                    .birthDate(LocalDate.of(1960 + i, (i % 12) + 1, i % 27 + 1))
                    .corporateProfile(corporateProfile)
                    .build();

            // Get aurhority
            Authority authority2 = jwtAuthorityRepository.findByAuthority("ROLE_ADMIN")
                    .orElseThrow(() -> new RuntimeException("Authority not found"));
            JwtUserDetails user1 = JwtUserDetails.builder()
                    .username("user" + i)
                    .password("$2a$12$0T9u8FCIVKGdzOBjlupCW.0.vwsRP7CUBaLPcz9ygGZWWtYmL3ob2")
                    .authorities(
                            Set.of(authority2))
                    .employee(employee1)
                    .build();
            userDetails.add(user1);
        }

        jwtUserDetailsRepository.saveAll(userDetails);

    }

    @Override
    public JwtUserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {

        // Get user details
        JwtUserDetails user = jwtUserDetailsRepository.findByUsername(userName)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        return user;
    }
}
