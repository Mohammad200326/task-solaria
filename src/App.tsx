import { useState } from "react";
import image from "./assets/0-floor.png";
import svgOverlay from "./assets/0-floor.svg";
import PolygonFilter from "./components/PolygonFilter";
import polygonData from "./assets/data.json";
import { Polygon } from "./types/type";
import { ReactSVG } from "react-svg";

function App() {
  const [filteredData, setFilteredData] = useState<Polygon[]>(polygonData);
  const [hoveredPolygon, setHoveredPolygon] = useState<Polygon | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const ids = filteredData.map((item) => item.code);

  return (
    <>
      <img
        src={image}
        alt="Background"
        className="fixed top-0 object-cover z-0 left-1/4 w-1/2 h-full"
      />

      <ReactSVG
        src={svgOverlay}
        beforeInjection={(svg) => {
          svg.setAttribute("width", "100%");
          svg.setAttribute("height", "100%");
          svg.setAttribute("preserveAspectRatio", "xMidYMid slice");

          svg.style.position = "fixed";
          svg.style.top = "0";
          svg.style.left = "25%";
          svg.style.width = "50%";
          svg.style.height = "100%";
          svg.style.zIndex = "1";
          svg.style.cursor = "pointer";

          const polygons = svg.querySelectorAll("polygon");

          polygons.forEach((polygon) => {
            const polygonCode = polygon.getAttribute("data-code");
            const code = Number(polygonCode);

            if (!ids.includes(code)) {
              polygon.style.display = "none";
            } else {
              polygon.style.display = "block";

              polygon.addEventListener("mouseover", () => {
                const data = filteredData.find((item) => item.code === code);
                if (data) setHoveredPolygon(data);
              });

              polygon.addEventListener("mouseleave", () => {
                setHoveredPolygon(null);
              });

              polygon.addEventListener("mousemove", (e: MouseEvent) => {
                setMousePos({ x: e.clientX, y: e.clientY });
              });
            }
          });
        }}
        wrapper="div"
        className="fixed top-0 left-1/4 w-1/2 h-full z-[1]"
      />

      <PolygonFilter onFilterChange={setFilteredData} />
      {hoveredPolygon && (
        <div
          className="fixed bg-[rgba(0,0,0,0.7)] p-2 rounded-lg shadow-md text-[18px] pointer-events-none z-[9999] text-white w-[250px] flex justify-between items-center"
          style={{
            top: mousePos.y + 10,
            left: mousePos.x + 10,
          }}
        >
          <div>
            <p>
              Unit {hoveredPolygon.code <= 9 ? 10 : 1}
              {hoveredPolygon.code}
            </p>
            <p>Unit Type</p>
            <p>Total Area</p>
            <p>Price</p>
          </div>
          <div className="text-right">
            <p
              className={`text-white text-center p-1 rounded
                ${
                  hoveredPolygon.status === "available"
                    ? "bg-emerald-500"
                    : hoveredPolygon.status === "sold"
                    ? "bg-blue-500"
                    : "bg-amber-500"
                }`}
            >
              {hoveredPolygon.status}
            </p>
            <p>{hoveredPolygon.type}</p>
            <p>
              {hoveredPolygon.area} M<sup>2</sup>
            </p>
            <p>{hoveredPolygon.price} EGP</p>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
