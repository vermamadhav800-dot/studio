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
  Plus, Trash2, Zap, Users, MapPin, Trophy, ArrowLeft, Save, Loader2, AlertCircle 
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
      console.log('Tactical Sync Initiated...');
      
      const [mRes, bRes, sRes] = await Promise.all([
        supabase.from('missions').select('*').order('created_at', { ascending: true }),
        supabase.from('bookings').select('*').order('created_at', { ascending: false }),
        supabase.from('club_stats').select('*').order('sort_order', { ascending: true })
      ]);

      if (mRes.data) setMissions(mRes.data);
      if (bRes.data) setBookings(bRes.data);
      if (sRes.data) setStats(sRes.data);
      
      if (mRes.error) console.error('Mission Fetch Error:', mRes.error);
      if (bRes.error) console.error('Booking Fetch Error:', bRes.error);
      if (sRes.error) console.error('Stats Fetch Error:', sRes.error);

    } catch (err: any) {
      console.error('Tactical Connection Failed:', err);
      toast({ 
        variant: "destructive", 
        title: "Connection Failure", 
        description: "Failed to connect to Supabase. Check Console." 
      });
    } finally {
      setLoading(false);
    }
  }

  const handleAddMission = async () => {
    console.log('Add Mission Triggered', newMission);
    if (isSubmitting) return;

    if (!newMission.day || !newMission.time || !newMission.location || !newMission.type) {
      toast({ 
        variant: "destructive", 
        title: "Missing Coordinates", 
        description: "All mission data required." 
      });
      return;
    }

    try {
      setIsSubmitting(true);
      const { data, error } = await supabase
        .from('missions')
        .insert([newMission])
        .select();

      if (error) {
        console.error('Deployment Error:', error);
        throw error;
      }

      console.log('Mission Successfully Logged:', data);
      toast({ title: "MISSION LOGGED", description: "Operation successfully deployed to cloud." });
      setNewMission({ day: '', time: '', location: '', type: '' });
      fetchData();
    } catch (err: any) {
      console.error('Critical Deployment Failure:', err);
      toast({ 
        variant: "destructive", 
        title: "Deployment Failed", 
        description: err.message || "Network Error"
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
      toast({ variant: "destructive", title: "Update Failed", description: err.message });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('c9_admin_auth');
    router.replace('/');
  };

  if (!isAuthorized) return null;

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12 selection:bg-primary selection:text-black relative">
      <div className="absolute inset-0 bg-noise opacity-5 pointer-events-none" />
      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 border-b border-white/10 pb-12">
          <div>
            <Button variant="ghost" onClick={handleLogout} className="mb-4 -ml-4 hover:bg-white/10 text-white/50 font-black text-[10px] tracking-widest uppercase">
              <ArrowLeft className="w-4 h-4 mr-2" /> EXIT COMMAND
            </Button>
            <h1 className={cn("text-6xl md:text-9xl font-black text-primary leading-none tracking-tighter", fontHeading.className)}>
              TACTICAL <br /> COMMAND
            </h1>
          </div>
          <div className="bg-zinc-900 border border-white/10 p-10 rounded-[2.5rem] flex flex-col items-center gap-3">
             <Zap className={cn("w-10 h-10 text-primary", !loading && "animate-pulse")} />
             <span className="font-black text-[10px] tracking-widest uppercase">{loading ? "SYNCING..." : "LIVE FEED"}</span>
          </div>
        </div>

        <div className="space-y-8">
           <h2 className="text-2xl font-black flex items-center gap-3 uppercase tracking-tighter"><Trophy className="w-6 h-6 text-primary" /> CLUB INTELLIGENCE</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.length > 0 ? stats.map(stat => (
                <div key={stat.id} className="bg-zinc-900/40 border border-white/5 p-8 rounded-[2rem] space-y-4 hover:border-primary/30 transition-all">
                   <div className="flex justify-between items-center">
                     <span className="text-[10px] font-black text-white/30 uppercase">ID: {stat.id.toUpperCase()}</span>
                     <Button variant="ghost" size="icon" onClick={() => handleUpdateStat(stat)} className="text-primary hover:bg-primary/10">
                        <Save className="w-4 h-4" />
                     </Button>
                   </div>
                   <Input value={stat.value} onChange={(e) => setStats(stats.map(s => s.id === stat.id ? {...s, value: e.target.value} : s))} className="bg-black/50 border-white/10 text-2xl font-black text-white h-16 rounded-xl" />
                   <Input value={stat.label} onChange={(e) => setStats(stats.map(s => s.id === stat.id ? {...s, label: e.target.value.toUpperCase()} : s))} className="bg-black/50 border-white/10 text-[10px] font-black text-white/50 h-10 rounded-lg" />
                </div>
              )) : (
                <div className="col-span-full py-12 text-center text-white/20 text-[10px] font-black uppercase border border-dashed border-white/10 rounded-[2rem]">
                  {loading ? "FETCHING STATS..." : "Stats Table Empty or Missing"}
                </div>
              )}
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1 space-y-6">
            <h2 className="text-2xl font-black flex items-center gap-3 uppercase tracking-tighter"><Plus className="w-6 h-6 text-primary" /> DEPLOY MISSION</h2>
            <div className="bg-zinc-900/40 border border-white/5 p-10 rounded-[3rem] space-y-4">
              <Input placeholder="DAY (MON)" value={newMission.day} onChange={(e) => setNewMission({...newMission, day: e.target.value.toUpperCase()})} className="bg-black/50 h-14" />
              <Input placeholder="TIME (06:00 AM)" value={newMission.time} onChange={(e) => setNewMission({...newMission, time: e.target.value})} className="bg-black/50 h-14" />
              <Input placeholder="LOCATION" value={newMission.location} onChange={(e) => setNewMission({...newMission, location: e.target.value.toUpperCase()})} className="bg-black/50 h-14" />
              <Input placeholder="RUN TYPE" value={newMission.type} onChange={(e) => setNewMission({...newMission, type: e.target.value.toUpperCase()})} className="bg-black/50 h-14" />
              <Button 
                onClick={handleAddMission} 
                disabled={isSubmitting} 
                className="w-full bg-primary text-black font-black hover:bg-white py-8 rounded-full shadow-lg transition-all mt-4 relative z-50 cursor-pointer"
              >
                {isSubmitting ? <Loader2 className="animate-spin" /> : "LOG TO SCHEDULE"}
              </Button>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-black flex items-center gap-3 uppercase tracking-tighter"><Zap className="w-6 h-6 text-primary" /> ACTIVE MISSIONS</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {missions.length > 0 ? missions.map(mission => (
                <div key={mission.id} className="bg-zinc-900 border border-white/5 p-8 rounded-[2rem] flex items-center justify-between hover:border-primary/50 transition-all">
                  <div>
                    <span className="text-primary font-black text-xs block mb-2">{mission.day} • {mission.time}</span>
                    <h4 className="font-black text-xl mb-3 uppercase">{mission.type}</h4>
                    <p className="text-white/40 text-[10px] font-black uppercase flex items-center gap-2"><MapPin className="w-3 h-3" /> {mission.location}</p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => handleDeleteMission(mission.id)} className="text-destructive hover:bg-destructive/10 h-12 w-12"><Trash2 className="w-5 h-5" /></Button>
                </div>
              )) : (
                <div className="col-span-full py-20 text-center border border-dashed border-white/10 rounded-[2rem] text-white/20 text-[10px] font-black uppercase">
                  {loading ? "SYNCHRONIZING..." : "No missions logged in database"}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-8 pb-20">
          <h2 className="text-2xl font-black flex items-center gap-3 uppercase tracking-tighter"><Users className="w-6 h-6 text-primary" /> SQUAD ROSTER</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
             {bookings.length > 0 ? bookings.map(booking => {
               const mission = missions.find(m => m.id === booking.mission_id);
               return (
                 <div key={booking.id} className="bg-zinc-950/80 border border-white/5 p-8 rounded-[2rem] space-y-3 hover:border-white/20 transition-all">
                    <span className="text-primary font-black text-[10px] uppercase truncate block">{booking.user_email}</span>
                    <div className="text-white/40 text-[9px] font-black uppercase tracking-widest border-t border-white/5 pt-3">
                      MISSION: {mission ? `${mission.day} ${mission.type}` : 'ERASED'}
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
