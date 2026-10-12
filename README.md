# 🛒 বাজার দর (BazarDor)

**বাজার দর (BazarDor)** হলো একটি আধুনিক এবং responsive market price web application। এই অ্যাপের মাধ্যমে ব্যবহারকারীরা প্রয়োজনীয় পণ্যের বর্তমান বাজার মূল্য, price trends এবং বিভিন্ন বাজারের মূল্য তুলনা করতে পারে।

## 🚀 Technologies Used

- **Next.js 16** — React-based full-stack framework
- **TypeScript** — Type-safe development
- **Tailwind CSS** — Responsive and modern UI design
- **Better Auth** — User authentication
- **MongoDB** — User and authentication data storage
- **REST API** — Product and market price data
- **React Hot Toast** — Success and error notifications

## ✨ Key Features

### 1. 📊 Current Market Prices

ব্যবহারকারীরা প্রয়োজনীয় পণ্যের বর্তমান বাজার মূল্য দেখতে পারে এবং আগের সময়ের তুলনায় দাম বেড়েছে নাকি কমেছে তা জানতে পারে।

### 2. 🗂️ Category-wise Products

পণ্যগুলো category অনুযায়ী দেখা যায়:

- 🍚 চাল
- 🫘 ডাল
- 🥬 সবজি
- 🐟 মাছ
- 🍗 মাংস

### 3. 🔍 Product Details & Market Comparison

প্রতিটি পণ্যের বিস্তারিত page-এ দেখা যায়:

- বর্তমান দাম
- গতকালের দাম
- গত সপ্তাহের দাম
- গত মাসের দাম
- সর্বনিম্ন দাম
- সর্বোচ্চ দাম
- গড় দাম
- বিভিন্ন বাজারের দাম

### 4. 🔐 User Authentication

ব্যবহারকারীরা account তৈরি এবং sign in করতে পারে।

Authentication-এর জন্য ব্যবহার করা হয়েছে:

- Better Auth
- MongoDB
- Email & Password
- Google Login
- GitHub Login

### 5. 📈 Price Sorting & Price Trends

Category page-এ products বিভিন্নভাবে সাজানো যায় এবং কোন পণ্যের দাম বাড়ছে বা কমছে তা সহজেই বোঝা যায়।

### 6. 🔒 Protected Product Details

Product details route authenticated users-এর জন্য protected। Unauthenticated user product details দেখতে গেলে তাকে Sign In page-এ redirect করা হয়।

### 7. 🔔 Toast Notifications

Login, signup, logout এবং authentication-related actions-এর জন্য সুন্দর success এবং error toast notification দেখানো হয়।

### 8. ❌ Custom 404 Page

Invalid বা unknown route-এর জন্য একটি friendly custom 404 page রয়েছে, যেখানে ব্যবহারকারী সহজেই Home page-এ ফিরে যেতে পারে।

### 9. ⏳ Loading Skeleton

Product এবং category data load হওয়ার সময় user experience ভালো রাখার জন্য loading skeleton দেখানো হয়।

## 📱 Responsive Design

BazarDor responsiveভাবে তৈরি করা হয়েছে, তাই এটি বিভিন্ন screen size-এ ব্যবহার করা যায়:

- 💻 Desktop
- 📱 Mobile
- 📟 Tablet

## 🎯 Project Goal

BazarDor-এর মূল লক্ষ্য হলো প্রয়োজনীয় পণ্যের বাজারদরকে একটি সহজ, সুন্দর এবং user-friendly interface-এর মাধ্যমে ব্যবহারকারীদের সামনে তুলে ধরা।

## 📂 Main Features

- 🏠 Home page
- 🗂️ Category-based product browsing
- 🔍 Product details
- 📊 Market price comparison
- 🔐 Authentication
- 👤 User profile
- 🔔 Toast notifications
- 📱 Responsive interface
- ❌ Custom 404 page
- ⏳ Loading skeleton
