import React, { useState } from "react";
import { toTitleCase } from "../../utils/format";

const EmployeeList = ({ employees, onEdit, onDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(employees.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentEmployees = employees.slice(startIndex, startIndex + itemsPerPage);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="bg-white rounded-lg shadow-md h-full flex flex-col p-4">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800 text-center">
        Employee List
      </h2>

      {employees.length === 0 ? (
        <p className="text-center text-gray-500">No employees found.</p>
      ) : (
        <>
          <div className="overflow-x-auto flex-grow">
            <table className="min-w-full border border-gray-300 rounded-md">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left px-4 py-2 border-b border-gray-300 font-medium text-gray-700">
                    Sr. No
                  </th>
                  {["Name", "Code", "DOJ", "Department", "Project", "Actions"].map(
                    (header) => (
                      <th
                        key={header}
                        className="text-left px-4 py-2 border-b border-gray-300 font-medium text-gray-700"
                      >
                        {header}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {currentEmployees.map((emp, index) => (
                  <tr
                    key={emp._id || index}
                    className="odd:bg-white even:bg-gray-50 hover:bg-blue-50 transition-colors h-14"
                  >
                    <td className="px-4 py-2 border-b border-gray-300 whitespace-nowrap">
                      {startIndex + index + 1}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-300 whitespace-nowrap overflow-hidden text-ellipsis">
                      {toTitleCase(emp.empName || "N/A")}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-300 whitespace-nowrap overflow-hidden text-ellipsis">
                      {emp.empCode || "N/A"}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-300 whitespace-nowrap">
                      {emp.doj ? new Date(emp.doj).toLocaleDateString() : "N/A"}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-300 whitespace-nowrap overflow-hidden text-ellipsis">
                      {toTitleCase(emp.department || "N/A")}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-300 whitespace-nowrap overflow-hidden text-ellipsis">
                      {toTitleCase(emp.project?.replace(/-/g, " ") || "N/A")}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-300 whitespace-nowrap">
                      <button
                        onClick={() => onEdit(emp)}
                        className="text-blue-600 hover:underline mr-3"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => onDelete(emp)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end items-center gap-2 mt-4">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => goToPage(i + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === i + 1 ? "bg-blue-600 text-white" : "bg-gray-200"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default EmployeeList;
