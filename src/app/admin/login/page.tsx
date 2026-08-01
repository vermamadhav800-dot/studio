'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { fontHeading } from '@/app/fonts';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Shield, ArrowRight, Lock, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    localStorage.removeItem('c9_admin_auth');
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);

    if (password === 'madhav@123321') {
      localStorage.setItem('c9_admin_auth', 'true');
      toast({
        title: "ACCESS GRANTED",
        description: "Inbound to Command Center...",
      });
      // Force tactical redirect
      window.location.href = '/admin';
    } else {
      toast({
        variant: "destructive",
        title: "ACCESS DENIED",
        description: "Invalid credentials.",
      });
      setPassword('');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-noise opacity-5 pointer-events-none" />
      
      <div className="max-w-md w-full space-y-8 relative z-50">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-zinc-900 border border-white/10 rounded-[2.5rem] flex items-center justify-center mx-auto shadow-xl mb-6">
            <Shield className="w-10 h-10 text-primary" />
          </div>
          <h1 className={cn("text-5xl font-black text-white tracking-tighter leading-none", fontHeading.className)}>
            TACTICAL <br /> <span className="text-primary">OVERRIDE</span>
          </h1>
        </div>

        <form onSubmit={handleLogin} className="bg-zinc-900/80 border border-white/10 p-10 rounded-[3.5rem] backdrop-blur-3xl space-y-6 shadow-2xl relative z-50 pointer-events-auto">
          <div className="space-y-3">
             <label className="text-[10px] font-black text-white/40 uppercase tracking-widest block ml-2">Encryption Key</label>
             <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
              <Input 
                type="password"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-black border-white/10 pl-12 h-16 font-mono text-primary text-2xl focus:border-primary transition-all rounded-2xl relative z-50 pointer-events-auto"
                autoFocus
                required
              />
            </div>
          </div>

          <Button 
            type="submit" 
            disabled={loading || !password}
            className="w-full bg-primary text-black font-black hover:bg-white py-8 rounded-full shadow-lg group transition-all relative z-50 pointer-events-auto cursor-pointer"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" /> AUTHORIZING...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                INITIATE COMMAND <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            )}
          </Button>
        </form>

        <p 
          onClick={() => window.location.href = '/'}
          className="text-center text-[10px] font-black text-white/20 hover:text-white cursor-pointer uppercase tracking-widest pt-4 relative z-50 pointer-events-auto"
        >
          Exit Protocol
        </p>
      </div>
    </div>
  );
}
