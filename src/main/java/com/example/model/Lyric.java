package com.example.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Lyric  implements Comparable<Lyric>{
    private Double time;
    private String text;

    private Integer line;

    @Override
    public String toString() {
        return "Lyric{" +
                "time=" + time +
                ", text='" + text + '\'' +
                ", line=" + line +
                '}';
    }

    @Override
    public int compareTo(Lyric lyric) {
        return this.time.compareTo(lyric.getTime());
    }

}
