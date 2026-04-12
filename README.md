# 💊 Medz Explorer Frontend

Welcome to **Medz Explorer**, the frontend application of the MEDZ ecosystem.
This application provides an intuitive interface for exploring Algerian medicines data and offers a dedicated space for developers to understand and interact with the Medz API.

---

## 🚀 Overview

Medz Explorer is designed with two main objectives:

* **Data Exploration**: Enable users to easily search, filter, and visualize medicines data.
* **Developer Enablement**: Provide clear and interactive API documentation for seamless integration.

---

## ✨ Features

### 🔍 Data Exploration

* Browse a comprehensive database of Algerian medicines
* Advanced search (name, category, etc.)
* Dynamic filtering (manufacturer, usage, classification…)
* Detailed medicine view with structured data

### 📘 API Documentation

* Interactive API documentation (endpoints, parameters, responses)
* Authentication guidelines
* Real-world usage examples
* Developer-friendly UI for testing endpoints (future-ready for Swagger / OpenAPI integration)

### 🎨 User Experience

* Clean and responsive UI
* Material Design components
* Optimized for performance and scalability

---

## 🧱 Tech Stack

| Layer        | Technology                |
| ------------ | ------------------------- |
| Framework    | Angular 21                |
| UI Library   | Angular Material          |
| Styling      | Tailwind CSS 4            |
| Architecture | Modular & Component-Based |

---

## 📁 Project Structure

```bash
src/
├── app/
│   ├── core/           # Singleton services, interceptors, guards
│   ├── shared/         # Reusable components, pipes, directives
│   ├── features/
│   │   ├── medicines/  # Medicine exploration module
│   │   ├── docs/       # API documentation module
│   ├── layout/         # Layout components (navbar, sidebar)
│   └── app.routes.ts
├── assets/
└── environments/
```

---

## ⚙️ Getting Started

### 📋 Prerequisites

* Node.js (v18+ recommended)
* Angular CLI
* npm or yarn

---

### 📦 Installation

```bash
git clone https://github.com/your-organization/Medz-explorer.git
cd Medz-explorer
npm install
```

---

### ▶️ Run the Application

```bash
ng serve
```

Application will be available at:

👉 [http://localhost:4200/](http://localhost:4200/)

---

## 🌍 Environment Configuration

Update the environment files:

```ts
// src/environments/environment.ts
export const environment = {
  production: false,
  apiBaseUrl: 'https://api.yourdomain.com/Medz'
};
```

---

## 🔗 API Integration

### Base URL

```plaintext
https://api.yourdomain.com/Medz
```

### Authentication

All requests must include:

```http
Authorization: Bearer YOUR_API_KEY
```

### Example Request

```javascript
fetch(`${environment.apiBaseUrl}/medicine-list`, {
  headers: {
    Authorization: 'Bearer YOUR_API_KEY'
  }
})
  .then(res => res.json())
  .then(data => console.log(data));
```

---

## 🧩 Core Modules

### 🧪 Medicines Module

* List view with pagination
* Filters & search
* Medicine detail page

### 📚 Documentation Module

* API endpoints reference
* Request/response schemas
* Integration examples

---

## 🛠️ Development Guidelines

* Follow Angular best practices (standalone components, signals if applicable)
* Use a **feature-based architecture**
* Keep components **dumb** and delegate logic to services
* Centralize API calls in dedicated services
* Use interceptors for authentication & error handling

---

## 🧪 Testing

```bash
ng test
```

---

## 🚀 Future Improvements

* 🔄 API playground (try endpoints directly)
* 📊 Data visualization (charts & analytics)
* 🌐 Internationalization (i18n)
* 🔐 Role-based access (admin / developer views)
* 📱 Mobile-first enhancements

---

## 🤝 Contributing

Contributions are welcome!

Please refer to:

```
CONTRIBUTING.md
```

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙌 Acknowledgements

* Algerian public health data sources (MIPH)
* Open-source community
* Contributors to the MEDZ ecosystem

---

## 📎 Useful Links

* API Docs: [https://docs.yourdomain.com/Medz-explorer](https://docs.yourdomain.com/Medz-explorer)
* Backend Repository: (to be added)
* MEDZ Project: (to be added)
