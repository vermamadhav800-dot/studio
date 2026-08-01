'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { fontHeading } from '@/app/fonts';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Shield, ArrowRight, Lock, Loader2, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    // Clear any stale sessions on mount
    localStorage.removeItem('c9_admin_auth');
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setError(false);

    console.log('INITIATING AUTHORIZATION SEQUENCE...');

    // Tactical Key Check
    if (password === 'madhav@123321') {
      console.log('KEY ACCEPTED. REDIRECTING...');
      
      // Lock session
      localStorage.setItem('c9_admin_auth', 'true');
      localStorage.setItem('c9_auth_time', Date.now().toString());
      
      toast({
        title: "AUTHORIZATION GRANTED",
        description: "Moving to Command Center...",
      });

      // Hard Tactical Redirect - Bypassing router for maximum reliability
      window.location.href = '/admin';
    } else {
      console.warn('KEY REJECTED.');
      setError(true);
      toast({
        variant: "destructive",
        title: "ACCESS DENIED",
        description: "Invalid tactical key.",
      });
      setPassword('');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor - Strictly non-interactive */}
      <div className="absolute inset-0 bg-noise opacity-5 pointer-events-none" />
      <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-md w-full space-y-8 relative z-50">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-zinc-900 border border-white/10 rounded-[2rem] flex items-center justify-center mx-auto shadow-xl mb-6">
            <Shield className="w-10 h-10 text-primary" />
          </div>
          <div>
            <h1 className={cn("text-5xl font-black text-white tracking-tighter leading-none", fontHeading.className)}>
              TACTICAL <br /> <span className="text-primary">OVERRIDE</span>
            </h1>
          </div>
        </div>

        <form onSubmit={handleLogin} className={cn(
          "bg-zinc-900/80 border p-10 rounded-[3.5rem] backdrop-blur-3xl space-y-6 shadow-2xl relative z-50 pointer-events-auto",
          error ? "border-destructive/50" : "border-white/10"
        )}>
          <div className="space-y-3">
             <label className="text-[10px] font-black text-white/40 uppercase tracking-widest block ml-2">Encryption Key</label>
             <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
              <Input 
                type="password"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError(false);
                }}
                className="bg-black border-white/10 pl-12 h-16 font-mono text-primary text-2xl focus:border-primary transition-all rounded-2xl relative z-50 pointer-events-auto"
                autoFocus
                required
              />
            </div>
          </div>

          <Button 
            type="submit" 
            disabled={loading || !password}
            className="w-full bg-primary text-black font-black hover:bg-white py-8 rounded-full shadow-[0_0_30px_rgba(186,255,0,0.2)] group transition-all relative z-50 pointer-events-auto cursor-pointer"
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
          Abort Mission & Exit
        </p>
      </div>
    </div>
  );
}
