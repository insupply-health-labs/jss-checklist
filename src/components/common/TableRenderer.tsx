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
                <th key={col.key}>
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {field.columns.map((col) => (
                  <td key={col.key}>
                    {col.readOnly ? (
                      /* FIX: Using a div instead of an input allows text wrapping.
                        Uses the 'readonly-wrapper' class from App.css.
                      */
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
            ))}
          </tbody>
        </table>
      </div>

      {/* Hide Add Row button if it's a pre-filled guideline table */}
      {!isFixedTable && (
        <button type="button" onClick={addRow} style={{ marginTop: 10 }}>
          + Add Row
        </button>
      )}
    </div>
  );
};

export default TableRenderer;