import { useEffect, useState } from 'react';
import axios from 'axios';
import { 
  LayoutDashboard, ListTodo, Calendar, BarChart3, Users, 
  Settings, LogOut, Search, Bell, Mail, Plus,
  ArrowUpRight, Play, Pause, MoreHorizontal, ShoppingBag, Video, Clock, Menu, X
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, ArcElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, ArcElement);

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isChecking, setIsChecking] = useState(true);
  // for mobile sidebar controlling
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  // fetching data from api and checking authentication
  useEffect(() => {
  const checkAndFetch = async () => {
    await new Promise(resolve => setTimeout(resolve, 10));
    const token = localStorage.getItem('token');

    if (!token) {
      console.log("No token found, redirecting...");
      navigate('/', { replace: true });
      return;
    }

    try {
      const response = await axios.get('https://task-api-eight-flax.vercel.app/api/dashboard', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setData(response.data);
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/', { replace: true });
      }
    } finally {
      setLoading(false);
      setIsChecking(false);
    }
  };

  checkAndFetch();
}, [navigate]);

if (isChecking || loading) {
  return <div className="h-screen flex items-center justify-center font-bold text-[#1e4d3e]">Loading Donezo...</div>;
}

  
  // chart data configuration using analytics data
  const chartData = {
    labels: data?.analytics?.map(item => new Date(item.date).toLocaleDateString('en-US', { weekday: 'short' })[0]) || [],
    datasets: [{
      data: data?.analytics?.map(item => item.views) || [],
      backgroundColor: (context) => context.dataIndex === 3 ? '#1e4d3e' : '#e5e7eb',
      borderRadius: 12,
      barThickness: 20,
    }]
  };

  return (
    <div className="flex min-h-screen bg-[#F8F9FA] p-3 md:p-5 font-sans text-slate-800 relative">
      
      {/* responsive sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white rounded-r-[2.5rem] md:rounded-[2.5rem] p-8 flex flex-col shadow-xl md:shadow-sm border border-gray-50 transition-transform duration-300 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:relative md:flex`}>
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#E8F3EF] rounded-xl flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-[#1e4d3e] rounded-full"></div>
            </div>
            <h1 className="text-2xl font-bold text-[#1e4d3e]">Donezo</h1>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden text-gray-400"><X /></button>
        </div>
        <nav className="flex-1 space-y-1">
          <p className="text-[10px] font-bold text-gray-300 uppercase mb-4 ml-3">Menu</p>
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#1e4d3e] text-white shadow-lg cursor-pointer font-medium"><LayoutDashboard size={18} /> Dashboard</div>
          <div className="flex items-center justify-between p-4 text-gray-400 hover:bg-gray-50 rounded-2xl cursor-pointer"><div className="flex items-center gap-4"><ListTodo size={18} /> Tasks</div><span className="bg-[#E8F3EF] text-[#1e4d3e] text-[9px] px-2 py-0.5 rounded-full font-bold">12+</span></div>
          <div className="flex items-center gap-4 p-4 text-gray-400 hover:bg-gray-50 rounded-2xl cursor-pointer"><Calendar size={18} /> Calendar</div>
          <div className="flex items-center gap-4 p-4 text-gray-400 hover:bg-gray-50 rounded-2xl cursor-pointer"><BarChart3 size={18} /> Analytics</div>
          <div className="flex items-center gap-4 p-4 text-gray-400 hover:bg-gray-50 rounded-2xl cursor-pointer"><Users size={18} /> Team</div>
          <p className="text-[10px] font-bold text-gray-300 uppercase mt-8 mb-4 ml-3">General</p>
          <div className="flex items-center gap-4 p-4 text-gray-400 hover:bg-gray-50 rounded-2xl cursor-pointer"><Settings size={18} /> Settings</div>
          <div onClick={() => {localStorage.removeItem('token'); navigate('/');}} className="flex items-center gap-4 p-4 text-gray-400 hover:text-red-500 rounded-2xl cursor-pointer"><LogOut size={18} /> Logout</div>
        </nav>
        <div className="mt-6 bg-black rounded-[2rem] p-5 text-white text-center">
            <p className="text-[10px] opacity-60">Download our</p>
            <p className="font-bold text-xs mb-3">Mobile App</p>
            <button className="bg-[#27C278] w-full py-2 rounded-xl text-[10px] font-bold">Download</button>
        </div>
      </aside>

      {/* main content area */}
      <main className="flex-1 md:pl-10 w-full overflow-x-hidden">
        
        {/* header section */}
        <header className="flex flex-col lg:flex-row justify-between items-center mb-10 gap-4">
          <div className="flex items-center w-full lg:w-auto gap-4">
            <button onClick={() => setSidebarOpen(true)} className="md:hidden p-2 text-gray-600 bg-white rounded-lg shadow-sm"><Menu /></button>
            <div className="relative flex-1 md:w-[450px]">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
              <input type="text" placeholder="Search task" className="w-full pl-14 pr-6 py-4 bg-white rounded-2xl outline-none text-sm shadow-sm border border-gray-50" />
            </div>
          </div>
          <div className="flex items-center justify-between w-full lg:w-auto gap-4">
            <div className="flex items-center gap-2">
              <button className="p-3 md:p-4 bg-white rounded-2xl border border-gray-50 text-gray-400"><Mail size={20} /></button>
              <button className="p-3 md:p-4 bg-white rounded-2xl border border-gray-50 text-gray-400 relative"><Bell size={20} /><span className="absolute top-3 md:top-4 right-3 md:right-4 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span></button>
            </div>
            <div className="flex items-center gap-3 md:gap-4 ml-2">
               <div className="text-right text-gray-800 hidden sm:block">
                  <p className="text-sm font-bold truncate w-24 md:w-auto">Totok Michael</p>
                  <p className="text-[10px] text-gray-400 truncate w-24 md:w-auto">tmichael20@mail.com</p>
               </div>
               <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-[#1e4d3e] text-white flex items-center justify-center font-bold">TM</div>
            </div>
          </div>
        </header>

        {/* top statistics using overview data */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-[#1e4d3e] text-white p-6 rounded-[2.5rem] relative">
            <div className="flex justify-between"><p className="text-[10px] opacity-70">Total Projects</p><ArrowUpRight size={14}/></div>

            {/* showing total users from overview data */}
            <h3 className="text-4xl font-bold my-2">{data?.overview?.totalUsers || 0}</h3>
            <p className="text-[9px] bg-white/10 w-fit px-2 py-1 rounded-md">5% Increased from last month</p>
          </div>
          <div className="bg-white p-6 rounded-[2.5rem] border border-gray-50 shadow-sm">
             <div className="flex justify-between"><p className="text-[10px] text-gray-400 font-medium">Revenue</p><ArrowUpRight size={14} className="text-gray-300"/></div>

             {/* showing total revenue from overview data */}
             <h3 className="text-4xl font-bold my-2 text-slate-800">${data?.overview?.revenue?.toLocaleString() || 0}</h3>
             <p className="text-[9px] text-gray-300">Target reached this month</p>
          </div>
          <div className="bg-white p-6 rounded-[2.5rem] border border-gray-50 shadow-sm">
             <div className="flex justify-between"><p className="text-[10px] text-gray-400 font-medium">Active Users</p><ArrowUpRight size={14} className="text-gray-300"/></div>

             {/* showing total active users from overview */}
             <h3 className="text-4xl font-bold my-2 text-slate-800">{data?.overview?.activeUsers || 0}</h3>
             <p className="text-[9px] text-gray-300">Currently online</p>
          </div>
          <div className="bg-white p-6 rounded-[2.5rem] border border-gray-50 shadow-sm">
             <div className="flex justify-between"><p className="text-[10px] text-gray-400 font-medium">Growth Rate</p><ArrowUpRight size={14} className="text-gray-300"/></div>
             
             {/* showing total growth from overview */}
             <h3 className="text-4xl font-bold my-2 text-slate-800">{data?.overview?.growth || 0}%</h3>
             <p className="text-[9px] text-gray-300">Performance analytic</p>
          </div>
        </div>

        {/* middle row */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 mb-8">

          {/* passing chart data (analytics) */}
          <div className="xl:col-span-4 bg-white p-6 rounded-[2.5rem] border border-gray-50 shadow-sm">
            <h4 className="font-bold text-sm mb-6">Project Analytics</h4>
            <div className="h-40">
              <Bar data={chartData} options={{ maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { grid: { display: false } }, y: { display: false } } }} />
            </div>
          </div>

          <div className="xl:col-span-8 bg-white p-6 rounded-[2.5rem] border border-gray-50 shadow-sm overflow-hidden">
             <div className="flex justify-between items-center mb-6"><h4 className="font-bold text-sm">Available Plans</h4><ShoppingBag size={18} className="text-gray-300"/></div>
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

              {/* showing first 4 product using map method */}
                {data?.products?.slice(0,4).map((product) => (
                  <div key={product.id} className="bg-gray-50/50 p-4 rounded-3xl text-center border border-gray-100 group hover:bg-[#1e4d3e] transition-all duration-300">
                    <p className="text-[10px] font-bold text-gray-500 mb-1 group-hover:text-white/70">{product.name}</p>
                    <p className="text-xl font-black text-[#1e4d3e] mb-3 group-hover:text-white">${product.price}</p>
                    <button className="w-full py-2 bg-white text-[#1e4d3e] rounded-xl text-[9px] font-bold shadow-sm">Select</button>
                  </div>
                ))}
             </div>
          </div>
        </div>

        {/* bottom row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          <div className="lg:col-span-12 xl:col-span-4 bg-white p-6 rounded-[2.5rem] border border-gray-50 shadow-sm">
            <div className="flex justify-between items-center mb-6"><h4 className="font-bold text-sm">Team Collaboration</h4><button className="text-[9px] font-bold border px-3 py-1 rounded-lg text-gray-400">+ Add</button></div>
            <div className="space-y-4">

              {/* showing email and status maping users */}
              {data?.users?.slice(0, 4).map((user, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={`https://i.pravatar.cc/150?u=${user.id}`} className="w-10 h-10 rounded-xl object-cover" alt="" />
                    <div className="overflow-hidden"><p className="font-bold text-[11px] truncate w-24 sm:w-auto">{user.name}</p><p className="text-[9px] text-gray-300 truncate w-32 sm:w-auto">{user.email}</p></div>
                  </div>
                  <span className={`text-[8px] font-bold px-2 py-1 rounded-md flex-shrink-0 ${user.status === 'active' ? 'bg-[#E8F3EF] text-[#27C278]' : 'bg-[#FFF6F0] text-[#FF9F5A]'}`}>
                    {user.status === 'active' ? 'Completed' : 'Pending'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 xl:col-span-5 space-y-6">
             <div className="bg-white p-6 rounded-[2.5rem] border border-gray-50 shadow-sm">
                <div className="flex justify-between mb-4"><h4 className="font-bold text-sm">Reminders</h4><MoreHorizontal size={16} className="text-gray-300"/></div>
                <div className="flex flex-col">
                  <p className="font-bold text-sm">Meeting with Arc Company</p>
                  <p className="text-[10px] text-gray-300 mb-4">Time: 02:00 pm - 04:00 pm</p>
                  <button className="w-full py-3 bg-[#1e4d3e] text-white rounded-2xl text-[11px] font-bold flex items-center justify-center gap-2 shadow-lg shadow-green-900/10"><Video size={14}/> Start Meeting</button>
                </div>
             </div>

             <div className="bg-white p-6 rounded-[2.5rem] border border-gray-50 shadow-sm">
                <div className="flex justify-between mb-4"><h4 className="font-bold text-sm">Project</h4><button className="text-[9px] font-bold border px-2 py-1 rounded-lg text-gray-400">+ New</button></div>
                <div className="space-y-4">
                   {["Develop API Endpoints", "Onboarding Flow", "Build Dashboard"].map((p, i) => (
                      <div key={i} className="flex items-center justify-between text-[11px]">
                         <div className="flex items-center gap-2"><div className={`w-1.5 h-1.5 rounded-full ${i===0?'bg-blue-500':i===1?'bg-green-500':'bg-orange-500'}`}></div><p className="font-bold">{p}</p></div>
                         <MoreHorizontal size={14} className="text-gray-300"/>
                      </div>
                   ))}
                </div>
             </div>
          </div>

          <div className="lg:col-span-6 xl:col-span-3 space-y-6">
             <div className="bg-white p-6 rounded-[2.5rem] border border-gray-50 shadow-sm text-center">
                <h4 className="font-bold text-[11px] text-left mb-4 text-gray-400 uppercase tracking-wider">Project Progress</h4>
                <div className="relative w-24 h-24 md:w-28 md:h-28 mx-auto mb-4 flex items-center justify-center">
                   <div className="absolute inset-0 border-[8px] md:border-[10px] border-gray-50 rounded-full"></div>
                   <div className="absolute inset-0 border-[8px] md:border-[10px] border-t-[#1e4d3e] border-r-[#1e4d3e] rounded-full rotate-45"></div>
                   <div className="text-center"><p className="text-2xl font-black">41%</p><p className="text-[8px] text-gray-300 uppercase">Ended</p></div>
                </div>
                <div className="flex justify-center gap-4 text-[9px] font-bold">
                   <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#1e4d3e]"></div>Done</span>
                   <span className="flex items-center gap-1 text-gray-300"><div className="w-2 h-2 rounded-full bg-gray-100"></div>Pending</span>
                </div>
             </div>

             <div className="bg-[#1e4d3e] p-6 rounded-[2.5rem] text-white relative overflow-hidden group">
                <h4 className="font-bold text-[11px] opacity-70 mb-8">Time Tracker</h4>
                <div className="relative z-10">
                   <h2 className="text-2xl md:text-3xl font-black mb-10 tracking-widest">01:24:08</h2>
                   <div className="flex gap-2">
                      <button className="flex-1 py-2 bg-white/10 rounded-xl hover:bg-white/20 flex justify-center"><Pause size={16}/></button>
                      <button className="flex-1 py-2 bg-red-500 rounded-xl hover:bg-red-600 flex justify-center shadow-lg shadow-red-500/20"><div className="w-3 h-3 bg-white rounded-sm"></div></button>
                   </div>
                </div>
                <div className="absolute top-[-20%] right-[-20%] w-32 h-32 bg-white/5 rounded-full blur-3xl"></div>
             </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Dashboard;