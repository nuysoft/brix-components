/* global define */
define(function() {
    return "<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" width=\"100%\" height=\"100%\">\n" +
        "    <defs>\n" +
        "        <linearGradient id=\"gradient-hsv\" x1=\"0%\" y1=\"100%\" x2=\"0%\" y2=\"0%\">\n" +
        "            <stop offset=\"0%\" stop-color=\"#FF0000\" stop-opacity=\"1\"></stop>\n" +
        "            <stop offset=\"13%\" stop-color=\"#FF00FF\" stop-opacity=\"1\"></stop>\n" +
        "            <stop offset=\"25%\" stop-color=\"#8000FF\" stop-opacity=\"1\"></stop>\n" +
        "            <stop offset=\"38%\" stop-color=\"#0040FF\" stop-opacity=\"1\"></stop>\n" +
        "            <stop offset=\"50%\" stop-color=\"#00FFFF\" stop-opacity=\"1\"></stop>\n" +
        "            <stop offset=\"63%\" stop-color=\"#00FF40\" stop-opacity=\"1\"></stop>\n" +
        "            <stop offset=\"75%\" stop-color=\"#0BED00\" stop-opacity=\"1\"></stop>\n" +
        "            <stop offset=\"88%\" stop-color=\"#FFFF00\" stop-opacity=\"1\"></stop>\n" +
        "            <stop offset=\"100%\" stop-color=\"#FF0000\" stop-opacity=\"1\"></stop>\n" +
        "        </linearGradient>\n" +
        "    </defs>\n" +
        "    <rect x=\"0\" y=\"0\" width=\"100%\" height=\"100%\" fill=\"url(#gradient-hsv)\"></rect>\n" +
        "</svg>"
})