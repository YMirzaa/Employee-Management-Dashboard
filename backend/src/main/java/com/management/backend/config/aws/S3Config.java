package com.management.backend.config.aws;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;

@Configuration
public class S3Config {

    @Value("${aws.s3.region}")
    private String awsRegion;

    @Value("${aws.credentials.accessKey}")
    private String awsAccessKey;

    @Value("${aws.credentials.secretKey}")
    private String awsSecretKey;

    @Bean
    public S3Client s3Client() {
        // AwsBasicCredentials credentials = AwsBasicCredentials.create(awsAccessKey,
        // awsSecretKey);

        return S3Client.builder()
                .region(Region.of(awsRegion))
                // .credentialsProvider(() -> credentials)
                .build();

    }

}
