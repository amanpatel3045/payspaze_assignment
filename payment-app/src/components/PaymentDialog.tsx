
import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import { useToast } from '@/hooks/use-toast';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { makePayment } from '@/services/paymentService';


const formSchema = z.object({
  to: z.string().email({ message: "Please enter a valid email address" }),
  from: z.enum(["BTC", "ETH"], { 
    required_error: "Please select a cryptocurrency" 
  }),
  amount: z.string()
    .refine((val) => !isNaN(Number(val)), { 
      message: "Amount must be a number" 
    })
    .refine((val) => Number(val) > 0, { 
      message: "Amount must be greater than 0" 
    }),
  description: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface PaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PaymentDialog = ({ open, onOpenChange }: PaymentDialogProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { isLoggedIn } = useUser();
  const { toast } = useToast();
  
  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      to: '',
      from: undefined,
      amount: '',
      description: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    // Check if user is authenticated before attempting payment
    if (!isLoggedIn) {
      toast({
        variant: "destructive",
        title: "Authentication required",
        description: "You need to login to make a payment",
      });
      onOpenChange(false);
      form.reset();
      // Redirect to login after a short delay
      setTimeout(() => navigate('/login'), 1500);
      setIsSubmitting(false);
      return;
    }
    
    try {
      const response = await makePayment({
        to: data.to,
        from: data.from,
        amount: parseFloat(data.amount),
        description: data.description || '',
      });
      
      onOpenChange(false);
      toast({
        title: "Payment successful!",
        description: `You sent ${data.amount} ${data.from} to ${data.to}`,
      });
      form.reset();
    } catch (error: any) {
      if (error.status === 401) {
        toast({
          variant: "destructive",
          title: "Authentication required",
          description: "You need to login to make a payment",
        });
        // Redirect to login after a short delay
        setTimeout(() => navigate('/login'), 1500);
      } else if (error.status >= 500) {
        toast({
          variant: "destructive",
          title: "Server Error",
          description: "Something went wrong on our end. Please try again later.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Payment Failed",
          description: error.message || 'Please check your payment details and try again.',
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-center">Make a Payment</DialogTitle>
          <DialogDescription className="text-center text-gray-500">
            Fill in the details to complete your payment
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
            <FormField
              control={form.control}
              name="to"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>To</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="recipient@example.com" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="from"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>From</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select cryptocurrency" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="BTC">Bitcoin (BTC)</SelectItem>
                      <SelectItem value="ETH">Ethereum (ETH)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="0.00" 
                      step="0.01"
                      min="0.01"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (Optional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="What's this payment for?" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button 
              type="submit" 
              className="w-full mt-6 bg-blue-900 hover:bg-blue-800"
              disabled={isSubmitting || !form.formState.isValid || !form.formState.isDirty}
            >
              {isSubmitting ? 'Processing...' : 'Submit Payment'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentDialog;

