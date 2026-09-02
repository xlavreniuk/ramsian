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
  <title>Single-Surface Design — Craft UI System</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
  <style>
    body {
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      background-color: #FFFFFF;
      color: #111827;
    }
    .font-mono { font-family: 'JetBrains Mono', monospace; }

    /* Custom Stroke-Free Apple Range Slider */
    input[type=range] {
      -webkit-appearance: none;
      appearance: none;
      background: #EBECEE;
      height: 6px;
      border-radius: 9999px;
      outline: none;
      border: none !important;
      box-shadow: none !important;
      cursor: pointer;
    }
    input[type=range]::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 18px;
      height: 18px;
      background: #111827;
      border-radius: 50%;
      cursor: pointer;
      border: 2px solid #FFFFFF !important;
      box-shadow: 0 2px 6px rgba(0,0,0,0.18);
      transition: transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    input[type=range]::-webkit-slider-thumb:hover {
      transform: scale(1.18);
    }
    input[type=range]::-webkit-slider-thumb:active {
      transform: scale(0.92);
    }

    /* iOS Fluid Spring Toggle Switch */
    .ios-switch {
      position: relative;
      display: inline-block;
      width: 44px;
      height: 24px;
      cursor: pointer;
    }
    .ios-switch input { opacity: 0; width: 0; height: 0; }
    .ios-slider {
      position: absolute; top: 0; left: 0; right: 0; bottom: 0;
      background-color: #E5E7EB; border-radius: 9999px;
      transition: background-color 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .ios-slider:before {
      position: absolute; content: ""; height: 20px; width: 20px; left: 2px; bottom: 2px;
      background-color: #FFFFFF; border-radius: 50%;
      box-shadow: 0 2px 4px rgba(0,0,0,0.15);
      transition: transform 0.28s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    input:checked + .ios-slider { background-color: #111827; }
    input:checked + .ios-slider:before { transform: translateX(20px); }

    /* Circular Progress Ring */
    .progress-ring-circle {
      transition: stroke-dashoffset 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
      transform: rotate(-90deg);
      transform-origin: 50% 50%;
    }

    /* Spring Animation Utilities */
    .spring-press {
      transition: transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1), background-color 0.15s ease, border-color 0.15s ease;
    }
    .spring-press:active {
      transform: scale(0.95);
    }

    /* Pulse Glow for Live Mode */
    @keyframes pulse-live {
      0% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.08); opacity: 0.8; }
      100% { transform: scale(1); opacity: 1; }
    }
    .live-pulse-dot {
      animation: pulse-live 1.6s infinite ease-in-out;
    }
  </style>
