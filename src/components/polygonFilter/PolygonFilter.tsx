import { useEffect, useState } from "react";
import polygonData from "../../assets/data.json";
import { Polygon } from "../../App";

interface IProps {
  onFilterChange: (filteredData: Polygon[]) => void;
}
const PolygonFilter = (props: IProps) => {
  const [selectedStatus, setSelectedStatus] = useState("available");
  const [priceRange, setPriceRange] = useState<string>("50000");

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(e.target.value);
  };

  useEffect(() => {
    const filteredData = selectedStatus
      ? polygonData.filter(
          (data) =>
            data.status === selectedStatus && data.price <= Number(priceRange)
        )
      : polygonData;
    props.onFilterChange(filteredData);
  }, [selectedStatus, priceRange]);

  return (
    <div>
      <select
        name=""
        id=""
        value={selectedStatus}
        onChange={handleSelectChange}
      >
        <option value="available">Available</option>
        <option value="sold">Sold</option>
        <option value="reserved">Reserved</option>
      </select>
      <input
        type="range"
        name=""
        min={0}
        max={100000}
        id=""
        value={priceRange}
        style={{
          width: "100%",
          height: "10px",
          backgroundColor: "#ddd ",
          borderRadius: "5px",
          outline: "none",
        }}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setPriceRange(e.target.value)
        }
      />
      <p>
        value: <span id="valueDisplay">{priceRange}</span>
      </p>
    </div>
  );
};

export default PolygonFilter;
