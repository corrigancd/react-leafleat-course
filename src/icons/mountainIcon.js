import L from "leaflet";

// https://commons.wikimedia.org/wiki/File:Eucalyp-Deus_Mountain.png
import mountainPng from "./../images/mountain.png";


const LeafIcon = L.Icon.extend({
  options: {
    iconSize: [35, 23],
    iconAnchor: [17, 16],
    tooltipAnchor: [15, -5],
  },
});

export const mountainIcon = new LeafIcon({ iconUrl: mountainPng });
