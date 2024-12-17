# **E-Commerce Application**

The **E-Commerce Application** provides a fully functional platform for online shopping. Users can browse and purchase products, vendors can manage their shops and inventories, and admins can monitor the entire system. Built with modern technologies, it ensures scalability, high performance, and user-friendly features.

---

## **🔗 Links**
- **Live Frontend URL**: [https://e-commerce-frontend-lovat-eta.vercel.app/]  
- **Live Backend URL**: [https://e-commerce-backend-vert-one.vercel.app/]  
- **GitHub Repository**: [ https://github.com/SuparnaAishee/ECommerce-Application-Server]  

---

## Admin Credentials
email : suparnad806@gmail.com
password: admin123

## **🚀 Technologies Used**

### **Backend**
- **Node.js** with **Express** - RESTful API server.
- **PostgreSQL** - Relational database using Prisma ORM.
- **JWT Authentication** - Secure token-based authentication.
- **Cloudinary** - File upload management for images.
- **Bcrypt** - Password encryption.
- **Nodemailer** - For email notifications and password resets.
- **Zod** - Schema-based data validation.

### **Frontend**
- **Next.js** - Server-side rendering and optimized front-end framework.
- **React.js** - Component-based user interface.
- **Tailwind CSS** - Utility-first responsive CSS framework.
- **NextUI** - Prebuilt modern UI components.
- **Context API** - State management for application-wide data.

### **Payment Integration**
- **Aamarpay** - Secure online payment processing.

---

## **💻 Run Locally**

### **Backend Setup**
1. **Clone the Backend Repository**  
   ```bash
   git clone <your-backend-repository-url>
   cd backend
2. **Install Dependencies**
     npm install

3. **Set Up Environment Variables**
    DATABASE_URL="Your PostgreSQL URL"
PORT=3000
BCRYPT_SALT_ROUND=12
JWT_ACCESS_SECRET="your_access_secret"
JWT_ACCESS_EXPIRES_IN="10d"
JWT_REFRESH_SECRET="your_refresh_secret"
JWT_REFRESH_EXPIRES_IN="30d"
RESET_PASSWORD_SECRET="your_reset_secret"
RESET_PASSWORD_EXPIRES_IN="10m"
CLOUDINARY_CLOUD_NAME="your_cloudinary_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"
PAYMENT_URL="Aamarpay or Stripe payment URL"
CLIENT_BASE_URL="http://localhost:3000"

4. **Run Database Migrations**
   npx prisma migrate dev
5. **Start the Backend Server**
   npm run dev
6. **Frontend Setup Clone the Frontend Repository**
git clone <your-frontend-repository-url>
cd frontend
7.**Install Dependencies**

bash
Copy code
npm install
8.**Set Up Environment Variables**
Create a .env.local file and add the following variable:

plaintext
Copy code
NEXT_PUBLIC_BASE_URL="http://localhost:3000/api/v1"
Start the Frontend Server

bash
Copy code
npm run dev
The frontend server will be running at http://localhost:3001.

## **🔑 Key Features & Functionality**
**Admin**
Manage users, vendors, and their shops.
Dynamically add, edit, or delete product categories.
Monitor platform transactions and blacklist vendor shops.
**Vendor**
Create and manage shop details (name, logo, description).
Add, edit, delete, or duplicate products quickly.
View customer reviews and manage product orders.
**Customer**
Browse products with advanced search and filtering.
Add products to the cart and apply coupon codes at checkout.
Compare up to three products from the same category.
View purchase history and leave reviews for purchased products.
Follow specific vendor shops for a personalized experience.
Additional Features
Flash Sale: Timed discounts on selected products.
Recent Products: Track the last 10 viewed products.
Responsive Design: Fully optimized for mobile and desktop.
Pagination: Efficient handling of large datasets for products, orders, and reviews.
Secure Payments: Integration with Aamarpay or Stripe for seamless payment processing.
## **📦 Deployment Instructions**
Backend Deployment
Deploy the backend using platforms like Render, Heroku, or Supabase.
Update the environment variables to match production credentials.
Frontend Deployment
Deploy the frontend using platforms like Vercel, Netlify, or AWS Amplify.
Update NEXT_PUBLIC_BASE_URL to point to your live backend URL.
## **🛠️ Known Issues**
Coupon validation edge cases may need further optimization.
Product comparison works only for items in the same category.
