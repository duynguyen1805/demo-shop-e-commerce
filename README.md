# E-commerce - Frontend Project

This project is a frontend application built with Next.js, TailwindCSS and no BackEnd. Store sample data is created and stored on Firebase service Firestore. Below is a comprehensive guide to help you get started and understand the project structure, features, and setup instructions.

_Account Demo:_

- **account:** demo
- **password:** demodemo

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
<!-- - [Usage](#usage)
  - [User Features](#user-features)
  - [Admin Features](#admin-features) -->
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)

## Features

### User Features

- **Product Search:** Find products easily using the search functionality.
- **Product Categories:** Browse products by specific categories.
- **Product Details:** View detailed information about each product.
- **Cart Management:** Add, remove, and view items in the shopping cart.
- **Order Management:** Track and manage your orders.
- **Checkout:** Secure payment processing for purchases.
- **Account Management:** Manage your account details and settings.

Developing...

- **Authentication:**
  - Phone number verification for user registration.
  - Login with account credentials.
  - Login via Google and Facebook.
- **QR Code Payment:** Utilize MoMo QR code for ad payment.
- **Live Chat:** Integrated with Firestore for real-time chat.
- **Notifications:**
  - Status updates for posted ads.
  - Message notifications.

### Admin Features

- **User Management:** Manage user accounts.
- **Order Management:**
  - Confirm orders.
  - Update order status.
  - Handle shipping.
  - Manage all steps of order processing.
- **Product Management:**
  - Add new products.
  - Update product images, information, prices, and promotions.
- **Create Product Posts:** Create detailed posts for new products.
- **Revenue Statistics:** Generate monthly and yearly revenue reports.

## Tech Stack

- **Next.js:** React framework for server-side rendering and static site generation.
- **TailwindCSS:** Utility-first CSS framework for styling.
- **Firebase Firestore:** NoSQL database for real-time chat and store database of website.

## Getting Started

### Prerequisites

- Node.js (v14.x or later)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```
   git clone https://github.com/duynguyen1805/demo-shop-e-commerce.git
   cd demo-shop-e-commerce
   ```
2. **Install dependencies:**
   ```
   npm install
   # or
   yarn install
   ```
3. **Install dependencies:**
   Create a .env.local file and configure the following environment variables:

   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
   ```

### Running the Application

    To start the development server:

    ```
    npm run dev
    # or
    yarn dev
    ```

Open http://localhost:3000 with your browser to see the result.

### Project Structure

```
demo-e-comerce/
├── components/ # Reusable UI components
├── app/ # Next.js app routes
│ ├── api/ # API routes
│ ├── admin/ # Admin dashboard pages
│ ├── auth/ # Authentication pages
│ └── ... # Other pages
├── public/ # Static assets
├── styles/ # Global styles and TailwindCSS configuration
├── utils/ # Utility functions
├── firebase.config.tsx/ # Firebase configuration and initialization
├── .env.local # Environment variables
├── next.config.js # Next.js configuration
├── tailwind.config.js # TailwindCSS configuration
└── package.json # Project metadata and scripts

```

### Configuration

Customize your TailwindCSS setup by editing the tailwind.config.js file. Firebase settings can be modified in the firebase/ directory.

### Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any feature additions, bug fixes, or improvements.
