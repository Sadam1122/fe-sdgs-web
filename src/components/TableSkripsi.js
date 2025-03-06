import {
  CSmartTable,
  CButton,
} from '@coreui/react-pro';
import React, { useState, useEffect } from 'react';

function TableSkripsi() {
  const [data, setData] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [columnFilter, setColumnFilter] = useState({});
  const [columnSorter, setColumnSorter] = useState(null);
  const [records, setRecords] = useState(0);

  // Fetch data function
  const fetchData = async () => {
    try {
      const offset = itemsPerPage * (activePage - 1);
      let params = new URLSearchParams();
      Object.keys(columnFilter).forEach((key) => {
        params.append(key, columnFilter[key]);
      });
      if (columnSorter) {
        params.append('sort', `${columnSorter.column}%${columnSorter.state}`);
      }

      const response = await fetch(
        `https://api.sdgstelkomuniversity.my.id/model/get-hasil-akhir?page=${activePage}&per_page=${itemsPerPage}&${params.toString()}`,
      );
      const result = await response.json();

      setData(result.data || []);
      setRecords(result.total_items || 0);
    } catch (error) {
      console.error('Error fetching data:', error);
      setData([]);
      setRecords(0);
    }
  };

  // Fetch data on state changes
  useEffect(() => {
    fetchData();
  }, [activePage, itemsPerPage, columnFilter, columnSorter]);

  const columns = [
    { key: 'Judul', _style: { width: '25%' } },
    { key: 'Penulis', _style: { width: '25%' } },
    { key: 'sdgs_images', label: 'Pemetaan SDGS', _style: { width: '25%' } },
    { key: 'Tahun', _style: { width: '25%' } },
    { key: 'Source', _style: { width: '25%' } },
  ];

  return (
    <div style={{ position: 'relative', overflow: 'auto', height: 'calc(100vh - 100px)' }}>
      <CSmartTable
        columns={columns}
        items={data}
        columnFilter
        columnSorter
        itemsPerPage={itemsPerPage}
        itemsPerPageSelect
        itemsPerPageOptions={[10, 50, 100]}
        pagination={{ external: true }}
        paginationProps={{
          activePage,
          pages: itemsPerPage === 0 ? 1 : Math.ceil(records / itemsPerPage),
        }}
        tableProps={{
          hover: true,
          responsive: false,
          style: { position: 'relative' },
        }}
        onActivePageChange={(page) => {
          setActivePage(page);
        }}
        onColumnFilterChange={(filter) => {
          setActivePage(1);
          setColumnFilter(filter);
        }}
        onItemsPerPageChange={(perPage) => {
          setActivePage(1);
          setItemsPerPage(perPage);
        }}
        tableHeadProps={{
          style: {
            position: 'sticky',
            top: 0,
            backgroundColor: '#f8d7da',
            zIndex: 1,
          },
        }}
        onSorterChange={setColumnSorter}
        scopedColumns={{
          sdgs_images: (item) => (
            <td className="py-2">
              {item.sdgs_images && item.sdgs_images.length > 0 ? (
                item.sdgs_images.map((imgUrl, index) => (
                  <img
                    key={index}
                    src={`https://api.sdgstelkomuniversity.my.id/${imgUrl}`}
                    alt={`SDG ${item.sdgs_images[index]}`}
                    style={{ width: '50px', height: '50px', margin: '0 5px 10px 5px' }}
                  />
                ))
              ) : (
                <p>No images</p>
              )}
            </td>
          ),
          show_details: (item) => (
            <td className="py-2">
              <CButton
                color="primary"
                variant="outline"
                shape="square"
                size="sm"
                onClick={() => {
                  navigate(`/dosen/${itemsPerPage}/${activePage}/${item.id}`);
                }}
              >
                Lihat
              </CButton>
            </td>
          ),
        }}
      />
    </div>
  );
}

export default TableSkripsi;
