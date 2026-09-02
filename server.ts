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
  <title>Single-Surface Design — Interactive Editor & Playground</title>
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

    .single-surface-canvas {
      background-color: var(--bg-primary);
      color: var(--text-primary);
    }

    .custom-pill {
      border-radius: var(--radius-pill);
    }
    .custom-card {
      border-radius: var(--radius-card);
    }
    .custom-sub {
      border-radius: var(--radius-sub);
    }
  </style>
</head>
<body class="bg-[#F9FAFB] text-[#111827] min-h-screen flex flex-col antialiased selection:bg-[#111827] selection:text-white">

  <!-- Fixed Topbar -->
  <header class="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md [transform:translateZ(0)] border-b border-[#ECECEC] h-16 flex items-center px-6 md:px-12">
    <div class="max-w-7xl w-full mx-auto flex items-center justify-between gap-4">
      <div class="flex items-center gap-3">
        <span class="font-semibold text-xl text-[#111827] tracking-tight">single-surface-design</span>
        <span class="text-xs font-medium text-[#6B7280] bg-[#F7F7F8] border border-[#ECECEC] px-2.5 py-0.5 rounded-full">
          Interactive Design Playground & Live Editor
        </span>
      </div>

      <div class="flex items-center gap-2.5">
        <button onclick="toggleCustomizerDrawer()" class="h-9 px-4 rounded-full bg-[#111827] hover:bg-[#262626] text-white text-xs font-semibold shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer active:scale-95">
          <svg class="w-3.5 h-3.5 stroke-[2]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/></svg>
          <span>Design Tokens</span>
        </button>
        <button onclick="exportTailwindConfig()" class="h-9 px-4 rounded-full border border-[#E5E7EB] hover:border-[#D1D5DB] bg-white text-[#111827] text-xs font-semibold shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer active:scale-95">
          <svg class="w-3.5 h-3.5 stroke-[2]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
          <span>Copy Config</span>
        </button>
      </div>
    </div>
  </header>

  <!-- Main Split Canvas: Left Editor Controls & Right Live Surface Preview -->
  <main class="flex-1 max-w-7xl w-full mx-auto px-6 md:px-12 pt-24 pb-20 grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">

    <!-- LEFT COLUMN: Component Switcher & Interactive Settings (4 cols) -->
    <div class="lg:col-span-4 space-y-6">
      <div class="space-y-1">
        <h2 class="font-semibold text-lg text-[#111827]">Component Explorer</h2>
        <p class="text-xs text-[#6B7280]">Select a component to inspect, customize in real-time, and copy clean code.</p>
      </div>

      <!-- Component Selection Tabs -->
      <div class="space-y-1">
        <button onclick="selectComponent('search_capsule')" id="comp-search_capsule" class="comp-btn w-full px-4 py-2.5 rounded-2xl border border-[#111827] bg-[#111827] text-white text-xs font-semibold text-left transition-all flex items-center justify-between cursor-pointer">
          <span>1. Search Capsule Island</span>
          <svg class="w-3.5 h-3.5 stroke-[2]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
        </button>
        <button onclick="selectComponent('siri_picker')" id="comp-siri_picker" class="comp-btn w-full px-4 py-2.5 rounded-2xl border border-[#ECECEC] bg-white hover:bg-[#F7F7F8] text-[#4B5563] text-xs font-semibold text-left transition-all flex items-center justify-between cursor-pointer">
          <span>2. Siri 3-Item Focal Wheel</span>
          <svg class="w-3.5 h-3.5 stroke-[2]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
        </button>
        <button onclick="selectComponent('stroke_slider')" id="comp-stroke_slider" class="comp-btn w-full px-4 py-2.5 rounded-2xl border border-[#ECECEC] bg-white hover:bg-[#F7F7F8] text-[#4B5563] text-xs font-semibold text-left transition-all flex items-center justify-between cursor-pointer">
          <span>3. Stroke-Free Range Slider</span>
          <svg class="w-3.5 h-3.5 stroke-[2]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
        </button>
        <button onclick="selectComponent('divider_list')" id="comp-divider_list" class="comp-btn w-full px-4 py-2.5 rounded-2xl border border-[#ECECEC] bg-white hover:bg-[#F7F7F8] text-[#4B5563] text-xs font-semibold text-left transition-all flex items-center justify-between cursor-pointer">
          <span>4. Flat Divider List & Accordion</span>
          <svg class="w-3.5 h-3.5 stroke-[2]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
        </button>
        <button onclick="selectComponent('metric_row')" id="comp-metric_row" class="comp-btn w-full px-4 py-2.5 rounded-2xl border border-[#ECECEC] bg-white hover:bg-[#F7F7F8] text-[#4B5563] text-xs font-semibold text-left transition-all flex items-center justify-between cursor-pointer">
          <span>5. Flat Divider Metric Row</span>
          <svg class="w-3.5 h-3.5 stroke-[2]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
        </button>
        <button onclick="selectComponent('spring_modal')" id="comp-spring_modal" class="comp-btn w-full px-4 py-2.5 rounded-2xl border border-[#ECECEC] bg-white hover:bg-[#F7F7F8] text-[#4B5563] text-xs font-semibold text-left transition-all flex items-center justify-between cursor-pointer">
          <span>6. Spring Modal Dialog</span>
          <svg class="w-3.5 h-3.5 stroke-[2]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
        </button>
      </div>

      <!-- Live Code Snippet Output -->
      <div class="space-y-2 pt-2">
        <div class="flex items-center justify-between">
          <span class="text-xs font-semibold text-[#111827]">Live Component Code</span>
          <button onclick="copyCurrentCode()" class="text-xs font-medium text-[#111827] hover:underline flex items-center gap-1 cursor-pointer">
            <svg class="w-3.5 h-3.5 stroke-[2]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
            <span id="copyCodeLabel">Copy Code</span>
          </button>
        </div>
        <textarea id="liveCodeOutput" rows="10" readonly class="w-full p-3.5 rounded-2xl bg-white border border-[#ECECEC] text-xs font-mono text-[#111827] focus:outline-none"></textarea>
      </div>
    </div>

    <!-- RIGHT COLUMN: Live Interactive Single-Surface Canvas (8 cols) -->
    <div class="lg:col-span-8 space-y-6">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="font-semibold text-lg text-[#111827]">Live Single-Surface Canvas</h2>
          <p class="text-xs text-[#6B7280]">Real-time rendering on pure <code class="font-mono text-[11px] bg-white px-1.5 py-0.5 rounded border border-[#ECECEC]">#FFFFFF</code> with active spring physics</p>
        </div>
        <span class="text-xs font-mono font-medium text-emerald-600 bg-emerald-50 border border-emerald-200/60 px-2.5 py-1 rounded-full">
          Anti-Slop Verified
        </span>
      </div>

      <!-- Preview Surface Box -->
      <div class="single-surface-canvas p-8 sm:p-12 rounded-3xl border border-[#E5E7EB] shadow-[0_12px_40px_rgba(0,0,0,0.06)] min-h-[520px] flex flex-col justify-center relative overflow-hidden" id="previewCanvas">
        
        <!-- VIEW 1: SEARCH CAPSULE ISLAND -->
        <div id="view-search_capsule" class="comp-view space-y-6 max-w-2xl w-full mx-auto">
          <div class="text-center space-y-1">
            <span class="text-xs font-semibold text-[#6B7280]">Interactive Search Island</span>
            <p class="text-xs text-[#9CA3AF]">Click segments to auto-advance from Where to When to Service</p>
          </div>

          <!-- Capsule Form -->
          <div class="w-full bg-[#EBECEE] p-0 rounded-full flex items-center relative transition-all shadow-sm">
            <!-- Where Segment -->
            <button onclick="setActiveSegment('where')" id="seg-where" class="flex-1 px-5 py-3 text-left rounded-full transition-all cursor-pointer relative z-10 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.12)]">
              <span class="block text-[10px] font-semibold text-[#111827]">Where</span>
              <span class="block text-xs font-normal text-[#4B5563]" id="whereText">Bratislava, Slovakia</span>
            </button>

            <!-- Divider 1 -->
            <div id="div-1" class="w-px h-6 bg-[#ECECEC] opacity-0 transition-opacity"></div>

            <!-- When Segment -->
            <button onclick="setActiveSegment('when')" id="seg-when" class="flex-1 px-5 py-3 text-left rounded-full transition-all cursor-pointer relative z-10 hover:bg-[#F7F7F8]">
              <span class="block text-[10px] font-semibold text-[#111827]">When</span>
              <span class="block text-xs font-normal text-[#6B7280]" id="whenText">Any date & time</span>
            </button>

            <!-- Divider 2 -->
            <div id="div-2" class="w-px h-6 bg-[#ECECEC] opacity-100 transition-opacity"></div>

            <!-- Service Segment -->
            <button onclick="setActiveSegment('service')" id="seg-service" class="flex-1 px-5 py-3 text-left rounded-full transition-all cursor-pointer relative z-10 hover:bg-[#F7F7F8]">
              <span class="block text-[10px] font-semibold text-[#111827]">Service</span>
              <span class="block text-xs font-normal text-[#6B7280]" id="serviceText">Haircut, Barber, Nails</span>
            </button>

            <!-- Search Circle Button -->
            <div class="pr-2 z-20">
              <button onclick="triggerSearchMock()" class="w-10 h-10 rounded-full bg-[#111827] hover:bg-[#262626] text-white flex items-center justify-center transition-all cursor-pointer active:scale-95 shadow-2xs">
                <svg class="w-4 h-4 stroke-[2.2]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
              </button>
            </div>
          </div>

          <div class="p-4 rounded-2xl bg-[#F7F7F8] border border-[#ECECEC] text-xs text-[#4B5563] space-y-1">
            <span class="font-semibold text-[#111827] block">Active Segment State:</span>
            <p id="segmentStatusText">Active: "Where" (Highlighted in pure white with elevation shadow)</p>
          </div>
        </div>

        <!-- VIEW 2: SIRI 3-ITEM FOCAL WHEEL PICKER -->
        <div id="view-siri_picker" class="comp-view hidden space-y-6 max-w-md w-full mx-auto text-center">
          <div class="space-y-1">
            <span class="text-xs font-semibold text-[#6B7280]">Siri 3-Item Windowed Focal Wheel</span>
            <p class="text-xs text-[#9CA3AF]">Physical directional sliding with 3-item focal frame</p>
          </div>

          <!-- Focal Wheel Picker Container -->
          <div class="p-4 rounded-2xl bg-[#F7F7F8] border border-[#ECECEC] flex items-center justify-between gap-2">
            <button onclick="stepSiriPicker(-1)" class="w-9 h-9 rounded-full bg-white border border-[#ECECEC] hover:bg-[#F7F7F8] flex items-center justify-center text-[#111827] cursor-pointer transition-all active:scale-90 shadow-2xs">
              <svg class="w-4 h-4 stroke-[2]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/></svg>
            </button>

            <!-- 3 Items Window -->
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
          <p class="text-xs text-[#6B7280]">Supports direct input & directional left-to-right / right-to-left spring animation</p>
        </div>

        <!-- VIEW 3: STROKE-FREE RANGE SLIDER -->
        <div id="view-stroke_slider" class="comp-view hidden space-y-6 max-w-md w-full mx-auto">
          <div class="space-y-1 text-center">
            <span class="text-xs font-semibold text-[#6B7280]">Stroke-Free Modern Range Slider</span>
            <p class="text-xs text-[#9CA3AF]">Zero border, zero native stroke, seamless Apple-inspired thumb</p>
          </div>

          <div class="space-y-3 p-5 rounded-2xl bg-white border border-[#ECECEC]">
            <div class="flex justify-between items-center text-xs">
              <span class="font-medium text-[#4B5563]">Target Salons Volume</span>
              <span id="sliderDemoVal" class="font-bold text-base text-[#111827]">500 Salons</span>
            </div>
            <input type="range" id="sliderDemo" min="50" max="2000" step="50" value="500" oninput="updateDemoSlider(this.value)" class="w-full cursor-pointer" />
            <div class="flex justify-between text-[10px] text-[#9CA3AF]">
              <span>50 salons</span>
              <span>2,000 salons</span>
            </div>
          </div>
        </div>

        <!-- VIEW 4: FLAT DIVIDER LIST & ACCORDION -->
        <div id="view-divider_list" class="comp-view hidden space-y-4 max-w-xl w-full mx-auto">
          <div class="space-y-1 text-center">
            <span class="text-xs font-semibold text-[#6B7280]">Flat Divider List (Single-Surface Standard)</span>
            <p class="text-xs text-[#9CA3AF]">Negative margin hover fills with zero boxed card containers</p>
          </div>

          <div class="divide-y divide-[#ECECEC] border-t border-b border-[#ECECEC]">
            <div class="py-3.5 px-3 -mx-3 rounded-2xl hover:bg-[#F7F7F8] transition-colors cursor-pointer flex items-center justify-between">
              <div class="space-y-0.5">
                <h4 class="font-semibold text-xs text-[#111827]">Women's Precision Haircut & Styling</h4>
                <p class="text-xs text-[#6B7280]">Includes refreshing organic wash, scalp massage, and custom blowout</p>
              </div>
              <div class="text-right shrink-0">
                <span class="font-bold text-xs text-[#111827]">€45</span>
                <p class="text-[10px] text-[#9CA3AF]">45 min</p>
              </div>
            </div>

            <div class="py-3.5 px-3 -mx-3 rounded-2xl hover:bg-[#F7F7F8] transition-colors cursor-pointer flex items-center justify-between">
              <div class="space-y-0.5">
                <h4 class="font-semibold text-xs text-[#111827]">Executive Hot Towel Shave & Beard Trim</h4>
                <p class="text-xs text-[#6B7280]">Straight razor line-up, essential oil treatment, and cold compress</p>
              </div>
              <div class="text-right shrink-0">
                <span class="font-bold text-xs text-[#111827]">€28</span>
                <p class="text-[10px] text-[#9CA3AF]">30 min</p>
              </div>
            </div>

            <div class="py-3.5 px-3 -mx-3 rounded-2xl hover:bg-[#F7F7F8] transition-colors cursor-pointer flex items-center justify-between">
              <div class="space-y-0.5">
                <h4 class="font-semibold text-xs text-[#111827]">Hydra-Deep Pore Cleansing & Facial Mask</h4>
                <p class="text-xs text-[#6B7280]">Hyaluronic moisture infusion and collagen tightening</p>
              </div>
              <div class="text-right shrink-0">
                <span class="font-bold text-xs text-[#111827]">€65</span>
                <p class="text-[10px] text-[#9CA3AF]">60 min</p>
              </div>
            </div>
          </div>
        </div>

        <!-- VIEW 5: FLAT DIVIDER METRIC ROW -->
        <div id="view-metric_row" class="comp-view hidden space-y-6 max-w-2xl w-full mx-auto">
          <div class="space-y-1 text-center">
            <span class="text-xs font-semibold text-[#6B7280]">Flat Divider Metric Row</span>
            <p class="text-xs text-[#9CA3AF]">Replaces 4-5 side-by-side boxed gray cards with clean dividers</p>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 py-5 border-t border-b border-[#ECECEC] text-left">
            <div>
              <span class="text-xs text-[#6B7280]">Monthly Bookings</span>
              <p class="font-semibold text-2xl text-[#111827] mt-0.5">1,248</p>
              <span class="text-[10px] text-emerald-600 font-medium">+18.4% vs last mo</span>
            </div>
            <div>
              <span class="text-xs text-[#6B7280]">Gross Volume</span>
              <p class="font-semibold text-2xl text-[#111827] mt-0.5">€48,620</p>
              <span class="text-[10px] text-[#6B7280]">Platform GMV</span>
            </div>
            <div>
              <span class="text-xs text-[#6B7280]">Take-Rate Revenue</span>
              <p class="font-semibold text-2xl text-[#111827] mt-0.5">€1,225</p>
              <span class="text-[10px] text-[#6B7280]">1.75% + €0.30</span>
            </div>
            <div>
              <span class="text-xs text-[#6B7280]">SaaS MRR</span>
              <p class="font-semibold text-2xl text-emerald-600 mt-0.5">€2,970</p>
              <span class="text-[10px] text-emerald-600/80">Pro tier subscriptions</span>
            </div>
          </div>
        </div>

        <!-- VIEW 6: SPRING MODAL DIALOG -->
        <div id="view-spring_modal" class="comp-view hidden space-y-6 max-w-md w-full mx-auto text-center">
          <div class="space-y-1">
            <span class="text-xs font-semibold text-[#6B7280]">Spring Modal Dialog</span>
            <p class="text-xs text-[#9CA3AF]">Critically damped spring entrance with backdrop blur</p>
          </div>

          <button onclick="openDemoModal()" class="h-10 px-6 rounded-full bg-[#111827] hover:bg-[#262626] text-white text-xs font-semibold shadow-2xs transition-all cursor-pointer active:scale-95">
            Trigger Spring Modal
          </button>
        </div>

      </div>
    </div>

  </main>

  <!-- TOKEN CUSTOMIZER SIDEBAR DRAWER -->
  <div id="customizerDrawer" class="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white border-l border-[#ECECEC] shadow-2xl p-6 space-y-6 transform translate-x-full transition-transform duration-300 ease-out overflow-y-auto text-left">
    <div class="flex items-center justify-between border-b border-[#ECECEC] pb-4">
      <div>
        <h3 class="font-semibold text-base text-[#111827]">Design Tokens Editor</h3>
        <p class="text-xs text-[#6B7280]">Adjust tokens and see the live canvas update immediately</p>
      </div>
      <button onclick="toggleCustomizerDrawer()" class="p-1.5 rounded-full hover:bg-[#F7F7F8] text-[#6B7280] hover:text-[#111827] transition-colors cursor-pointer">
        <svg class="w-4 h-4 stroke-[2]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
      </button>
    </div>

    <!-- Color Tokens -->
    <div class="space-y-3">
      <span class="text-xs font-semibold text-[#111827] block">Surface & Color Tokens</span>
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
          <span class="text-[#6B7280]">Accent / Green:</span>
          <input type="color" id="tokenAccent" value="#10B981" oninput="applyTokenChange()" class="w-7 h-7 rounded-lg border border-[#ECECEC] cursor-pointer" />
        </div>
      </div>
    </div>

    <!-- Radius Tokens -->
    <div class="space-y-3 pt-3 border-t border-[#ECECEC]">
      <span class="text-xs font-semibold text-[#111827] block">Corner Radius Hierarchy</span>
      <div class="space-y-2 text-xs">
        <div>
          <div class="flex justify-between">
            <span class="text-[#6B7280]">Major Card Radius:</span>
            <span id="cardRadiusVal" class="font-mono font-semibold text-[#111827]">16px</span>
          </div>
          <input type="range" min="8" max="32" value="16" oninput="updateRadiusToken('card', this.value)" class="w-full mt-1 cursor-pointer" />
        </div>
      </div>
    </div>

    <!-- Save Tokens Button -->
    <div class="pt-4 border-t border-[#ECECEC] space-y-2">
      <button onclick="saveTokensToServer()" id="saveTokensBtn" class="w-full h-10 rounded-full bg-[#111827] hover:bg-[#262626] text-white text-xs font-semibold shadow-2xs transition-all cursor-pointer">
        Save Tokens to Repo
      </button>
    </div>
  </div>

  <!-- DEMO SPRING MODAL -->
  <div id="demoSpringModal" class="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 hidden">
    <div class="bg-white rounded-3xl border border-[#E5E7EB] shadow-2xl max-w-md w-full p-6 sm:p-8 space-y-4 text-left transform scale-95 opacity-0 transition-all duration-200" id="demoModalContent">
      <div class="flex items-center justify-between border-b border-[#ECECEC] pb-3">
        <h3 class="font-semibold text-base text-[#111827]">Single-Surface Modal</h3>
        <button onclick="closeDemoModal()" class="p-1 rounded-full hover:bg-[#F7F7F8] text-[#6B7280] hover:text-[#111827] cursor-pointer">
          <svg class="w-4 h-4 stroke-[2]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
      </div>
      <p class="text-xs text-[#6B7280] leading-relaxed">
        This dialog renders on pure white with zero nested boxed frames, crisp proportional typography, and 16px corner radius.
      </p>
      <div class="flex justify-end gap-2 pt-2">
        <button onclick="closeDemoModal()" class="h-9 px-5 rounded-full bg-[#111827] text-white text-xs font-semibold cursor-pointer">Dismiss</button>
      </div>
    </div>
  </div>

  <script>
    const COMPONENT_SNIPPETS = {
      search_capsule: \`<div class="w-full bg-[#EBECEE] p-0 rounded-full flex items-center shadow-sm">
  <button class="flex-1 px-5 py-3 text-left rounded-full bg-white shadow-[0_4px_20px_rgba(0,0,0,0.12)] z-10">
    <span class="block text-[10px] font-semibold text-[#111827]">Where</span>
    <span class="block text-xs font-normal text-[#4B5563]">Bratislava, Slovakia</span>
  </button>
  <button class="flex-1 px-5 py-3 text-left rounded-full hover:bg-[#F7F7F8] z-10">
    <span class="block text-[10px] font-semibold text-[#111827]">When</span>
    <span class="block text-xs font-normal text-[#6B7280]">Any date & time</span>
  </button>
  <button class="flex-1 px-5 py-3 text-left rounded-full hover:bg-[#F7F7F8] z-10">
    <span class="block text-[10px] font-semibold text-[#111827]">Service</span>
    <span class="block text-xs font-normal text-[#6B7280]">Haircut, Barber</span>
  </button>
  <button class="w-10 h-10 mr-2 rounded-full bg-[#111827] text-white flex items-center justify-center active:scale-95">
    <SearchIcon className="w-4 h-4 stroke-[2]" />
  </button>
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

      stroke_slider: \`<div class="space-y-3 p-5 rounded-2xl bg-white border border-[#ECECEC]">
  <div class="flex justify-between items-center text-xs">
    <span class="font-medium text-[#4B5563]">Target Salons Volume</span>
    <span class="font-bold text-base text-[#111827]">500 Salons</span>
  </div>
  <!-- Stroke-free custom Apple slider -->
  <input type="range" min="50" max="2000" step="50" value="500" class="w-full cursor-pointer" />
</div>\`,

      divider_list: \`<div class="divide-y divide-[#ECECEC] border-t border-b border-[#ECECEC]">
  <div class="py-3.5 px-3 -mx-3 rounded-2xl hover:bg-[#F7F7F8] transition-colors flex items-center justify-between">
    <div>
      <h4 class="font-semibold text-xs text-[#111827]">Women's Precision Haircut</h4>
      <p class="text-xs text-[#6B7280]">Wash, scalp massage, and custom blowout</p>
    </div>
    <span class="font-bold text-xs text-[#111827]">€45</span>
  </div>
</div>\`,

      metric_row: \`<div class="grid grid-cols-2 sm:grid-cols-4 gap-4 py-5 border-t border-b border-[#ECECEC]">
  <div>
    <span class="text-xs text-[#6B7280]">Monthly Bookings</span>
    <p class="font-semibold text-2xl text-[#111827] mt-0.5">1,248</p>
  </div>
  <div>
    <span class="text-xs text-[#6B7280]">Gross Volume</span>
    <p class="font-semibold text-2xl text-[#111827] mt-0.5">€48,620</p>
  </div>
</div>\`,

      spring_modal: \`<div class="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
  <div class="bg-white rounded-3xl border border-[#E5E7EB] shadow-2xl max-w-md w-full p-6 sm:p-8 space-y-4">
    <h3 class="font-semibold text-base text-[#111827]">Single-Surface Dialog</h3>
    <p class="text-xs text-[#6B7280]">Flat layout sitting directly on pure white canvas.</p>
  </div>
</div>\`
    };

    let currentComponentKey = 'search_capsule';

    function selectComponent(key) {
      currentComponentKey = key;
      document.querySelectorAll('.comp-btn').forEach(b => {
        b.className = 'comp-btn w-full px-4 py-2.5 rounded-2xl border border-[#ECECEC] bg-white hover:bg-[#F7F7F8] text-[#4B5563] text-xs font-semibold text-left transition-all flex items-center justify-between cursor-pointer';
      });
      const activeBtn = document.getElementById('comp-' + key);
      if (activeBtn) {
        activeBtn.className = 'comp-btn w-full px-4 py-2.5 rounded-2xl border border-[#111827] bg-[#111827] text-white text-xs font-semibold text-left transition-all flex items-center justify-between cursor-pointer';
      }

      document.querySelectorAll('.comp-view').forEach(v => v.classList.add('hidden'));
      const activeView = document.getElementById('view-' + key);
      if (activeView) activeView.classList.remove('hidden');

      document.getElementById('liveCodeOutput').value = COMPONENT_SNIPPETS[key] || '';
    }

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
      document.getElementById('segmentStatusText').innerText = 'Active: "' + seg.toUpperCase() + '" (Highlighted in pure white with elevation shadow)';
    }

    const siriSteps = [1.00, 1.25, 1.50, 1.75, 2.00, 2.25, 2.50, 3.00];
    let siriIndex = 3;

    function stepSiriPicker(delta) {
      siriIndex = Math.max(1, Math.min(siriSteps.length - 2, siriIndex + delta));
      document.getElementById('siriPrev').innerText = siriSteps[siriIndex - 1].toFixed(2) + '%';
      document.getElementById('siriCenter').innerText = siriSteps[siriIndex].toFixed(2) + '%';
      document.getElementById('siriNext').innerText = siriSteps[siriIndex + 1].toFixed(2) + '%';
    }

    function updateDemoSlider(val) {
      document.getElementById('sliderDemoVal').innerText = val + ' Salons';
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

    function updateRadiusToken(type, val) {
      if (type === 'card') {
        document.documentElement.style.setProperty('--radius-card', val + 'px');
        document.getElementById('cardRadiusVal').innerText = val + 'px';
      }
    }

    function copyCurrentCode() {
      const text = document.getElementById('liveCodeOutput').value;
      navigator.clipboard.writeText(text);
      const label = document.getElementById('copyCodeLabel');
      label.innerText = 'Copied!';
      setTimeout(() => { label.innerText = 'Copy Code'; }, 2000);
    }

    function exportTailwindConfig() {
      const config = \`module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#FFFFFF',
          dark: '#111827',
          hover: '#F7F7F8',
          subtle: '#EBECEE',
          divider: '#ECECEC',
          accent: '#10B981',
        }
      },
      borderRadius: {
        '2xl': '16px',
        'xl': '12px',
        'lg': '8px',
      }
    }
  }
};\`;
      navigator.clipboard.writeText(config);
      alert('Tailwind design token configuration copied to clipboard!');
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
      setTimeout(() => {
        modal.classList.add('hidden');
      }, 150);
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
          },
          radii: {
            card: document.getElementById('cardRadiusVal').innerText,
          }
        };
        const res = await fetch('/api/save-tokens', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(tokens)
        });
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        alert('Design tokens saved successfully to tokens/tokens.json!');
      } catch (err) {
        alert('Save failed: ' + err.message);
      } finally {
        btn.disabled = false;
        btn.innerText = 'Save Tokens to Repo';
      }
    }

    window.addEventListener('DOMContentLoaded', () => {
      selectComponent('search_capsule');
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

  console.log(`\n🎨 [Single-Surface Design Editor] running at: http://localhost:${PORT}\n`);
  return server;
}

if (import.meta.main) {
  startDesignEditorServer();
}
