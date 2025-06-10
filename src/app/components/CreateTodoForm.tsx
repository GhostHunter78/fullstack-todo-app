import FormLabel from "./FormLabel";
import Dropdown from "./Dropdown";
import { useRef, useState } from "react";
import { priorityOptionsArray, categoryOptionsArray } from "./DropdownArrays";
import { useDropdown } from "@/hooks/useDropdown";

function CreateTodoForm({
  handleSubmit,
  toggleForm,
}: {
  handleSubmit: (formData: FormData) => void;
  toggleForm: () => void;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const priority = useDropdown();
  const category = useDropdown();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    handleSubmit(formData);
    formRef.current.reset();
  };

  return (
    <form ref={formRef} onSubmit={onSubmit} className="p-6 space-y-5">
      <FormLabel label="Title*">
        <input
          id="titleInput"
          name="title"
          type="text"
          placeholder="Enter task title"
          required
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white text-sm"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </FormLabel>

      <FormLabel label="Description (optional)">
        <textarea
          id="descriptionInput"
          name="description"
          placeholder="Enter task description"
          maxLength={150}
          className="w-full max-h-[150px] min-h-[80px] px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white text-sm resize-none"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </FormLabel>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <FormLabel label="Priority Level*">
          <Dropdown
            placeholder="Select priority level"
            options={priorityOptionsArray}
            value={priority.selected}
            onChange={priority.setSelected}
            isOpen={priority.isOpen}
            setIsOpen={priority.setIsOpen}
            dropdownRef={priority.ref}
          />
        </FormLabel>

        <FormLabel label="Category*">
          <Dropdown
            placeholder="Select category"
            options={categoryOptionsArray}
            value={category.selected}
            onChange={category.setSelected}
            isOpen={category.isOpen}
            setIsOpen={category.setIsOpen}
            dropdownRef={category.ref}
          />
        </FormLabel>
      </div>

      <FormLabel label="Due Date (optional)">
        <input
          id="dueDateInput"
          name="dueDate"
          type="date"
          className="w-full md:w-[200px] p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white text-sm"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </FormLabel>

      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={toggleForm}
          className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-colors shadow-sm cursor-pointer"
        >
          Create Todo
        </button>
      </div>
    </form>
  );
}

export default CreateTodoForm;
