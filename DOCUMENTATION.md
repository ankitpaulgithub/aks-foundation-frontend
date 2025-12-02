# AKS Foundation - School Management Dashboard

## 📋 Project Overview

This is a **Next.js-based School Management Dashboard** for managing student admissions, tracking fees, and maintaining educational records. The application provides a complete solution for school administration with features like student registration, fee management, and academic tracking.

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 15.4.2 | React framework with file-based routing |
| **React** | 19.1.0 | UI library |
| **Redux Toolkit** | 2.11.0 | State management |
| **Tailwind CSS** | 4.x | Utility-first CSS framework |
| **Axios** | 1.11.0 | HTTP client for API requests |
| **Formik + Yup** | 2.4.6 / 1.6.1 | Form handling and validation |
| **ApexCharts** | 5.3.1 | Data visualization/charts |
| **React Icons** | 5.5.0 | Icon library |
| **pdf-lib** | 1.17.1 | PDF generation |

---

## 📁 Project Structure

```
landing-page/
├── public/                     # Static assets
│   ├── form.html              # HTML template for PDF generation
│   └── login/                 # Login page assets
│
├── src/
│   ├── components/            # Reusable UI components
│   │   ├── ApexChart.jsx      # Chart component wrapper
│   │   ├── CommonTable.jsx    # Reusable table component
│   │   ├── FeatureHighlight.jsx
│   │   ├── Footer.jsx
│   │   ├── Navbar.tsx
│   │   └── education/         # Education module components
│   │       ├── Layout.jsx     # Main layout wrapper
│   │       ├── Navbar.jsx     # Top navigation bar
│   │       ├── Sidebar.jsx    # Side navigation menu
│   │       └── dashboard/     # Dashboard-specific components
│   │
│   ├── constants/             # Static data & configuration
│   │   ├── BankOptions.js     # Bank list, form field configs
│   │   └── StatesAndDistrict.js # Indian states & districts data
│   │
│   ├── mocks/                 # Mock data for testing
│   │   └── student.js
│   │
│   ├── pages/                 # Next.js pages (file-based routing)
│   │   ├── _app.tsx           # App wrapper with Redux Provider
│   │   ├── _document.tsx      # Custom document
│   │   ├── index.tsx          # Landing page
│   │   ├── api/               # API routes
│   │   │   ├── admission-form.js  # PDF generation API
│   │   │   └── hello.ts
│   │   ├── login/             # Login page
│   │   └── (education)/       # Education module routes
│   │       ├── dashboard/     # Main dashboard
│   │       ├── students/      # Student management
│   │       │   ├── admission/ # New student admission form
│   │       │   ├── list/      # Student listing
│   │       │   ├── details/   # Student details view
│   │       │   └── [id]/      # Dynamic student edit route
│   │       └── fee/           # Fee management
│   │           ├── receipt/
│   │           ├── pending/
│   │           ├── demand/
│   │           └── search/
│   │
│   ├── slices/                # Redux slices
│   │   └── userSlice.js       # User state management
│   │
│   ├── store/                 # Redux store configuration
│   │   └── Store.js
│   │
│   └── styles/
│       └── globals.css        # Global styles with Tailwind
│
├── package.json
├── next.config.ts
├── tsconfig.json
├── postcss.config.mjs
└── tailwind.config.js
```

---

## 🎯 Core Features

### 1. **Dashboard** (`/dashboard`)
- Overview cards showing session, birthdays, pending enquiries
- Fee collection summary (Cash, UPI, Total)
- Quick access buttons to common actions
- Student statistics with pie chart visualization
- Collection trends charts

### 2. **Student Management**

#### 2.1 New Admission (`/students/admission`)
Comprehensive multi-section admission form:

| Section | Fields |
|---------|--------|
| **Personal Details** | Name, DOB, Gender, Blood Group, Marital Status, Category, Aadhaar |
| **Contact Info** | Mobile (3), WhatsApp, Email |
| **Address** | Residential & Permanent addresses, State, District, Pin Code |
| **Academic Info** | Class 10th, 12th, Graduation, Post-Graduation details |
| **Bank Details** | Bank name, Account number, IFSC code, Branch |
| **Documents** | Photo, Certificates, Aadhaar, Bank passbook |
| **Office Use** | Reg No, Enrollment, Batch, Payments |

**Key Features:**
- Auto-generated password: `mobile@FirstInitial`
- Batch name computed from month + year selection
- State → District cascading dropdowns (static data)
- Client-side input validation/sanitization
- IFSC code format enforcement (4 letters + 7 digits)
- Auto-calculate percentage from marks
- Same address checkbox sync
- PwD (Person with Disability) conditional fields

#### 2.2 Student List (`/students/list`)
- Sortable, filterable table
- Columns: ID, Reg No, Name, Father Name, Class, Section, Gender, Mobile
- Actions: View, Print, Edit, Fee

#### 2.3 Student Details (`/students/details`)
- Search by Roll No/Name/Father's Name
- Detailed view of all student information
- Edit and Print actions
- PDF form printing capability

### 3. **Fee Management**
- Fee Receipt
- Fee Pending
- Fee Demand
- Fee Search by ID

---

## 🧩 Key Components

