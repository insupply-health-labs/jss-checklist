import React from "react";
import type { FieldGroup } from "../../types/form";
import FieldRenderer from "./FieldRender"; 

interface Props {
  group: FieldGroup;
  formData: Record<string, any>;
  onChange: (name: string, value: any) => void;
}

const GroupRenderer: React.FC<Props> = ({ group, formData, onChange }) => {
  return (
    <div style={{ marginBottom: 28 }}>
      {group.title && <h3 style={{ marginBottom: 14 }}>{group.title}</h3>}
      {group.description && (
        <p style={{ marginBottom: 16, fontSize: "14px", color: "#666" }}>
          {group.description}
        </p>
      )}
      <div className={group.className || ""}>
        {group.fields.map((field) => (
          <FieldRenderer
            key={field.name}
            field={field}
            value={formData[field.name]}
            formData={formData}
            onChange={onChange}
          />
        ))}
      </div>
    </div>
  );
};

export default GroupRenderer;