import React, { useState, useEffect, useContext } from "react";
import { getEmployees, deleteEmployee, updateEmployee, addEmployee } from "../../services/api";
import { AuthContext } from "../../context/AuthContext";
import EmployeeList from "./EmployeeList";
import AddEmployee from "./AddEmployee";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toTitleCase } from "../../utils/format";

const EmployeePage = () => {
  const { token, logout, user } = useContext(AuthContext);
  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await getEmployees(token);
        setEmployees(data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch employees", { autoClose: 1000 });
      }
    };
    fetchEmployees();
  }, [token]);

  const handleAddEmployee = async (formDataWithToken) => {
    const { token, ...data } = formDataWithToken;
    try {
      const res = await addEmployee(data, token);
      if (res?.employee?._id) {
        setEmployees((prev) => [...prev, res.employee]);
        toast.success("Employee added successfully!", { autoClose: 1000 });
      } else {
        toast.error(res?.message || "Failed to add employee", { autoClose: 1000 });
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to add employee", { autoClose: 1000 });
    }
  };

  const handleUpdateEmployee = async (updatedData) => {
    try {
      const res = await updateEmployee(updatedData._id, updatedData, token);
      if (res?.employee?._id) {
        setEmployees((prev) =>
          prev.map((emp) => (emp._id === res.employee._id ? res.employee : emp))
        );
        setEditingEmployee(null);
        toast.success("Employee updated successfully!", { autoClose: 1000 });
      } else {
        toast.error(res?.message || "Failed to update employee", { autoClose: 1000 });
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update employee", { autoClose: 1000 });
    }
  };

  const handleDeleteClick = (emp) => {
    setEmployeeToDelete(emp);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!employeeToDelete?._id) return;
    try {
      const res = await deleteEmployee(employeeToDelete._id, token);
      if (res?.message) {
        setEmployees((prev) => prev.filter((emp) => emp._id !== employeeToDelete._id));
        toast.success(res.message, { autoClose: 1000 });
      } else {
        toast.error("Failed to delete employee", { autoClose: 1000 });
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong", { autoClose: 1000 });
    } finally {
      setEmployeeToDelete(null);
      setIsDeleteModalOpen(false);
    }
  };

  const cancelDelete = () => {
    setEmployeeToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const handleEditEmployee = (emp) => setEditingEmployee(emp);
  const cancelEdit = () => setEditingEmployee(null);

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">
          Welcome{" "}
          <span className="text-red-900 font-bold">{toTitleCase(user?.name || "User")}</span>{" "}
          to Employee Page
        </h1>
        <button
          onClick={logout}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Logout
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3">
          <AddEmployee
            onAdd={handleAddEmployee}
            editingEmployee={editingEmployee}
            onUpdate={handleUpdateEmployee}
            cancelEdit={cancelEdit}
          />
        </div>

        <div className="md:w-2/3">
          <EmployeeList
            employees={employees}
            onEdit={handleEditEmployee}
            onDelete={handleDeleteClick}
          />
        </div>
      </div>

      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
            <p>
              Are you sure you want to delete employee{" "}
              <strong>{toTitleCase(employeeToDelete?.empName)}</strong>?
            </p>
            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeePage;
