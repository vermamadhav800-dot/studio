
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
  const [isAuthorized, setIsAuthorized] = useState(false);
  
  const [newMission, setNewMission] = useState({ day: '', time: '', location: '', type: '' });

  useEffect(() => {
    // Verified Authorization Check
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

      setMissions(missionsRes.data || []);
      setBookings(bookingsRes.data || []);
      setStats(statsRes.data || []);
    } catch (err: any) {
      console.warn('Sync Issue:', err.message);
      toast({ variant: "destructive", title: "Sync Failed", description: "Database is warming up. Please refresh." });
    } finally {
      setLoading(false);
    }
  }

  const handleAddMission = async () => {
    if (!newMission.day || !newMission.time || !newMission.location || !newMission.type) {
      toast({ variant: "destructive", title: "Missing Intel", description: "Complete all fields." });
      return;
    }
    const { error } = await supabase.from('missions').insert([newMission]);
    if (error) {
      toast({ variant: "destructive", title: "Error", description: error.message });
    } else {
      toast({ title: "Mission Logged", description: "Deployed to tactical schedule." });
      setNewMission({ day: '', time: '', location: '', type: '' });
      fetchData();
    }
  };

  const handleDeleteMission = async (id: string) => {
    const { error } = await supabase.from('missions').delete().eq('id', id);
    if (error) {
      toast({ variant: "destructive", title: "Erasure Failed", description: error.message });
    } else {
      toast({ title: "Mission Erased", description: "Target removed." });
      fetchData();
    }
  };

  const handleUpdateStat = async (stat: ClubStat) => {
    const { error } = await supabase
      .from('club_stats')
      .update({ value: stat.value, label: stat.label })
      .eq('id', stat.id);

    if (error) {
      toast({ variant: "destructive", title: "Update Failed", description: error.message });
    } else {
      toast({ title: "Intelligence Updated", description: "New values synced." });
      fetchData();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('c9_admin_auth');
    router.replace('/');
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
    <div className="min-h-screen bg-black text-white p-6 md:p-12 selection:bg-primary selection:text-black">
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
            <p className="text-white/40 font-black tracking-[0.3em] text-[10px] mt-4 uppercase">Operational Hub • Authorized Access</p>
          </div>
          <div className="bg-zinc-900 border border-white/10 p-10 rounded-[2.5rem] flex flex-col items-center justify-center gap-3 shadow-2xl">
             <Zap className="w-10 h-10 text-primary animate-pulse" />
             <span className="font-black text-[10px] tracking-widest">LIVE SYNC ACTIVE</span>
          </div>
        </div>

        {/* Stats Management */}
        <div className="space-y-8">
           <h2 className="text-2xl font-black flex items-center gap-3"><Trophy className="w-6 h-6 text-primary" /> SQUAD INTELLIGENCE</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.length > 0 ? stats.map(stat => (
                <div key={stat.id} className="bg-zinc-900/40 border border-white/5 p-8 rounded-[2rem] space-y-4 hover:border-primary/30 transition-all">
                   <div className="flex justify-between items-center">
                     <span className="text-[10px] font-black text-white/30 uppercase tracking-tighter">METRIC: {stat.id}</span>
                     <Button 
                       variant="ghost" 
                       size="icon" 
                       onClick={() => handleUpdateStat(stat)}
                       className="text-primary hover:bg-primary/10"
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
              )) : (
                <div className="col-span-full py-16 text-center text-white/20 text-xs font-black uppercase border border-dashed border-white/10 rounded-[2rem]">
                  {loading ? "INITIALIZING DATA..." : "No operational stats found. Configure `club_stats` table."}
                </div>
              )}
           </div>
        </div>

        {/* Missions Management */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          <div className="lg:col-span-1 space-y-6">
            <h2 className="text-2xl font-black flex items-center gap-3"><Plus className="w-6 h-6 text-primary" /> DEPLOY MISSION</h2>
            <div className="bg-zinc-900/40 border border-white/5 p-10 rounded-[3rem] space-y-4 shadow-xl">
              <Input 
                placeholder="DAY (e.g. MON)" 
                value={newMission.day} 
                onChange={(e) => setNewMission({...newMission, day: e.target.value.toUpperCase()})}
                className="bg-black/50 border-white/10 h-14"
              />
              <Input 
                placeholder="TIME (e.g. 06:00 AM)" 
                value={newMission.time} 
                onChange={(e) => setNewMission({...newMission, time: e.target.value})}
                className="bg-black/50 border-white/10 h-14"
              />
              <Input 
                placeholder="LOCATION" 
                value={newMission.location} 
                onChange={(e) => setNewMission({...newMission, location: e.target.value})}
                className="bg-black/50 border-white/10 h-14"
              />
              <Input 
                placeholder="RUN TYPE" 
                value={newMission.type} 
                onChange={(e) => setNewMission({...newMission, type: e.target.value})}
                className="bg-black/50 border-white/10 h-14"
              />
              <Button onClick={handleAddMission} className="w-full bg-primary text-black font-black hover:bg-white py-8 rounded-full shadow-lg transition-all mt-4">
                LOG TO SCHEDULE
              </Button>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-black flex items-center gap-3"><Zap className="w-6 h-6 text-primary" /> ACTIVE MISSIONS</h2>
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
                  <Button variant="ghost" size="icon" onClick={() => handleDeleteMission(mission.id)} className="text-destructive hover:bg-destructive/10 rounded-full h-12 w-12">
                    <Trash2 className="w-5 h-5" />
                  </Button>
                </div>
              )) : (
                <div className="col-span-full py-16 text-center text-white/20 text-[10px] font-black uppercase border border-dashed border-white/10 rounded-[2rem]">
                  NO ACTIVE MISSIONS LOGGED
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Squad Roster */}
        <div className="space-y-8">
          <h2 className="text-2xl font-black flex items-center gap-3"><Users className="w-6 h-6 text-primary" /> SQUAD ROSTER</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
             {bookings.length > 0 ? bookings.map(booking => {
               const mission = missions.find(m => m.id === booking.mission_id);
               return (
                 <div key={booking.id} className="bg-zinc-950/80 border border-white/5 p-8 rounded-[2rem] space-y-3 hover:border-white/20 transition-all">
                    <span className="text-primary font-black text-[10px] uppercase block tracking-tighter truncate">{booking.user_email}</span>
                    <div className="text-white/40 text-[9px] font-black uppercase tracking-widest border-t border-white/5 pt-3">
                      MISSION: {mission ? `${mission.day} ${mission.type}` : 'EXPIRED/REMOVED'}
                    </div>
                    <div className="text-white/20 text-[8px] font-bold uppercase tracking-[0.2em]">
                      LOGGED: {new Date(booking.created_at).toLocaleDateString()}
                    </div>
                 </div>
               )
             }) : (
               <div className="col-span-full py-16 text-center text-white/20 text-[10px] font-black uppercase border border-dashed border-white/10 rounded-[2rem]">
                 ROSTER IS CURRENTLY EMPTY
               </div>
             )}
          </div>
        </div>

      </div>
    </div>
  );
}
