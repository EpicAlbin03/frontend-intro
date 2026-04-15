# Student Dashboard — Standalone Frontend

## Overview

Build a standalone student dashboard using **HTML, CSS, and JavaScript** that connects to your Django API. No Django templates — just a plain .html file that fetches data from your API.

This is the exact pattern Vue.js uses under the hood. Tomorrow, you'll rebuild this in Vue in a fraction of the time.

---

## Prerequisites

Your Django backend must be running (locally or in Docker) with:

- The REST API at /api/students/ and /api/courses/
- JWT auth at /api/token/
- CORS enabled for localhost

---

## Files Provided

| File         | What to do                                                        |
| ------------ | ----------------------------------------------------------------- |
| `index.html` | Structure is started — fill in the TODOs                          |
| `style.css`  | Some basics done — add styling for cards, grid, forms, responsive |
| `app.js`     | Functions are outlined — implement the logic                      |

Open `index.html` directly in your browser (File > Open or double-click). No server needed for the frontend — it's just static files.

---

## Requirements

### HTML

- Login form with username and password inputs
- A section for the student list (card grid)
- A form to add a new student (name, email, grade, course)

### CSS

- Styled nav bar with flexbox
- Card styling (white background, padding, border-radius, shadow)
- Card grid using flexbox with wrapping
- Form styling (inputs, labels, button)
- Responsive: cards stack on mobile (media query at 768px)
- A .hidden class that hides elements (display: none)

### JavaScript

- Login: POST to /api/token/, store the JWT token in localStorage
- Load students: GET /api/students/ with Authorization header, render as cards
- Create student: POST to /api/students/ with form data, refresh the list
- Show/hide: toggle between login section and dashboard based on auth state
- On page load: check if a token exists, auto-show dashboard if logged in

---

## How to Test

1. Start your Django backend: `docker-compose up` (or `python manage.py runserver`)
2. Open `index.html` in your browser
3. Log in with your Django superuser credentials
4. You should see your students loaded from the API
5. Try adding a new student through the form

---

## Bonus Challenges

- [ ] **Delete button** — add a delete button on each card that calls DELETE on the API
- [ ] **Search/filter** — add a search box that filters displayed students (client-side, no API call)
- [ ] **Dark mode** — add a toggle button that switches colors using classList.toggle
- [ ] **Loading spinner** — show a loading message while fetch is in progress
- [ ] **Error handling** — show user-friendly messages for 401 (expired token) and network errors

---

## When You're Done

```bash
git add .
git commit -m "Session 8: Standalone student dashboard with HTML, CSS, JS"
git push
```

**Next session**: Vue.js — rebuild this dashboard with components, reactivity, and modern tooling