### `Layout.jsx`
Main wrapper component that provides consistent structure:
```jsx
<div>
  <Navbar />
  <div className="flex">
    <Sidebar />
    <main>{children}</main>
  </div>
</div>
```

### `Sidebar.jsx`
Navigation menu with sections:
- Dashboard
- Students (Admission, List, Details)
- Fee (Receipt, Pending, Demand, Search)
- Exams

### `CommonTable.jsx`
Reusable table component with:
- Custom headers configuration
- Sortable columns
- Custom row rendering via `sampleRow` prop
- Empty state handling

### `ApexChart.jsx`
Wrapper for ApexCharts displaying student statistics.

---

## 📝 Form Field Configuration

All form field configurations are centralized in `src/constants/BankOptions.js`:

```javascript
// Personal details fields
export const personalDetailsFields = [
  { name: 'firstName', label: 'First Name', required: true, type: 'text' },
  { name: 'middleName', label: 'Middle Name', required: false, type: 'text' },
  // ...
]

// Bank options
export const bankOptions = [
  { value: 'State Bank of India (SBI)', label: 'State Bank of India (SBI)' },
  // ... 50+ banks
]

// Document fields
export const documentFields = [
  { name: 'studentImage', label: 'Student Image', required: true, accept: 'image/*' },
  // ...
]
```

---

## 🔄 State Management (Redux)

### Store Configuration
```javascript
// src/store/Store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../slices/userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
```

### User Slice
```javascript
// src/slices/userSlice.js
const userSlice = createSlice({
  name: 'user',
  initialState: { name: '', age: null },
  reducers: {
    setUser: (state, action) => { /* ... */ },
    clearUser: (state) => { /* ... */ },
  },
});
```

---

## 🗂️ Data Flow

### Admission Form Submission
```
User fills form → Client-side validation → Build payload object
     ↓
Console log payload (currently no API call)
     ↓
Save to localStorage for persistence
```

### Student Details Retrieval
```
Page loads → Read 'admissionForm' from localStorage
     ↓
Parse and map to studentData object
     ↓
Render in organized sections
```

---

## 🌐 API Routes

### `/api/admission-form`
Generates HTML/PDF from template:
```javascript
export default async function handler(req, res) {
  const filePath = path.join(process.cwd(), "public/form.html");
  let html = fs.readFileSync(filePath, "utf-8");
  
  // Replace placeholders with data
  const data = { name: "...", father: "...", dob: "..." };
  Object.keys(data).forEach(key => {
    html = html.replace(`{{${key}}}`, data[key]);
  });
  
  res.setHeader("Content-Type", "text/html");
  res.send(html);
}
```

---

## 🎨 Styling

The project uses **Tailwind CSS** with custom color scheme:
- Primary: Orange (`#d96302`, `bg-orange-50`)
- Accent: Blue, Green, Purple for different sections
- Background: Gray-100
- Cards: White with shadow

Common patterns:
```css
/* Card styling */
.card { @apply bg-white rounded-lg shadow-md p-6; }

/* Section headers */
.section-header { @apply text-xl font-semibold text-gray-800 mb-4 border-b-2 pb-2; }

/* Form inputs */
.form-input { @apply w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500; }
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>

# Navigate to project
cd landing-page

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts
| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server at `localhost:3000` |
| `npm run build` | Create production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

---

## 📱 Pages & Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | `index.tsx` | Landing page |
| `/login` | `login/index.jsx` | Login page |
| `/(education)/dashboard` | `dashboard/index.jsx` | Main dashboard |
| `/(education)/students/admission` | `admission/index.jsx` | New student form |
| `/(education)/students/list` | `list/index.jsx` | Student listing |
| `/(education)/students/details` | `details/index.jsx` | Student details |
| `/(education)/students/[id]` | `[id]/index.jsx` | Edit student |
| `/(education)/fee/receipt` | Fee receipt page |
| `/(education)/fee/pending` | Pending fees |
| `/(education)/fee/demand` | Fee demand |
| `/(education)/fee/search` | Search fees |

---

## 🔐 Input Validation

### Client-Side Sanitization (in `handleInputChange`)

| Field | Validation |
|-------|------------|
| **IFSC Code** | Uppercase, 4 letters + 7 digits, max 11 chars |
| **Mobile** | Digits only, max 10 chars |
| **Pin Code** | Digits only, max 6 chars |
| **Aadhaar** | Digits only, max 12 chars |
| **Account Number** | Digits only, max 17 chars |
| **Reg/Enrollment No** | Prefix preserved (`CM7RKYP-` / `CM7RSHA-`) |

---

## 💾 Local Storage Keys

| Key | Purpose |
|-----|---------|
| `admissionForm` | Stores submitted admission form data |
| `admissionFormPayload` | Stores prepared submission payload |
| `student` | Stores student data for editing |

---

## 🔮 Future Enhancements

- [ ] Backend API integration for CRUD operations
- [ ] User authentication & authorization
- [ ] Role-based access control
- [ ] Export to Excel/PDF
- [ ] Bulk student import
- [ ] Email/SMS notifications
- [ ] Fee payment gateway integration
- [ ] Reports & analytics
- [ ] Mobile responsive improvements

---

## 📄 License

Private project - All rights reserved.

---

## 👥 Contributors

- AKS Foundation Development Team
