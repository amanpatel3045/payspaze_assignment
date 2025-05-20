
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import PaymentDialog from '@/components/PaymentDialog';
import { useUser } from '@/contexts/UserContext';
import { LogOut } from 'lucide-react';

const Index = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { isLoggedIn, logout } = useUser();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
      {isLoggedIn && (
        <div className="absolute top-4 right-4">
          <Button 
            onClick={logout} 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1"
          >
            <LogOut size={16} /> Logout
          </Button>
        </div>
      )}
      
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-slate-800 mb-6">Payment App</h1>
        <p className="text-slate-600 mb-8 text-center">
          Click the button below to make a secure cryptocurrency payment
        </p>
        
        <Button 
          onClick={() => setIsDialogOpen(true)}
          className="w-full py-6 text-lg bg-blue-900 hover:bg-blue-800 transition-all"
        >
          Make Payment
        </Button>
      </div>
      
      <PaymentDialog 
        open={isDialogOpen} 
        onOpenChange={setIsDialogOpen} 
      />
    </div>
  );
};

export default Index;
