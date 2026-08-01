'use client';

import { useState, useEffect, useCallback } from 'react';
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
  const { toast } = useToast();
  const [missions, setMissions] = useState<Mission[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [stats, setStats] = useState<ClubStat[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  
  const [newMission, setNewMission] = useState({ day: '', time: '', location: '', type: '' });

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      
      const { data: mData, error: mErr } = await supabase.from('missions').select('*').order('created_at', { ascending: true });
      const { data: bData, error: bErr } = await supabase.from('bookings').select('*').order('created_at', { ascending: false });
      const { data: sData, error: sErr } = await supabase.from('club_stats').select('*').order('sort_order', { ascending: true });

      if (mErr) console.error('Missions Error:', mErr);
      else setMissions(mData || []);

      if (bErr) console.error('Bookings Error:', bErr);
      else setBookings(bData || []);

      if (sErr) console.error('Stats Error:', sErr);
      else setStats(sData || []);

    } catch (err: any) {
      console.error('SYSTEM SYNC FAILURE:', err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const authStatus = localStorage.getItem('c9_admin_auth');
    if (authStatus === 'true') {
      setIsAuthorized(true);
      fetchData();
    } else {
      window.location.href = '/admin/login';
    }
  }, [fetchData]);

  const handleAddMission = async () => {
    if (isSubmitting) return;
    if (!newMission.day || !newMission.time || !newMission.location || !newMission.type) {
      toast({ variant: "destructive", title: "Intel Missing", description: "All fields required." });
      return;
    }

    try {
      setIsSubmitting(true);
      const { error } = await supabase.from('missions').insert([newMission]);
      if (error) throw error;

      toast({ title: "MISSION LOGGED", description: "Database updated." });
      setNewMission({ day: '', time: '', location: '', type: '' });
      fetchData();
    } catch (err: any) {
      toast({ variant: "destructive", title: "Deployment Failed", description: err.message });
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
      const { error } = await supabase.from('club_stats').update({ 
        value: stat.value, 
        label: stat.label 
      }).eq('id', stat.id);
      
      if (error) throw error;
      toast({ title: "INTELLIGENCE UPDATED", description: `${stat.label} synced.` });
    } catch (err: any) {
      toast({ variant: "destructive", title: "Stat Sync Failed", description: err.message });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('c9_admin_auth');
    window.location.href = '/';
  };

  if (!isAuthorized) return <div className="bg-black min-h-screen" />;

  return (
    <div className="min-h-screen bg-black text-white p-6 relative">
      <div className="max-w-7xl mx-auto space-y-16 relative z-50">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 border-b border-white/10 pb-12">
          <div>
            <Button variant="ghost" onClick={handleLogout} className="mb-4 -ml-4 hover:bg-white/10 text-white/50 font-black text-[10px] tracking-widest uppercase cursor-pointer z-50">
              <ArrowLeft className="w-4 h-4 mr-2" /> EXIT COMMAND
            </Button>
            <h1 className={cn("text-6xl md:text-9xl font-black text-primary leading-none tracking-tighter", fontHeading.className)}>
              COMMAND <br /> CENTER
            </h1>
          </div>
          <Button 
            variant="outline" 
            onClick={fetchData} 
            className="rounded-full border-white/20 hover:border-primary py-6 px-8 bg-zinc-900/40 cursor-pointer z-50"
          >
            <RefreshCw className={cn("w-4 h-4 mr-2", loading && "animate-spin")} /> REFRESH SYNC
          </Button>
        </div>

        {/* Missions Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1 space-y-6">
            <h2 className="text-2xl font-black uppercase tracking-tighter flex items-center gap-2"><Plus className="text-primary" /> DEPLOY MISSION</h2>
            <div className="bg-zinc-900/60 border border-white/10 p-10 rounded-[3rem] space-y-4">
              <Input placeholder="DAY (e.g. MON)" value={newMission.day} onChange={(e) => setNewMission({...newMission, day: e.target.value.toUpperCase()})} className="bg-black/50 h-14" />
              <Input placeholder="TIME (e.g. 06:00 AM)" value={newMission.time} onChange={(e) => setNewMission({...newMission, time: e.target.value})} className="bg-black/50 h-14" />
              <Input placeholder="LOCATION" value={newMission.location} onChange={(e) => setNewMission({...newMission, location: e.target.value.toUpperCase()})} className="bg-black/50 h-14" />
              <Input placeholder="RUN TYPE" value={newMission.type} onChange={(e) => setNewMission({...newMission, type: e.target.value.toUpperCase()})} className="bg-black/50 h-14" />
              <Button 
                onClick={handleAddMission} 
                disabled={isSubmitting} 
                className="w-full bg-primary text-black font-black hover:bg-white py-8 rounded-full shadow-lg transition-all mt-4 cursor-pointer z-50"
              >
                {isSubmitting ? <Loader2 className="animate-spin" /> : "LOG TO SCHEDULE"}
              </Button>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-black uppercase tracking-tighter flex items-center gap-2"><Zap className="text-primary" /> ACTIVE SCHEDULE</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {missions.length > 0 ? missions.map(mission => (
                <div key={mission.id} className="bg-zinc-900/40 border border-white/5 p-8 rounded-[2rem] flex items-center justify-between group hover:border-white/20 transition-all">
                  <div>
                    <span className="text-primary font-black text-xs block mb-1">{mission.day} • {mission.time}</span>
                    <h4 className="font-black text-xl uppercase">{mission.type}</h4>
                    <p className="text-white/40 text-[10px] uppercase">{mission.location}</p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => handleDeleteMission(mission.id)} className="text-white/20 hover:text-destructive h-12 w-12 cursor-pointer z-50">
                    <Trash2 className="w-5 h-5" />
                  </Button>
                </div>
              )) : (
                <div className="col-span-full py-20 text-center border border-dashed border-white/10 rounded-[2rem] text-white/20 text-[10px] font-black uppercase">
                  {loading ? "SEARCHING VAULT..." : "No missions logged"}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="space-y-8">
           <h2 className="text-2xl font-black uppercase tracking-tighter flex items-center gap-2"><Trophy className="text-primary" /> CLUB INTEL (STATS)</h2>
           <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {stats.map(stat => (
                <div key={stat.id} className="bg-zinc-900/40 border border-white/5 p-8 rounded-[2rem] space-y-4">
                   <div className="flex justify-between items-center">
                     <span className="text-[10px] font-black text-white/30 uppercase">ID: {stat.id}</span>
                     <Button variant="ghost" size="icon" onClick={() => handleUpdateStat(stat)} className="text-primary hover:bg-primary/20 cursor-pointer z-50">
                        <Save className="w-4 h-4" />
                     </Button>
                   </div>
                   <div className="space-y-2">
                     <label className="text-[8px] font-black text-white/40 uppercase tracking-widest block">Value</label>
                     <Input 
                        value={stat.value} 
                        onChange={(e) => setStats(stats.map(s => s.id === stat.id ? {...s, value: e.target.value} : s))} 
                        className="bg-black/50 border-white/10 h-14 font-black" 
                     />
                   </div>
                   <div className="space-y-2">
                     <label className="text-[8px] font-black text-white/40 uppercase tracking-widest block">Label</label>
                     <Input 
                        value={stat.label} 
                        onChange={(e) => setStats(stats.map(s => s.id === stat.id ? {...s, label: e.target.value.toUpperCase()} : s))} 
                        className="bg-black/50 border-white/10 h-10 text-[10px] font-black" 
                     />
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* Roster Section */}
        <div className="space-y-8 pb-20">
          <h2 className="text-2xl font-black uppercase tracking-tighter flex items-center gap-2"><Users className="text-primary" /> SQUAD ROSTER (BOOKINGS)</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
             {bookings.map(booking => (
               <div key={booking.id} className="bg-zinc-950/80 border border-white/5 p-8 rounded-[2rem] hover:border-primary/50 transition-all">
                  <span className="text-primary font-black text-[10px] uppercase truncate block tracking-tighter">{booking.user_email}</span>
                  <div className="text-white/40 text-[9px] font-black uppercase mt-2 pt-2 border-t border-white/5">
                    Ref ID: {booking.id.slice(0,8)}
                  </div>
               </div>
             ))}
             {bookings.length === 0 && !loading && (
                <div className="col-span-full py-10 text-center border border-dashed border-white/10 rounded-[2rem] text-white/20 text-[10px] font-black uppercase">
                  No squad members registered yet.
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
}
