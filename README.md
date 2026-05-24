# DevDash — Sales Analytics Dashboard

A real-time sales analytics dashboard I built to track revenue, conversions, active users, and team performance all in one place. Dark theme, responsive, no backend needed.

## Tech Stack

| What | Why |
|---|---|
| **React ** + **TypeScript** | Main framework, keeps things type-safe |
| **Vite ** | Fast builds and hot reload, way better than CRA |
| **Tailwind CSS ** | Utility-first, all styling is custom classes |
| **GSAP 3** | Page-load animations on the sidebar and layout |

## Project Structure

```
Dashboard/
├── public/                        
│   ├── assets/images/             
│   └── favicon.svg                
├── src/
│   ├── App.tsx                    
│   ├── main.tsx                   
│   ├── vite-env.d.ts             
│   ├── styles/
│   │   └── index.css              
│   ├── components/
│   │   ├── AppLayout.tsx          
│   │   ├── Sidebar.tsx           
│   │   ├── Topbar.tsx            
│   │   ├── ui/
│   │   │   ├── AppIcon.tsx        
│   │   │   ├── AppImage.tsx       
│   │   │   └── AppLogo.tsx        
│   │   └── dashboard/
│   │       ├── MetricsBentoGrid.tsx   
│   │       ├── RevenueChart.tsx      
│   │       ├── ChannelBarCharts.tsx  
│   │       ├── ConcersionFunnel.tsx   
│   │       ├── RepLeaderBoard.tsx     
│   │       ├── ActivityFeed.tsx       
│   │       └── GoalRedialChart.tsx   
│   └── pages/
│       ├── Dashboard.tsx          
│       └── NotFound.tsx           
├── index.html                    
├── setup.bat                      
├── package.json
├── tsconfig.json
├── vite.config.ts                 
├── tailwind.config.js             
└── postcss.config.js             
```



