const API_BASE = process.env.REACT_APP_API_URL;
console.log("API BASE", API_BASE);


// Register user
export async function registerUser(data) {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

// Login user
export async function loginUser(data) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

// Add employee
export async function addEmployee(data) {
  const res = await fetch(`${API_BASE}/employees`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

// Get all employees
export async function getEmployees() {
  const res = await fetch(`${API_BASE}/employees`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  return res.json();
}

// Delete employee
export async function deleteEmployee(id) {
  const res = await fetch(`${API_BASE}/employees/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  return res.json();
}

// Update employee
export async function updateEmployee(id, data) {
  const res = await fetch(`${API_BASE}/employees/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}
