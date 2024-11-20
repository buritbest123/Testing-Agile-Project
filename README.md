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
- **Next.js**
- **Node.js**

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
Please follow these setup:
- 

### Running the Tests
 ```bash
 npx jest
 ```

### 📝 Test Cases Summary
![Coverage Report](./project%20phase%202/assets/Unit_Test_CoverageReport.jpg)

#### 🎯 Coverage Report
![Coverage Report in Terminal](./project%20phase%202/assets/Unit_Test_Report.jpg)

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

![Test Report](./project%20phase%202/automated%20test%20cases/AllTestReport.png)

--------------

## 🔍 **System Test**
- Please see the documentation [System Test Documentation](./project%20phase%202/manual%20test%20cases/ManualTeat_chicky.pdf)
