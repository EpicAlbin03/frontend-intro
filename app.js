// ═══ Student Dashboard — app.js ═══
// This file handles login, fetching students, and creating students

const API_URL = "http://localhost:8000/api"

// ═══ Login ═══

// TODO: select the login form and add a submit event listener
// On submit:
//   1. Prevent default form submission
//   2. Get username and password from the inputs
//   3. Call the login function below
//   4. If successful, hide the login section and show the dashboard
//   5. Load the students
const loginFormEl = document.getElementById("login-form")
loginFormEl.addEventListener("submit", async (e) => {
  e.preventDefault()
  const username = loginFormEl.querySelector('input[name="username"]').value
  const password = loginFormEl.querySelector('input[name="password"]').value
  const success = await login(username, password)
  if (success) {
    showLoginSection(false)
    await loadStudents()
  }
})

const newStudentFormEl = document.getElementById("new-student-form")
newStudentFormEl.addEventListener("submit", async (e) => {
  e.preventDefault()
  const name = newStudentFormEl.querySelector('input[name="name"]').value
  const email = newStudentFormEl.querySelector('input[name="email"]').value
  const grade = newStudentFormEl.querySelector('input[name="grade"]').value
  await createStudent(name, email, grade, 1)
})

async function login(username, password) {
  // TODO: POST to API_URL + "/token/" with username and password
  // Store the access token (hint: localStorage.setItem)
  // Return true if successful, false if not
  const res = await fetch(`${API_URL}/token/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  })

  if (!res.ok) {
    console.log("Failed to login")
    return
  }

  const token = await res.json()
  localStorage.setItem("access_token", token.access)
  return true
}

function getToken() {
  return localStorage.getItem("access_token")
}

function logout() {
  localStorage.removeItem("access_token")
  localStorage.removeItem("refresh_token")
  // TODO: hide dashboard, show login section
  showLoginSection(true)
}

// ═══ Load Students ═══

async function loadStudents() {
  // TODO: GET from API_URL + "/students/"
  // Include the Authorization header with the JWT token
  // Parse the JSON response
  // Call renderStudents() with the data
  const token = getToken()

  const res = await fetch(`${API_URL}/students/`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })

  if (res.status === 403) {
    logout()
    return
  }

  if (!res.ok) {
    console.log("Failed to load students")
    return
  }

  const students = await res.json()
  renderStudents(students)
}

function renderStudents(students) {
  const list = document.querySelector("#student-list")
  list.innerHTML = ""

  // TODO: loop through students
  // For each student, create a div with class "card"
  // Set its innerHTML to show the student's name, email, and grade
  // Append it to the list
  for (const student of students) {
    const studentEl = document.createElement("div")
    studentEl.classList.add("card")
    studentEl.innerHTML = `<b>Name:</b> ${student.name} <br/> <b>Email:</b> ${student.email} <br/> <b>Grade:</b> ${student.grade}`
    const studentListEl = document.getElementById("student-list")
    studentListEl.appendChild(studentEl)
  }
}

// ═══ Create Student ═══

async function createStudent(name, email, grade, courseId) {
  // TODO: POST to API_URL + "/students/"
  // Include Content-Type and Authorization headers
  // Send the student data as JSON in the body
  // After creating, call loadStudents() to refresh the list
  const token = getToken()

  const res = await fetch(`${API_URL}/students/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name,
      email,
      grade,
      course: courseId,
    }),
  })

  if (!res.ok) {
    console.log("Failed to create student")
    return
  }

  const user = await res.json()
  await loadStudents(user)
}

// ═══ On Page Load ═══

// TODO: check if a token already exists in localStorage
// If yes, hide login and show dashboard, then loadStudents()
// If no, show login section
;(async function main() {
  const token = getToken()
  if (token) {
    showLoginSection(false)
    await loadStudents()
  } else {
    showLoginSection(true)
  }
})()

function showLoginSection(showLogin) {
  const dashboardSection = document.getElementById("dashboard-section")
  const loginSection = document.getElementById("login-section")
  const logoutBtn = document.getElementById("logout-btn")
  if (showLogin) {
    dashboardSection.classList.add("hidden")
    loginSection.classList.remove("hidden")
    logoutBtn.classList.add("hidden")
  } else {
    dashboardSection.classList.remove("hidden")
    loginSection.classList.add("hidden")
    logoutBtn.classList.remove("hidden")
  }
}
