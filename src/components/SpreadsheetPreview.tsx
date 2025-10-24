import React, { useMemo, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { SpreadsheetData } from '../types';

interface SpreadsheetPreviewProps {
  data: SpreadsheetData | null;
  isLoading: boolean;
}

const SpreadsheetPreview: React.FC<SpreadsheetPreviewProps> = ({ data, isLoading }) => {
  const gridRef = useRef<AgGridReact>(null);

  // Generate column definitions from data
  const columnDefs = useMemo((): ColDef[] => {
    if (!data || !data.data || data.data.length === 0) {
      return [];
    }

    const firstRow = data.data[0];
    return Object.keys(firstRow).map(key => ({
      field: key,
      headerName: key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1'),
      sortable: true,
      filter: true,
      editable: true,
      width: 150,
      resizable: true
    }));
  }, [data]);

  // Handle grid ready
  const onGridReady = (params: GridReadyEvent) => {
    // Grid is ready, can access gridApi if needed
  };

  // Export to CSV
  const exportToCSV = () => {
    if (gridRef.current && gridRef.current.api) {
      gridRef.current.api.exportDataAsCsv({
        fileName: 'spreadsheet.csv'
      });
    }
  };

  // Export to Excel (requires ag-grid-enterprise, but we'll use CSV for now)
  const exportToExcel = () => {
    // For now, we'll use CSV export since we're using community edition
    // In a production app, you'd want to upgrade to enterprise or use a different library
    exportToCSV();
  };

  if (isLoading) {
    return (
      <div className="spreadsheet-container">
        <div className="spreadsheet-content">
          <div className="empty-state">
            <div className="loading-indicator">
              <div className="spinner"></div>
              <span>Generating spreadsheet...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!data || !data.data || data.data.length === 0) {
    return (
      <div className="spreadsheet-container">
        <div className="spreadsheet-content">
          <div className="empty-state">
            <div className="empty-state-icon">📊</div>
            <div className="empty-state-text">No spreadsheet data yet</div>
            <div className="empty-state-subtext">
              Ask the AI assistant to create a spreadsheet for you!
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="spreadsheet-container">
      <div className="spreadsheet-content">
        {data.message && (
          <div style={{ 
            marginBottom: '1rem', 
            padding: '0.75rem', 
            backgroundColor: '#f0f8ff', 
            border: '1px solid #b0d4f1', 
            borderRadius: '0.25rem',
            fontSize: '0.9rem',
            color: '#2c5aa0'
          }}>
            💡 {data.message}
          </div>
        )}
        
        <div className="export-buttons">
          <button className="export-button" onClick={exportToCSV}>
            📄 Export CSV
          </button>
          <button className="export-button" onClick={exportToExcel}>
            📊 Export Excel
          </button>
        </div>

        <div className="ag-theme-alpine" style={{ height: '100%', width: '100%' }}>
          <AgGridReact
            ref={gridRef}
            rowData={data.data}
            columnDefs={columnDefs}
            onGridReady={onGridReady}
            defaultColDef={{
              resizable: true,
              sortable: true,
              filter: true,
              editable: true
            }}
            animateRows={true}
            rowSelection="multiple"
            suppressRowClickSelection={true}
            pagination={true}
            paginationPageSize={20}
            paginationPageSizeSelector={[10, 20, 50, 100]}
          />
        </div>
      </div>
    </div>
  );
};

export default SpreadsheetPreview;
