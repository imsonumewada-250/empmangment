<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Employee;

class EmployeeController extends Controller
{
    /**
     * Get all employees
     */
    public function index()
    {
        return response()->json(Employee::all());
    }

    /**
     * Store a newly created employee
     */
public function store(Request $request)
{
    $employee = Employee::create([
        'name' => $request->empName,   // mapping
        'code' => $request->empCode,   // mapping
        'doj' => $request->doj,
        'department' => $request->department,
        'project' => $request->project,
    ]);

    return response()->json([
        'message' => 'Employee added successfully',
        'employee' => $employee
    ], 201);
}


    /**
     * Display the specified employee
     */
    public function show(string $id)
    {
        $employee = Employee::findOrFail($id);
        return response()->json($employee);
    }

    /**
     * Update the specified employee
     */
    public function update(Request $request, string $id)
    {
        $employee = Employee::findOrFail($id);
        $employee->update($request->all());

        return response()->json([
            'message' => 'Employee updated successfully',
            'employee' => $employee
        ]);
    }

    /**
     * Remove the specified employee
     */
    public function destroy(string $id)
    {
        $employee = Employee::findOrFail($id);
        $employee->delete();

        return response()->json(['message' => 'Employee deleted successfully']);
    }
}
