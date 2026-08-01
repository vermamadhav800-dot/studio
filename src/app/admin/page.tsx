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
  Plus, Trash2, Zap, Users, MapPin, Trophy, ArrowLeft, Save, Loader2, AlertCircle, RefreshCw
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

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      console.log('Initiating Supabase Tactical Sync...');
      
      // Fetching individually to isolate failures
      const mRes = await supabase.from('missions').select('*').order('created_at', { ascending: true });
      if (mRes.error) console.error('Mission Sync Failure:', mRes.error);
      else setMissions(mRes.data || []);

      const bRes = await supabase.from('bookings').select('*').order('created_at', { ascending: false });
      if (bRes.error) console.error('Booking Sync Failure:', bRes.error);
      else setBookings(bRes.data || []);

      const sRes = await supabase.from('club_stats').select('*').order('sort_order', { ascending: true });
      if (sRes.error) console.error('Stats Sync Failure:', sRes.error);
      else setStats(sRes.data || []);

    } catch (err: any) {
      console.error('CRITICAL NETWORK ERROR:', err);
      toast({ 
        variant: "destructive", 
        title: "Tactical Link Offline", 
        description: "Failed to connect to database. Check your internet or disable AdBlockers." 
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const handleAddMission = async () => {
    if (isSubmitting) return;

    if (!newMission.day || !newMission.time || !newMission.location || !newMission.type) {
      toast({ 
        variant: "destructive", 
        title: "Incomplete Intel", 
        description: "All mission fields are mandatory." 
      });
      return;
    }

    try {
      setIsSubmitting(true);
      console.log('Deploying Mission Data:', newMission);
      
      const { data, error } = await supabase
        .from('missions')
        .insert([newMission])
        .select();

      if (error) throw error;

      toast({ title: "MISSION DEPLOYED", description: "Operation added to database." });
      setNewMission({ day: '', time: '', location: '', type: '' });
      fetchData();
    } catch (err: any) {
      console.error('Deployment Failure:', err);
      toast({ 
        variant: "destructive", 
        title: "Database Rejection", 
        description: err.message || "Link failure during write."
      });
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
      console.error('Erasure Error:', err);
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
      toast({ title: "Intelligence Updated" });
    } catch (err: any) {
      console.error('Stat Update Error:', err);
      toast({ variant: "destructive", title: "Update Failed", description: err.message });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('c9_admin_auth');
    router.replace('/');
  };

  if (!isAuthorized) return null;

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12 relative overflow-x-hidden selection:bg-primary selection:text-black">
      {/* Background noise moved to bottom to prevent blocking clicks */}
      <div className="fixed inset-0 bg-noise opacity-5 pointer-events-none z-0" />
      
      <div className="max-w-7xl mx-auto space-y-16 relative z-10 pointer-events-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 border-b border-white/10 pb-12">
          <div className="relative z-20">
            <Button variant="ghost" onClick={handleLogout} className="mb-4 -ml-4 hover:bg-white/10 text-white/50 font-black text-[10px] tracking-widest uppercase relative z-50 pointer-events-auto cursor-pointer">
              <ArrowLeft className="w-4 h-4 mr-2" /> EXIT COMMAND
            </Button>
            <h1 className={cn("text-6xl md:text-9xl font-black text-primary leading-none tracking-tighter", fontHeading.className)}>
              TACTICAL <br /> COMMAND
            </h1>
          </div>
          <div className="flex flex-col items-center gap-4 relative z-20">
            <Button 
              variant="outline" 
              onClick={() => fetchData()} 
              disabled={loading}
              className="rounded-full border-white/20 hover:border-primary text-[10px] font-black tracking-widest uppercase py-6 px-8 bg-zinc-900/40 relative z-50 pointer-events-auto cursor-pointer"
            >
              <RefreshCw className={cn("w-4 h-4 mr-2", loading && "animate-spin")} /> REFRESH SYNC
            </Button>
            <div className="bg-zinc-900 border border-white/10 p-8 rounded-[2rem] flex flex-col items-center gap-2 w-full">
               <Zap className={cn("w-8 h-8 text-primary", !loading && "animate-pulse")} />
               <span className="font-black text-[10px] tracking-widest uppercase">{loading ? "SYNCING..." : "LIVE FEED"}</span>
            </div>
          </div>
        </div>

        {/* Club Intelligence Section */}
        <div className="space-y-8 relative z-20">
           <h2 className="text-2xl font-black flex items-center gap-3 uppercase tracking-tighter"><Trophy className="w-6 h-6 text-primary" /> CLUB INTELLIGENCE</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.length > 0 ? stats.map(stat => (
                <div key={stat.id} className="bg-zinc-900/40 border border-white/5 p-8 rounded-[2rem] space-y-4 hover:border-primary/30 transition-all relative z-30 pointer-events-auto">
                   <div className="flex justify-between items-center">
                     <span className="text-[10px] font-black text-white/30 uppercase">INTEL ID: {stat.id.toUpperCase()}</span>
                     <Button variant="ghost" size="icon" onClick={() => handleUpdateStat(stat)} className="text-primary hover:bg-primary/10 relative z-40 pointer-events-auto cursor-pointer">
                        <Save className="w-4 h-4" />
                     </Button>
                   </div>
                   <Input 
                     value={stat.value} 
                     onChange={(e) => setStats(stats.map(s => s.id === stat.id ? {...s, value: e.target.value} : s))} 
                     className="bg-black/50 border-white/10 text-2xl font-black text-white h-16 rounded-xl relative z-40" 
                   />
                   <Input 
                     value={stat.label} 
                     onChange={(e) => setStats(stats.map(s => s.id === stat.id ? {...s, label: e.target.value.toUpperCase()} : s))} 
                     className="bg-black/50 border-white/10 text-[10px] font-black text-white/50 h-10 rounded-lg relative z-40" 
                   />
                </div>
              )) : (
                <div className="col-span-full py-12 text-center text-white/20 text-[10px] font-black uppercase border border-dashed border-white/10 rounded-[2rem]">
                  {loading ? "SEARCHING VAULT..." : "Intelligence Vault Empty"}
                </div>
              )}
           </div>
        </div>

        {/* Operations Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative z-20">
          {/* Mission Deployment Form */}
          <div className="lg:col-span-1 space-y-6">
            <h2 className="text-2xl font-black flex items-center gap-3 uppercase tracking-tighter"><Plus className="w-6 h-6 text-primary" /> DEPLOY MISSION</h2>
            <div className="bg-zinc-900/40 border border-white/5 p-10 rounded-[3rem] space-y-4 relative z-30 pointer-events-auto">
              <div className="space-y-4">
                <Input placeholder="DAY (e.g. MON)" value={newMission.day} onChange={(e) => setNewMission({...newMission, day: e.target.value.toUpperCase()})} className="bg-black/50 h-14 relative z-40" />
                <Input placeholder="TIME (e.g. 06:00 AM)" value={newMission.time} onChange={(e) => setNewMission({...newMission, time: e.target.value})} className="bg-black/50 h-14 relative z-40" />
                <Input placeholder="LOCATION" value={newMission.location} onChange={(e) => setNewMission({...newMission, location: e.target.value.toUpperCase()})} className="bg-black/50 h-14 relative z-40" />
                <Input placeholder="RUN TYPE" value={newMission.type} onChange={(e) => setNewMission({...newMission, type: e.target.value.toUpperCase()})} className="bg-black/50 h-14 relative z-40" />
                <Button 
                  onClick={() => handleAddMission()} 
                  disabled={isSubmitting} 
                  className="w-full bg-primary text-black font-black hover:bg-white py-8 rounded-full shadow-lg transition-all mt-4 relative z-[100] cursor-pointer pointer-events-auto"
                >
                  {isSubmitting ? <Loader2 className="animate-spin" /> : "LOG TO SCHEDULE"}
                </Button>
              </div>
            </div>
          </div>

          {/* Active Missions List */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-black flex items-center gap-3 uppercase tracking-tighter"><Zap className="w-6 h-6 text-primary" /> ACTIVE MISSIONS</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {missions.length > 0 ? missions.map(mission => (
                <div key={mission.id} className="bg-zinc-900 border border-white/5 p-8 rounded-[2rem] flex items-center justify-between hover:border-primary/50 transition-all relative z-30 pointer-events-auto">
                  <div>
                    <span className="text-primary font-black text-xs block mb-2">{mission.day} • {mission.time}</span>
                    <h4 className="font-black text-xl mb-3 uppercase">{mission.type}</h4>
                    <p className="text-white/40 text-[10px] font-black uppercase flex items-center gap-2"><MapPin className="w-3 h-3" /> {mission.location}</p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => handleDeleteMission(mission.id)} className="text-destructive hover:bg-destructive/10 h-12 w-12 relative z-40 pointer-events-auto cursor-pointer"><Trash2 className="w-5 h-5" /></Button>
                </div>
              )) : (
                <div className="col-span-full py-20 text-center border border-dashed border-white/10 rounded-[2rem] text-white/20 text-[10px] font-black uppercase">
                  {loading ? "SYNCHRONIZING..." : "No missions logged in database"}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Squad Roster Section */}
        <div className="space-y-8 pb-20 relative z-20">
          <h2 className="text-2xl font-black flex items-center gap-3 uppercase tracking-tighter"><Users className="w-6 h-6 text-primary" /> SQUAD ROSTER</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
             {bookings.length > 0 ? bookings.map(booking => {
               const mission = missions.find(m => m.id === booking.mission_id);
               return (
                 <div key={booking.id} className="bg-zinc-950/80 border border-white/5 p-8 rounded-[2rem] space-y-3 hover:border-white/20 transition-all relative z-30 pointer-events-auto">
                    <span className="text-primary font-black text-[10px] uppercase truncate block">{booking.user_email}</span>
                    <div className="text-white/40 text-[9px] font-black uppercase tracking-widest border-t border-white/5 pt-3">
                      MISSION: {mission ? `${mission.day} ${mission.type}` : 'DECOMMISSIONED'}
                    </div>
                 </div>
               )
             }) : (
               <div className="col-span-full py-20 text-center border border-dashed border-white/10 rounded-[2rem] text-white/20 text-[10px] font-black uppercase">
                 {loading ? "SEARCHING VAULT..." : "Roster empty"}
               </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
}
