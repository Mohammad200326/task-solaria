import { useEffect, useState } from "react";
import image from "./assets/0-floor.png";
import svgOverlay from "./assets/0-floor.svg";
import PolygonFilter from "./components/polygonFilter/PolygonFilter";
import polygonData from "./assets/data.json";

export type Polygon = {
  code: number;
  status: string;
  price: number;
};
function App() {
  const [filteredData, setFilteredData] = useState<Polygon[]>(polygonData);
  const [svgDataUrl, setSvgDataUrl] = useState<string>("");

  useEffect(() => {
    fetch(svgOverlay)
      .then((response) => response.text())
      .then((svgText) => {
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(svgText, "image/svg+xml");

        const polygons = svgDoc.querySelectorAll("polygon");

        const ids = filteredData.map((item) => item.code);

        polygons.forEach((polygon) => {
          const polygonCode = polygon.getAttribute("data-code");

          if (!ids.includes(Number(polygonCode))) {
            polygon.style.display = "none";
          } else {
            polygon.style.display = "block";
          }
        });

        const svgString = svgDoc.documentElement.outerHTML;
        const encodedSvg = encodeURIComponent(svgString);
        const dataUrl = `data:image/svg+xml;charset=utf-8,${encodedSvg}`;
        setSvgDataUrl(dataUrl);
      })
      .catch((error) => {
        console.error("Error loading SVG:", error);
      });
  }, [filteredData]);
  return (
    <>
      <PolygonFilter onFilterChange={setFilteredData} />
      <img
        style={{
          position: "fixed",
          top: "50",
          left: "0",
          width: "100",
          height: "100%",
          backgroundColor: "#272727",
          objectFit: "cover",
        }}
        src={image}
      />
      <img
        style={{
          position: "fixed",
          top: "50",
          left: "0",
          width: "100",
          height: "100%",
          objectFit: "cover",
          zIndex: 1,
        }}
        src={svgDataUrl}
        alt="SVG Overlay"
      />
      {/* <div
        id="svg-container"
        dangerouslySetInnerHTML={{ __html: svgContainer }}
      /> */}
      {/* <img
        style={{
          position: "fixed",
          top: "50",
          left: "0",
          width: "100",
          height: "100%",
          objectFit: "cover",
        }}
        src={svgOverlay}
      /> */}
    </>
  );
}

export default App;
