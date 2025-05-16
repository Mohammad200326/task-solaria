import { useEffect, useState } from "react";
import polygonData from "../assets/data.json";
import { Polygon } from "../types/type";
import { Range } from "react-range";

interface IProps {
  onFilterChange: (filteredData: Polygon[]) => void;
}
const PolygonFilter = (props: IProps) => {
  const [activeFilterTab, setActiveFilterTab] = useState("type");

  const [status, setStatus] = useState("");
  const [type, setType] = useState("");
  const [priceValues, setPriceValues] = useState([0, 100000]);
  const [areaValues, setAreaValues] = useState([0, 130]);

  useEffect(() => {
    console.log("selectedStatus", status);
    console.log("areaRange", areaValues[0], areaValues[1]);
    console.log("priceRange", priceValues[0], priceValues[1]);
    console.log("type", type);
    const filteredData =
      status || areaValues || priceValues || type
        ? polygonData.filter(
            (data) =>
              (!status || data.status === status) &&
              data.area >= areaValues[0] &&
              data.area <= areaValues[1] &&
              data.price >= priceValues[0] &&
              data.price <= priceValues[1] &&
              (!type || data.type === type)
          )
        : polygonData;
    props.onFilterChange(filteredData);
  }, [status, priceValues, type, areaValues]);

  return (
    <div className="w-xs rounded-lg bg-[rgba(0,0,0,0.7)] py-4 px-5 text-white shadow-lg fixed top-0 left-0">
      <div className="mb-4 flex  justify-around space-x-4 border-b border-gray-600 pb-2">
        {["type", "availability"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveFilterTab(tab)}
            className={`capitalize text-sm font-medium cursor-pointer ${
              activeFilterTab === tab
                ? "text-white border-b-2 border-white"
                : "text-gray-400"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      {activeFilterTab === "type" && (
        <div className="mb-6 space-y-2">
          {[
            { label: "All", value: "", color: "gray" },
            { label: "Commercial", value: "commercial", color: "emerald" },
            {
              label: "Administrative",
              value: "administrative",
              color: "amber",
            },
            { label: "Clinical", value: "clinical", color: "blue" },
          ].map(({ label, value, color }) => (
            <button
              key={value}
              onClick={() => setType(value)}
              className={`w-full rounded py-2 text-center font-medium text-white cursor-pointer
            bg-${color}-500 hover:bg-${color}-600
            ${type === value ? "ring-2 ring-white font-bold" : ""}
            `}
            >
              {label}
            </button>
          ))}
        </div>
      )}
      {activeFilterTab === "availability" && (
        <div className="mb-6 space-y-2">
          {[
            { label: "All", value: "", color: "gray" },
            { label: "Available", value: "available", color: "emerald" },
            { label: "Sold", value: "sold", color: "blue" },
            { label: "Reserved", value: "reserved", color: "amber" },
          ].map(({ label, value, color }) => (
            <button
              key={value}
              onClick={() => setStatus(value)}
              className={`w-full rounded py-2 text-center font-medium text-white cursor-pointer
        bg-${color}-500 hover:bg-${color}-600
        ${status === value ? "ring-2 ring-white font-bold" : ""}
      `}
            >
              {label}
            </button>
          ))}
        </div>
      )}
      <div className="mb-4">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-sm font-medium">Area</h3>
          <span className="text-sm text-gray-300">
            {areaValues[0].toFixed(1)} - {areaValues[1].toFixed(1)} Sq.m
          </span>
        </div>
        <Range
          min={0}
          max={130}
          values={areaValues}
          onChange={(values) => setAreaValues(values)}
          renderTrack={({ props, children }) => (
            <div
              {...props}
              className="h-2 bg-gray-300 rounded"
              style={{ ...props.style }}
            >
              {children}
            </div>
          )}
          renderThumb={({ props }) => {
            const { key, ...rest } = props;
            return (
              <div
                key={key}
                {...rest}
                className="h-4 w-4 bg-white border border-gray-400 rounded-full shadow"
              />
            );
          }}
        />
      </div>

      <div className="mb-4">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-sm font-medium">Price</h3>
          <span className="text-sm text-gray-300">
            LE {priceValues[0].toFixed(2)} - {priceValues[1].toFixed(2)}
          </span>
        </div>
        <Range
          min={0}
          max={100000}
          values={priceValues}
          onChange={(values) => setPriceValues(values)}
          renderTrack={({ props, children }) => (
            <div
              {...props}
              className="h-2 bg-gray-300 rounded"
              style={{ ...props.style }}
            >
              {children}
            </div>
          )}
          renderThumb={({ props }) => {
            const { key, ...rest } = props;
            return (
              <div
                key={key}
                {...rest}
                className="h-4 w-4 bg-white border border-gray-400 rounded-full shadow"
              />
            );
          }}
        />
      </div>
    </div>
  );
};

export default PolygonFilter;
