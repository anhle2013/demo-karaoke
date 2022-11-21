package com.example.util;

import com.example.model.Lyric;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import java.io.File;
import java.io.IOException;
import java.util.*;

public class AppUtil {
    public static Set<Lyric> getLyricsFromXmlFile(File fXmlFile) throws ParserConfigurationException, IOException, SAXException {
        // read XML file
        DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
        DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();
        Document doc = dBuilder.parse(fXmlFile);
        doc.getDocumentElement().normalize();
        NodeList paramList = doc.getElementsByTagName("param");

        // get lyrics
        Set<Lyric> lyrics = new TreeSet<>();
        //
        lyrics.add(new Lyric(0.0,"", 0));
        for (int temp = 0; temp < paramList.getLength(); temp++) {
            Node paramNode = paramList.item(temp);
            if (paramNode.getNodeType() == Node.ELEMENT_NODE) {

                // get words each line
                String time;
                String text;
                Integer line = temp + 1;
                Element eParam = (Element) paramNode;
                NodeList list = eParam.getElementsByTagName("i");
                for (int i = 0; i < list.getLength(); i++) {
                    Node nNode = list.item(i);
                    Element eElement = (Element) nNode;
                    time = eElement.getAttribute("va");
                    text = eElement.getTextContent();
                    lyrics.add(new Lyric(Double.parseDouble(time),text,line));
                }
            }
        }
        return lyrics;
    }
}
