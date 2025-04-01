import { useState } from "react";
import { Combobox, useCombobox } from "@mantine/core";
import { IconAdjustments } from "@tabler/icons-react";
import { useCart } from "../../../Context/CartContext";

const opt = [
  "Popular",
  "Most Recent",
  "Price: Low to High",
  "Price: High to Low",
];

const Relevance = () => {
  const [selectedItem, setSelectedItem] = useState<string | null>("Relevance");
  const { data, setFilteredServices } = useCart();

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const handleSort = (val: string) => {
    setSelectedItem(val);
    combobox.closeDropdown();

    let sortedData = [...data]; // Create a copy of the original data

    switch (val) {
      case "Popular":
        sortedData.sort((a, b) => b.rating - a.rating);
        break;

      case "Most Recent":
        sortedData.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
        break;

      case "Price: Low to High":
        sortedData.sort((a, b) => a.price - b.price);
        break;

      case "Price: High to Low":
        sortedData.sort((a, b) => b.price - a.price);
        break;

      default:
        break;
    }

    setFilteredServices(sortedData); // Update the filtered services
  };

  const options = opt.map((item) => (
    <Combobox.Option value={item} key={item}>
      {item}
    </Combobox.Option>
  ));

  return (
    <>
      <Combobox
        store={combobox}
        width={150}
        position="bottom-start"
        withArrow
        onOptionSubmit={handleSort} // 🔥 Sort when an option is selected
      >
        <Combobox.Target>
          <div
            className="border border-bright-sun-400 flex gap-2 text-bright-sun-300 px-2 md:py-1 mt-2 cursor-pointer rounded-xl items-center h-16 xl:h-8 w-auto hover:scale-105 transition duration-300"
            onClick={() => combobox.toggleDropdown()}
          >
            {selectedItem} <IconAdjustments className="h-5 w-5" stroke={2} />
          </div>
        </Combobox.Target>

        <Combobox.Dropdown>
          <Combobox.Options>{options}</Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    </>
  );
};

export default Relevance;
