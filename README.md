# **chickyShiningSparklingStar_CuteCute🤩❤️💫⭐**
[![Run Jest Tests](https://github.com/beenayaknon/ITCS473-Project-Phase2-ChickyShiningSparklingStar_CuteCute/actions/workflows/main.yml/badge.svg)](https://github.com/beenayaknon/ITCS473-Project-Phase2-ChickyShiningSparklingStar_CuteCute/actions/workflows/main.yml)
![Coverage](https://codecov.io/gh/beenayaknon/ITCS473-Project-Phase2-ChickyShiningSparklingStar_CuteCute/branch/main/graph/badge.svg)

## **ITCS473 - Software Quality Assurance and Testing**
### **Mahidol University, ICT**

---

## ☕️ **Bash Coffee Project**
Bash Coffee url (Available until the end of November): [http://10.34.112.130:3000/](http://10.34.112.130:3000/) (Access using Mahidol Wifi only)

**Bash Coffee Website** aims to provide a convenient and friendly experience for ordering, managing, and interacting with the coffee shop's services.

---

## 💻 **Built With**
- **Next.js** (![Static Badge](https://img.shields.io/badge/Next.js-blue?style=for-the-badge&logo=Next.js&labelColor=black))
- **Node.js** (![Static Badge](https://img.shields.io/badge/Node.js-%2374ab66?style=for-the-badge&logo=Node.js&labelColor=white))
---

## 🚀 **Features**

- **Search:** Customers can search for menu items by name.
- **Filter:** Customers can filter menu items by category and hot/cold option.
- **Sort:** Customers can sort menu items by:
    - Price (Low to High)
    - Price (High to Low)
- **Add-Ons:** Customers can customize their drinks with optional add-ons.
- **Cart Integration**: Users can add items to the cart with selected customizations.
- **Payment:** Users can confirm their orders and make payment via QR code.
- **Discount and Membership:** Users can apply discounts, collection points, redeem points as members.

---

## 📁 **File Structure**
```
└── Project_Phase_2/
    └── BashCoffee-CompanyA-backend/
        ├── Database bakery/
        │   ├── bakery.js
        │   └── bakeryController.js
        ├── Database beverage/
        │   ├── beverage.js
        │   └── beverageController.js
        ├── Database member/
        │   ├── member.js
        │   ├── memberController.js
        │   └── pointsController.js
        │── Database promotion/
        │   ├── promotion.js
        │   └── promotionController.js
        ├── exportRecords.js
        ├── jest.config.js
        ├── package-lock.json
        ├── package.json
        ├── server.js
        ├── Testpost.html
        └── README.md
```

---

## 💻 **Installation**

**Clone the repository** or download the source code.

    git clone https://github.com/beenayaknon/ITCS473-Project-Phase2-ChickyShiningSparklingStar_CuteCute.git

1. **run Frontend**    

    ```bash
    cd "project phase 2\Bash-Frontend"
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Run the development server:**

    ```bash
    npm run dev
    ```
--------------------------------------



#. **For MacOs or Linux Distribution**

    cd into backend
    cd "project phase 2\BashCoffee-CompanyA-backend"
    // if system did not have MongoDB. please follow this [step](https://www.mongodb.com/docs/mongodb-shell/install/)
   
    // start MongoDB service
    sudo systemctl start mongod

    // Start node
    node server.js

# **For Windows: In the terminal**
    npm install
    npm init -y
    npm install express
    npm install cors
    npm install mongodb
    npm install nodemon

4. **Run Server**
    ```bash
    npm start
    ```

- **For export CSV**
    ```bash
    npm install json2csv mongodb
    npm install csv-writer
    ```
- **If want to export the CSV**
    ```bash
    node exportRecords.js
    ```
---
## 🔍 **Unit Testing**

### Test Environment Setup
To set up the unit testing environment for **BashCoffee-CompanyA-backend**, follow these steps:

1. Ensure **Node.js** and **npm** are installed on your system.
2. Navigate to the backend directory:
   ```bash
   cd "project phase 2\BashCoffee-CompanyA-backend"
   ```
3. Install dependencies:
   ```bash   
   npm install --save-dev jest
   ```

### Running the Tests
To execute the unit tests, run the following command in the terminal:
```bash
npx jest
```

### 📝 Test Cases Summary
This project utilizes **Jest** for unit testing. The following modules have been tested:
1. **Database beverage**
  - Coverage: 100% statements, 100% branches, 100% functions, 100% lines
2. **Database member**
  - Coverage: 95.23% statements, 90.9% branches, 100% functions, 95.23% lines
3. **Database promotion**
  - Coverage: 100% statements, 100% branches, 100% functions, 100% lines

### 🎯 Coverage Report
![Coverage Report](./project%20phase%202/assets/Unit_Test_CoverageReport.jpg)

#### 📊 Test Output in Terminal
![Coverage Report in Terminal](https://github.com/user-attachments/assets/a261c747-7bcb-4fd1-8ca4-459d8e99fcfa)

### Coverage Highlights
- **Statements Covered:** 98.41%
- **Branches Covered:** 96.77%
- **Functions Covered:** 100%
- **Lines Covered:** 98.33%

### Module Details
#### 1. Database Beverage
- **Covered Features:**
  - Fetching all beverages with filters (e.g., name and type)
  - Throwing errors for invalid criteria or empty results
  - Retrieving beverages with image URLs

#### 2. Database Member
- **Covered Features:**
  - Adding points to a member's account
  - Redeeming points and handling constraints
  - Managing member data

#### 3. Database Promotion
- **Covered Features:**
  - Fetching all promotions or by `Pro_ID`
  - Adding new promotions with validation
  - Updating promotions
  - Deleting promotions with error handling for invalid IDs

### 💡 Notes
- Ensure MongoDB is running before executing the tests.
- Coverage reports and test results will be available in the terminal or coverage report files after running the tests.

--------------

## 🔍 **Automated UI Testing**

We use Robot frameworks for Automated UI Testing.
### Running the Tests
    
    robot --output output.xml --log log.html --report report.html TestAddCart_1.robot TestAddCart_2.robot TestAddCart_3.robot TestFilterBakery.robot TestFilterCoffee.robot TestFilterMatcha.robot TestSearch_1.robot TestSearch_2.robot TestSearch_3.robot


### 📝 Test Cases Summary

- Test Filter Function

- Test Search Function
    Check whether the function returns search results with names that contain the input keyword or not. The test actions are as follows:
  - Search Matcha
  - Search banana
  - Search กาแฟ

- Test Add Item To Cart
    Check Add Item To Cart Function can search, select item, selecting Type, Add-Ons, and Sweetness, and add item to cart successfully and navigate back to Homepage. The test actions are as follows:
  - Add Caramel Fresh Milk, select cool type/Oat milk add-on/sweetness 50%.
  - Add Orange Matcha, select cool type/sweetness 75%, with adding Donut to cart.
  - Add Cream Cheese Danish to cart.
    
#### 1. User Registration Test
**Purpose:** 

**Procedure:**
- 

#### 🎯 Test Report
![Test Report](./project%20phase%202/automated%20test%20cases/All_Test_Report.png)

--------------

## 🔍 **System Test**
- Please see the documentation [System Test Documentation](./project%20phase%202/manual%20test%20cases/ManualTest_chicky.pdf)
