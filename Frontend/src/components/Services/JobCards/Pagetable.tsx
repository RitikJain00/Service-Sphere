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
    <>
      {/* Render paginated items as direct Table Rows */}
      {paginatedData.map(renderItem)}

      {/* Pagination Controls */}
      <tr>
  <td colSpan={7} className="py-4">
    <div className="flex justify-center w-full">
      <Pagination color="orange" total={totalPages} value={activePage} onChange={setActivePage} />
    </div>
  </td>
</tr>

    </>
  );
};

export default PaginatedList;
