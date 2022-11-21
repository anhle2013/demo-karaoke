package com.example.controller.api;

import com.example.model.Lyric;
import com.example.util.AppUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/lyrics")
public class LyricAPI {
    @GetMapping
    public ResponseEntity<Set<?>> getLyrics() {
        try {
            File fXmlFile = new File("src/main/resources/static/files/lyrics.xml");
            Set<Lyric> lyrics = AppUtil.getLyricsFromXmlFile(fXmlFile);
            return new ResponseEntity<>(lyrics, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
