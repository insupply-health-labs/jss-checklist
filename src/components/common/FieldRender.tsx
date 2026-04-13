import React from "react";
import type { Field } from "../../types/form";
import { isFieldVisible } from "../../utils/FormEngine";
import TableRenderer from "./TableRenderer";
import SectionSummaryTable from "./SectionSummaryTable";

interface Props {
  field: Field;
  value: any;
  formData: Record<string, any>;
  onChange: (name: string, value: any) => void;
}

const FieldRenderer: React.FC<Props> = ({ field, value, formData, onChange }) => {
  if (!isFieldVisible(field, formData)) return null;

  const containerClass = `field-container ${field.className || ""}`;

  switch (field.type) {
    case "text":
    case "number":
    case "date":
      return (
        <div className={containerClass} style={{ marginBottom: 16 }}>
          <label>{field.label}</label>
          <input
            type={field.type}
            value={value || ""}
            onChange={(e) => onChange(field.name, e.target.value)}
            style={{ width: "100%", marginTop: 6, padding: 8 }}
            readOnly={field.readOnly}
          />
          {field.helperText && <small>{field.helperText}</small>}
        </div>
      );

    case "textarea":
      return (
        <div className={containerClass} style={{ marginBottom: 16 }}>
          <label>{field.label}</label>
          <textarea
            value={value || ""}
            onChange={(e) => onChange(field.name, e.target.value)}
            style={{ width: "100%", marginTop: 6, padding: 8, minHeight: 100 }}
            readOnly={field.readOnly}
          />
          {field.helperText && <small>{field.helperText}</small>}
        </div>
      );

    case "select":
      return (
        <div className={containerClass} style={{ marginBottom: 16 }}>
          <label>{field.label}</label>
          <select
            value={value || ""}
            onChange={(e) => onChange(field.name, e.target.value)}
            style={{ width: "100%", marginTop: 6, padding: 8 }}
            disabled={field.readOnly}
          >
            <option value="">Select...</option>
            {/* Cast as SelectField to ensure options exist for TS */}
            {(field as any).options?.map((option: any) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      );

    case "search-select":
      return (
        <div className={containerClass} style={{ marginBottom: 16 }}>
          <label>{field.label}</label>
          <input
            type="text"
            list={`list-${field.name}`}
            value={value || ""}
            onChange={(e) => onChange(field.name, e.target.value)}
            placeholder="Type to search..."
            style={{ width: "100%", marginTop: 6, padding: 8 }}
            disabled={field.readOnly}
          />
          <datalist id={`list-${field.name}`}>
            {(field as any).options?.map((option: { label: string; value: string }) => (
              <option key={option.value} value={option.label} />
            ))}
          </datalist>
          {field.helperText && (
            <div style={{ marginTop: 4 }}>
              <small style={{ color: "#666" }}>{field.helperText}</small>
            </div>
          )}
        </div>
      );

    case "radio":
      return (
        <div className={containerClass} style={{ marginBottom: 16 }}>
          <label>{field.label}</label>
          <div style={{ marginTop: 6 }}>
            {(field as any).options?.map((option: any) => (
              <label key={option.value} style={{ marginRight: 16 }}>
                <input
                  type="radio"
                  name={field.name}
                  value={option.value}
                  checked={value === option.value}
                  onChange={(e) => onChange(field.name, e.target.value)}
                  disabled={field.readOnly}
                />{" "}
                {option.label}
              </label>
            ))}
          </div>
        </div>
      );

    case "checkbox":
      return (
        <div className={containerClass} style={{ marginBottom: 16 }}>
          <label>
            <input
              type="checkbox"
              checked={!!value}
              onChange={(e) => onChange(field.name, e.target.checked)}
              disabled={field.readOnly}
            />{" "}
            {field.label}
          </label>
        </div>
      );

    case "multiselect":
      return (
        <div className={containerClass} style={{ marginBottom: 16 }}>
          <label>{field.label}</label>
          <div style={{ marginTop: 8 }}>
            {(field as any).options?.map((option: any) => {
              const current = Array.isArray(value) ? value : [];
              return (
                <label key={option.value} style={{ display: "block", marginBottom: 6 }}>
                  <input
                    type="checkbox"
                    checked={current.includes(option.value)}
                    onChange={(e) => {
                      const updated = e.target.checked
                        ? [...current, option.value]
                        : current.filter((v: string) => v !== option.value);
                      onChange(field.name, updated);
                    }}
                    disabled={field.readOnly}
                  />{" "}
                  {option.label}
                </label>
              );
            })}
          </div>
        </div>
      );

    case "table":
      return (
        <div className={containerClass}>
          <TableRenderer
            field={field as any}
            value={value || []}
            formData={formData}
            onChange={(rows) => onChange(field.name, rows)}
          />
        </div>
      );

    case "sectionSummary":
      return (
        <div className={containerClass}>
          <SectionSummaryTable
            field={field as any}
            value={value || []}
            onChange={(rows) => onChange(field.name, rows)}
          />
        </div>
      );

    default:
      return null;
  }
};

export default FieldRenderer;