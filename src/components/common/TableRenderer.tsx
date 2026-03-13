import React, { useEffect } from "react";
import type { TableField } from "../../types/form";
import { calculateTableRows } from "../../utils/FormEngine";

interface Props {
  field: TableField;
  value: Record<string, any>[];
  onChange: (rows: Record<string, any>[]) => void;
}

const TableRenderer: React.FC<Props> = ({ field, value = [], onChange }) => {
  const rows =
    value && value.length > 0
      ? value
      : field.defaultValue && field.defaultValue.length > 0
      ? field.defaultValue
      : Array.from({ length: field.minRows || 1 }, () =>
          Object.fromEntries(field.columns.map((col) => [col.key, ""]))
        );

  useEffect(() => {
    if ((!value || value.length === 0) && field.defaultValue && field.defaultValue.length > 0) {
      onChange(field.defaultValue);
    }
  }, []);

  const handleCellChange = (rowIndex: number, key: string, cellValue: any) => {
    const updatedRows = [...rows];
    updatedRows[rowIndex] = { ...updatedRows[rowIndex], [key]: cellValue };

    // --- AUTO-CALCULATION LOGIC ---
    // After updating the specific cell, check if any columns have a formula
    // and run it using the newly updated row data.
    field.columns.forEach((col) => {
      if (col.calculate) {
        updatedRows[rowIndex][col.key] = col.calculate(updatedRows[rowIndex]);
      }
    });

    onChange(calculateTableRows(field.name, updatedRows));
  };

  const addRow = () => {
    const updated = [
      ...rows,
      Object.fromEntries(field.columns.map((col) => [col.key, ""])),
    ];
    onChange(calculateTableRows(field.name, updated));
  };

  // Logic to hide "Add Row" for fixed guideline tables
  const isFixedTable = field.defaultValue && field.defaultValue.length > 0;

  return (
    <div style={{ marginBottom: 24 }}>
      {field.label && (
        <label style={{ display: "block", fontWeight: 600, marginBottom: 10 }}>
          {field.label}
        </label>
      )}

      <div className="table-container">
        <table>
          <thead>
            <tr>
              {field.columns.map((col) => (
                <th 
                  key={col.key}
                  // --- WIDTH LOGIC ---
                  // Apply the custom width from the schema, default to auto
                  style={{ width: col.width || "auto" }}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => {
              // --- CATEGORY HEADER LOGIC (From Section 4) ---
              if (row.isHeader) {
                return (
                  <tr key={rowIndex} className="table-category-header">
                    <td 
                      colSpan={field.columns.length} 
                      style={{ 
                        backgroundColor: "#e9ecef", 
                        fontWeight: "bold", 
                        padding: "10px",
                        border: "1px solid #ccc" 
                      }}
                    >
                      {row.tool}
                    </td>
                  </tr>
                );
              }

              // --- STANDARD ROW RENDERING ---
              return (
                <tr key={rowIndex}>
                  {field.columns.map((col) => (
                    <td 
                      key={col.key}
                      // Apply width to data cells as well to ensure alignment
                      style={{ width: col.width || "auto" }}
                    >
                      {col.readOnly ? (
                        <div className="readonly-wrapper">
                          {row[col.key] || ""}
                        </div>
                      ) : col.type === "textarea" ? (
                        <textarea
                          value={row[col.key] || ""}
                          onChange={(e) => handleCellChange(rowIndex, col.key, e.target.value)}
                          readOnly={col.computed}
                        />
                      ) : col.type === "select" ? (
                        <select
                          value={row[col.key] || ""}
                          onChange={(e) => handleCellChange(rowIndex, col.key, e.target.value)}
                          disabled={col.computed}
                        >
                          <option value="">Select...</option>
                          {col.options?.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type={col.type}
                          value={row[col.key] || ""}
                          onChange={(e) => handleCellChange(rowIndex, col.key, e.target.value)}
                          readOnly={col.computed}
                        />
                      )}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {!isFixedTable && (
        <button type="button" onClick={addRow} style={{ marginTop: 10 }}>
          + Add Row
        </button>
      )}
    </div>
  );
};

export default TableRenderer;