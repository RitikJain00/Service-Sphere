import { useState } from "react";
import { Pagination } from "@mantine/core";

// Define the props interface
interface PaginatedListProps<T> {
  data: T[];
  itemsPerPage?: number;
  renderItem: (item: T) => JSX.Element;
}

const PaginatedList = <T,>({ data, itemsPerPage = 2, renderItem }: PaginatedListProps<T>) => {
  const [activePage, setActivePage] = useState<number>(1);

  // Calculate total pages
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Get items for the current page
  const paginatedData = data.slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage);

  return (
    <div className="p-4">
      {/* Render paginated items */}
      <div className="grid grid-cols-1 gap-4"> 
        {paginatedData.map(renderItem)}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6">
        <Pagination color="orange" total={totalPages} value={activePage} onChange={setActivePage} />
      </div>
    </div>
  );
};

export default PaginatedList;
