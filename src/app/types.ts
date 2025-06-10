export interface DropdownOption {
  value: string;
  label: string;
  color?: string;
}

export interface Todo {
  id: string;
  title: string;
  description: string | null;
  priority: string;
  category: string;
  due_date: string | null;
  created_at: string;
  completed: boolean;
}

export interface DropdownProps {
  placeholder: string;
  options: DropdownOption[];
  value: string | null;
  onChange: (value: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  dropdownRef: React.RefObject<HTMLDivElement>;   
  name: string; 
}

export interface UseDropdownReturn {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  selected: string | null;
  setSelected: (value: string | null) => void;
  ref: React.RefObject<HTMLDivElement>;
}
