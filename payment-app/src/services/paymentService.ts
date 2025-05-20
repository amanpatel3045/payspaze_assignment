

interface PaymentRequest {
  to: string;
  from: string;
  amount: number;
  description?: string;
}

interface PaymentResponse {
  success: boolean;
  transactionId?: string;
  message?: string;
}


const mockApiResponse = async (data: PaymentRequest): Promise<PaymentResponse> => {

  await new Promise(resolve => setTimeout(resolve, 1000));
  

  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  
 
  if (!isLoggedIn) {
    const error: any = new Error('Authentication required');
    error.status = 401;
    throw error;
  }
  

  const scenario = Math.random();
  
  if (scenario < 0.8) {
    return {
      success: true,
      transactionId: `TX-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
      message: 'Payment processed successfully'
    };
  }
  

  if (scenario < 0.9) {
    const error: any = new Error('Invalid payment details');
    error.status = 400;
    throw error;
  }
  

  const error: any = new Error('Server error occurred');
  error.status = 500;
  throw error;
};


export const makePayment = async (paymentData: PaymentRequest): Promise<PaymentResponse> => {
  try {

    if (!paymentData.to || !paymentData.from || !paymentData.amount) {
      const error: any = new Error('Missing required payment information');
      error.status = 400;
      throw error;
    }
    
 
    const response = await mockApiResponse(paymentData);
    return response;
  } catch (error: any) {
  
    throw error;
  }
};
