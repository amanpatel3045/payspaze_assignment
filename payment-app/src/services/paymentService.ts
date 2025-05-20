// services/paymentService.ts
export interface PaymentRequest {
  to: string;
  from: string;
  amount: number;
  description?: string;
}

export interface PaymentResponse {
  success: boolean;
  transactionId?: string;
  message?: string;
}

export const makePayment = async (paymentData: PaymentRequest): Promise<PaymentResponse> => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  if (!isLoggedIn) {
    const error: any = new Error('Authentication required');
    error.status = 401;
    throw error;
  }

  try {
    const response = await fetch('http://localhost:4000/payments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...paymentData,
        transactionId: `TX-${Math.random().toString(36).substring(2, 10).toUpperCase()}`
      }),
    });

    if (!response.ok) {
      const error: any = new Error('Failed to send payment');
      error.status = response.status;
      throw error;
    }

    const data = await response.json();
    return {
      success: true,
      transactionId: data.transactionId,
      message: 'Payment saved to mock server',
    };
  } catch (error: any) {
    throw error;
  }
};
