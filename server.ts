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
  <title>Single-Surface Design — Component Showroom & Playground</title>
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
      --radius-card: 16px;
      --radius-sub: 12px;
      --radius-control: 8px;
      --radius-pill: 9999px;
    }

    body { font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif; }
    .font-mono { font-family: 'JetBrains Mono', monospace; }
    ::-webkit-scrollbar { width: 6px; height: 6px; }
    ::-webkit-scrollbar-thumb { background: #E5E7EB; border-radius: 9999px; }
    ::-webkit-scrollbar-thumb:hover { background: #D1D5DB; }

    /* Apple/Linear Modern Range Slider with Zero Native Stroke */
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

    .chart-crosshair {
      transition: transform 0.05s ease-out;
    }
  </style>
</head>
<body class="bg-[#FFFFFF] text-[#111827] min-h-screen flex flex-col antialiased selection:bg-[#111827] selection:text-white">

  <!-- Fixed Topbar (Single-Surface Standard) -->
  <header class="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md [transform:translateZ(0)] border-b border-[#ECECEC] h-16 flex items-center px-6 md:px-12">
    <div class="max-w-7xl w-full mx-auto flex items-center justify-between gap-4">
      <div class="flex items-center gap-3">
        <span class="font-semibold text-xl text-[#111827] tracking-tight">single-surface-design</span>
        <span class="text-xs font-medium text-[#6B7280] bg-[#F7F7F8] border border-[#ECECEC] px-2.5 py-0.5 rounded-full">
          Design System & Component Showroom
        </span>
      </div>

      <div class="flex items-center gap-2.5">
        <!-- View Mode Switcher -->
        <div class="flex items-center gap-1 p-1 rounded-full bg-[#F7F7F8] border border-[#ECECEC] text-xs">
          <button onclick="setViewMode('showroom')" id="viewBtnShowroom" class="px-3.5 py-1 rounded-full font-semibold bg-[#111827] text-white shadow-2xs transition-all cursor-pointer">
            Full Showroom
          </button>
          <button onclick="setViewMode('inspector')" id="viewBtnInspector" class="px-3.5 py-1 rounded-full font-medium text-[#6B7280] hover:text-[#111827] transition-all cursor-pointer">
            Code Inspector
          </button>
        </div>

        <button onclick="toggleCustomizerDrawer()" class="h-9 px-4 rounded-full border border-[#ECECEC] hover:border-[#D1D5DB] bg-white text-[#111827] text-xs font-semibold shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer active:scale-95">
          <svg class="w-3.5 h-3.5 stroke-[2]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/></svg>
          <span>Tokens</span>
        </button>
      </div>
    </div>
  </header>

  <!-- Main Container -->
  <main class="flex-1 max-w-7xl w-full mx-auto px-6 md:px-12 pt-24 pb-24 space-y-12 text-left">

    <!-- ========================================== -->
    <!-- VIEW 1: FULL CONTINUOUS SHOWROOM VIEW -->
    <!-- ========================================== -->
    <div id="showroomContainer" class="space-y-16">

      <!-- SECTION 1: SEARCH ISLAND & HERO -->
      <section class="space-y-4">
        <div class="border-b border-[#ECECEC] pb-3">
          <h2 class="font-semibold text-lg text-[#111827]">1. Search Island Capsule</h2>
          <p class="text-xs text-[#6B7280]">Horizontal auto-advance flow with pure white elevation shadow focus and auto-hiding dividers</p>
        </div>

        <div class="max-w-3xl w-full mx-auto pt-2">
          <!-- Capsule Form -->
          <div class="w-full bg-[#EBECEE] p-0 rounded-full flex items-center relative transition-all shadow-sm">
            <!-- Where Segment -->
            <button onclick="setActiveSegment('where')" id="seg-where" class="flex-1 px-5 py-3.5 text-left rounded-full transition-all cursor-pointer relative z-10 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.12)]">
              <span class="block text-[10px] font-semibold text-[#111827]">Where</span>
              <span class="block text-xs font-normal text-[#4B5563]" id="whereText">Bratislava, Slovakia</span>
            </button>

            <!-- Divider 1 -->
            <div id="div-1" class="w-px h-6 bg-[#ECECEC] opacity-0 transition-opacity"></div>

            <!-- When Segment -->
            <button onclick="setActiveSegment('when')" id="seg-when" class="flex-1 px-5 py-3.5 text-left rounded-full transition-all cursor-pointer relative z-10 hover:bg-[#F7F7F8]">
              <span class="block text-[10px] font-semibold text-[#111827]">When</span>
              <span class="block text-xs font-normal text-[#6B7280]" id="whenText">Tomorrow, 14:00</span>
            </button>

            <!-- Divider 2 -->
            <div id="div-2" class="w-px h-6 bg-[#ECECEC] opacity-100 transition-opacity"></div>

            <!-- Service Segment -->
            <button onclick="setActiveSegment('service')" id="seg-service" class="flex-1 px-5 py-3.5 text-left rounded-full transition-all cursor-pointer relative z-10 hover:bg-[#F7F7F8]">
              <span class="block text-[10px] font-semibold text-[#111827]">Service</span>
              <span class="block text-xs font-normal text-[#6B7280]" id="serviceText">Haircut & Styling</span>
            </button>

            <!-- Search Circle Button -->
            <div class="pr-2 z-20">
              <button class="w-10 h-10 rounded-full bg-[#111827] hover:bg-[#262626] text-white flex items-center justify-center transition-all cursor-pointer active:scale-95 shadow-2xs">
                <svg class="w-4 h-4 stroke-[2.2]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- SECTION 2: INTERACTIVE SVG FINANCIAL & GMV CHART -->
      <section class="space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#ECECEC] pb-3">
          <div>
            <h2 class="font-semibold text-lg text-[#111827]">2. Interactive Financial & GMV Chart</h2>
            <p class="text-xs text-[#6B7280]">Smooth SVG area chart with real-time crosshair tracking and dynamic period toggles</p>
          </div>

          <div class="flex items-center gap-1 p-1 rounded-xl bg-[#F7F7F8] border border-[#ECECEC] text-xs">
            <button onclick="updateChartPeriod('7D')" id="chartBtn7D" class="px-2.5 py-1 rounded-lg font-medium text-[#6B7280] hover:text-[#111827]">7D</button>
            <button onclick="updateChartPeriod('30D')" id="chartBtn30D" class="px-2.5 py-1 rounded-lg font-semibold bg-white text-[#111827] shadow-2xs">30D</button>
            <button onclick="updateChartPeriod('90D')" id="chartBtn90D" class="px-2.5 py-1 rounded-lg font-medium text-[#6B7280] hover:text-[#111827]">90D</button>
            <button onclick="updateChartPeriod('1Y')" id="chartBtn1Y" class="px-2.5 py-1 rounded-lg font-medium text-[#6B7280] hover:text-[#111827]">1Y</button>
          </div>
        </div>

        <div class="p-6 rounded-3xl border border-[#ECECEC] bg-white space-y-4 relative">
          <div class="flex items-center justify-between">
            <div>
              <span class="text-xs text-[#6B7280]">Platform Gross Merchandise Volume (GMV)</span>
              <p id="chartTotalVal" class="font-semibold text-2xl text-[#111827] mt-0.5">€48,620.00</p>
              <span class="text-[10px] text-emerald-600 font-semibold">+24.6% vs previous period</span>
            </div>
            <div id="chartTooltip" class="text-right hidden">
              <span id="tooltipDate" class="text-[10px] text-[#6B7280] block">Sep 2, 2026</span>
              <span id="tooltipVal" class="font-mono font-bold text-sm text-[#111827]">€1,840</span>
            </div>
          </div>

          <!-- SVG Chart Area -->
          <div class="relative w-full h-48 sm:h-56 cursor-crosshair" id="chartContainer" onmousemove="handleChartHover(event)" onmouseleave="handleChartLeave()">
            <svg class="w-full h-full overflow-visible" viewBox="0 0 600 180" preserveAspectRatio="none">
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#10B981" stop-opacity="0.18"/>
                  <stop offset="100%" stop-color="#10B981" stop-opacity="0.00"/>
                </linearGradient>
              </defs>
              <!-- Filled Area -->
              <path id="svgAreaPath" d="M0,150 Q100,120 200,90 T400,60 T600,30 L600,180 L0,180 Z" fill="url(#chartGradient)"/>
              <!-- Line Stroke -->
              <path id="svgLinePath" d="M0,150 Q100,120 200,90 T400,60 T600,30" fill="none" stroke="#10B981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
              <!-- Hover Indicator Circle -->
              <circle id="chartHoverCircle" cx="400" cy="60" r="4.5" fill="#FFFFFF" stroke="#10B981" stroke-width="2.5" class="hidden"/>
            </svg>
          </div>
        </div>
      </section>

      <!-- SECTION 3: FLAT DIVIDER METRIC ROW -->
      <section class="space-y-4">
        <div class="border-b border-[#ECECEC] pb-3">
          <h2 class="font-semibold text-lg text-[#111827]">3. Flat Divider Metric Row</h2>
          <p class="text-xs text-[#6B7280]">Replaces boxed tiles with pure divider rows sitting directly on the canvas</p>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-t border-b border-[#ECECEC] text-left">
          <div>
            <span class="text-xs text-[#6B7280]">Monthly Bookings</span>
            <p class="font-semibold text-2xl text-[#111827] mt-0.5">1,248</p>
            <span class="text-[10px] text-emerald-600 font-medium">+18.4% growth</span>
          </div>
          <div>
            <span class="text-xs text-[#6B7280]">Average Ticket</span>
            <p class="font-semibold text-2xl text-[#111827] mt-0.5">€38.95</p>
            <span class="text-[10px] text-[#6B7280]">Across all niches</span>
          </div>
          <div>
            <span class="text-xs text-[#6B7280]">Take-Rate Revenue</span>
            <p class="font-semibold text-2xl text-[#111827] mt-0.5">€1,225</p>
            <span class="text-[10px] text-[#6B7280]">1.75% + €0.30 fee</span>
          </div>
          <div>
            <span class="text-xs text-[#6B7280]">SaaS MRR</span>
            <p class="font-semibold text-2xl text-emerald-600 mt-0.5">€2,970</p>
            <span class="text-[10px] text-emerald-600/80">Pro tier salons</span>
          </div>
        </div>
      </section>

      <!-- SECTION 4: HIGH-DENSITY DATA TABLE -->
      <section class="space-y-4">
        <div class="border-b border-[#ECECEC] pb-3">
          <h2 class="font-semibold text-lg text-[#111827]">4. High-Density Market Data Table</h2>
          <p class="text-xs text-[#6B7280]">Clean borderless table with rank chips, category tags, and action pills</p>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs border-collapse">
            <thead>
              <tr class="border-b border-[#ECECEC] text-[#6B7280] font-semibold">
                <th class="py-3 px-3">City & Territory</th>
                <th class="py-3 px-3">Launch Score</th>
                <th class="py-3 px-3">Salons</th>
                <th class="py-3 px-3">Avg Basket</th>
                <th class="py-3 px-3">Booking Friction</th>
                <th class="py-3 px-3">Dominant Niche</th>
                <th class="py-3 px-3 text-right">Est. Year 1 GMV</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-[#ECECEC]">
              <tr class="hover:bg-[#F7F7F8] transition-colors">
                <td class="py-3.5 px-3 font-semibold text-[#111827]">#1 Bratislava, Slovakia</td>
                <td class="py-3.5 px-3 font-bold text-emerald-600">92/100</td>
                <td class="py-3.5 px-3 text-[#111827]">84 salons</td>
                <td class="py-3.5 px-3 font-medium text-[#111827]">€36.50</td>
                <td class="py-3.5 px-3 text-[#6B7280]">64/100 (Phone/DM)</td>
                <td class="py-3.5 px-3 text-[#4B5563]">Barbershop & Hair</td>
                <td class="py-3.5 px-3 font-semibold text-[#111827] text-right">€380,000</td>
              </tr>
              <tr class="hover:bg-[#F7F7F8] transition-colors">
                <td class="py-3.5 px-3 font-semibold text-[#111827]">#2 Vienna, Austria</td>
                <td class="py-3.5 px-3 font-bold text-emerald-600">89/100</td>
                <td class="py-3.5 px-3 text-[#111827]">142 salons</td>
                <td class="py-3.5 px-3 font-medium text-[#111827]">€54.00</td>
                <td class="py-3.5 px-3 text-[#6B7280]">48/100 (Mixed)</td>
                <td class="py-3.5 px-3 text-[#4B5563]">Facial & Wellness</td>
                <td class="py-3.5 px-3 font-semibold text-[#111827] text-right">€720,000</td>
              </tr>
              <tr class="hover:bg-[#F7F7F8] transition-colors">
                <td class="py-3.5 px-3 font-semibold text-[#111827]">#3 Prague, Czechia</td>
                <td class="py-3.5 px-3 font-bold text-emerald-600">87/100</td>
                <td class="py-3.5 px-3 text-[#111827]">118 salons</td>
                <td class="py-3.5 px-3 font-medium text-[#111827]">€41.20</td>
                <td class="py-3.5 px-3 text-[#6B7280]">58/100 (Manual)</td>
                <td class="py-3.5 px-3 text-[#4B5563]">Nails & Spa</td>
                <td class="py-3.5 px-3 font-semibold text-[#111827] text-right">€540,000</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- SECTION 5: SIRI FOCAL WHEEL & STROKE-FREE SLIDERS -->
      <section class="space-y-4">
        <div class="border-b border-[#ECECEC] pb-3">
          <h2 class="font-semibold text-lg text-[#111827]">5. Specialized Pickers & Sliders</h2>
          <p class="text-xs text-[#6B7280]">Siri 3-item windowed focal wheel and Apple-inspired stroke-free range sliders</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-8 py-2">
          <!-- Siri Focal Wheel -->
          <div class="space-y-3">
            <span class="text-xs font-semibold text-[#4B5563]">Siri 3-Item Windowed Focal Wheel</span>
            <div class="p-4 rounded-2xl bg-[#F7F7F8] border border-[#ECECEC] flex items-center justify-between gap-2">
              <button onclick="stepSiriPicker(-1)" class="w-9 h-9 rounded-full bg-white border border-[#ECECEC] hover:bg-[#F7F7F8] flex items-center justify-center text-[#111827] cursor-pointer transition-all active:scale-90 shadow-2xs">
                <svg class="w-4 h-4 stroke-[2]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/></svg>
              </button>

              <div class="flex items-center gap-3 font-mono text-sm">
                <span id="siriPrev" class="text-xs text-[#9CA3AF] opacity-60">1.50%</span>
                <div class="px-4 py-2 rounded-xl bg-white border border-[#111827] text-[#111827] font-bold text-base shadow-2xs" id="siriCenter">
                  1.75%
                </div>
                <span id="siriNext" class="text-xs text-[#9CA3AF] opacity-60">2.00%</span>
              </div>

              <button onclick="stepSiriPicker(1)" class="w-9 h-9 rounded-full bg-white border border-[#ECECEC] hover:bg-[#F7F7F8] flex items-center justify-center text-[#111827] cursor-pointer transition-all active:scale-90 shadow-2xs">
                <svg class="w-4 h-4 stroke-[2]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
              </button>
            </div>
          </div>

          <!-- Stroke-Free Range Slider -->
          <div class="space-y-3">
            <div class="flex justify-between items-center text-xs">
              <span class="font-semibold text-[#4B5563]">Stroke-Free Range Slider</span>
              <span id="sliderValShow" class="font-bold text-sm text-[#111827]">500 Salons</span>
            </div>
            <div class="p-5 rounded-2xl bg-white border border-[#ECECEC] space-y-2">
              <input type="range" min="50" max="2000" step="50" value="500" oninput="updateSliderVal(this.value)" class="w-full cursor-pointer" />
              <div class="flex justify-between text-[10px] text-[#9CA3AF]">
                <span>50 salons</span>
                <span>2,000 salons</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- SECTION 6: FLAT DIVIDER LIST & ACCORDIONS -->
      <section class="space-y-4">
        <div class="border-b border-[#ECECEC] pb-3">
          <h2 class="font-semibold text-lg text-[#111827]">6. Flat Service Catalog Divider List</h2>
          <p class="text-xs text-[#6B7280]">Single-surface service items with negative-margin hover fills and clean typography</p>
        </div>

        <div class="divide-y divide-[#ECECEC] border-t border-b border-[#ECECEC]">
          <div class="py-3.5 px-3 -mx-3 rounded-2xl hover:bg-[#F7F7F8] transition-colors cursor-pointer flex items-center justify-between">
            <div class="space-y-0.5">
              <h4 class="font-semibold text-xs text-[#111827]">Women's Signature Haircut & Blowout</h4>
              <p class="text-xs text-[#6B7280]">Includes organic botanical wash, clarifying scalp massage, and bespoke heat styling</p>
            </div>
            <div class="text-right shrink-0">
              <span class="font-bold text-xs text-[#111827]">€45</span>
              <p class="text-[10px] text-[#9CA3AF]">45 min</p>
            </div>
          </div>

          <div class="py-3.5 px-3 -mx-3 rounded-2xl hover:bg-[#F7F7F8] transition-colors cursor-pointer flex items-center justify-between">
            <div class="space-y-0.5">
              <h4 class="font-semibold text-xs text-[#111827]">Executive Hot Towel Shave & Beard Line-Up</h4>
              <p class="text-xs text-[#6B7280]">Straight razor precision finish, sandalwood essential oil, and cold compress</p>
            </div>
            <div class="text-right shrink-0">
              <span class="font-bold text-xs text-[#111827]">€28</span>
              <p class="text-[10px] text-[#9CA3AF]">30 min</p>
            </div>
          </div>

          <div class="py-3.5 px-3 -mx-3 rounded-2xl hover:bg-[#F7F7F8] transition-colors cursor-pointer flex items-center justify-between">
            <div class="space-y-0.5">
              <h4 class="font-semibold text-xs text-[#111827]">Hydra-Deep Pore Cleansing & Facial Mask</h4>
              <p class="text-xs text-[#6B7280]">Hyaluronic moisture infusion and collagen firming treatment</p>
            </div>
            <div class="text-right shrink-0">
              <span class="font-bold text-xs text-[#111827]">€65</span>
              <p class="text-[10px] text-[#9CA3AF]">60 min</p>
            </div>
          </div>
        </div>
      </section>

      <!-- SECTION 7: TYPOGRAPHY & DESIGN TOKENS -->
      <section class="space-y-4">
        <div class="border-b border-[#ECECEC] pb-3">
          <h2 class="font-semibold text-lg text-[#111827]">7. Typography & Design Token Matrix</h2>
          <p class="text-xs text-[#6B7280]">Proportional weight hierarchy and surface color tokens</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-8 py-2">
          <!-- Typography Hierarchy -->
          <div class="space-y-3">
            <span class="text-xs font-semibold text-[#4B5563]">Typography Hierarchy</span>
            <div class="space-y-2 text-xs">
              <div class="py-1 border-b border-[#ECECEC] flex items-baseline justify-between">
                <span class="font-bold text-xl text-[#111827]">Display Header</span>
                <span class="text-[10px] text-[#6B7280] font-mono">bold 20px</span>
              </div>
              <div class="py-1 border-b border-[#ECECEC] flex items-baseline justify-between">
                <span class="font-semibold text-base text-[#111827]">Section Title</span>
                <span class="text-[10px] text-[#6B7280] font-mono">semibold 16px</span>
              </div>
              <div class="py-1 border-b border-[#ECECEC] flex items-baseline justify-between">
                <span class="font-medium text-xs text-[#111827]">Control Button Label</span>
                <span class="text-[10px] text-[#6B7280] font-mono">medium 12px</span>
              </div>
              <div class="py-1 border-b border-[#ECECEC] flex items-baseline justify-between">
                <span class="font-normal text-xs text-[#6B7280]">Body & Descriptive Text</span>
                <span class="text-[10px] text-[#6B7280] font-mono">normal 12px</span>
              </div>
              <div class="py-1 flex items-baseline justify-between">
                <span class="font-mono text-xs text-[#111827]">€1,248.50 · 09:00</span>
                <span class="text-[10px] text-[#6B7280] font-mono">mono 12px</span>
              </div>
            </div>
          </div>

          <!-- Color Tokens Palette -->
          <div class="space-y-3">
            <span class="text-xs font-semibold text-[#4B5563]">Color Tokens</span>
            <div class="grid grid-cols-2 gap-2 text-xs">
              <div class="p-3 rounded-xl border border-[#ECECEC] bg-white flex items-center justify-between">
                <div><span class="font-semibold block text-[#111827]">Primary Canvas</span><span class="font-mono text-[10px] text-[#6B7280]">#FFFFFF</span></div>
                <div class="w-6 h-6 rounded-md bg-white border border-[#ECECEC]"></div>
              </div>
              <div class="p-3 rounded-xl border border-[#ECECEC] bg-white flex items-center justify-between">
                <div><span class="font-semibold block text-[#111827]">Primary Dark</span><span class="font-mono text-[10px] text-[#6B7280]">#111827</span></div>
                <div class="w-6 h-6 rounded-md bg-[#111827]"></div>
              </div>
              <div class="p-3 rounded-xl border border-[#ECECEC] bg-white flex items-center justify-between">
                <div><span class="font-semibold block text-[#111827]">Hover Fill</span><span class="font-mono text-[10px] text-[#6B7280]">#F7F7F8</span></div>
                <div class="w-6 h-6 rounded-md bg-[#F7F7F8] border border-[#ECECEC]"></div>
              </div>
              <div class="p-3 rounded-xl border border-[#ECECEC] bg-white flex items-center justify-between">
                <div><span class="font-semibold block text-[#111827]">Accent Emerald</span><span class="font-mono text-[10px] text-[#6B7280]">#10B981</span></div>
                <div class="w-6 h-6 rounded-md bg-[#10B981]"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>

    <!-- ========================================== -->
    <!-- VIEW 2: FOCUSED CODE INSPECTOR VIEW -->
    <!-- ========================================== -->
    <div id="inspectorContainer" class="hidden grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div class="lg:col-span-4 space-y-2">
        <span class="text-xs font-semibold text-[#111827] block">Select Component to Inspect</span>
        <div class="space-y-1">
          <button onclick="selectInspectComponent('search_capsule')" id="ins-search_capsule" class="w-full px-4 py-2.5 rounded-2xl border border-[#111827] bg-[#111827] text-white text-xs font-semibold text-left">Search Island Capsule</button>
          <button onclick="selectInspectComponent('svg_chart')" id="ins-svg_chart" class="w-full px-4 py-2.5 rounded-2xl border border-[#ECECEC] bg-white hover:bg-[#F7F7F8] text-[#4B5563] text-xs font-semibold text-left">Interactive SVG Chart</button>
          <button onclick="selectInspectComponent('siri_picker')" id="ins-siri_picker" class="w-full px-4 py-2.5 rounded-2xl border border-[#ECECEC] bg-white hover:bg-[#F7F7F8] text-[#4B5563] text-xs font-semibold text-left">Siri 3-Item Focal Wheel</button>
          <button onclick="selectInspectComponent('stroke_slider')" id="ins-stroke_slider" class="w-full px-4 py-2.5 rounded-2xl border border-[#ECECEC] bg-white hover:bg-[#F7F7F8] text-[#4B5563] text-xs font-semibold text-left">Stroke-Free Slider</button>
          <button onclick="selectInspectComponent('data_table')" id="ins-data_table" class="w-full px-4 py-2.5 rounded-2xl border border-[#ECECEC] bg-white hover:bg-[#F7F7F8] text-[#4B5563] text-xs font-semibold text-left">Data Table Row</button>
          <button onclick="selectInspectComponent('divider_list')" id="ins-divider_list" class="w-full px-4 py-2.5 rounded-2xl border border-[#ECECEC] bg-white hover:bg-[#F7F7F8] text-[#4B5563] text-xs font-semibold text-left">Divider Service Row</button>
        </div>
      </div>

      <div class="lg:col-span-8 space-y-3">
        <div class="flex items-center justify-between">
          <span class="text-xs font-semibold text-[#111827]">Clean React / Tailwind Code</span>
          <button onclick="copyCurrentCode()" class="text-xs font-medium text-[#111827] hover:underline flex items-center gap-1 cursor-pointer">
            <svg class="w-3.5 h-3.5 stroke-[2]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
            <span id="copyCodeLabel">Copy Code</span>
          </button>
        </div>
        <textarea id="inspectCodeArea" rows="18" readonly class="w-full p-4 rounded-3xl bg-white border border-[#ECECEC] text-xs font-mono text-[#111827] focus:outline-none"></textarea>
      </div>
    </div>

  </main>

  <!-- TOKEN CUSTOMIZER SIDEBAR DRAWER -->
  <div id="customizerDrawer" class="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white border-l border-[#ECECEC] shadow-2xl p-6 space-y-6 transform translate-x-full transition-transform duration-300 ease-out overflow-y-auto text-left">
    <div class="flex items-center justify-between border-b border-[#ECECEC] pb-4">
      <div>
        <h3 class="font-semibold text-base text-[#111827]">Design Tokens Editor</h3>
        <p class="text-xs text-[#6B7280]">Adjust tokens and see live canvas update immediately</p>
      </div>
      <button onclick="toggleCustomizerDrawer()" class="p-1.5 rounded-full hover:bg-[#F7F7F8] text-[#6B7280] hover:text-[#111827] cursor-pointer">
        <svg class="w-4 h-4 stroke-[2]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
      </button>
    </div>

    <!-- Color Tokens -->
    <div class="space-y-3">
      <span class="text-xs font-semibold text-[#111827] block">Surface Colors</span>
      <div class="space-y-2 text-xs">
        <div class="flex items-center justify-between">
          <span class="text-[#6B7280]">Primary Text:</span>
          <input type="color" id="tokenTextPrimary" value="#111827" oninput="applyTokenChange()" class="w-7 h-7 rounded-lg border border-[#ECECEC] cursor-pointer" />
        </div>
        <div class="flex items-center justify-between">
          <span class="text-[#6B7280]">Hover Fill:</span>
          <input type="color" id="tokenFillHover" value="#F7F7F8" oninput="applyTokenChange()" class="w-7 h-7 rounded-lg border border-[#ECECEC] cursor-pointer" />
        </div>
        <div class="flex items-center justify-between">
          <span class="text-[#6B7280]">Accent Green:</span>
          <input type="color" id="tokenAccent" value="#10B981" oninput="applyTokenChange()" class="w-7 h-7 rounded-lg border border-[#ECECEC] cursor-pointer" />
        </div>
      </div>
    </div>

    <div class="pt-4 border-t border-[#ECECEC]">
      <button onclick="saveTokensToServer()" id="saveTokensBtn" class="w-full h-10 rounded-full bg-[#111827] hover:bg-[#262626] text-white text-xs font-semibold shadow-2xs transition-all cursor-pointer">
        Save Tokens to Repo
      </button>
    </div>
  </div>

  <script>
    const SNIPPETS = {
      search_capsule: \`<div class="w-full bg-[#EBECEE] p-0 rounded-full flex items-center shadow-sm">
  <button class="flex-1 px-5 py-3.5 text-left rounded-full bg-white shadow-[0_4px_20px_rgba(0,0,0,0.12)] z-10">
    <span class="block text-[10px] font-semibold text-[#111827]">Where</span>
    <span class="block text-xs font-normal text-[#4B5563]">Bratislava, Slovakia</span>
  </button>
  <button class="flex-1 px-5 py-3.5 text-left rounded-full hover:bg-[#F7F7F8] z-10">
    <span class="block text-[10px] font-semibold text-[#111827]">When</span>
    <span class="block text-xs font-normal text-[#6B7280]">Tomorrow, 14:00</span>
  </button>
  <button class="flex-1 px-5 py-3.5 text-left rounded-full hover:bg-[#F7F7F8] z-10">
    <span class="block text-[10px] font-semibold text-[#111827]">Service</span>
    <span class="block text-xs font-normal text-[#6B7280]">Haircut & Styling</span>
  </button>
  <button class="w-10 h-10 mr-2 rounded-full bg-[#111827] text-white flex items-center justify-center active:scale-95">
    <SearchIcon className="w-4 h-4 stroke-[2]" />
  </button>
</div>\`,

      svg_chart: \`<div class="p-6 rounded-3xl border border-[#ECECEC] bg-white space-y-4">
  <div class="flex items-center justify-between">
    <div>
      <span class="text-xs text-[#6B7280]">Platform Gross Merchandise Volume</span>
      <p class="font-semibold text-2xl text-[#111827] mt-0.5">€48,620.00</p>
    </div>
  </div>
  <svg class="w-full h-48 overflow-visible" viewBox="0 0 600 180">
    <path d="M0,150 Q100,120 200,90 T400,60 T600,30 L600,180 L0,180 Z" fill="url(#chartGradient)"/>
    <path d="M0,150 Q100,120 200,90 T400,60 T600,30" fill="none" stroke="#10B981" stroke-width="2.5"/>
  </svg>
</div>\`,

      siri_picker: \`<div class="p-4 rounded-2xl bg-[#F7F7F8] border border-[#ECECEC] flex items-center justify-between">
  <button class="w-9 h-9 rounded-full bg-white border border-[#ECECEC] active:scale-90 shadow-2xs">‹</button>
  <div class="flex items-center gap-3 font-mono text-sm">
    <span class="text-xs text-[#9CA3AF] opacity-60">1.50%</span>
    <div class="px-4 py-2 rounded-xl bg-white border border-[#111827] font-bold text-base shadow-2xs">1.75%</div>
    <span class="text-xs text-[#9CA3AF] opacity-60">2.00%</span>
  </div>
  <button class="w-9 h-9 rounded-full bg-white border border-[#ECECEC] active:scale-90 shadow-2xs">›</button>
</div>\`,

      stroke_slider: \`<div class="p-5 rounded-2xl bg-white border border-[#ECECEC] space-y-2">
  <!-- Stroke-free custom Apple slider -->
  <input type="range" min="50" max="2000" step="50" value="500" class="w-full cursor-pointer" />
</div>\`,

      data_table: \`<tr class="hover:bg-[#F7F7F8] transition-colors">
  <td class="py-3.5 px-3 font-semibold text-[#111827]">#1 Bratislava, Slovakia</td>
  <td class="py-3.5 px-3 font-bold text-emerald-600">92/100</td>
  <td class="py-3.5 px-3 text-[#111827]">84 salons</td>
  <td class="py-3.5 px-3 font-medium text-[#111827]">€36.50</td>
  <td class="py-3.5 px-3 text-[#6B7280]">64/100</td>
  <td class="py-3.5 px-3 text-[#4B5563]">Barbershop</td>
  <td class="py-3.5 px-3 font-semibold text-[#111827] text-right">€380,000</td>
</tr>\`,

      divider_list: \`<div class="divide-y divide-[#ECECEC] border-t border-b border-[#ECECEC]">
  <div class="py-3.5 px-3 -mx-3 rounded-2xl hover:bg-[#F7F7F8] transition-colors flex items-center justify-between">
    <div>
      <h4 class="font-semibold text-xs text-[#111827]">Women's Signature Haircut</h4>
      <p class="text-xs text-[#6B7280]">Includes wash and custom styling</p>
    </div>
    <span class="font-bold text-xs text-[#111827]">€45</span>
  </div>
</div>\`
    };

    function setViewMode(mode) {
      if (mode === 'showroom') {
        document.getElementById('viewBtnShowroom').className = 'px-3.5 py-1 rounded-full font-semibold bg-[#111827] text-white shadow-2xs transition-all cursor-pointer';
        document.getElementById('viewBtnInspector').className = 'px-3.5 py-1 rounded-full font-medium text-[#6B7280] hover:text-[#111827] transition-all cursor-pointer';
        document.getElementById('showroomContainer').classList.remove('hidden');
        document.getElementById('inspectorContainer').classList.add('hidden');
      } else {
        document.getElementById('viewBtnInspector').className = 'px-3.5 py-1 rounded-full font-semibold bg-[#111827] text-white shadow-2xs transition-all cursor-pointer';
        document.getElementById('viewBtnShowroom').className = 'px-3.5 py-1 rounded-full font-medium text-[#6B7280] hover:text-[#111827] transition-all cursor-pointer';
        document.getElementById('inspectorContainer').classList.remove('hidden');
        document.getElementById('showroomContainer').classList.add('hidden');
        selectInspectComponent('search_capsule');
      }
    }

    function selectInspectComponent(key) {
      document.querySelectorAll('#inspectorContainer button').forEach(b => {
        b.className = 'w-full px-4 py-2.5 rounded-2xl border border-[#ECECEC] bg-white hover:bg-[#F7F7F8] text-[#4B5563] text-xs font-semibold text-left transition-all';
      });
      const active = document.getElementById('ins-' + key);
      if (active) {
        active.className = 'w-full px-4 py-2.5 rounded-2xl border border-[#111827] bg-[#111827] text-white text-xs font-semibold text-left transition-all';
      }
      document.getElementById('inspectCodeArea').value = SNIPPETS[key] || '';
    }

    function setActiveSegment(seg) {
      const segs = ['where', 'when', 'service'];
      segs.forEach(s => {
        const btn = document.getElementById('seg-' + s);
        if (s === seg) {
          btn.className = 'flex-1 px-5 py-3.5 text-left rounded-full transition-all cursor-pointer relative z-10 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.12)]';
        } else {
          btn.className = 'flex-1 px-5 py-3.5 text-left rounded-full transition-all cursor-pointer relative z-10 hover:bg-[#F7F7F8]';
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

    function toggleCustomizerDrawer() {
      const drawer = document.getElementById('customizerDrawer');
      drawer.classList.toggle('translate-x-full');
    }

    function applyTokenChange() {
      const textColor = document.getElementById('tokenTextPrimary').value;
      const hoverColor = document.getElementById('tokenFillHover').value;
      const accentColor = document.getElementById('tokenAccent').value;
      document.documentElement.style.setProperty('--text-primary', textColor);
      document.documentElement.style.setProperty('--fill-hover', hoverColor);
      document.documentElement.style.setProperty('--accent-color', accentColor);
    }

    function handleChartHover(e) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
      const pct = x / rect.width;
      const svgX = pct * 600;
      
      const svgY = 150 - Math.sin(pct * Math.PI * 0.8) * 110;
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
      ['7D', '30D', '90D', '1Y'].forEach(p => {
        const b = document.getElementById('chartBtn' + p);
        if (p === period) {
          b.className = 'px-2.5 py-1 rounded-lg font-semibold bg-white text-[#111827] shadow-2xs';
        } else {
          b.className = 'px-2.5 py-1 rounded-lg font-medium text-[#6B7280] hover:text-[#111827]';
        }
      });
      if (period === '7D') document.getElementById('chartTotalVal').innerText = '€11,240.00';
      if (period === '30D') document.getElementById('chartTotalVal').innerText = '€48,620.00';
      if (period === '90D') document.getElementById('chartTotalVal').innerText = '€142,800.00';
      if (period === '1Y') document.getElementById('chartTotalVal').innerText = '€584,000.00';
    }

    function copyCurrentCode() {
      const text = document.getElementById('inspectCodeArea').value;
      navigator.clipboard.writeText(text);
      const label = document.getElementById('copyCodeLabel');
      label.innerText = 'Copied!';
      setTimeout(() => { label.innerText = 'Copy Code'; }, 2000);
    }

    async function saveTokensToServer() {
      const btn = document.getElementById('saveTokensBtn');
      btn.disabled = true;
      btn.innerText = 'Saving...';
      try {
        const tokens = {
          colors: {
            primary: '#FFFFFF',
            dark: document.getElementById('tokenTextPrimary').value,
            hover: document.getElementById('tokenFillHover').value,
            accent: document.getElementById('tokenAccent').value,
          }
        };
        const res = await fetch('/api/save-tokens', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(tokens)
        });
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        alert('Design tokens saved to tokens/tokens.json!');
      } catch (err) {
        alert('Save failed: ' + err.message);
      } finally {
        btn.disabled = false;
        btn.innerText = 'Save Tokens to Repo';
      }
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

      if (url.pathname === "/api/save-tokens" && req.method === "POST") {
        try {
          const body = await req.json();
          writeFileSync(TOKENS_PATH, JSON.stringify(body, null, 2), "utf-8");
          return Response.json({ success: true, savedAt: new Date().toISOString() });
        } catch (err: any) {
          return Response.json({ error: err.message }, { status: 500 });
        }
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
