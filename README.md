# Welcome to Mouravi: Revolutionizing Farm Management 🚜✨
## Overview
Mouravi is not just another agri-tech solution; it's a comprehensive suite of tools meticulously crafted to transform farm management. Developed in collaboration with the talented frontend wizard, Tato Jakhua, Mouravi goes beyond the ordinary, combining cutting-edge technologies to empower farmers with unprecedented insights and efficiency.

# Key Features
## 1. Smart Farm Planning
Task Organization: Seamlessly organize upcoming tasks with intuitive features.
Expense Tracking: Effortlessly manage expenses and track income for different crops.
## 2. Precision Agriculture
Per-Square-Meter Analysis: Gain a detailed insight into costs and profits for optimal decision-making.
Weather Forecast Tool: Plan tasks efficiently with an integrated weather forecast tool.
## 3. AI-Powered Insights
Disease Classification: Leverage AI capabilities to identify and classify plant diseases.
Crop Recommendations: Receive personalized crop recommendations based on lab reports.
Fertilization Strategies: Implement AI-driven fertilization strategies tailored to specific crops.
## 4. Agrocalendar Integration
Automated Planning: The built-in agrocalendar generates tasks and timelines for each crop, simplifying the planning process.
Technology Stack
Mouravi is built on a robust foundation, incorporating the following technologies:

## Frontend: Ant Design, TypeScript, Next.js
## Backend: NextJS Api Router, TensorFlow, Python, PostgreSQL, Prisma ORM
# External Image Classification API
To enhance the AI capabilities, Mouravi relies on an external image classification API for plant disease identification. The Python code for this functionality is hosted separately and should be integrated into the system for seamless operation.

# Configuration
To get Mouravi up and running smoothly, make sure to include the following environment variables in your .env file:

NEXT_PUBLIC_API_KEY  // this is API Key to get Weather Data, I used Weatherbit.io API
NEXT_PUBLIC_DOMAIN_URL=
NEXT_PUBLIC_JWT_SECRET=
OPENAI_API_KEY
JWT_SECRET_KEY
DATABASE_URL
