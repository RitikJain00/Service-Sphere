import { IconMapPin, IconStar, IconBriefcase, IconSearch } from "@tabler/icons-react";
import SearchableMultiSelect from "./Multiselect";
import SelectComboboxData from "./Combobox";
import { RangeSlider } from "@mantine/core";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useCart } from "../../../Context/CartContext";
import { Job } from "../../../Type/Type";

const SearchBox = () => {
  const location = useLocation();
  const { data, setFilteredServices } = useCart();

  // State for filters
// Define types
interface Filters {
  category: string[];
  location: string[];
  experience: string;
  rating: string;
  price: [number, number];
}

const [filters, setFilters] = useState<Filters>({
  category: [],
  location: [],
  experience: "",
  rating: "",
  price: [0, 10000],
});


  // Filtering logic
  useEffect(() => {
    const filteredJobs = data.filter((job: Job) => {
      return (
        (!filters.category.length || filters.category.includes(job.category)) &&
        (!filters.location.length || filters.location.includes(job. location )) &&
        (!filters.experience || job.expireince === filters.experience) &&
        (!filters.rating || job.rating >= parseFloat(filters.rating)) &&
        job.price >= filters.price[0] &&
        job.price <= filters.price[1]
      );
    });

    setFilteredServices(filteredJobs);
  }, [filters, data, setFilteredServices]);

  return (
    <div className="flex flex-col gap-12">
      {/* Category & Location */}
      {location.pathname.slice(1) === "Explore" && (
        <SearchableMultiSelect
          Data={{
            title: "Search Category",
            icon: IconSearch,
            options: [
              "Carpenter",
              "Painter",
              "HouseKeeping",
              "Electrician",
              "Contractor",
              "Plumber",
              "Technician",
              "PestControl",
            ],
          }}
          onChange={(selected: string[]) => setFilters((prev) => ({ ...prev, category: selected }))}
        />
      )}

      <SearchableMultiSelect
        Data={{
          title: "Search Location",
          icon: IconMapPin,
          options: [
            "Delhi",
            "Mumbai",
            "Kolkata",
            "Chennai",
            "Bengaluru",
            "Hyderabad",
            "Jaipur",
            "Lukhnow",
            "Pune",
            "Guwahati",
            "Ahemdabad",
            "Bhubaneswar",
          ],
        }}
        onChange={(selected: string[]) => setFilters((prev) => ({ ...prev, location: selected }))}
      />

      <SelectComboboxData
        Data={{
          title: "Experience",
          icon: IconBriefcase,
          options: ["1+ Years", "3+ Years", "5+ Years", "10+ Years", "20+ Years", "30+ Years"],
        }}
        onChange={(selected: string) => setFilters((prev) => ({ ...prev, experience: selected }))}
      />

      <SelectComboboxData
        Data={{ title: "Rating", icon: IconStar, options: ["4 ⭐ & above", "3 ⭐ & above"] }}
        onChange={(selected: string) => setFilters((prev) => ({ ...prev, rating: selected }))}
      />

      {/* Price Range Slider */}
      <div className="mr-8">
        <RangeSlider
          color="bright-sun.4"
          size="sm"
          value={filters.price}
          onChange={(value) => setFilters((prev) => ({ ...prev, price: value as [number, number] }))}
          min={0}
          max={10000}
          label={(value) => `₹${value}`}
          step={100}
          styles={{ markLabel: { display: "none" } }}
          labelTransitionProps={{
            transition: "skew-down",
            duration: 150,
            timingFunction: "linear",
          }}
        />

        <div className="flex justify-between text-lg mt-2 text-mine-shaft-300">
          <div>Price</div>
          <div>&#8377;{filters.price[0]} - &#8377;{filters.price[1]}</div>
        </div>
      </div>
    </div>
  );
};

export default SearchBox;
