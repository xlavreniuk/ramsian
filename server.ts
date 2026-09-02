import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

const PORT = 3002;
const TOKENS_PATH = join(import.meta.dir, "tokens", "tokens.json");

function getEditorHTML(tokens: any) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Single-Surface Design — UI Component Showroom</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg-primary: #FFFFFF;
      --text-primary: #111827;
      --text-secondary: #4B5563;
      --text-muted: #6B7280;
      --fill-hover: #F7F7F8;
      --fill-subtle: #EBECEE;
      --border-divider: #ECECEC;
      --border-card: #E5E7EB;
      --accent-color: #10B981;
    }

    body { font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif; }
    .font-mono { font-family: 'JetBrains Mono', monospace; }
    ::-webkit-scrollbar { width: 6px; height: 6px; }
    ::-webkit-scrollbar-thumb { background: #E5E7EB; border-radius: 9999px; }
    ::-webkit-scrollbar-thumb:hover { background: #D1D5DB; }

    /* Apple/Linear Range Slider */
    input[type=range] {
      -webkit-appearance: none;
      appearance: none;
      background: var(--fill-subtle);
      height: 6px;
      border-radius: 9999px;
      outline: none;
      border: none !important;
      box-shadow: none !important;
    }
    input[type=range]::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 18px;
      height: 18px;
      background: var(--text-primary);
      border-radius: 50%;
      cursor: pointer;
      border: 2px solid #FFFFFF !important;
      box-shadow: 0 2px 5px rgba(0,0,0,0.18);
      transition: transform 0.12s cubic-bezier(0.4, 0, 0.2, 1);
    }
    input[type=range]::-webkit-slider-thumb:hover {
      transform: scale(1.15);
    }
    input[type=range]::-webkit-slider-thumb:active {
      transform: scale(0.95);
    }

    /* iOS Toggle Switch */
    .ios-switch {
      position: relative;
      display: inline-block;
      width: 44px;
      height: 24px;
    }
    .ios-switch input { opacity: 0; width: 0; height: 0; }
    .ios-slider {
      position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0;
      background-color: #E5E7EB; transition: .2s; border-radius: 9999px;
    }
    .ios-slider:before {
      position: absolute; content: ""; height: 20px; width: 20px; left: 2px; bottom: 2px;
      background-color: white; transition: .2s cubic-bezier(0.4, 0, 0.2, 1); border-radius: 50%;
      box-shadow: 0 1px 3px rgba(0,0,0,0.2);
    }
    input:checked + .ios-slider { background-color: #111827; }
    input:checked + .ios-slider:before { transform: translateX(20px); }
  </style>
</head>
<body class="bg-[#FFFFFF] text-[#111827] min-h-screen flex flex-col antialiased selection:bg-[#111827] selection:text-white">

  <!-- Fixed Topbar -->
  <header class="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md [transform:translateZ(0)] border-b border-[#ECECEC] h-16 flex items-center px-6 md:px-12">
    <div class="max-w-7xl w-full mx-auto flex items-center justify-between gap-4">
      <div class="flex items-center gap-3">
        <span class="font-semibold text-xl text-[#111827] tracking-tight">single-surface-design</span>
      </div>

      <div class="flex items-center gap-2">
        <button onclick="triggerToast('Token copied to clipboard')" class="h-8.5 px-3.5 rounded-full border border-[#ECECEC] hover:bg-[#F7F7F8] text-[#111827] text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer active:scale-95">
          <svg class="w-3.5 h-3.5 stroke-[2]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
          <span>Copy Tokens</span>
        </button>
        <button onclick="openDemoModal()" class="h-8.5 px-4 rounded-full bg-[#111827] hover:bg-[#262626] text-white text-xs font-semibold shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer active:scale-95">
          <span>Trigger Modal</span>
        </button>
      </div>
    </div>
  </header>

  <!-- Main High-Density Showroom Canvas -->
  <main class="flex-1 max-w-7xl w-full mx-auto px-6 md:px-12 pt-22 pb-24 space-y-10 text-left">

    <!-- 1. SEARCH CAPSULE ISLAND & CATEGORY PILLS -->
    <section class="space-y-3">
      <div class="w-full bg-[#EBECEE] p-0 rounded-full flex items-center relative transition-all shadow-sm">
        <button onclick="setActiveSegment('where')" id="seg-where" class="flex-1 px-5 py-3 text-left rounded-full transition-all cursor-pointer relative z-10 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.12)]">
          <span class="block text-[10px] font-semibold text-[#111827]">Where</span>
          <span class="block text-xs font-normal text-[#4B5563]">Bratislava, Old Town</span>
        </button>
        <div id="div-1" class="w-px h-6 bg-[#ECECEC] opacity-0 transition-opacity"></div>
        <button onclick="setActiveSegment('when')" id="seg-when" class="flex-1 px-5 py-3 text-left rounded-full transition-all cursor-pointer relative z-10 hover:bg-[#F7F7F8]">
          <span class="block text-[10px] font-semibold text-[#111827]">When</span>
          <span class="block text-xs font-normal text-[#6B7280]">Tomorrow, 14:00</span>
        </button>
        <div id="div-2" class="w-px h-6 bg-[#ECECEC] opacity-100 transition-opacity"></div>
        <button onclick="setActiveSegment('service')" id="seg-service" class="flex-1 px-5 py-3 text-left rounded-full transition-all cursor-pointer relative z-10 hover:bg-[#F7F7F8]">
          <span class="block text-[10px] font-semibold text-[#111827]">Service</span>
          <span class="block text-xs font-normal text-[#6B7280]">Haircut & Styling</span>
        </button>
        <div class="pr-2 z-20">
          <button class="w-9 h-9 rounded-full bg-[#111827] hover:bg-[#262626] text-white flex items-center justify-center transition-all cursor-pointer active:scale-95 shadow-2xs">
            <svg class="w-4 h-4 stroke-[2.2]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          </button>
        </div>
      </div>

      <!-- Quick Category Icon Pills -->
      <div class="flex flex-wrap items-center gap-1.5 pt-1">
        <button class="h-8 px-3 rounded-full bg-[#111827] text-white text-xs font-medium flex items-center gap-1.5 shadow-2xs">
          <svg class="w-3.5 h-3.5 stroke-[2]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16m-7 6h7"/></svg>
          <span>All</span>
        </button>
        <button class="h-8 px-3 rounded-full border border-[#ECECEC] bg-white hover:bg-[#F7F7F8] text-[#4B5563] text-xs font-medium flex items-center gap-1.5 transition-colors">
          <svg class="w-3.5 h-3.5 stroke-[2]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879a3 3 0 11-4.242-4.242L12 5"/></svg>
          <span>Haircut</span>
        </button>
        <button class="h-8 px-3 rounded-full border border-[#ECECEC] bg-white hover:bg-[#F7F7F8] text-[#4B5563] text-xs font-medium flex items-center gap-1.5 transition-colors">
          <svg class="w-3.5 h-3.5 stroke-[2]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/></svg>
          <span>Barbershop</span>
        </button>
        <button class="h-8 px-3 rounded-full border border-[#ECECEC] bg-white hover:bg-[#F7F7F8] text-[#4B5563] text-xs font-medium flex items-center gap-1.5 transition-colors">
          <svg class="w-3.5 h-3.5 stroke-[2]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <span>Nails</span>
        </button>
        <button class="h-8 px-3 rounded-full border border-[#ECECEC] bg-white hover:bg-[#F7F7F8] text-[#4B5563] text-xs font-medium flex items-center gap-1.5 transition-colors">
          <svg class="w-3.5 h-3.5 stroke-[2]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
          <span>Massage</span>
        </button>
        <button class="h-8 px-3 rounded-full border border-[#ECECEC] bg-white hover:bg-[#F7F7F8] text-[#4B5563] text-xs font-medium flex items-center gap-1.5 transition-colors">
          <svg class="w-3.5 h-3.5 stroke-[2]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
          <span>Facial</span>
        </button>
      </div>
    </section>

    <!-- 2. INTERACTIVE CHARTS & SPARKLINE CARDS -->
    <section class="space-y-4">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <!-- Main Interactive SVG Chart (2 cols) -->
        <div class="lg:col-span-2 p-5 rounded-2xl border border-[#ECECEC] bg-white space-y-3">
          <div class="flex items-center justify-between">
            <div>
              <span class="text-[11px] text-[#6B7280]">Gross Revenue (GMV)</span>
              <p id="chartTotalVal" class="font-semibold text-xl text-[#111827]">€48,620.00</p>
            </div>
            <div class="flex items-center gap-1 p-0.5 rounded-lg bg-[#F7F7F8] border border-[#ECECEC] text-[11px]">
              <button onclick="updateChartPeriod('7D')" id="chartBtn7D" class="px-2 py-0.5 rounded-md font-medium text-[#6B7280]">7D</button>
              <button onclick="updateChartPeriod('30D')" id="chartBtn30D" class="px-2 py-0.5 rounded-md font-semibold bg-white text-[#111827] shadow-2xs">30D</button>
              <button onclick="updateChartPeriod('90D')" id="chartBtn90D" class="px-2 py-0.5 rounded-md font-medium text-[#6B7280]">90D</button>
            </div>
          </div>

          <div class="relative w-full h-40 cursor-crosshair" onmousemove="handleChartHover(event)" onmouseleave="handleChartLeave()">
            <svg class="w-full h-full overflow-visible" viewBox="0 0 600 160" preserveAspectRatio="none">
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#10B981" stop-opacity="0.18"/>
                  <stop offset="100%" stop-color="#10B981" stop-opacity="0.00"/>
                </linearGradient>
              </defs>
              <path d="M0,130 Q100,100 200,80 T400,50 T600,20 L600,160 L0,160 Z" fill="url(#chartGradient)"/>
              <path d="M0,130 Q100,100 200,80 T400,50 T600,20" fill="none" stroke="#10B981" stroke-width="2.5" stroke-linecap="round"/>
              <circle id="chartHoverCircle" cx="400" cy="50" r="4" fill="#FFFFFF" stroke="#10B981" stroke-width="2.5" class="hidden"/>
            </svg>
            <div id="chartTooltip" class="absolute top-2 right-2 text-right hidden">
              <span id="tooltipVal" class="font-mono font-bold text-xs text-[#111827]">€1,840</span>
            </div>
          </div>
        </div>

        <!-- Mini Sparklines & Fill Gauge (1 col) -->
        <div class="space-y-3">
          <!-- Sparkline 1 -->
          <div class="p-4 rounded-2xl border border-[#ECECEC] bg-white flex items-center justify-between">
            <div>
              <span class="text-[11px] text-[#6B7280]">Bookings</span>
              <p class="font-semibold text-lg text-[#111827]">1,248</p>
              <span class="text-[10px] text-emerald-600 font-semibold">+18.4%</span>
            </div>
            <svg class="w-20 h-10 overflow-visible" viewBox="0 0 80 40">
              <path d="M0,35 Q20,30 40,15 T80,5" fill="none" stroke="#10B981" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </div>

          <!-- Sparkline 2 -->
          <div class="p-4 rounded-2xl border border-[#ECECEC] bg-white flex items-center justify-between">
            <div>
              <span class="text-[11px] text-[#6B7280]">SaaS MRR</span>
              <p class="font-semibold text-lg text-[#111827]">€2,970</p>
              <span class="text-[10px] text-emerald-600 font-semibold">+12.2%</span>
            </div>
            <svg class="w-20 h-10 overflow-visible" viewBox="0 0 80 40">
              <path d="M0,30 Q25,28 50,12 T80,3" fill="none" stroke="#10B981" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </div>

          <!-- Fill Gauge -->
          <div class="p-3.5 rounded-2xl border border-[#ECECEC] bg-white flex items-center justify-between">
            <span class="text-xs font-semibold text-[#111827]">Calendar Occupancy</span>
            <div class="flex items-center gap-2">
              <div class="w-20 h-2 bg-[#EBECEE] rounded-full overflow-hidden">
                <div class="w-[84%] h-full bg-[#111827] rounded-full"></div>
              </div>
              <span class="text-xs font-mono font-bold text-[#111827]">84%</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 3. FLAT METRIC STATS ROW -->
    <section class="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-t border-b border-[#ECECEC]">
      <div>
        <span class="text-xs text-[#6B7280]">Verified Salons</span>
        <p class="font-semibold text-2xl text-[#111827] mt-0.5">342</p>
        <span class="text-[10px] text-[#6B7280]">Across 5 cities</span>
      </div>
      <div>
        <span class="text-xs text-[#6B7280]">Avg Treatment</span>
        <p class="font-semibold text-2xl text-[#111827] mt-0.5">€38.50</p>
        <span class="text-[10px] text-[#6B7280]">Median basket</span>
      </div>
      <div>
        <span class="text-xs text-[#6B7280]">Take-Rate Fee</span>
        <p class="font-semibold text-2xl text-[#111827] mt-0.5">1.75%</p>
        <span class="text-[10px] text-[#6B7280]">+ €0.30 per slot</span>
      </div>
      <div>
        <span class="text-xs text-[#6B7280]">Est. Year 1 GMV</span>
        <p class="font-semibold text-2xl text-emerald-600 mt-0.5">€584,000</p>
        <span class="text-[10px] text-emerald-600/80">Platform capture</span>
      </div>
    </section>

    <!-- 4. CONTROLS, PICKERS & SLIDERS ROW -->
    <section class="grid grid-cols-1 sm:grid-cols-3 gap-6">
      <!-- Siri Focal Wheel -->
      <div class="space-y-2">
        <span class="text-xs font-semibold text-[#111827]">Siri Focal Wheel</span>
        <div class="p-3 rounded-2xl bg-[#F7F7F8] border border-[#ECECEC] flex items-center justify-between gap-2">
          <button onclick="stepSiriPicker(-1)" class="w-8 h-8 rounded-full bg-white border border-[#ECECEC] hover:bg-[#F7F7F8] flex items-center justify-center text-[#111827] cursor-pointer active:scale-90 shadow-2xs">
            <svg class="w-3.5 h-3.5 stroke-[2]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/></svg>
          </button>
          <div class="flex items-center gap-2.5 font-mono text-xs">
            <span id="siriPrev" class="text-[#9CA3AF] opacity-60">1.50%</span>
            <div class="px-3 py-1.5 rounded-xl bg-white border border-[#111827] text-[#111827] font-bold text-sm shadow-2xs" id="siriCenter">1.75%</div>
            <span id="siriNext" class="text-[#9CA3AF] opacity-60">2.00%</span>
          </div>
          <button onclick="stepSiriPicker(1)" class="w-8 h-8 rounded-full bg-white border border-[#ECECEC] hover:bg-[#F7F7F8] flex items-center justify-center text-[#111827] cursor-pointer active:scale-90 shadow-2xs">
            <svg class="w-3.5 h-3.5 stroke-[2]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
          </button>
        </div>
      </div>

      <!-- Stroke-Free Range Slider -->
      <div class="space-y-2">
        <div class="flex justify-between items-center text-xs">
          <span class="font-semibold text-[#111827]">Stroke-Free Slider</span>
          <span id="sliderValShow" class="font-bold text-xs text-[#111827]">500 Salons</span>
        </div>
        <div class="p-4 rounded-2xl bg-[#F7F7F8] border border-[#ECECEC] space-y-1.5">
          <input type="range" min="50" max="2000" step="50" value="500" oninput="updateSliderVal(this.value)" class="w-full cursor-pointer" />
          <div class="flex justify-between text-[10px] text-[#9CA3AF]">
            <span>50</span>
            <span>2,000</span>
          </div>
        </div>
      </div>

      <!-- iOS Switches & Segment Toggles -->
      <div class="space-y-2">
        <span class="text-xs font-semibold text-[#111827]">Toggles & Actions</span>
        <div class="p-3.5 rounded-2xl bg-[#F7F7F8] border border-[#ECECEC] space-y-3">
          <div class="flex items-center justify-between">
            <span class="text-xs text-[#4B5563]">Instant Calendar Sync</span>
            <label class="ios-switch">
              <input type="checkbox" checked>
              <span class="ios-slider"></span>
            </label>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-xs text-[#4B5563]">Off-Peak Discounts</span>
            <label class="ios-switch">
              <input type="checkbox">
              <span class="ios-slider"></span>
            </label>
          </div>
        </div>
      </div>
    </section>

    <!-- 5. DENSE DATA TABLE -->
    <section class="space-y-3">
      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs border-collapse">
          <thead>
            <tr class="border-b border-[#ECECEC] text-[#6B7280] font-semibold">
              <th class="py-3 px-3">Salon & Practitioner</th>
              <th class="py-3 px-3">Category</th>
              <th class="py-3 px-3">Score</th>
              <th class="py-3 px-3">Avg Ticket</th>
              <th class="py-3 px-3">Friction</th>
              <th class="py-3 px-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[#ECECEC]">
            <tr class="hover:bg-[#F7F7F8] transition-colors">
              <td class="py-3.5 px-3">
                <p class="font-semibold text-[#111827]">Gentlemen's Atelier Barber</p>
                <p class="text-[11px] text-[#6B7280]">Obchodná 24, Bratislava</p>
              </td>
              <td class="py-3.5 px-3"><span class="px-2 py-0.5 rounded-full bg-[#F7F7F8] border border-[#ECECEC] text-[11px] text-[#4B5563]">Barbershop</span></td>
              <td class="py-3.5 px-3 font-bold text-emerald-600">94/100</td>
              <td class="py-3.5 px-3 font-medium text-[#111827]">€32.00</td>
              <td class="py-3.5 px-3 text-[#6B7280]">Phone / DM</td>
              <td class="py-3.5 px-3 text-right">
                <button onclick="triggerToast('Outreach link copied')" class="h-7 px-3 rounded-full bg-[#111827] hover:bg-[#262626] text-white text-[11px] font-medium transition-all cursor-pointer active:scale-95">Claim</button>
              </td>
            </tr>
            <tr class="hover:bg-[#F7F7F8] transition-colors">
              <td class="py-3.5 px-3">
                <p class="font-semibold text-[#111827]">Lumière Holistic Beauty & Spa</p>
                <p class="text-[11px] text-[#6B7280]">Panská 14, Bratislava</p>
              </td>
              <td class="py-3.5 px-3"><span class="px-2 py-0.5 rounded-full bg-[#F7F7F8] border border-[#ECECEC] text-[11px] text-[#4B5563]">Facial & Spa</span></td>
              <td class="py-3.5 px-3 font-bold text-emerald-600">91/100</td>
              <td class="py-3.5 px-3 font-medium text-[#111827]">€65.00</td>
              <td class="py-3.5 px-3 text-[#6B7280]">Manual</td>
              <td class="py-3.5 px-3 text-right">
                <button onclick="triggerToast('Outreach link copied')" class="h-7 px-3 rounded-full bg-[#111827] hover:bg-[#262626] text-white text-[11px] font-medium transition-all cursor-pointer active:scale-95">Claim</button>
              </td>
            </tr>
            <tr class="hover:bg-[#F7F7F8] transition-colors">
              <td class="py-3.5 px-3">
                <p class="font-semibold text-[#111827]">Thai Zen Healing Massage</p>
                <p class="text-[11px] text-[#6B7280]">Mickiewiczova 7, Bratislava</p>
              </td>
              <td class="py-3.5 px-3"><span class="px-2 py-0.5 rounded-full bg-[#F7F7F8] border border-[#ECECEC] text-[11px] text-[#4B5563]">Massage</span></td>
              <td class="py-3.5 px-3 font-bold text-emerald-600">88/100</td>
              <td class="py-3.5 px-3 font-medium text-[#111827]">€55.00</td>
              <td class="py-3.5 px-3 text-[#6B7280]">Phone only</td>
              <td class="py-3.5 px-3 text-right">
                <button onclick="triggerToast('Outreach link copied')" class="h-7 px-3 rounded-full bg-[#111827] hover:bg-[#262626] text-white text-[11px] font-medium transition-all cursor-pointer active:scale-95">Claim</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- 6. SERVICE CATALOG & INPUT CAPSULES GRID -->
    <section class="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-2">
      <!-- Service Catalog List -->
      <div class="space-y-2">
        <span class="text-xs font-semibold text-[#111827]">Service Catalog</span>
        <div class="divide-y divide-[#ECECEC] border-t border-b border-[#ECECEC]">
          <div class="py-3 px-2 rounded-xl hover:bg-[#F7F7F8] transition-colors cursor-pointer flex items-center justify-between">
            <div>
              <h4 class="font-semibold text-xs text-[#111827]">Women's Signature Haircut</h4>
              <p class="text-[11px] text-[#6B7280]">Clarifying wash & blowout</p>
            </div>
            <span class="font-bold text-xs text-[#111827]">€45</span>
          </div>
          <div class="py-3 px-2 rounded-xl hover:bg-[#F7F7F8] transition-colors cursor-pointer flex items-center justify-between">
            <div>
              <h4 class="font-semibold text-xs text-[#111827]">Hot Towel Beard Trim</h4>
              <p class="text-[11px] text-[#6B7280]">Straight razor line-up</p>
            </div>
            <span class="font-bold text-xs text-[#111827]">€28</span>
          </div>
          <div class="py-3 px-2 rounded-xl hover:bg-[#F7F7F8] transition-colors cursor-pointer flex items-center justify-between">
            <div>
              <h4 class="font-semibold text-xs text-[#111827]">Hydra Cleansing Facial</h4>
              <p class="text-[11px] text-[#6B7280]">Collagen mask & serum</p>
            </div>
            <span class="font-bold text-xs text-[#111827]">€65</span>
          </div>
        </div>
      </div>

      <!-- Form Inputs & Verification -->
      <div class="space-y-2">
        <span class="text-xs font-semibold text-[#111827]">Input Capsules</span>
        <div class="space-y-2.5">
          <div class="flex items-center border border-[#ECECEC] rounded-2xl px-3.5 h-10 bg-white focus-within:border-[#111827]">
            <svg class="w-4 h-4 text-[#9CA3AF] mr-2 shrink-0 stroke-[2]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
            <input type="text" placeholder="Full Name..." value="Andrii Lavreniuk" class="w-full text-xs font-medium bg-transparent outline-none text-[#111827]" />
          </div>
          <div class="flex items-center border border-[#ECECEC] rounded-2xl px-3.5 h-10 bg-white focus-within:border-[#111827]">
            <svg class="w-4 h-4 text-[#9CA3AF] mr-2 shrink-0 stroke-[2]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
            <input type="email" placeholder="Email address..." value="andrii@rezervehere.com" class="w-full text-xs font-medium bg-transparent outline-none text-[#111827]" />
          </div>
          <!-- 6-digit Code Input Simulation -->
          <div class="flex items-center gap-2">
            <input type="text" maxlength="1" value="4" class="w-10 h-10 text-center rounded-xl border border-[#ECECEC] font-mono text-sm font-bold text-[#111827] outline-none focus:border-[#111827]" />
            <input type="text" maxlength="1" value="8" class="w-10 h-10 text-center rounded-xl border border-[#ECECEC] font-mono text-sm font-bold text-[#111827] outline-none focus:border-[#111827]" />
            <input type="text" maxlength="1" value="2" class="w-10 h-10 text-center rounded-xl border border-[#ECECEC] font-mono text-sm font-bold text-[#111827] outline-none focus:border-[#111827]" />
            <input type="text" maxlength="1" value="9" class="w-10 h-10 text-center rounded-xl border border-[#ECECEC] font-mono text-sm font-bold text-[#111827] outline-none focus:border-[#111827]" />
            <span class="text-xs text-[#6B7280] ml-2">256-bit crypto auth</span>
          </div>
        </div>
      </div>
    </section>

  </main>

  <!-- SPRING MODAL -->
  <div id="demoSpringModal" class="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 hidden">
    <div class="bg-white rounded-3xl border border-[#E5E7EB] shadow-2xl max-w-sm w-full p-6 space-y-4 text-left transform scale-95 opacity-0 transition-all duration-200" id="demoModalContent">
      <div class="flex items-center justify-between border-b border-[#ECECEC] pb-3">
        <h3 class="font-semibold text-sm text-[#111827]">Single-Surface Dialog</h3>
        <button onclick="closeDemoModal()" class="p-1 rounded-full hover:bg-[#F7F7F8] text-[#6B7280] hover:text-[#111827] cursor-pointer">
          <svg class="w-4 h-4 stroke-[2]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
      </div>
      <p class="text-xs text-[#6B7280] leading-relaxed">
        Renders directly on pure white canvas with critically damped physics and zero card-in-card nesting.
      </p>
      <div class="flex justify-end gap-2 pt-1">
        <button onclick="closeDemoModal()" class="h-8 px-4 rounded-full bg-[#111827] text-white text-xs font-semibold cursor-pointer active:scale-95">Dismiss</button>
      </div>
    </div>
  </div>

  <!-- TOAST NOTIFICATION -->
  <div id="toastNotification" class="fixed bottom-6 right-6 z-50 bg-[#111827] text-white text-xs font-semibold px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-2 transform translate-y-12 opacity-0 transition-all duration-200">
    <svg class="w-4 h-4 text-emerald-400 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
    <span id="toastMessage">Copied</span>
  </div>

  <script>
    function setActiveSegment(seg) {
      const segs = ['where', 'when', 'service'];
      segs.forEach(s => {
        const btn = document.getElementById('seg-' + s);
        if (s === seg) {
          btn.className = 'flex-1 px-5 py-3 text-left rounded-full transition-all cursor-pointer relative z-10 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.12)]';
        } else {
          btn.className = 'flex-1 px-5 py-3 text-left rounded-full transition-all cursor-pointer relative z-10 hover:bg-[#F7F7F8]';
        }
      });
    }

    const siriSteps = [1.00, 1.25, 1.50, 1.75, 2.00, 2.25, 2.50, 3.00];
    let siriIndex = 3;

    function stepSiriPicker(delta) {
      siriIndex = Math.max(1, Math.min(siriSteps.length - 2, siriIndex + delta));
      document.getElementById('siriPrev').innerText = siriSteps[siriIndex - 1].toFixed(2) + '%';
      document.getElementById('siriCenter').innerText = siriSteps[siriIndex].toFixed(2) + '%';
      document.getElementById('siriNext').innerText = siriSteps[siriIndex + 1].toFixed(2) + '%';
    }

    function updateSliderVal(val) {
      document.getElementById('sliderValShow').innerText = val + ' Salons';
    }

    function handleChartHover(e) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
      const pct = x / rect.width;
      const svgX = pct * 600;
      const svgY = 130 - Math.sin(pct * Math.PI * 0.8) * 100;

      const circle = document.getElementById('chartHoverCircle');
      circle.setAttribute('cx', svgX);
      circle.setAttribute('cy', svgY);
      circle.classList.remove('hidden');

      const tooltip = document.getElementById('chartTooltip');
      tooltip.classList.remove('hidden');
      const val = Math.round(1200 + pct * 2400);
      document.getElementById('tooltipVal').innerText = '€' + val.toLocaleString();
    }

    function handleChartLeave() {
      document.getElementById('chartHoverCircle').classList.add('hidden');
      document.getElementById('chartTooltip').classList.add('hidden');
    }

    function updateChartPeriod(period) {
      ['7D', '30D', '90D'].forEach(p => {
        const b = document.getElementById('chartBtn' + p);
        if (p === period) {
          b.className = 'px-2 py-0.5 rounded-md font-semibold bg-white text-[#111827] shadow-2xs';
        } else {
          b.className = 'px-2 py-0.5 rounded-md font-medium text-[#6B7280]';
        }
      });
      if (period === '7D') document.getElementById('chartTotalVal').innerText = '€11,240.00';
      if (period === '30D') document.getElementById('chartTotalVal').innerText = '€48,620.00';
      if (period === '90D') document.getElementById('chartTotalVal').innerText = '€142,800.00';
    }

    function openDemoModal() {
      const modal = document.getElementById('demoSpringModal');
      const content = document.getElementById('demoModalContent');
      modal.classList.remove('hidden');
      setTimeout(() => {
        content.classList.remove('scale-95', 'opacity-0');
        content.classList.add('scale-100', 'opacity-100');
      }, 10);
    }

    function closeDemoModal() {
      const modal = document.getElementById('demoSpringModal');
      const content = document.getElementById('demoModalContent');
      content.classList.remove('scale-100', 'opacity-100');
      content.classList.add('scale-95', 'opacity-0');
      setTimeout(() => { modal.classList.add('hidden'); }, 150);
    }

    function triggerToast(msg) {
      const toast = document.getElementById('toastNotification');
      document.getElementById('toastMessage').innerText = msg;
      toast.classList.remove('translate-y-12', 'opacity-0');
      toast.classList.add('translate-y-0', 'opacity-100');
      setTimeout(() => {
        toast.classList.remove('translate-y-0', 'opacity-100');
        toast.classList.add('translate-y-12', 'opacity-0');
      }, 2000);
    }
  </script>
</body>
</html>`;
}

export function startDesignEditorServer() {
  const server = Bun.serve({
    port: PORT,
    async fetch(req) {
      const url = new URL(req.url);

      if (req.method === "OPTIONS") {
        return new Response(null, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
          },
        });
      }

      if (url.pathname === "/" || url.pathname === "/index.html") {
        let tokens = {};
        try {
          if (existsSync(TOKENS_PATH)) {
            tokens = JSON.parse(readFileSync(TOKENS_PATH, "utf-8"));
          }
        } catch {}
        return new Response(getEditorHTML(tokens), {
          headers: { "Content-Type": "text/html; charset=utf-8" },
        });
      }

      return new Response("Not Found", { status: 404 });
    },
  });

  console.log(`\n🎨 [Single-Surface Design Showroom] running at: http://localhost:${PORT}\n`);
  return server;
}

if (import.meta.main) {
  startDesignEditorServer();
}