</head>
<body class="bg-[#FFFFFF] text-[#111827] min-h-screen flex flex-col antialiased selection:bg-[#111827] selection:text-white">

  <!-- Fixed Topbar (Single-Surface Standard) -->
  <header class="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md [transform:translateZ(0)] border-b border-[#ECECEC] h-16 flex items-center px-6 md:px-12">
    <div class="max-w-6xl w-full mx-auto flex items-center justify-between gap-4">
      <div class="flex items-center gap-2.5">
        <span class="font-bold text-lg text-[#111827] tracking-tight">rezervehere</span>
        <span class="text-[11px] font-medium text-[#6B7280]">/ single-surface</span>
      </div>

      <!-- Proper Sized Action Buttons -->
      <div class="flex items-center gap-2">
        <!-- Live Mode Stream Toggle -->
        <button onclick="toggleLiveMode()" id="liveModeBtn" class="h-9 px-3.5 rounded-full border border-[#ECECEC] bg-white hover:bg-[#F7F7F8] text-[#111827] text-xs font-semibold spring-press flex items-center gap-2 cursor-pointer shadow-2xs">
          <span class="w-2 h-2 rounded-full bg-emerald-500 live-pulse-dot"></span>
          <span id="liveModeText">Live: On</span>
        </button>
        <button onclick="triggerToast('Tokens copied to clipboard')" class="h-9 px-4 rounded-full border border-[#ECECEC] bg-white hover:bg-[#F7F7F8] text-[#111827] text-xs font-semibold spring-press flex items-center gap-1.5 cursor-pointer shadow-2xs">
          <svg class="w-3.5 h-3.5 stroke-[2]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
          <span>Tokens</span>
        </button>
        <button onclick="openDemoModal()" class="h-9 px-4 rounded-full bg-[#111827] hover:bg-[#262626] text-white text-xs font-semibold shadow-2xs spring-press flex items-center gap-1.5 cursor-pointer">
          <span>Modal</span>
        </button>
      </div>
    </div>
  </header>

  <!-- Main Single Flat Canvas (Zero Nested Containers) -->
  <main class="flex-1 max-w-6xl w-full mx-auto px-6 md:px-12 pt-24 pb-28 space-y-12 text-left">

    <!-- 1. SEARCH CAPSULE ISLAND & SLIDING TAB PILLS -->
    <section class="space-y-4">
      <!-- Search Capsule -->
      <div class="w-full bg-[#EBECEE] p-0 rounded-full flex items-center relative transition-all shadow-sm">
        <button onclick="setActiveSegment('where')" id="seg-where" class="flex-1 px-5 py-3.5 text-left rounded-full transition-all cursor-pointer relative z-10 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.12)]">
          <span class="block text-[10px] font-semibold text-[#111827]">Where</span>
          <span class="block text-xs font-normal text-[#4B5563]" id="whereLabel">Bratislava, Old Town</span>
        </button>
        <div id="div-1" class="w-px h-6 bg-[#ECECEC] opacity-0 transition-opacity"></div>
        <button onclick="setActiveSegment('when')" id="seg-when" class="flex-1 px-5 py-3.5 text-left rounded-full transition-all cursor-pointer relative z-10 hover:bg-[#F7F7F8]">
          <span class="block text-[10px] font-semibold text-[#111827]">When</span>
          <span class="block text-xs font-normal text-[#6B7280]" id="whenLabel">Tomorrow, 14:00</span>
        </button>
        <div id="div-2" class="w-px h-6 bg-[#ECECEC] opacity-100 transition-opacity"></div>
        <button onclick="setActiveSegment('service')" id="seg-service" class="flex-1 px-5 py-3.5 text-left rounded-full transition-all cursor-pointer relative z-10 hover:bg-[#F7F7F8]">
          <span class="block text-[10px] font-semibold text-[#111827]">Service</span>
          <span class="block text-xs font-normal text-[#6B7280]" id="serviceLabel">Haircut & Styling</span>
        </button>
        <div class="pr-2 z-20">
          <button onclick="triggerToast('Searching Bratislava...')" class="w-10 h-10 rounded-full bg-[#111827] hover:bg-[#262626] text-white flex items-center justify-center spring-press cursor-pointer shadow-2xs">
            <svg class="w-4 h-4 stroke-[2.2]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          </button>
        </div>
      </div>

      <!-- Sliding Category Pill Bar -->
      <div class="flex items-center gap-1.5 overflow-x-auto py-1">
        <button onclick="setTabPill(this)" class="tab-pill h-8 px-4 rounded-full bg-[#111827] text-white text-xs font-semibold spring-press cursor-pointer shadow-2xs">All</button>
        <button onclick="setTabPill(this)" class="tab-pill h-8 px-4 rounded-full border border-[#ECECEC] hover:bg-[#F7F7F8] text-[#4B5563] text-xs font-medium spring-press cursor-pointer">Haircut</button>
        <button onclick="setTabPill(this)" class="tab-pill h-8 px-4 rounded-full border border-[#ECECEC] hover:bg-[#F7F7F8] text-[#4B5563] text-xs font-medium spring-press cursor-pointer">Barbershop</button>
        <button onclick="setTabPill(this)" class="tab-pill h-8 px-4 rounded-full border border-[#ECECEC] hover:bg-[#F7F7F8] text-[#4B5563] text-xs font-medium spring-press cursor-pointer">Nails</button>
        <button onclick="setTabPill(this)" class="tab-pill h-8 px-4 rounded-full border border-[#ECECEC] hover:bg-[#F7F7F8] text-[#4B5563] text-xs font-medium spring-press cursor-pointer">Massage</button>
        <button onclick="setTabPill(this)" class="tab-pill h-8 px-4 rounded-full border border-[#ECECEC] hover:bg-[#F7F7F8] text-[#4B5563] text-xs font-medium spring-press cursor-pointer">Facial & Spa</button>
      </div>
    </section>

    <!-- 2. INTERACTIVE FINANCIAL CHART WITH Y/X AXES & GREEN/RED TREND -->
    <section class="space-y-4">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#ECECEC] pb-3">
        <div class="flex items-center gap-3">
          <div>
            <span class="text-xs text-[#6B7280] block">Gross Platform Volume</span>
            <div class="flex items-baseline gap-2 mt-0.5">
              <span id="chartRevenueText" class="font-bold text-2xl sm:text-3xl text-[#111827] font-mono tracking-tight">€48,620.00</span>
              <span id="trendBadge" class="text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-full transition-all">
                +24.6%
              </span>
            </div>
          </div>
        </div>

        <!-- Trend Toggle & Time Ranges -->
        <div class="flex items-center gap-2">
          <!-- Trend Mode (Up Green vs Down Red) -->
          <div class="flex items-center gap-1 p-0.5 rounded-full bg-[#F7F7F8] border border-[#ECECEC] text-xs">
            <button onclick="setTrendMode('up')" id="trendBtnUp" class="px-3 py-1 rounded-full font-semibold bg-emerald-600 text-white shadow-2xs spring-press cursor-pointer">
              Up Trend
            </button>
            <button onclick="setTrendMode('down')" id="trendBtnDown" class="px-3 py-1 rounded-full font-medium text-[#6B7280] hover:text-[#111827] spring-press cursor-pointer">
              Down Trend
            </button>
          </div>

          <!-- Period Buttons -->
          <div class="flex items-center gap-1 p-0.5 rounded-full bg-[#F7F7F8] border border-[#ECECEC] text-xs">
            <button onclick="updateChartPeriod('7D')" id="chartBtn7D" class="px-2.5 py-1 rounded-full font-medium text-[#6B7280] hover:text-[#111827] spring-press cursor-pointer">7D</button>
            <button onclick="updateChartPeriod('30D')" id="chartBtn30D" class="px-2.5 py-1 rounded-full font-semibold bg-[#111827] text-white shadow-2xs spring-press cursor-pointer">30D</button>
            <button onclick="updateChartPeriod('90D')" id="chartBtn90D" class="px-2.5 py-1 rounded-full font-medium text-[#6B7280] hover:text-[#111827] spring-press cursor-pointer">90D</button>
          </div>
        </div>
      </div>

      <!-- Chart Canvas with Y-Axis & X-Axis Numbers -->
      <div class="relative w-full pt-2">
        <div class="grid grid-cols-12 gap-2 items-center">
          
          <!-- Y-Axis Labels (1 col) -->
          <div class="col-span-1 flex flex-col justify-between h-44 text-[10px] font-mono text-[#9CA3AF] text-right pr-2 select-none">
            <span id="yAxisMax">€60k</span>
            <span id="yAxisMidHigh">€45k</span>
            <span id="yAxisMidLow">€30k</span>
            <span id="yAxisMin">€0k</span>
          </div>

          <!-- SVG Area & Line (11 cols) -->
          <div class="col-span-11 relative h-44 cursor-crosshair" onmousemove="handleChartHover(event)" onmouseleave="handleChartLeave()">
            <!-- Background Grid Hairlines -->
            <div class="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-40">
              <div class="border-b border-dashed border-[#ECECEC] w-full"></div>
              <div class="border-b border-dashed border-[#ECECEC] w-full"></div>
              <div class="border-b border-dashed border-[#ECECEC] w-full"></div>
              <div class="border-b border-[#ECECEC] w-full"></div>
            </div>

            <svg class="w-full h-full overflow-visible relative z-10" viewBox="0 0 600 160" preserveAspectRatio="none">
              <defs>
                <linearGradient id="chartGradGreen" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#10B981" stop-opacity="0.22"/>
                  <stop offset="100%" stop-color="#10B981" stop-opacity="0.00"/>
                </linearGradient>
                <linearGradient id="chartGradRed" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#F43F5E" stop-opacity="0.22"/>
                  <stop offset="100%" stop-color="#F43F5E" stop-opacity="0.00"/>
                </linearGradient>
              </defs>
              <path id="chartAreaPath" d="M0,130 Q100,100 200,80 T400,50 T600,20 L600,160 L0,160 Z" fill="url(#chartGradGreen)" class="transition-all duration-300"/>
              <path id="chartLinePath" d="M0,130 Q100,100 200,80 T400,50 T600,20" fill="none" stroke="#10B981" stroke-width="2.5" stroke-linecap="round" class="transition-all duration-300"/>
              
              <!-- Vertical Crosshair Hairline -->
              <line id="chartCrossLine" x1="400" y1="0" x2="400" y2="160" stroke="#ECECEC" stroke-width="1.5" stroke-dasharray="3 3" class="hidden"/>
              <circle id="chartDot" cx="400" cy="50" r="5" fill="#FFFFFF" stroke="#10B981" stroke-width="3" class="hidden transition-transform duration-75 shadow-lg"/>
            </svg>

            <!-- Floating Hover Tooltip -->
            <div id="chartTooltip" class="absolute top-1 right-2 text-right hidden bg-white/95 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-[#ECECEC] shadow-sm z-20">
              <span id="tooltipDate" class="text-[10px] text-[#6B7280] block font-medium">Aug 28, 2026</span>
              <span id="tooltipVal" class="font-mono font-bold text-xs text-[#111827]">€1,840.00</span>
            </div>
          </div>
        </div>

        <!-- X-Axis Labels -->
        <div class="grid grid-cols-12 gap-2 pt-1 text-[10px] font-mono text-[#9CA3AF] select-none">
          <div class="col-span-1"></div>
          <div class="col-span-11 flex justify-between px-1" id="xAxisLabels">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 3. FLAT DIVIDER METRIC STATS ROW WITH COUNT-UP NUMBERS -->
    <section class="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-t border-b border-[#ECECEC]">
      <div>
        <span class="text-xs text-[#6B7280]">Bookings</span>
        <p id="metricBookings" class="font-bold text-2xl text-[#111827] font-mono mt-0.5">1,248</p>
        <span class="text-[10px] text-emerald-600 font-semibold">+18.4% live pace</span>
      </div>
      <div>
        <span class="text-xs text-[#6B7280]">Average Ticket</span>
        <p id="metricTicket" class="font-bold text-2xl text-[#111827] font-mono mt-0.5">€38.50</p>
        <span class="text-[10px] text-[#6B7280]">Median basket</span>
      </div>
      <div>
        <span class="text-xs text-[#6B7280]">Take-Rate Fee</span>
        <p id="metricFee" class="font-bold text-2xl text-[#111827] font-mono mt-0.5">€1,225</p>
        <span class="text-[10px] text-[#6B7280]">1.75% + €0.30</span>
      </div>
      <div>
        <span class="text-xs text-[#6B7280]">SaaS MRR</span>
        <p id="metricMRR" class="font-bold text-2xl text-emerald-600 font-mono mt-0.5">€2,970</p>
        <span class="text-[10px] text-emerald-600/80">Active Pro salons</span>
      </div>
    </section>

    <!-- 4. CONTROLS, PICKERS & SLIDERS (FLAT 4-COL GRID) -->
    <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-2">
      
      <!-- ITEM 1: Siri 3-Item Focal Wheel -->
      <div class="space-y-2">
        <span class="text-xs font-semibold text-[#111827]">Take-Rate Wheel</span>
        <div class="p-3 rounded-2xl bg-[#F7F7F8] border border-[#ECECEC] flex items-center justify-between gap-1">
          <button onclick="stepSiri(-1)" class="w-8 h-8 rounded-full bg-white border border-[#ECECEC] hover:bg-[#F7F7F8] flex items-center justify-center text-[#111827] spring-press cursor-pointer shadow-2xs">
            <svg class="w-3.5 h-3.5 stroke-[2]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/></svg>
          </button>
          <div class="flex items-center gap-2 font-mono text-xs overflow-hidden">
            <span id="siriLeft" class="text-[#9CA3AF] opacity-50 transition-all">1.50%</span>
            <div id="siriCenter" class="px-3 py-1.5 rounded-xl bg-white border border-[#111827] text-[#111827] font-bold text-sm shadow-2xs transition-transform">1.75%</div>
            <span id="siriRight" class="text-[#9CA3AF] opacity-50 transition-all">2.00%</span>
          </div>
          <button onclick="stepSiri(1)" class="w-8 h-8 rounded-full bg-white border border-[#ECECEC] hover:bg-[#F7F7F8] flex items-center justify-center text-[#111827] spring-press cursor-pointer shadow-2xs">
            <svg class="w-3.5 h-3.5 stroke-[2]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
          </button>
        </div>
      </div>

      <!-- ITEM 2: Stroke-Free Slider with Live Value -->
      <div class="space-y-2">
        <div class="flex justify-between items-center text-xs">
          <span class="font-semibold text-[#111827]">Capacity Runway</span>
          <span id="sliderValueText" class="font-bold text-xs text-[#111827]">500 Salons</span>
        </div>
        <div class="p-4 rounded-2xl bg-[#F7F7F8] border border-[#ECECEC] space-y-2">
          <input type="range" min="50" max="2000" step="50" value="500" oninput="updateSlider(this.value)" class="w-full cursor-pointer" />
          <div class="flex justify-between text-[10px] text-[#9CA3AF]">
            <span>50</span>
            <span>2,000</span>
          </div>
        </div>
      </div>

      <!-- ITEM 3: Quantity Stepper & iOS Switch -->
      <div class="space-y-2">
        <span class="text-xs font-semibold text-[#111827]">Roster & Status</span>
        <div class="p-3 rounded-2xl bg-[#F7F7F8] border border-[#ECECEC] flex items-center justify-between">
          <div class="flex items-center gap-1.5 bg-white border border-[#ECECEC] rounded-full p-1 shadow-2xs">
            <button onclick="stepCount(-1)" class="w-6 h-6 rounded-full hover:bg-[#F7F7F8] flex items-center justify-center text-xs font-bold text-[#111827] spring-press cursor-pointer">-</button>
            <span id="counterVal" class="w-6 text-center text-xs font-bold font-mono text-[#111827]">4</span>
            <button onclick="stepCount(1)" class="w-6 h-6 rounded-full hover:bg-[#F7F7F8] flex items-center justify-center text-xs font-bold text-[#111827] spring-press cursor-pointer">+</button>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-[11px] text-[#6B7280]">Online</span>
            <label class="ios-switch">
              <input type="checkbox" checked onchange="triggerToast(this.checked ? 'Calendar Online' : 'Calendar Paused')">
              <span class="ios-slider"></span>
            </label>
          </div>
        </div>
      </div>

      <!-- ITEM 4: Circular Progress Ring & Occupancy -->
      <div class="space-y-2">
        <span class="text-xs font-semibold text-[#111827]">Occupancy Fill</span>
        <div class="p-3 rounded-2xl bg-[#F7F7F8] border border-[#ECECEC] flex items-center justify-between">
          <div class="space-y-0.5">
            <p id="occupancyPercentText" class="font-bold text-sm text-[#111827] font-mono">92.4%</p>
            <span class="text-[10px] text-emerald-600 font-medium">Optimal peak</span>
          </div>
          <!-- SVG Radial Ring -->
          <svg class="w-11 h-11" viewBox="0 0 36 36">
            <path class="text-[#EBECEE]" stroke-width="3.5" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            <path id="occupancyRing" class="text-[#111827] progress-ring-circle" stroke-dasharray="92, 100" stroke-width="3.5" stroke-linecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
          </svg>
        </div>
      </div>

    </section>

    <!-- 5. SERVICES LIST & FLOATING INPUTS (2 COLS) -->
    <section class="grid grid-cols-1 md:grid-cols-2 gap-10 pt-2 border-t border-[#ECECEC]">
      
      <!-- Services Divider List with Negative-Margin Fills -->
      <div class="space-y-1">
        <span class="text-xs font-semibold text-[#111827] block pb-1">Service Catalog</span>
        <div class="divide-y divide-[#ECECEC]">
          <div onclick="triggerToast('Selected Haircut')" class="py-3 px-3 -mx-3 rounded-2xl hover:bg-[#F7F7F8] transition-colors cursor-pointer flex items-center justify-between spring-press">
            <div class="space-y-0.5">
              <h4 class="font-semibold text-xs text-[#111827]">Women's Signature Haircut</h4>
              <p class="text-[11px] text-[#6B7280]">Organic wash, scalp massage & custom blowout</p>
            </div>
            <div class="text-right shrink-0">
              <span class="font-bold text-xs text-[#111827] font-mono">€45</span>
              <p class="text-[10px] text-[#9CA3AF]">45 min</p>
            </div>
          </div>

          <div onclick="triggerToast('Selected Beard Trim')" class="py-3 px-3 -mx-3 rounded-2xl hover:bg-[#F7F7F8] transition-colors cursor-pointer flex items-center justify-between spring-press">
            <div class="space-y-0.5">
              <h4 class="font-semibold text-xs text-[#111827]">Executive Hot Towel Shave</h4>
              <p class="text-[11px] text-[#6B7280]">Straight razor line-up & cold compress</p>
            </div>
            <div class="text-right shrink-0">
              <span class="font-bold text-xs text-[#111827] font-mono">€28</span>
              <p class="text-[10px] text-[#9CA3AF]">30 min</p>
            </div>
          </div>

          <div onclick="triggerToast('Selected Facial')" class="py-3 px-3 -mx-3 rounded-2xl hover:bg-[#F7F7F8] transition-colors cursor-pointer flex items-center justify-between spring-press">
            <div class="space-y-0.5">
              <h4 class="font-semibold text-xs text-[#111827]">Hydra Cleansing Facial Mask</h4>
              <p class="text-[11px] text-[#6B7280]">Hyaluronic moisture infusion & firming</p>
            </div>
            <div class="text-right shrink-0">
              <span class="font-bold text-xs text-[#111827] font-mono">€65</span>
              <p class="text-[10px] text-[#9CA3AF]">60 min</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Floating Inputs, OTP Verification & Buttons -->
      <div class="space-y-3">
        <span class="text-xs font-semibold text-[#111827] block pb-1">Input Elements</span>
        
        <div class="flex items-center border border-[#ECECEC] rounded-2xl px-3.5 h-10 bg-white focus-within:border-[#111827] transition-colors">
          <input type="text" value="Andrii Lavreniuk" placeholder="Your name..." class="w-full text-xs font-medium bg-transparent outline-none text-[#111827]" />
          <svg class="w-4 h-4 text-emerald-600 shrink-0 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
        </div>

        <div class="flex items-center gap-2 pt-0.5">
          <input type="text" maxlength="1" value="7" class="w-10 h-10 text-center rounded-xl border border-[#ECECEC] font-mono text-sm font-bold text-[#111827] outline-none focus:border-[#111827] spring-press" />
          <input type="text" maxlength="1" value="3" class="w-10 h-10 text-center rounded-xl border border-[#ECECEC] font-mono text-sm font-bold text-[#111827] outline-none focus:border-[#111827] spring-press" />
          <input type="text" maxlength="1" value="9" class="w-10 h-10 text-center rounded-xl border border-[#ECECEC] font-mono text-sm font-bold text-[#111827] outline-none focus:border-[#111827] spring-press" />
          <input type="text" maxlength="1" value="2" class="w-10 h-10 text-center rounded-xl border border-[#ECECEC] font-mono text-sm font-bold text-[#111827] outline-none focus:border-[#111827] spring-press" />
          <span class="text-[11px] text-[#6B7280] ml-2">256-bit crypto auth</span>
        </div>

        <div class="flex flex-wrap items-center gap-2 pt-2">
          <button onclick="triggerToast('Confirmed appointment')" class="h-9 px-4 rounded-full bg-[#111827] hover:bg-[#262626] text-white text-xs font-semibold spring-press cursor-pointer shadow-2xs">Primary</button>
          <button onclick="triggerToast('Saved to bookmarks')" class="h-9 px-4 rounded-full border border-[#ECECEC] hover:bg-[#F7F7F8] text-[#111827] text-xs font-semibold spring-press cursor-pointer">Secondary</button>
          <button onclick="triggerToast('Link copied')" class="h-9 px-3 rounded-full hover:bg-[#F7F7F8] text-[#6B7280] hover:text-[#111827] text-xs font-medium spring-press cursor-pointer">Ghost</button>
        </div>
      </div>

    </section>

  </main>

  <!-- SPRING MODAL -->
  <div id="demoSpringModal" class="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 hidden">
    <div class="bg-white rounded-3xl border border-[#E5E7EB] shadow-2xl max-w-sm w-full p-6 space-y-4 text-left transform scale-95 opacity-0 transition-all duration-200" id="demoModalContent">
      <div class="flex items-center justify-between border-b border-[#ECECEC] pb-3">
        <h3 class="font-semibold text-sm text-[#111827]">Single-Surface Modal</h3>
        <button onclick="closeDemoModal()" class="p-1 rounded-full hover:bg-[#F7F7F8] text-[#6B7280] hover:text-[#111827] cursor-pointer">
          <svg class="w-4 h-4 stroke-[2]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
      </div>
      <p class="text-xs text-[#6B7280] leading-relaxed">
        Flat dialog sitting directly on pure #FFFFFF with Apple spring physics and zero nested frames.
      </p>
      <div class="flex justify-end gap-2 pt-1">
        <button onclick="closeDemoModal()" class="h-9 px-4 rounded-full bg-[#111827] text-white text-xs font-semibold spring-press cursor-pointer">Dismiss</button>
      </div>
    </div>
  </div>

  <!-- TOAST NOTIFICATION -->
  <div id="toastNotification" class="fixed bottom-6 right-6 z-50 bg-[#111827] text-white text-xs font-semibold px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-2 transform translate-y-12 opacity-0 transition-all duration-200">
    <svg class="w-4 h-4 text-emerald-400 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
    <span id="toastMessage">Done</span>
  </div>

  <script>
    // Smooth Count-Up Animation Function
    function animateValue(id, start, end, duration, prefix = '', suffix = '') {
      const obj = document.getElementById(id);
      if (!obj) return;
      let startTimestamp = null;
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const easeProgress = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        const current = start + (end - start) * easeProgress;
        obj.innerText = prefix + (Number.isInteger(end) ? Math.round(current).toLocaleString() : current.toFixed(2).toLocaleString()) + suffix;
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }

    let currentTrend = 'up';
    let currentPeriod = '30D';
    let liveModeActive = true;
    let liveInterval = null;
    let baseRevenue = 48620.00;

    const CHART_DATA = {
      up: {
        '7D': {
          revenue: 11240.00,
          trend: '+14.2%',
          badgeClass: 'text-emerald-600 bg-emerald-50 border-emerald-200/60',
          strokeColor: '#10B981',
          fillGrad: 'url(#chartGradGreen)',
          linePath: 'M0,135 Q100,110 200,90 T400,60 T600,25',
          areaPath: 'M0,135 Q100,110 200,90 T400,60 T600,25 L600,160 L0,160 Z',
          yMax: '€15k', yMidHigh: '€10k', yMidLow: '€5k', yMin: '€0k',
          xLabels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        '30D': {
          revenue: 48620.00,
          trend: '+24.6%',
          badgeClass: 'text-emerald-600 bg-emerald-50 border-emerald-200/60',
          strokeColor: '#10B981',
          fillGrad: 'url(#chartGradGreen)',
          linePath: 'M0,130 Q100,100 200,80 T400,50 T600,20',
          areaPath: 'M0,130 Q100,100 200,80 T400,50 T600,20 L600,160 L0,160 Z',
          yMax: '€60k', yMidHigh: '€45k', yMidLow: '€30k', yMin: '€0k',
          xLabels: ['Week 1', 'Week 2', 'Week 3', 'Week 4']
        },
        '90D': {
          revenue: 142800.00,
          trend: '+38.4%',
          badgeClass: 'text-emerald-600 bg-emerald-50 border-emerald-200/60',
          strokeColor: '#10B981',
          fillGrad: 'url(#chartGradGreen)',
          linePath: 'M0,140 Q100,90 200,70 T400,40 T600,15',
          areaPath: 'M0,140 Q100,90 200,70 T400,40 T600,15 L600,160 L0,160 Z',
          yMax: '€180k', yMidHigh: '€120k', yMidLow: '€60k', yMin: '€0k',
          xLabels: ['Month 1', 'Month 2', 'Month 3']
        }
      },
      down: {
        '7D': {
          revenue: 8420.00,
          trend: '-11.4%',
          badgeClass: 'text-rose-600 bg-rose-50 border-rose-200/60',
          strokeColor: '#F43F5E',
          fillGrad: 'url(#chartGradRed)',
          linePath: 'M0,25 Q100,50 200,85 T400,115 T600,145',
          areaPath: 'M0,25 Q100,50 200,85 T400,115 T600,145 L600,160 L0,160 Z',
          yMax: '€15k', yMidHigh: '€10k', yMidLow: '€5k', yMin: '€0k',
          xLabels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        '30D': {
          revenue: 34120.00,
          trend: '-8.3%',
          badgeClass: 'text-rose-600 bg-rose-50 border-rose-200/60',
          strokeColor: '#F43F5E',
          fillGrad: 'url(#chartGradRed)',
          linePath: 'M0,20 Q100,45 200,75 T400,110 T600,140',
          areaPath: 'M0,20 Q100,45 200,75 T400,110 T600,140 L600,160 L0,160 Z',
          yMax: '€60k', yMidHigh: '€45k', yMidLow: '€30k', yMin: '€0k',
          xLabels: ['Week 1', 'Week 2', 'Week 3', 'Week 4']
        },
        '90D': {
          revenue: 96400.00,
          trend: '-14.8%',
          badgeClass: 'text-rose-600 bg-rose-50 border-rose-200/60',
          strokeColor: '#F43F5E',
          fillGrad: 'url(#chartGradRed)',
          linePath: 'M0,15 Q100,40 200,80 T400,120 T600,150',
          areaPath: 'M0,15 Q100,40 200,80 T400,120 T600,150 L600,160 L0,160 Z',
          yMax: '€180k', yMidHigh: '€120k', yMidLow: '€60k', yMin: '€0k',
          xLabels: ['Month 1', 'Month 2', 'Month 3']
        }
      }
    };

    function renderChart() {
      const data = CHART_DATA[currentTrend][currentPeriod];
      const prevVal = baseRevenue;
      baseRevenue = data.revenue;
      animateValue('chartRevenueText', prevVal, baseRevenue, 450, '€');

      // Update Trend Badge
      const badge = document.getElementById('trendBadge');
      badge.innerText = data.trend;
      badge.className = 'text-xs font-bold px-2 py-0.5 rounded-full transition-all ' + data.badgeClass;

      // Update Chart SVG Paths & Colors
      const line = document.getElementById('chartLinePath');
      const area = document.getElementById('chartAreaPath');
      const dot = document.getElementById('chartDot');
      line.setAttribute('d', data.linePath);
      line.setAttribute('stroke', data.strokeColor);
      area.setAttribute('d', data.areaPath);
      area.setAttribute('fill', data.fillGrad);
      dot.setAttribute('stroke', data.strokeColor);

      // Update Axes
      document.getElementById('yAxisMax').innerText = data.yMax;
      document.getElementById('yAxisMidHigh').innerText = data.yMidHigh;
      document.getElementById('yAxisMidLow').innerText = data.yMidLow;
      document.getElementById('yAxisMin').innerText = data.yMin;

      const xContainer = document.getElementById('xAxisLabels');
      xContainer.innerHTML = data.xLabels.map(l => \`<span>\${l}</span>\`).join('');
    }

    function setTrendMode(mode) {
      currentTrend = mode;
      if (mode === 'up') {
        document.getElementById('trendBtnUp').className = 'px-3 py-1 rounded-full font-semibold bg-emerald-600 text-white shadow-2xs spring-press cursor-pointer';
        document.getElementById('trendBtnDown').className = 'px-3 py-1 rounded-full font-medium text-[#6B7280] hover:text-[#111827] spring-press cursor-pointer';
      } else {
        document.getElementById('trendBtnDown').className = 'px-3 py-1 rounded-full font-semibold bg-rose-600 text-white shadow-2xs spring-press cursor-pointer';
        document.getElementById('trendBtnUp').className = 'px-3 py-1 rounded-full font-medium text-[#6B7280] hover:text-[#111827] spring-press cursor-pointer';
      }
      renderChart();
    }

    function updateChartPeriod(period) {
      currentPeriod = period;
      ['7D', '30D', '90D'].forEach(p => {
        const b = document.getElementById('chartBtn' + p);
        if (p === period) {
          b.className = 'px-2.5 py-1 rounded-full font-semibold bg-[#111827] text-white shadow-2xs spring-press cursor-pointer';
        } else {
          b.className = 'px-2.5 py-1 rounded-full font-medium text-[#6B7280] hover:text-[#111827] spring-press cursor-pointer';
        }
      });
      renderChart();
    }

    function handleChartHover(e) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
      const pct = x / rect.width;
      const svgX = pct * 600;
      
      let svgY;
      if (currentTrend === 'up') {
        svgY = 130 - Math.sin(pct * Math.PI * 0.8) * 105;
      } else {
        svgY = 20 + Math.sin(pct * Math.PI * 0.8) * 120;
      }

      const dot = document.getElementById('chartDot');
      dot.setAttribute('cx', svgX);
      dot.setAttribute('cy', svgY);
      dot.classList.remove('hidden');

      const crossLine = document.getElementById('chartCrossLine');
      crossLine.setAttribute('x1', svgX);
      crossLine.setAttribute('x2', svgX);
      crossLine.classList.remove('hidden');

      const tooltip = document.getElementById('chartTooltip');
      tooltip.classList.remove('hidden');
      const val = currentTrend === 'up' 
        ? Math.round(1200 + pct * (baseRevenue * 0.12))
        : Math.round(baseRevenue * 0.12 - pct * (baseRevenue * 0.08));
      document.getElementById('tooltipVal').innerText = '€' + val.toLocaleString() + '.00';
    }

    function handleChartLeave() {
      document.getElementById('chartDot').classList.add('hidden');
      document.getElementById('chartCrossLine').classList.add('hidden');
      document.getElementById('chartTooltip').classList.add('hidden');
    }

    function toggleLiveMode() {
      liveModeActive = !liveModeActive;
      const btn = document.getElementById('liveModeBtn');
      const txt = document.getElementById('liveModeText');
      if (liveModeActive) {
        btn.innerHTML = '<span class="w-2 h-2 rounded-full bg-emerald-500 live-pulse-dot"></span><span>Live: On</span>';
        startLiveStream();
        triggerToast('Live stream enabled (+real-time transactions)');
      } else {
        btn.innerHTML = '<span class="w-2 h-2 rounded-full bg-[#9CA3AF]"></span><span>Live: Paused</span>';
        clearInterval(liveInterval);
        triggerToast('Live stream paused');
      }
    }

    function startLiveStream() {
      clearInterval(liveInterval);
      liveInterval = setInterval(() => {
        if (!liveModeActive) return;
        const delta = (Math.random() * 35 + 15);
        const oldRev = baseRevenue;
        baseRevenue += delta;
        animateValue('chartRevenueText', oldRev, baseRevenue, 400, '€');

        // Increment bookings
        const curBookings = parseInt(document.getElementById('metricBookings').innerText.replace(/,/g, ''));
        animateValue('metricBookings', curBookings, curBookings + 1, 300);
      }, 4000);
    }

    function setActiveSegment(seg) {
      ['where', 'when', 'service'].forEach(s => {
        const btn = document.getElementById('seg-' + s);
        if (s === seg) {
          btn.className = 'flex-1 px-5 py-3.5 text-left rounded-full transition-all cursor-pointer relative z-10 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.12)]';
        } else {
          btn.className = 'flex-1 px-5 py-3.5 text-left rounded-full transition-all cursor-pointer relative z-10 hover:bg-[#F7F7F8]';
        }
      });
    }

    function setTabPill(btn) {
      document.querySelectorAll('.tab-pill').forEach(p => {
        p.className = 'tab-pill h-8 px-4 rounded-full border border-[#ECECEC] hover:bg-[#F7F7F8] text-[#4B5563] text-xs font-medium spring-press cursor-pointer';
      });
      btn.className = 'tab-pill h-8 px-4 rounded-full bg-[#111827] text-white text-xs font-semibold spring-press cursor-pointer shadow-2xs';
    }

    const siriSteps = [1.00, 1.25, 1.50, 1.75, 2.00, 2.25, 2.50, 3.00];
    let siriIdx = 3;

    function stepSiri(delta) {
      siriIdx = Math.max(1, Math.min(siriSteps.length - 2, siriIdx + delta));
      document.getElementById('siriLeft').innerText = siriSteps[siriIdx - 1].toFixed(2) + '%';
      document.getElementById('siriCenter').innerText = siriSteps[siriIdx].toFixed(2) + '%';
      document.getElementById('siriRight').innerText = siriSteps[siriIdx + 1].toFixed(2) + '%';
    }

    function updateSlider(val) {
      document.getElementById('sliderValueText').innerText = val + ' Salons';
    }

    let count = 4;
    function stepCount(delta) {
      count = Math.max(1, count + delta);
      document.getElementById('counterVal').innerText = count;
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

    window.addEventListener('DOMContentLoaded', () => {
      renderChart();
      startLiveStream();
    });
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
