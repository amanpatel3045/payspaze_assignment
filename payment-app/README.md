
# Crypto Payment Application

A single-page application built with React and shadcn/ui that simulates cryptocurrency payments.

## Features

- Payment button that opens a dialog
- Payment form with validation
- Cryptocurrency selection (BTC, ETH)
- Mock API integration with different response scenarios
- Error handling for various HTTP status codes
- Responsive design

## Build Instructions

1. Clone the repository
```bash
git clone [repository-url]
cd [repository-name]
```

2. Install dependencies
```bash
npm install
```

3. Run the development server
```bash
npm run dev
```

4. Build for production
```bash
npm run build
```

## Usage Instructions

1. Open the application in your browser
2. Click the "Make Payment" button
3. Fill in the required fields:
   - To: A valid email address
   - From: Select either BTC or ETH
   - Amount: Enter a positive number
   - Description: Optional field
4. Click the "Submit Payment" button
5. The system will randomly simulate different API responses:
   - Success (70% probability): Shows a success toast
   - 400 Bad Request (10% probability): Shows an error message
   - 401 Unauthorized (10% probability): Redirects to login page
   - 500 Server Error (10% probability): Shows a server error message

## What I Would Add With More Time

1. **Authentication System**:
   - Implement a real authentication flow with JWT
   - Add protected routes
   - Remember user preferences

2. **Enhanced Features**:
   - Transaction history page
   - Payment confirmation step
   - QR code generation for payments
   - Support for more cryptocurrencies
   - Real-time exchange rates

3. **Improved Testing**:
   - Unit tests for components with Jest/React Testing Library
   - Integration tests for form validation
   - E2E tests with Cypress

4. **Advanced Error Handling**:
   - More detailed error messages
   - Retry mechanisms for failed payments
   - Offline mode support

5. **Performance Optimizations**:
   - Code splitting
   - Memoization of expensive operations
   - Service worker for offline capabilities

## Assumptions Made

1. **User Experience**:
   - Users are familiar with cryptocurrency payments
   - Simple, clean interface is preferred over complex UI

2. **Technical**:
   - Mock API is sufficient for demonstrating functionality
   - Form validation happens on the client side
   - No persistent data storage is required

3. **Security**:
   - In a real application, payments would require authentication
   - Sensitive information would be transmitted securely

4. **Error Scenarios**:
   - Random error generation is acceptable for demonstration purposes
   - The 401 status should redirect to a login page

5. **Accessibility**:
   - Basic accessibility standards are implemented through shadcn/ui components
   - Forms are navigable via keyboard

## Dependencies

- React
- React Router DOM
- React Hook Form
- Zod (for form validation)
- shadcn/ui (UI component library)
- Tailwind CSS (for styling)
