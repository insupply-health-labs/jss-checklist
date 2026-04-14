export type FieldType =
  | "text"
  | "number"
  | "date"
  | "select"
  | "textarea"
  | "radio"
  | "checkbox"
  | "multiselect"
  | "table"
  | "search-select"
  | "sectionSummary";

export interface Option {
  label: string;
  value: string;
}

export interface VisibleWhenRule {
  field: string;
  equals?: any;
  notEquals?: any;
  includes?: any;
}

export interface BaseField {
  name: string;
  label: string;
  type: FieldType;
  className?: string,
  placeholder?: string;
  required?: boolean;
  helperText?: string;
  visibleWhen?: VisibleWhenRule[];
  readOnly?: boolean;
  defaultValue?:any;
}

export interface InputField extends BaseField {
  type: "text" | "number" | "date" | "textarea";
}

export interface SelectField extends BaseField {
  type: "select" | "radio" |"search-select";
  options?: Option[];
}

export interface CheckboxField extends BaseField {
  type: "checkbox";
}

export interface MultiSelectField extends BaseField {
  type: "multiselect";
  options: Option[];
}

export interface TableColumn {
  key: string;
  label: string;
  type: "text" | "number" | "textarea" | "select" | "date" | "checkbox";
  options?: Option[];
  readOnly?: boolean;
  computed?: boolean;
  width?: string; 
  calculate?: (row: Record<string, any>) => string | number;
}

export interface TableField extends BaseField {
  type: "table";
  columns: TableColumn[];
  minRows?: number;
  defaultValue?: Record<string, any>[];
  description?: string;
}

export interface SectionSummaryField extends BaseField {
  type: "sectionSummary";
  thematicArea: string;
  columns: TableColumn[];
  minRows?: number;
}

export type Field =
  | InputField
  | SelectField
  | CheckboxField
  | MultiSelectField
  | TableField
  | SectionSummaryField;

export interface FieldGroup {
  title?: string;
  fields: Field[];
  className?: string;
  description?: string,
}

export interface FormSection {
  id: string;
  title: string;
  groups: FieldGroup[];
  description?: string;
}