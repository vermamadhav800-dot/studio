'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { fontHeading } from '@/app/fonts';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase, type Mission, type Booking, type ClubStat } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { 
  Plus, Trash2, Zap, Users, MapPin, Trophy, ArrowLeft, Save, Loader2, RefreshCw
} from 'lucide-react';

export default function AdminPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [missions, setMissions] = useState<Mission[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [stats, setStats] = useState<ClubStat[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  
  const [newMission, setNewMission] = useState({ day: '', time: '', location: '', type: '' });

  useEffect(() => {
    const authStatus = localStorage.getItem('c9_admin_auth');
    if (authStatus === 'true') {
      setIsAuthorized(true);
      fetchData();
    } else {
      window.location.href = '/admin/login';
    }
  }, []);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      console.log('SYNCING TACTICAL DATABASE...');
      
      // Fetching individually so one failure doesn't block the rest
      const { data: mData, error: mErr } = await supabase.from('missions').select('*').order('created_at', { ascending: true });
      if (mErr) console.error('Mission Fetch Failure:', mErr);
      else setMissions(mData || []);

      const { data: bData, error: bErr } = await supabase.from('bookings').select('*').order('created_at', { ascending: false });
      if (bErr) console.error('Booking Fetch Failure:', bErr);
      else setBookings(bData || []);

      const { data: sData, error: sErr } = await supabase.from('club_stats').select('*').order('sort_order', { ascending: true });
      if (sErr) console.error('Stats Fetch Failure:', sErr);
      else setStats(sData || []);

    } catch (err: any) {
      console.error('SYSTEM SYNC ERROR:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleAddMission = async () => {
    if (isSubmitting) return;

    if (!newMission.day || !newMission.time || !newMission.location || !newMission.type) {
      toast({ variant: "destructive", title: "Intel Missing", description: "All mission fields required." });
      return;
    }

    try {
      setIsSubmitting(true);
      console.log('DEPLOYING MISSION:', newMission);
      
      const { error } = await supabase.from('missions').insert([newMission]);

      if (error) {
        console.error('Deployment Failure:', error);
        toast({ variant: "destructive", title: "Mission Rejected", description: error.message });
      } else {
        toast({ title: "MISSION DEPLOYED", description: "Database updated successfully." });
        setNewMission({ day: '', time: '', location: '', type: '' });
        fetchData();
      }
    } catch (err: any) {
      console.error('CRITICAL DEPLOYMENT ERROR:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteMission = async (id: string) => {
    try {
      const { error } = await supabase.from('missions').delete().eq('id', id);
      if (error) throw error;
      toast({ title: "Mission Erased" });
      fetchData();
    } catch (err: any) {
      toast({ variant: "destructive", title: "Erasure Failed" });
    }
  };

  const handleUpdateStat = async (stat: ClubStat) => {
    try {
      const { error } = await supabase.from('club_stats').update({ value: stat.value, label: stat.label }).eq('id', stat.id);
      if (error) throw error;
      toast({ title: "Intelligence Updated" });
    } catch (err: any) {
      toast({ variant: "destructive", title: "Update Failed" });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('c9_admin_auth');
    window.location.href = '/';
  };

  if (!isAuthorized) return <div className="bg-black min-h-screen" />;

  return (
    <div className="min-h-screen bg-black text-white p-6 relative overflow-x-hidden">
      {/* Background Decor - Non-interactive */}
      <div className="fixed inset-0 bg-noise opacity-5 pointer-events-none z-0" />
      
      <div className="max-w-7xl mx-auto space-y-16 relative z-50 pointer-events-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 border-b border-white/10 pb-12">
          <div>
            <Button variant="ghost" onClick={handleLogout} className="mb-4 -ml-4 hover:bg-white/10 text-white/50 font-black text-[10px] tracking-widest uppercase relative z-50 pointer-events-auto">
              <ArrowLeft className="w-4 h-4 mr-2" /> EXIT COMMAND
            </Button>
            <h1 className={cn("text-6xl md:text-9xl font-black text-primary leading-none tracking-tighter", fontHeading.className)}>
              COMMAND <br /> CENTER
            </h1>
          </div>
          <Button 
            variant="outline" 
            onClick={() => fetchData()} 
            className="rounded-full border-white/20 hover:border-primary py-6 px-8 bg-zinc-900/40 relative z-50 pointer-events-auto cursor-pointer"
          >
            <RefreshCw className={cn("w-4 h-4 mr-2", loading && "animate-spin")} /> REFRESH SYNC
          </Button>
        </div>

        {/* Deployment Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative z-50 pointer-events-auto">
          <div className="lg:col-span-1 space-y-6">
            <h2 className="text-2xl font-black uppercase tracking-tighter flex items-center gap-2"><Plus className="text-primary" /> DEPLOY MISSION</h2>
            <div className="bg-zinc-900/60 border border-white/10 p-10 rounded-[3rem] space-y-4 relative z-50 pointer-events-auto">
              <Input placeholder="DAY (e.g. MON)" value={newMission.day} onChange={(e) => setNewMission({...newMission, day: e.target.value.toUpperCase()})} className="bg-black/50 h-14 relative z-50 pointer-events-auto" />
              <Input placeholder="TIME (e.g. 06:00 AM)" value={newMission.time} onChange={(e) => setNewMission({...newMission, time: e.target.value})} className="bg-black/50 h-14 relative z-50 pointer-events-auto" />
              <Input placeholder="LOCATION" value={newMission.location} onChange={(e) => setNewMission({...newMission, location: e.target.value.toUpperCase()})} className="bg-black/50 h-14 relative z-50 pointer-events-auto" />
              <Input placeholder="RUN TYPE" value={newMission.type} onChange={(e) => setNewMission({...newMission, type: e.target.value.toUpperCase()})} className="bg-black/50 h-14 relative z-50 pointer-events-auto" />
              <Button 
                onClick={handleAddMission} 
                disabled={isSubmitting} 
                className="w-full bg-primary text-black font-black hover:bg-white py-8 rounded-full shadow-lg transition-all mt-4 relative z-50 pointer-events-auto cursor-pointer"
              >
                {isSubmitting ? <Loader2 className="animate-spin" /> : "LOG TO DATABASE"}
              </Button>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-black uppercase tracking-tighter flex items-center gap-2"><Zap className="text-primary" /> ACTIVE SCHEDULE</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {missions.length > 0 ? missions.map(mission => (
                <div key={mission.id} className="bg-zinc-900/40 border border-white/5 p-8 rounded-[2rem] flex items-center justify-between relative z-50 pointer-events-auto">
                  <div>
                    <span className="text-primary font-black text-xs block mb-1">{mission.day} • {mission.time}</span>
                    <h4 className="font-black text-xl uppercase">{mission.type}</h4>
                    <p className="text-white/40 text-[10px] uppercase">{mission.location}</p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => handleDeleteMission(mission.id)} className="text-destructive h-12 w-12 relative z-50 pointer-events-auto cursor-pointer">
                    <Trash2 className="w-5 h-5" />
                  </Button>
                </div>
              )) : (
                <div className="col-span-full py-20 text-center border border-dashed border-white/10 rounded-[2rem] text-white/20 text-[10px] font-black uppercase">
                  {loading ? "SEARCHING VAULT..." : "Schedule Empty"}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="space-y-8 relative z-50 pointer-events-auto">
           <h2 className="text-2xl font-black uppercase tracking-tighter flex items-center gap-2"><Trophy className="text-primary" /> CLUB INTEL</h2>
           <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {stats.map(stat => (
                <div key={stat.id} className="bg-zinc-900/40 border border-white/5 p-8 rounded-[2rem] space-y-4 relative z-50 pointer-events-auto">
                   <div className="flex justify-between items-center">
                     <span className="text-[10px] font-black text-white/30 uppercase">ID: {stat.id}</span>
                     <Button variant="ghost" size="icon" onClick={() => handleUpdateStat(stat)} className="text-primary relative z-50 pointer-events-auto cursor-pointer">
                        <Save className="w-4 h-4" />
                     </Button>
                   </div>
                   <Input value={stat.value} onChange={(e) => setStats(stats.map(s => s.id === stat.id ? {...s, value: e.target.value} : s))} className="bg-black/50 border-white/10 h-14 font-black relative z-50" />
                   <Input value={stat.label} onChange={(e) => setStats(stats.map(s => s.id === stat.id ? {...s, label: e.target.value.toUpperCase()} : s))} className="bg-black/50 border-white/10 h-10 text-[10px] font-black relative z-50" />
                </div>
              ))}
           </div>
        </div>

        {/* Roster Section */}
        <div className="space-y-8 pb-20 relative z-50 pointer-events-auto">
          <h2 className="text-2xl font-black uppercase tracking-tighter flex items-center gap-2"><Users className="text-primary" /> SQUAD ROSTER</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
             {bookings.map(booking => (
               <div key={booking.id} className="bg-zinc-950/80 border border-white/5 p-8 rounded-[2rem] relative z-50 pointer-events-auto">
                  <span className="text-primary font-black text-[10px] uppercase truncate block">{booking.user_email}</span>
                  <div className="text-white/40 text-[9px] font-black uppercase mt-2 pt-2 border-t border-white/5">
                    ID: {booking.id.slice(0,8)}
                  </div>
               </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
}
