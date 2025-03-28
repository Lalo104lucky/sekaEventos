package mx.edu.utez.seka_eventos.controller;

import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/images")
@CrossOrigin(origins = "*")
public class ImageController {

    private static final String IMAGE_FOLDER = "src/main/resources/images/";

    @PostMapping("/")
    public ResponseEntity<?> uploadImage(@RequestParam("image") MultipartFile image) {
        try {
            if (image.isEmpty()) {
                return new ResponseEntity<>("Please select an image to upload", HttpStatus.BAD_REQUEST);
            }

            byte[] bytes = image.getBytes();
            Path path = Paths.get(IMAGE_FOLDER + image.getOriginalFilename());

            // Check if file already exists
            if (Files.exists(path)) {
                return new ResponseEntity<>("Image already exists: " + image.getOriginalFilename(), HttpStatus.CONFLICT);
            }

            Files.write(path, bytes);

            return new ResponseEntity<>("Image uploaded successfully: " + image.getOriginalFilename(), HttpStatus.OK);
        } catch (IOException e) {
            return new ResponseEntity<>("Failed to upload image: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("")
    public ResponseEntity<?> listImages() {
        try {
            Path imageFolderPath = Paths.get(IMAGE_FOLDER);
            if (!Files.exists(imageFolderPath)) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }

            List<String> imageNames = Files.list(imageFolderPath)
                    .map(path -> path.getFileName().toString())
                    .collect(Collectors.toList());

            return new ResponseEntity<>(imageNames, HttpStatus.OK);
        } catch (IOException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{imageName}")
    public ResponseEntity<?> getImage(@PathVariable String imageName) {
        try {
            Resource resource = new ClassPathResource("images/" + imageName);
            if (!resource.exists()) {
                return new ResponseEntity<>("Image not found: " + imageName, HttpStatus.NOT_FOUND);
            }

            byte[] imageBytes = FileCopyUtils.copyToByteArray(resource.getInputStream());
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.IMAGE_JPEG);

            return new ResponseEntity<>(imageBytes, headers, HttpStatus.OK);
        } catch (IOException e) {
            return new ResponseEntity<>("Failed to retrieve image: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}