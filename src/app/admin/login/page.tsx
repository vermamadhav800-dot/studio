
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { fontHeading } from '@/app/fonts';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Shield, Zap, ArrowRight, Lock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Hardcoded Tactical Key: madhav@123321
    if (password === 'madhav@123321') {
      toast({
        title: "Tactical Override Success",
        description: "Redirecting to Command Center...",
      });
      
      // Store session locally for persistence in this prototype
      localStorage.setItem('c9_admin_auth', 'true');
      
      // Immediate push with a fallback
      setTimeout(() => {
        router.push('/admin');
      }, 100);
    } else {
      toast({
        variant: "destructive",
        title: "Access Denied",
        description: "Invalid credentials. Incident has been logged.",
      });
      setPassword('');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 selection:bg-primary selection:text-black">
      <div className="absolute inset-0 bg-noise opacity-10 pointer-events-none" />
      
      <div className="max-w-md w-full space-y-8 relative z-10">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-zinc-900 border border-white/10 rounded-[2rem] flex items-center justify-center mx-auto shadow-[0_0_50px_rgba(186,255,0,0.1)]">
            <Shield className="w-10 h-10 text-primary" />
          </div>
          <div>
            <h1 className={cn("text-5xl font-black text-white tracking-tighter", fontHeading.className)}>
              TACTICAL <br /> <span className="text-primary">OVERRIDE</span>
            </h1>
            <p className="text-white/40 font-black tracking-[0.2em] text-[10px] uppercase mt-4">Restricted Command Access Only</p>
          </div>
        </div>

        <form onSubmit={handleLogin} className="bg-zinc-900/50 border border-white/10 p-10 rounded-[3rem] backdrop-blur-3xl space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-white/40 uppercase tracking-widest px-2">Encryption Key</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
              <Input 
                type="password"
                placeholder="••••••••••••"
                autoComplete="off"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-black border-white/10 pl-12 h-14 font-mono text-primary text-xl"
                autoFocus
              />
            </div>
          </div>

          <Button 
            type="submit" 
            disabled={loading || !password}
            className="w-full bg-primary text-black font-black hover:bg-white py-8 rounded-full shadow-[0_0_30px_rgba(186,255,0,0.2)] group transition-all"
          >
            {loading ? "AUTHORIZING..." : (
              <span className="flex items-center gap-2">
                INITIATE COMMAND <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            )}
          </Button>

          <div className="flex items-center justify-center gap-2 pt-4 opacity-40">
            <Zap className="w-3 h-3 text-primary animate-pulse" />
            <span className="text-[8px] font-bold text-white tracking-[0.3em] uppercase">Security Protocols Active</span>
          </div>
        </form>

        <p 
          onClick={() => router.push('/')}
          className="text-center text-[10px] font-black text-white/20 hover:text-white cursor-pointer uppercase tracking-widest transition-colors"
        >
          Abort Mission & Exit
        </p>
      </div>
    </div>
  );
}
