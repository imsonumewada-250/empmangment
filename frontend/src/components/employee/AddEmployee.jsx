import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { toTitleCase } from "../../utils/format";

// Department-wise Projects
const departmentProjects = {
  requretment: ["IT", "Non-IT"],
  development: ["Web Dev", "Mob Dev", "Software Dev"],
  account: ["Git", "Project"],
  hr: ["Hiring", "Induction", "Event", "Outing"],
};

const AddEmployee = ({ onAdd, editingEmployee, onUpdate, cancelEdit }) => {
  const { token } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    empName: "",
    empCode: "",
    doj: "",
    department: "",
    project: "",
  });

  // Set form data when editing employee
  useEffect(() => {
    if (editingEmployee) {
      setFormData({
        empName: editingEmployee.name || editingEmployee.empName || "",
        empCode: editingEmployee.code || editingEmployee.empCode || "",
        doj: editingEmployee.doj
          ? editingEmployee.doj.split("T")[0]
          : "",
        department: editingEmployee.department || "",
        project: editingEmployee.project || "",
      });
    } else {
      setFormData({
        empName: "",
        empCode: "",
        doj: "",
        department: "",
        project: "",
      });
    }
  }, [editingEmployee]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "department") {
      setFormData({ ...formData, department: value, project: "" });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedData = {
      ...formData,
      empName: toTitleCase(formData.empName),
      department: toTitleCase(formData.department),
      project: toTitleCase(formData.project.replace(/-/g, " ")),
    };

    if (editingEmployee) {
      await onUpdate({ ...editingEmployee, ...formattedData });
    } else {
      await onAdd({ ...formattedData, token });
      setFormData({
        empName: "",
        empCode: "",
        doj: "",
        department: "",
        project: "",
      });
    }
  };

  return (
    <div className="flex justify-center p-6 bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
          {editingEmployee ? "Edit Employee" : "Add Employee"}
        </h2>

        {/* Name */}
        <input
          name="empName"
          type="text"
          placeholder="Employee Name"
          value={formData.empName}
          onChange={handleChange}
          required
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md"
        />

        {/* Code */}
        <input
          name="empCode"
          type="text"
          placeholder="Employee Code"
          value={formData.empCode}
          onChange={handleChange}
          required
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md"
        />

        {/* DOJ */}
        <input
          name="doj"
          type="date"
          value={formData.doj}
          onChange={handleChange}
          required
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md"
        />

        {/* Department */}
        <select
          name="department"
          value={formData.department}
          onChange={handleChange}
          required
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md bg-white"
        >
          <option value="" disabled>
            Select Department
          </option>
          <option value="Requretment">Requretment</option>
          <option value="Development">Development</option>
          <option value="Account">Account</option>
          <option value="HR">HR</option>
        </select>

        {/* Project */}
        <select
          name="project"
          value={formData.project}
          onChange={handleChange}
          required
          disabled={!formData.department}
          className={`w-full mb-6 px-4 py-2 border border-gray-300 rounded-md bg-white ${
            !formData.department ? "bg-gray-100 cursor-not-allowed" : ""
          }`}
        >
          <option value="" disabled>
            {formData.department ? "Select Project" : "Select Department first"}
          </option>
          {departmentProjects[formData.department?.toLowerCase()]?.map(
            (proj) => (
              <option key={proj} value={proj}>
                {proj}
              </option>
            )
          )}
        </select>

        {/* Buttons */}
        <div className="flex justify-between items-center">
          {editingEmployee && (
            <button
              type="button"
              onClick={cancelEdit}
              className="px-4 py-2 bg-gray-300 rounded-md"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="ml-auto bg-blue-600 text-white font-semibold py-2 px-6 rounded-md hover:bg-blue-700"
          >
            {editingEmployee ? "Update Employee" : "Add Employee"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEmployee;
