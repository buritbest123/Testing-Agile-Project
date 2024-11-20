# Bash Coffee Shop Frontend ☕️
![Build Status](https://github.com/rsrfay/Bash-Frontend/actions/workflows/webpack.yml/badge.svg) 
[![Coverage](https://img.shields.io/badge/Coverage-97%25-brightgreen.svg)](https://github.com/rsrfay/Bash-Frontend/blob/f5cdda.../README.md)

This project is the frontend application for the **Bash Coffee Shop**, designed to provide a dynamic, user-friendly web-based interface for customers to browse the menu, search for items, sort by preferences, and customize orders before adding them to the cart.

This project was developed by using Next.js, performed unit tests using Jest, and implemented automated UI tests using Robot Framework.

## Features

### Menu Features (ECHO Group Contribution)
- **Search:** Customers can search for menu items by name.
- **Filter:** Customers can filter menu items by category and hot/cold option.
- **Sort:** Customers can sort menu items by:
  - Price (Low to High)
  - Price (High to Low)
- **Add-Ons:** Customers can customize their drinks with optional add-ons.
- **Cart Integration:** Users can add items to the cart with selected customizations.

### Menu Features (Noppo Group Contribution)
- **Update Items In Cart**: 
- **Payment**:

### User Experience
- Fully responsive design for both mobile and desktop users.
- "No results found" feedback for invalid search queries.
- Real-time updates to cart items and pricing.

---

## Tech Stack
- **Framework:** [Next.js](https://nextjs.org/) for server-side rendering and efficient page routing.
- **State Management:** React Context API for handling cart and menu state.
- **Testing Framework:** [Jest](https://jestjs.io/) for unit testing.
- **Automation:** Robot Framework for E2E testing.
- **Styling:** CSS Modules for component-level styling.

---

## Prerequisites

Before you begin, ensure you have met the following requirements:
- **Node.js:** v18.x or higher
- **npm/yarn:** Installed for package management
- **GitHub CLI (Optional):** For cloning the repository and managing branches

---

## Installation and Setup

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/rsrfay/bash-frontend.git
   cd bash-frontend
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Run the Development Server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

4. **Run Unit Tests:**
   ```bash
   npm test
   ```

5. **Run End-to-End Tests:**
   (Requires Robot Framework and Selenium)
   ```bash
   robot tests/
   ```

---

## Folder Structure

```
bash-frontend/
├── public/               # Static files (images, fonts)
├── src/
│   ├── app/              # Next.js app directory
│   ├── components/       # Reusable components
│   ├── context/          # Context providers for state management
│   ├── lib/              # Helper functions and utilities
│   └── styles/           # CSS modules
├── __tests__/            # Unit tests directory
├── automated_test_cases/ # Automated UI test cases
├── coverage/             # Jest coverage reports
└── README.md             # Project documentation
```

---

## Testing

### Unit Tests
Unit tests are written in Jest and can be run with:
```bash
npm test
```
Coverage reports will be generated under the `coverage/` directory.

### End-to-End Tests
End-to-end tests are written in the Robot Framework. To execute the tests:
1. Install [Robot Framework](https://robotframework.org/) by following this guideline [How To Install Robot Framework](https://docs.robotframework.org/docs/getting_started/testing)
2. Run:
   ```bash
   robot automated_test_cases
   ```

---
