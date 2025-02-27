# Angular FSD Starter

[![Feature-Sliced Design][shields-fsd-domain]](https://feature-sliced.design/)

[shields-fsd-domain]: https://img.shields.io/badge/Feature--Sliced-Design?style=for-the-badge&color=F2F2F2&labelColor=262224&logoWidth=10&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAaCAYAAAC3g3x9AAAACXBIWXMAAALFAAACxQGJ1n/vAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAABISURBVHgB7dKxCQAgDETR0w2cws0cys2cwhEUBbsggikCuVekDHwSQFlYo7Q+8KnmtHdFWMdk2cl5wSsbxGSZw8dm8pX9ZHUTMBUgGU2F718AAAAASUVORK5CYII=

This project serves as a **template** for quickly starting an Angular application using the **Feature-Sliced Design (FSD) methodology**. It includes:

- **Schematics** for generating entities quickly
- **Pre-configured ESLint rules** for enforcing architecture constraints
- **A demo project** showcasing real-world usage

---

## 🚀 Quick Start

### Installation

Clone the repository and install dependencies:

```sh
git clone <repo-url>
cd angular-fsd-starter
npm install
```

### Running the project

```sh
npm start
```

This will start the demo application.

---

## 📂 Project Structure

```
/fsd/     - Contains schematics, ESLint rules
/src/     - Main application structure following FSD principles
  ├── app/        - Root module, global providers
  ├── pages/      - Full-fledged pages (routed components)
  ├── widgets/    - Large reusable UI components (e.g., header, sidebar)
  ├── features/   - Business logic units (e.g., user authentication)
  ├── entities/   - Core domain models (e.g., user, post, comment)
  ├── shared/     - Common utilities, UI components, and helpers
```

---

## 📜 Available Scripts

```json
"format": "prettier --write \"src/**/*.{ts,html,scss}\"",
"lint": "ng lint",
"schema:i": "cd fsd && npm i",
"schema:b": "cd fsd && npm run build"
```

- **`format`** – Formats the code using Prettier
- **`lint`** – Runs ESLint with FSD-specific rules
- **`schema:i`** – Installs dependencies for custom schematics
- **`schema:b`** – Builds the schematics

---

## 🔨 Using Schematics

Before using **schematics**, install and build them:

```sh
npm run schema:i
npm run schema:b
```

Then, generate FSD entities using:

```sh
ng g fsd:page pageName
ng g fsd:widget widgetName
ng g fsd:feature featureName
ng g fsd:entity entityName
```

Schematics are located in:

```
/fsd/src/
```

---

## ESlint rules

### 1. `no-upper-layer-imports`

**Description**: Prevents imports from upper layers in the FSD hierarchy.  
**Purpose**: Ensures that lower layers (e.g., `widgets`) cannot import from higher layers (e.g., `app`).  
**Example**:

```typescript
// ❌ Forbidden: Importing from an upper layer
import { something } from '@/app';

// ✅ Allowed: Importing from the lower layer
import { something } from '@/widgets';
```

---

### 2. `no-cross-layer-imports`

**Description**: Prevents cross-imports within the same layer.  
**Purpose**: Ensures that entities within the same layer (e.g., two features) cannot import from each other directly.  
**Example**:

```typescript
// ❌ Forbidden: Cross-import within the same layer
import { something } from '@/features/FeatureA';

// ✅ Allowed: Importing from the lower layer
import { something } from '@/entity/entityA';
```

---

### 3. `public-api-imports`

**Description**: Enforces imports only through the public API (`index.ts`).  
**Purpose**: Ensures that modules expose only their public API and hide internal implementation details.  
**Exceptions**: The `app` and `shared` layers are exempt from this rule.  
**Example**:

```typescript
// ❌ Forbidden: Direct import of internal module
import { something } from '@/features/FeatureA/utils/internal';

// ✅ Allowed: Importing through the public API
import { something } from '@/features/FeatureA';
```

---

## 🏗 Demo Project

The included **demo project** is an Angular **frontend template** built on FSD principles. It uses **JSONPlaceholder** as a fake API and includes:

- **A layout system** with a header and sidebar
- **User list** and individual user profiles
- **Sidebar navigation** for user-related content
- **Dynamic content switching** with Angular routing
- **Entity-specific features:**
    - ✅ **Users** – List of users and user details
    - ✅ **Posts** – User posts and individual post view
    - ✅ **Comments** – User comments section
    - ✅ **Albums** – User albums and a separate "All Albums" view

This serves as a reference implementation for building real-world Angular apps using the **FSD methodology**.

---

## 🛠️ Technologies Used

- **Angular 19**
- **TypeScript**
- **ESLint (Custom FSD Rules)**
- **Prettier**
- **Schematics**
- **JSONPlaceholder API**

---
