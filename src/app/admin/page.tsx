'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { fontHeading } from '@/app/fonts';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { type Mission, type Booking, type ClubStat } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { 
  Plus, Trash2, Zap, Users, MapPin, Trophy, ArrowLeft, Save, Loader2, RefreshCw
} from 'lucide-react';

// DUMMY INITIAL STATE
const INITIAL_MISSIONS: Mission[] = [
  { id: '1', day: 'MON', time: '06:00 AM', location: 'CP, DELHI', type: 'INTERVALS' },
  { id: '2', day: 'WED', time: '06:00 AM', location: 'LODHI GARDEN', type: 'TEMPO HUNT' },
  { id: '3', day: 'FRI', time: '06:00 AM', location: 'CP, DELHI', type: 'EASY RUN' },
  { id: '4', day: 'SUN', time: '05:30 AM', location: 'GURGAON', type: 'LONG DISTANCE' },
];

const INITIAL_STATS: ClubStat[] = [
  { id: 'runs', label: 'TOTAL RUNS', value: '420+', icon_name: 'Zap', sort_order: 1 },
  { id: 'members', label: 'ACTIVE SQUAD', value: '850', icon_name: 'Users', sort_order: 2 },
  { id: 'city', label: 'STREETS COVERED', value: '12', icon_name: 'MapPin', sort_order: 3 },
  { id: 'wins', label: 'PODIUM FINISHES', value: '55', icon_name: 'Trophy', sort_order: 4 },
];

export default function AdminPage() {
  const { toast } = useToast();
  const [missions, setMissions] = useState<Mission[]>(INITIAL_MISSIONS);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [stats, setStats] = useState<ClubStat[]>(INITIAL_STATS);
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  
  const [newMission, setNewMission] = useState({ day: '', time: '', location: '', type: '' });

  useEffect(() => {
    const authStatus = typeof window !== 'undefined' ? localStorage.getItem('c9_admin_auth') : null;
    if (authStatus === 'true') {
      setIsAuthorized(true);
    } else {
      window.location.href = '/admin/login';
    }
  }, []);

  const handleAddMission = () => {
    if (isSubmitting) return;
    if (!newMission.day || !newMission.time || !newMission.location || !newMission.type) {
      toast({ variant: "destructive", title: "Intel Missing", description: "All fields required." });
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const mission: Mission = {
        id: Math.random().toString(36).substr(2, 9),
        ...newMission
      };
      setMissions(prev => [...prev, mission]);
      setNewMission({ day: '', time: '', location: '', type: '' });
      setIsSubmitting(false);
      toast({ title: "MISSION LOGGED", description: "Local database updated." });
    }, 500);
  };

  const handleDeleteMission = (id: string) => {
    setMissions(prev => prev.filter(m => m.id !== id));
    toast({ title: "Mission Erased" });
  };

  const handleUpdateStat = (stat: ClubStat) => {
    setStats(prev => prev.map(s => s.id === stat.id ? stat : s));
    toast({ title: "INTELLIGENCE UPDATED", description: `${stat.label} synced.` });
  };

  const handleLogout = () => {
    localStorage.removeItem('c9_admin_auth');
    window.location.href = '/';
  };

  if (!isAuthorized) return <div className="bg-black min-h-screen" />;

  return (
    <div className="min-h-screen bg-black text-white p-6 relative overflow-x-hidden selection:bg-primary selection:text-black">
      {/* Background Layer - Pointer Events None */}
      <div className="absolute inset-0 bg-noise opacity-5 pointer-events-none z-0" />
      
      {/* Interaction Layer */}
      <div className="max-w-7xl mx-auto space-y-16 relative z-50 pointer-events-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 border-b border-white/10 pb-12">
          <div>
            <Button 
              variant="ghost" 
              onClick={handleLogout} 
              className="mb-4 -ml-4 hover:bg-white/10 text-white/50 font-black text-[10px] tracking-widest uppercase cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> EXIT COMMAND
            </Button>
            <h1 className={cn("text-6xl md:text-9xl font-black text-primary leading-none tracking-tighter", fontHeading.className)}>
              COMMAND <br /> CENTER
            </h1>
          </div>
          <Button 
            variant="outline" 
            onClick={() => setLoading(true) || setTimeout(() => setLoading(false), 1000)} 
            className="rounded-full border-white/20 hover:border-primary py-6 px-8 bg-zinc-900/40 cursor-pointer"
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
                className="w-full bg-primary text-black font-black hover:bg-white py-8 rounded-full shadow-lg transition-all mt-4 cursor-pointer"
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
                  <Button variant="ghost" size="icon" onClick={() => handleDeleteMission(mission.id)} className="text-white/20 hover:text-destructive h-12 w-12 cursor-pointer">
                    <Trash2 className="w-5 h-5" />
                  </Button>
                </div>
              )) : (
                <div className="col-span-full py-20 text-center border border-dashed border-white/10 rounded-[2rem] text-white/20 text-[10px] font-black uppercase">
                  No missions logged
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
                     <Button variant="ghost" size="icon" onClick={() => handleUpdateStat(stat)} className="text-primary hover:bg-primary/20 cursor-pointer">
                        <Save className="w-4 h-4" />
                     </Button>
                   </div>
                   <div className="space-y-2">
                     <label className="text-[8px] font-black text-white/40 uppercase tracking-widest block">Value</label>
                     <Input 
                        value={stat.value} 
                        onChange={(e) => setStats(prev => prev.map(s => s.id === stat.id ? {...s, value: e.target.value} : s))} 
                        className="bg-black/50 border-white/10 h-14 font-black" 
                     />
                   </div>
                   <div className="space-y-2">
                     <label className="text-[8px] font-black text-white/40 uppercase tracking-widest block">Label</label>
                     <Input 
                        value={stat.label} 
                        onChange={(e) => setStats(prev => prev.map(s => s.id === stat.id ? {...s, label: e.target.value.toUpperCase()} : s))} 
                        className="bg-black/50 border-white/10 h-10 text-[10px] font-black" 
                     />
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* Roster Section */}
        <div className="space-y-8 pb-20">
          <h2 className="text-2xl font-black uppercase tracking-tighter flex items-center gap-2"><Users className="text-primary" /> SQUAD ROSTER (DUMMY)</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
             {bookings.length === 0 ? (
                <div className="col-span-full py-10 text-center border border-dashed border-white/10 rounded-[2rem] text-white/20 text-[10px] font-black uppercase">
                  No squad members registered in this session.
                </div>
              ) : (
                bookings.map(booking => (
                  <div key={booking.id} className="bg-zinc-950/80 border border-white/5 p-8 rounded-[2rem] hover:border-primary/50 transition-all">
                    <span className="text-primary font-black text-[10px] uppercase truncate block tracking-tighter">{booking.user_email}</span>
                    <div className="text-white/40 text-[9px] font-black uppercase mt-2 pt-2 border-t border-white/5">
                      Ref ID: {booking.id.slice(0,8)}
                    </div>
                  </div>
                ))
              )}
          </div>
        </div>
      </div>
    </div>
  );
}
