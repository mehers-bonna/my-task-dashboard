import { useEffect, useState } from 'react';
import axios from 'axios';
import { 
  LayoutDashboard, ListTodo, Calendar, BarChart3, Users, 
  Settings, HelpCircle, LogOut, Search, Bell, Mail, Plus, 
  Download, ArrowUpRight, MoreHorizontal, Play, Pause 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, BarElement, 
  Title, Tooltip, Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [analytics, setAnalytics] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };

        // API endpoints: /api/overview, /api/users, /api/analytics
        const [overviewRes, usersRes, analyticsRes] = await Promise.all([
          axios.get('https://task-api-eight-flax.vercel.app/api/overview', { headers }),
          axios.get('https://task-api-eight-flax.vercel.app/api/users', { headers }),
          axios.get('https://task-api-eight-flax.vercel.app/api/analytics', { headers })
        ]);

        setStats(overviewRes.data);
        setUsers(usersRes.data);
        setAnalytics(analyticsRes.data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    fetchData();
  }, []);

  // Chart Data Configuration
  const chartData = {
    labels: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    datasets: [{
      label: 'Projects',
      data: analytics.length ? analytics : [12, 19, 15, 25, 22, 18, 14], 
      backgroundColor: '#1e4d3e',
      borderRadius: 20,
      barThickness: 25,
    }]
  };

  return (
    <div className="flex min-h-screen bg-[#F3F4F6] p-4 font-sans text-gray-800">
      {/* Sidebar */}
      <aside className="w-64 bg-white rounded-3xl p-6 flex flex-col shadow-sm border border-gray-100">
        <div className="flex items-center gap-2 mb-10 px-2">
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-[#1e4d3e] rounded-full"></div>
          </div>
          <h1 className="text-xl font-bold text-[#1e4d3e]">Donezo</h1>
        </div>

        <nav className="flex-1 space-y-1">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 px-3">Menu</p>
          {[
            { icon: <LayoutDashboard size={20} />, label: "Dashboard", active: true },
            { icon: <ListTodo size={20} />, label: "Tasks", badge: "12+" },
            { icon: <Calendar size={20} />, label: "Calendar" },
            { icon: <BarChart3 size={20} />, label: "Analytics" },
            { icon: <Users size={20} />, label: "Team" },
          ].map((item, i) => (
            <div key={i} className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${item.active ? 'bg-[#1e4d3e] text-white shadow-lg' : 'text-gray-500 hover:bg-gray-50'}`}>
              <div className="flex items-center gap-3 font-medium">{item.icon} {item.label}</div>
              {item.badge && <span className="bg-green-100 text-[#1e4d3e] text-[10px] px-2 py-0.5 rounded-full font-bold">{item.badge}</span>}
            </div>
          ))}

          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-8 mb-4 px-3">General</p>
          <div className="flex items-center gap-3 p-3 text-gray-500 hover:bg-gray-50 rounded-xl cursor-pointer"><Settings size={20} /> Settings</div>
          <div className="flex items-center gap-3 p-3 text-gray-500 hover:bg-gray-50 rounded-xl cursor-pointer"><HelpCircle size={20} /> Help</div>
          <div onClick={() => {localStorage.removeItem('token'); navigate('/');}} className="flex items-center gap-3 p-3 text-gray-400 hover:text-red-500 rounded-xl cursor-pointer mt-4"><LogOut size={20} /> Logout</div>
        </nav>

        {/* Download App Widget */}
        <div className="mt-auto bg-black rounded-2xl p-4 text-white relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-xs font-light opacity-80">Download our</p>
            <p className="font-bold mb-3">Mobile App</p>
            <button className="bg-green-600 w-full py-2 rounded-lg text-xs font-bold">Download</button>
          </div>
          <div className="absolute top-0 right-0 w-20 h-20 bg-green-500/20 blur-2xl rounded-full"></div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 px-8 py-2">
        {/* Header Section */}
        <header className="flex justify-between items-center mb-8">
          <div className="relative w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input type="text" placeholder="Search task" className="w-full pl-12 pr-4 py-3 bg-white rounded-2xl outline-none text-sm shadow-sm" />
          </div>
          <div className="flex items-center gap-3">
            <button className="p-3 bg-white rounded-2xl shadow-sm text-gray-500 hover:text-[#1e4d3e]"><Mail size={20} /></button>
            <button className="p-3 bg-white rounded-2xl shadow-sm text-gray-500 hover:text-[#1e4d3e]"><Bell size={20} /></button>
            <div className="flex items-center gap-3 ml-4">
              <div className="text-right">
                <p className="text-sm font-bold leading-none">Totok Michael</p>
                <p className="text-[10px] text-gray-400">tmichael20@mail.com</p>
              </div>
              <img src="https://ui-avatars.com/api/?name=Totok+Michael&background=1e4d3e&color=fff" className="w-10 h-10 rounded-2xl border-2 border-white shadow-sm" alt="avatar" />
            </div>
          </div>
        </header>

        {/* Title and Buttons */}
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="text-3xl font-bold mb-1">Dashboard</h2>
            <p className="text-gray-400 text-sm">Plan, prioritize, and accomplish your tasks with ease.</p>
          </div>
          <div className="flex gap-3">
            <button className="bg-[#1e4d3e] text-white px-5 py-2.5 rounded-xl flex items-center gap-2 font-medium shadow-lg hover:opacity-90"><Plus size={18}/> Add Project</button>
            <button className="bg-white text-gray-700 px-5 py-2.5 rounded-xl border border-gray-200 flex items-center gap-2 font-medium">Import Data</button>
          </div>
        </div>

        {/* Stats Cards Section - Data from /api/overview */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {[
            { label: "Total Projects", value: stats?.total_projects || 0, color: "bg-[#1e4d3e] text-white", trend: "5% Increased from last month" },
            { label: "Ended Projects", value: stats?.stopped_projects || 0, color: "bg-white", trend: "6% Increased from last month" },
            { label: "Running Projects", value: stats?.running_projects || 0, color: "bg-white", trend: "2% Increased from last month" },
            { label: "Pending Project", value: "2", color: "bg-white", trend: "On Discuss" },
          ].map((card, i) => (
            <div key={i} className={`${card.color} p-6 rounded-[2.5rem] shadow-sm relative border border-gray-100`}>
              <div className="flex justify-between items-start mb-2">
                <p className={`text-sm font-medium ${i===0 ? 'opacity-80' : 'text-gray-500'}`}>{card.label}</p>
                <div className={`p-1 rounded-full border ${i===0 ? 'border-white/20' : 'border-gray-200'}`}><ArrowUpRight size={14} /></div>
              </div>
              <h3 className="text-4xl font-bold mb-4">{card.value}</h3>
              <p className={`text-[10px] ${i===0 ? 'opacity-70' : 'text-gray-400'}`}>{card.trend}</p>
            </div>
          ))}
        </div>

        {/* Lower Grid: Charts, Reminders, Collaboration */}
        <div className="grid grid-cols-12 gap-6">
          {/* Project Analytics Chart */}
          <div className="col-span-4 bg-white p-6 rounded-[2.5rem] border border-gray-100">
            <h4 className="font-bold mb-6">Project Analytics</h4>
            <div className="h-48">
              <Bar data={chartData} options={{ 
                maintainAspectRatio: false, 
                plugins: { legend: { display: false } },
                scales: { x: { grid: { display: false } }, y: { grid: { borderDash: [5, 5] }, ticks: { display: false } } }
              }} />
            </div>
            <div className="flex justify-between mt-4 text-[10px] font-bold text-gray-400 uppercase px-2">
              <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
            </div>
          </div>

          {/* Reminders Section */}
          <div className="col-span-3 bg-white p-6 rounded-[2.5rem] border border-gray-100">
            <div className="flex justify-between mb-4">
              <h4 className="font-bold">Reminders</h4>
              <MoreHorizontal size={18} className="text-gray-400" />
            </div>
            <div className="space-y-4">
              <p className="text-lg font-bold leading-tight">Meeting with Arc Company</p>
              <p className="text-xs text-gray-400">Time : 02:00 pm - 04:00 pm</p>
              <button className="bg-[#1e4d3e] text-white w-full py-3 rounded-2xl flex items-center justify-center gap-2 font-bold text-sm">
                <Play size={16} fill="white" /> Start Meeting
              </button>
            </div>
          </div>

          {/* Project List Section */}
          <div className="col-span-5 bg-white p-6 rounded-[2.5rem] border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h4 className="font-bold">Project</h4>
              <button className="text-xs border border-gray-200 px-3 py-1 rounded-lg font-bold">+ New</button>
            </div>
            <div className="space-y-4">
              {[
                { title: "Develop API Endpoints", date: "Nov 26, 2024", color: "bg-blue-500" },
                { title: "Onboarding Flow", date: "Nov 28, 2024", color: "bg-green-500" },
                { title: "Build Dashboard", date: "Nov 30, 2024", color: "bg-orange-500" },
              ].map((proj, i) => (
                <div key={i} className="flex items-center justify-between pb-4 border-b border-gray-50 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${proj.color}`}></div>
                    <div>
                      <p className="text-sm font-bold">{proj.title}</p>
                      <p className="text-[10px] text-gray-400">Due date: {proj.date}</p>
                    </div>
                  </div>
                  <MoreHorizontal size={16} className="text-gray-300" />
                </div>
              ))}
            </div>
          </div>

          {/* Team Collaboration Section - Data from /api/users */}
          <div className="col-span-6 bg-white p-8 rounded-[2.5rem] border border-gray-100">
            <div className="flex justify-between items-center mb-8">
              <h4 className="font-bold text-xl">Team Collaboration</h4>
              <button className="text-xs border border-[#1e4d3e] text-[#1e4d3e] px-4 py-2 rounded-xl font-bold">+ Add Member</button>
            </div>
            <div className="space-y-6">
              {users.slice(0, 4).map((user, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img src={`https://i.pravatar.cc/150?u=${user.email}`} className="w-12 h-12 rounded-2xl object-cover" alt="user" />
                    <div>
                      <p className="font-bold text-gray-800">{user.name}</p>
                      <p className="text-xs text-gray-400">Working on <span className="text-gray-600 font-medium">Internal Project Repository</span></p>
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold px-3 py-1 rounded-lg ${i % 2 === 0 ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'}`}>
                    {i % 2 === 0 ? 'Completed' : 'In Progress'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Project Progress Section */}
          <div className="col-span-3 bg-white p-8 rounded-[2.5rem] border border-gray-100 flex flex-col items-center justify-center">
            <h4 className="font-bold w-full mb-6">Project Progress</h4>
            <div className="relative w-40 h-40">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="80" cy="80" r="70" stroke="#f3f4f6" strokeWidth="12" fill="transparent" />
                <circle cx="80" cy="80" r="70" stroke="#1e4d3e" strokeWidth="12" fill="transparent" 
                  strokeDasharray="440" strokeDashoffset={440 - (440 * 41) / 100} strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold">41%</span>
                <span className="text-[10px] text-gray-400">Project Ended</span>
              </div>
            </div>
            <div className="flex gap-4 mt-6 text-[10px] font-bold text-gray-400">
               <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-green-600"></div> Completed</div>
               <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-gray-200"></div> Pending</div>
            </div>
          </div>

          {/* Time Tracker Section */}
          <div className="col-span-3 bg-[#1e4d3e] p-8 rounded-[3rem] text-white relative overflow-hidden flex flex-col justify-between">
            <h4 className="font-bold">Time Tracker</h4>
            <div className="relative z-10 text-center py-6">
              <h2 className="text-4xl font-bold tracking-widest">01:24:08</h2>
            </div>
            <div className="flex justify-center gap-4 relative z-10">
               <button className="p-3 bg-white/10 rounded-2xl hover:bg-white/20"><Pause fill="white" size={20}/></button>
               <button className="p-3 bg-red-500 rounded-2xl shadow-lg shadow-red-500/40"><div className="w-4 h-4 bg-white rounded-sm"></div></button>
            </div>
            {/* Background design elements */}
            <div className="absolute bottom-0 right-0 w-full h-24 bg-gradient-to-t from-green-500/20 to-transparent"></div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;