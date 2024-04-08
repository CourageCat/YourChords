package com.example.demo.service;

import com.google.cloud.storage.*;
import org.apache.commons.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Arrays;
import java.util.Collections;

@Service
public class GoogleCloudService {

    @Value("${gcp.bucket.name}")
    private String bucketName;

    @Autowired
    Storage storage;

    private String generateCode(MultipartFile file, Long id, String type, String demo) {
        if (!file.isEmpty()) {
            String input = id + "-" + type;
            byte[] extension = Base64.encodeBase64(input.getBytes());
            String uniqueFilename = System.currentTimeMillis() + "_" + Math.abs(file.hashCode()) + Arrays.toString(extension);
            if (demo.equals("full")) {
                return uniqueFilename;
            }
            return "demo" + uniqueFilename;
        }
        return null;
    }

    public String uploadFile(MultipartFile file, Long id, String typeFile, String demo , String objectName) {
        String fileName = generateCode(file, id, typeFile, demo);
        String path = typeFile + "/";
        BlobId blobId = BlobId.of(bucketName, path + fileName);

        try {
            if (objectName != null) {
                Blob existingBlob = storage.get(bucketName, objectName);
                if (existingBlob != null) {
                    boolean deleted = existingBlob.delete();
                    if (!deleted) {
                        throw new RuntimeException("File cannot be deleted!");
                    }
                }
            }
            BlobInfo blobInfo = BlobInfo.newBuilder(blobId)
                    .setContentType(file.getContentType())
                    .setAcl(Collections.singletonList(Acl.of(Acl.User.ofAllUsers(), Acl.Role.READER)))
                    .build();

            Blob blob = storage.create(blobInfo, file.getBytes());
            return "https://storage.googleapis.com/" + bucketName + "/" + path + fileName;
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
