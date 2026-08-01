
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { fontHeading } from '@/app/fonts';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase, type Mission, type Booking, type ClubStat } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { 
  Plus, Trash2, Zap, Users, MapPin, Trophy, ArrowLeft, Save, RefreshCcw, Loader2 
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
      router.replace('/admin/login');
    }
  }, [router]);

  async function fetchData() {
    try {
      setLoading(true);
      const [missionsRes, bookingsRes, statsRes] = await Promise.all([
        supabase.from('missions').select('*').order('created_at', { ascending: true }),
        supabase.from('bookings').select('*').order('created_at', { ascending: false }),
        supabase.from('club_stats').select('*').order('sort_order', { ascending: true })
      ]);

      if (missionsRes.error) throw missionsRes.error;
      
      setMissions(missionsRes.data || []);
      setBookings(bookingsRes.data || []);
      setStats(statsRes.data || []);
    } catch (err: any) {
      console.error('Tactical Sync Error:', err.message);
      toast({ 
        variant: "destructive", 
        title: "Sync Error", 
        description: "Failed to connect to Command Database." 
      });
    } finally {
      setLoading(false);
    }
  }

  const handleAddMission = async () => {
    if (isSubmitting) return;

    // Tactical Check
    if (!newMission.day || !newMission.time || !newMission.location || !newMission.type) {
      toast({ 
        variant: "destructive", 
        title: "Missing Intel", 
        description: "All mission coordinates must be filled." 
      });
      return;
    }

    try {
      setIsSubmitting(true);
      console.log('Deploying mission:', newMission);
      
      const { data, error } = await supabase
        .from('missions')
        .insert([newMission])
        .select();

      if (error) throw error;

      toast({ 
        title: "MISSION DEPLOYED", 
        description: "Operational schedule updated successfully." 
      });
      
      setNewMission({ day: '', time: '', location: '', type: '' });
      fetchData();
    } catch (err: any) {
      console.error('Deployment Failure:', err.message);
      toast({ 
        variant: "destructive", 
        title: "Deployment Failed", 
        description: err.message || "Failed to log mission." 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteMission = async (id: string) => {
    try {
      const { error } = await supabase.from('missions').delete().eq('id', id);
      if (error) throw error;
      
      toast({ title: "Mission Erased", description: "Target removed from schedule." });
      fetchData();
    } catch (err: any) {
      toast({ variant: "destructive", title: "Erasure Failed", description: err.message });
    }
  };

  const handleUpdateStat = async (stat: ClubStat) => {
    try {
      const { error } = await supabase
        .from('club_stats')
        .update({ value: stat.value, label: stat.label })
        .eq('id', stat.id);

      if (error) throw error;
      toast({ title: "Intelligence Updated", description: "Stats synced." });
    } catch (err: any) {
      toast({ variant: "destructive", title: "Update Failed", description: err.message });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('c9_admin_auth');
    localStorage.removeItem('c9_auth_time');
    window.location.href = '/';
  };

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-6">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
        <span className="text-[10px] font-black tracking-[0.3em] text-white/40 uppercase">Authorizing Tactical Session...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12 selection:bg-primary selection:text-black relative">
      <div className="absolute inset-0 bg-noise opacity-5 pointer-events-none" />
      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 border-b border-white/10 pb-12">
          <div>
            <Button 
              variant="ghost" 
              onClick={handleLogout}
              className="mb-4 -ml-4 hover:bg-white/10 text-white/50 hover:text-white font-black tracking-widest text-[10px]"
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> EXIT COMMAND
            </Button>
            <h1 className={cn("text-6xl md:text-9xl font-black text-primary leading-none tracking-tighter", fontHeading.className)}>
              TACTICAL <br /> COMMAND
            </h1>
            <p className="text-white/40 font-black tracking-[0.3em] text-[10px] mt-4 uppercase">Operational Hub • Live Sync Active</p>
          </div>
          <div className="bg-zinc-900 border border-white/10 p-10 rounded-[2.5rem] flex flex-col items-center justify-center gap-3 shadow-2xl">
             <Zap className={cn("w-10 h-10 text-primary", !loading && "animate-pulse")} />
             <span className="font-black text-[10px] tracking-widest uppercase">{loading ? "SYNCING..." : "LIVE FEED"}</span>
          </div>
        </div>

        {/* Stats Management */}
        <div className="space-y-8">
           <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black flex items-center gap-3 uppercase tracking-tighter"><Trophy className="w-6 h-6 text-primary" /> SQUAD INTELLIGENCE</h2>
              <Button variant="outline" size="sm" onClick={fetchData} className="rounded-full border-white/10 text-[10px] font-black">
                <RefreshCcw className={cn("w-3 h-3 mr-2", loading && "animate-spin")} /> REFRESH DATA
              </Button>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map(stat => (
                <div key={stat.id} className="bg-zinc-900/40 border border-white/5 p-8 rounded-[2rem] space-y-4 group hover:border-primary/30 transition-all">
                   <div className="flex justify-between items-center">
                     <span className="text-[10px] font-black text-white/30 uppercase tracking-tighter">ID: {stat.id.toUpperCase()}</span>
                     <Button 
                       variant="ghost" 
                       size="icon" 
                       onClick={() => handleUpdateStat(stat)}
                       className="text-primary hover:bg-primary/10 opacity-60 group-hover:opacity-100"
                     >
                        <Save className="w-4 h-4" />
                     </Button>
                   </div>
                   <Input 
                     value={stat.value} 
                     onChange={(e) => setStats(stats.map(s => s.id === stat.id ? {...s, value: e.target.value} : s))}
                     className="bg-black/50 border-white/10 text-2xl font-black text-white h-16 rounded-xl"
                   />
                   <Input 
                     value={stat.label} 
                     onChange={(e) => setStats(stats.map(s => s.id === stat.id ? {...s, label: e.target.value.toUpperCase()} : s))}
                     className="bg-black/50 border-white/10 text-[10px] font-black text-white/50 h-10 rounded-lg tracking-widest"
                   />
                </div>
              ))}
           </div>
        </div>

        {/* Missions Management */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1 space-y-6">
            <h2 className="text-2xl font-black flex items-center gap-3 uppercase tracking-tighter"><Plus className="w-6 h-6 text-primary" /> DEPLOY MISSION</h2>
            <div className="bg-zinc-900/40 border border-white/5 p-10 rounded-[3rem] space-y-4 shadow-xl">
              <div className="space-y-1">
                <label className="text-[9px] font-black text-white/30 ml-2 uppercase">Day (e.g. MON)</label>
                <Input 
                  placeholder="MON" 
                  value={newMission.day} 
                  onChange={(e) => setNewMission({...newMission, day: e.target.value.toUpperCase()})}
                  className="bg-black/50 border-white/10 h-14 font-black"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-black text-white/30 ml-2 uppercase">Time (e.g. 06:00 AM)</label>
                <Input 
                  placeholder="06:00 AM" 
                  value={newMission.time} 
                  onChange={(e) => setNewMission({...newMission, time: e.target.value})}
                  className="bg-black/50 border-white/10 h-14"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-black text-white/30 ml-2 uppercase">Location</label>
                <Input 
                  placeholder="CENTRAL PARK" 
                  value={newMission.location} 
                  onChange={(e) => setNewMission({...newMission, location: e.target.value.toUpperCase()})}
                  className="bg-black/50 border-white/10 h-14"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-black text-white/30 ml-2 uppercase">Run Type</label>
                <Input 
                  placeholder="INTERVALS" 
                  value={newMission.type} 
                  onChange={(e) => setNewMission({...newMission, type: e.target.value.toUpperCase()})}
                  className="bg-black/50 border-white/10 h-14"
                />
              </div>
              <Button 
                onClick={handleAddMission} 
                disabled={isSubmitting}
                className="w-full bg-primary text-black font-black hover:bg-white py-8 rounded-full shadow-lg transition-all mt-4"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" /> LOGGING...</span>
                ) : (
                  "LOG TO SCHEDULE"
                )}
              </Button>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-black flex items-center gap-3 uppercase tracking-tighter"><Zap className="w-6 h-6 text-primary" /> ACTIVE MISSIONS</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {missions.length > 0 ? missions.map(mission => (
                <div key={mission.id} className="bg-zinc-900 border border-white/5 p-8 rounded-[2rem] flex items-center justify-between group hover:border-primary/50 transition-all shadow-xl">
                  <div>
                    <span className="text-primary font-black text-xs block mb-2 tracking-widest">{mission.day} • {mission.time}</span>
                    <h4 className="font-black text-xl mb-3 tracking-tighter uppercase">{mission.type}</h4>
                    <p className="text-white/40 text-[10px] font-black uppercase flex items-center gap-2">
                      <MapPin className="w-3 h-3" /> {mission.location}
                    </p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => handleDeleteMission(mission.id)} className="text-destructive hover:bg-destructive/10 rounded-full h-12 w-12 opacity-40 hover:opacity-100">
                    <Trash2 className="w-5 h-5" />
                  </Button>
                </div>
              )) : (
                <div className="col-span-full py-20 text-center border border-dashed border-white/10 rounded-[2rem] text-white/20 text-[10px] font-black uppercase">
                  {loading ? "SCANNING FREQUENCIES..." : "NO ACTIVE MISSIONS LOGGED"}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Squad Roster */}
        <div className="space-y-8 pb-20">
          <h2 className="text-2xl font-black flex items-center gap-3 uppercase tracking-tighter"><Users className="w-6 h-6 text-primary" /> SQUAD ROSTER</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
             {bookings.length > 0 ? bookings.map(booking => {
               const mission = missions.find(m => m.id === booking.mission_id);
               return (
                 <div key={booking.id} className="bg-zinc-950/80 border border-white/5 p-8 rounded-[2rem] space-y-3 hover:border-white/20 transition-all">
                    <span className="text-primary font-black text-[10px] uppercase block tracking-tighter truncate">{booking.user_email}</span>
                    <div className="text-white/40 text-[9px] font-black uppercase tracking-widest border-t border-white/5 pt-3">
                      MISSION: {mission ? `${mission.day} ${mission.type}` : 'DELETED'}
                    </div>
                    <div className="text-white/20 text-[8px] font-bold uppercase tracking-[0.2em]">
                      LOGGED: {new Date(booking.created_at).toLocaleDateString()}
                    </div>
                 </div>
               )
             }) : (
               <div className="col-span-full py-20 text-center border border-dashed border-white/10 rounded-[2rem] text-white/20 text-[10px] font-black uppercase">
                 ROSTER IS EMPTY
               </div>
             )}
          </div>
        </div>

      </div>
    </div>
  );
}
