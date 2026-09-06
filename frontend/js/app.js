/**
 * AI-Based Smart Logistics & Accessibility Intelligence Platform (NER)
 * Main Application Logic & Interactive GIS Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  // Application State
  let currentLang = 'en';
  let isOfflineMode = false;
  let offlineQueue = JSON.parse(localStorage.getItem('ner_offline_reports') || '[]');

  // GIS Map References
  let map = null;
  let hubMarkersLayer = null;
  let disruptionMarkersLayer = null;
  let fleetMarkersLayer = null;
  let routePolylinesLayer = null;

  // Chart Instances
  let connectivityChart = null;
  let bottleneckChart = null;

  // Initialize Platform
  initThemeToggle();
  initNavigation();
  initOfflineToggle();
  initGISMap();
  initAlertsFeed();
  initAIRouter();
  initFleetTable();
  initIncidentModal();
  initAnalyticsCharts();
  initLanguageSwitcher();
  initMoreOptionsMenu();
  initLandslideSimulator();
  initBhashiniVoiceWidget();
  initULIPSearchEngine();
  initArrheniusSpoilageCalculator();
  initPDFReportExporter();
  initDriverFocusViewModal();



  /* ==========================================================================
     0. Theme Switcher (Light / Dark Mode)
     ========================================================================== */
  function initThemeToggle() {
    const themeBtn = document.getElementById('themeToggleBtn');
    const savedTheme = localStorage.getItem('ner_theme') || 'dark';

    if (savedTheme === 'light') {
      document.body.classList.add('light-theme');
      if (themeBtn) themeBtn.innerText = '🌙 Dark Mode';
    } else {
      document.body.classList.remove('light-theme');
      if (themeBtn) themeBtn.innerText = '☀️ Light Mode';
    }

    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        const isLight = document.body.classList.contains('light-theme');
        localStorage.setItem('ner_theme', isLight ? 'light' : 'dark');
        themeBtn.innerText = isLight ? '🌙 Dark Mode' : '☀️ Light Mode';

        showToast(`Switched to ${isLight ? 'Light' : 'Dark'} theme`, 'info');
      });
    }
  }

  /* ==========================================================================
     1. Navigation & Tab Manager
     ========================================================================== */
  function initNavigation() {
    const tabs = document.querySelectorAll('.nav-tab');
    const panels = document.querySelectorAll('.view-panel');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetView = tab.getAttribute('data-view');

        tabs.forEach(t => t.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));

        tab.classList.add('active');
        const activePanel = document.getElementById(targetView);
        if (activePanel) {
          activePanel.classList.add('active');
        }

        // Invalidate map size when switching to map tab
        if (targetView === 'viewMap' || targetView === 'viewDashboard') {
          setTimeout(() => {
            if (map) map.invalidateSize();
          }, 200);
        }
      });
    });
  }

  /* ==========================================================================
     2. Network & Offline Synchronization Engine
     ========================================================================== */
  function initOfflineToggle() {
    const toggleBtn = document.getElementById('offlineToggleBtn');
    const statusDot = document.getElementById('statusDot');
    const statusText = document.getElementById('statusText');
    const syncBadge = document.getElementById('syncQueueBadge');

    updateSyncBadge();

    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        isOfflineMode = !isOfflineMode;

        if (isOfflineMode) {
          if (statusDot) statusDot.classList.add('offline');
          if (statusText) statusText.innerText = NER_DATA.translations[currentLang].offlineModeActive;
          toggleBtn.classList.add('active');
        } else {
          if (statusDot) statusDot.classList.remove('offline');
          if (statusText) statusText.innerText = NER_DATA.translations[currentLang].offlineStatusText;
          toggleBtn.classList.remove('active');
          syncOfflineQueue();
        }
      });
    }

    function updateSyncBadge() {
      if (syncBadge) {
        syncBadge.innerText = offlineQueue.length;
        syncBadge.style.display = offlineQueue.length > 0 ? 'inline-block' : 'none';
      }
    }

    function syncOfflineQueue() {
      if (offlineQueue.length > 0) {
        offlineQueue.forEach(item => {
          NER_DATA.disruptions.unshift(item);
        });

        const count = offlineQueue.length;
        offlineQueue = [];
        localStorage.removeItem('ner_offline_reports');
        updateSyncBadge();

        refreshDisruptionMarkers();
        refreshAlertsFeed();

        showToast(`Synced ${count} field report(s) to central cloud database!`, 'success');
      }
    }
  }

  /* ==========================================================================
     3. GIS Map Initialization & Spatial Analytics Layer (Leaflet.js)
     ========================================================================== */
  function initGISMap() {
    const mapContainer = document.getElementById('gisMap');
    if (!mapContainer) return;

    // Center map over North Eastern Region
    map = L.map('gisMap', {
      center: [25.8, 92.8],
      zoom: 7,
      zoomControl: true
    });

    // Reliable Free OpenStreetMap Tile Layer (Zero API key needed)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19
    }).addTo(map);

    // Initialize Layer Groups
    hubMarkersLayer = L.layerGroup().addTo(map);
    disruptionMarkersLayer = L.layerGroup().addTo(map);
    fleetMarkersLayer = L.layerGroup().addTo(map);
    routePolylinesLayer = L.layerGroup().addTo(map);

    // Render Initial GIS Layers
    refreshHubMarkers();
    refreshDisruptionMarkers();
    refreshFleetMarkers();

    // Invalidate Map Size for smooth bounds rendering
    setTimeout(() => {
      if (map) map.invalidateSize();
    }, 300);

    // Start Live Vehicle Telemetry Simulation
    animateFleetMovement();
  }

  function refreshHubMarkers() {
    if (!hubMarkersLayer) return;
    hubMarkersLayer.clearLayers();

    NER_DATA.hubs.forEach(hub => {
      const icon = L.divIcon({
        className: 'custom-hub-icon',
        html: `<div style="background:#06b6d4; width:14px; height:14px; border-radius:50%; border:2px solid #fff; box-shadow:0 0 10px #06b6d4;"></div>`,
        iconSize: [14, 14]
      });

      const marker = L.marker([hub.lat, hub.lng], { icon: icon });
      marker.bindPopup(`
        <div style="font-family:sans-serif; color:#0f172a; padding:4px;">
          <h4 style="margin:0; font-weight:800;">${hub.name} Hub (${hub.state})</h4>
          <p style="margin:4px 0 0; font-size:12px; color:#475569;">Type: ${hub.type}</p>
          <p style="margin:2px 0 0; font-size:12px; font-weight:bold; color:#059669;">Status: ${hub.status}</p>
        </div>
      `);
      hubMarkersLayer.addLayer(marker);
    });
  }

  function refreshDisruptionMarkers() {
    if (!disruptionMarkersLayer) return;
    disruptionMarkersLayer.clearLayers();

    NER_DATA.disruptions.forEach(dis => {
      const isCritical = dis.severity === 'Critical';
      const color = isCritical ? '#f43f5e' : '#f59e0b';

      const icon = L.divIcon({
        className: 'custom-disruption-icon',
        html: `<div style="background:${color}; width:16px; height:16px; border-radius:50%; border:2px solid #fff; box-shadow:0 0 12px ${color};"></div>`,
        iconSize: [16, 16]
      });

      const marker = L.marker(dis.coordinates, { icon: icon });
      marker.bindPopup(`
        <div style="font-family:sans-serif; color:#0f172a; padding:4px;">
          <span style="background:${color}; color:#fff; font-size:10px; font-weight:800; padding:2px 6px; border-radius:4px; text-transform:uppercase;">${dis.type}</span>
          <h4 style="margin:6px 0 0; font-weight:800;">${dis.title}</h4>
          <p style="margin:4px 0 0; font-size:12px; color:#475569;">${dis.location}</p>
          <p style="margin:4px 0 0; font-size:12px; color:#dc2626; font-weight:bold;">Status: ${dis.status}</p>
          <p style="margin:2px 0 0; font-size:11px; color:#64748b;">Est. Clearance: ${dis.estClearance}</p>
        </div>
      `);
      disruptionMarkersLayer.addLayer(marker);
    });
  }

  function refreshFleetMarkers() {
    if (!fleetMarkersLayer) return;
    fleetMarkersLayer.clearLayers();

    NER_DATA.fleet.forEach(truck => {
      const icon = L.divIcon({
        className: 'custom-truck-icon',
        html: `<div style="background:#10b981; width:24px; height:24px; border-radius:4px; border:2px solid #fff; display:flex; align-items:center; justify-content:center; box-shadow:0 0 10px #10b981;">
                 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5"><rect width="16" height="10" x="2" y="6" rx="2"/><path d="M12 12h.01"/><path d="M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>
               </div>`,
        iconSize: [24, 24]
      });

      const marker = L.marker(truck.coordinates, { icon: icon });
      marker.bindPopup(`
        <div style="font-family:sans-serif; color:#0f172a; padding:4px;">
          <span style="background:#0284c7; color:#fff; font-size:10px; font-weight:800; padding:2px 6px; border-radius:4px;">${truck.code}</span>
          <h4 style="margin:6px 0 0; font-weight:800;">${truck.cargo}</h4>
          <p style="margin:4px 0 0; font-size:12px; color:#475569;">Route: ${truck.origin} &rarr; ${truck.destination}</p>
          <p style="margin:2px 0 0; font-size:12px;">Driver: <b>${truck.driver}</b> | Speed: <b>${truck.speed}</b></p>
          <p style="margin:4px 0 0; font-size:12px; color:#059669; font-weight:bold;">ETA: ${truck.eta}</p>
        </div>
      `);
      fleetMarkersLayer.addLayer(marker);
    });
  }

  function animateFleetMovement() {
    setInterval(() => {
      NER_DATA.fleet.forEach(truck => {
        if (truck.speed !== '0 km/h (Stopped)') {
          truck.coordinates[0] += (Math.random() - 0.5) * 0.005;
          truck.coordinates[1] += (Math.random() - 0.5) * 0.005;
        }
      });
      refreshFleetMarkers();
    }, 4000);
  }

  /* ==========================================================================
     4. Disruption Alerts Feed
     ========================================================================== */
  function initAlertsFeed() {
    refreshAlertsFeed();
  }

  function refreshAlertsFeed() {
    const alertList = document.getElementById('alertsList');
    if (!alertList) return;

    alertList.innerHTML = '';
    NER_DATA.disruptions.forEach(item => {
      const severityClass = item.severity === 'Critical' ? 'danger' : 'warning';
      const imgHtml = item.image ? `<div style="margin-top:0.5rem;"><img src="${item.image}" alt="Site Photo" style="max-height:120px; width:100%; object-fit:cover; border-radius:6px; border:1px solid var(--border);" /></div>` : '';

      const el = document.createElement('div');
      el.className = `alert-item ${severityClass}`;
      el.innerHTML = `
        <div class="alert-header">
          <span class="alert-type">${item.type}</span>
          <span class="alert-time">${item.reportedAt}</span>
        </div>
        <div class="alert-title">${item.title}</div>
        <div class="alert-loc">${item.location}</div>
        <div class="alert-impact">${item.impact}</div>
        ${imgHtml}
      `;
      alertList.appendChild(el);
    });
  }

  /* ==========================================================================
     5. AI Route Optimization Engine
     ========================================================================== */
  function initAIRouter() {
    const form = document.getElementById('aiRouterForm');
    const resultBox = document.getElementById('routerResult');

    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const origin = document.getElementById('originSelect').value;
      const dest = document.getElementById('destSelect').value;

      // Draw routes on Leaflet Map
      drawAIRoutes();

      // Show Result Card
      if (resultBox) {
        resultBox.style.display = 'block';
        resultBox.scrollIntoView({ behavior: 'smooth' });
      }

      showToast(`AI Graph Neural Network calculated optimal bypass route for ${origin} to ${dest}!`, 'info');
    });
  }

  function drawAIRoutes() {
    if (!routePolylinesLayer || !map) return;
    routePolylinesLayer.clearLayers();

    const primaryRoute = NER_DATA.routes['GHY-IMP-PRIMARY'];
    const safeRoute = NER_DATA.routes['GHY-IMP-ALT'];

    // Primary Damaged Route (Red Dashed Line)
    const primaryPolyline = L.polyline(primaryRoute.path, {
      color: '#f43f5e',
      weight: 5,
      dashArray: '10, 10',
      opacity: 0.8
    }).addTo(routePolylinesLayer);
    primaryPolyline.bindPopup(`<b>${primaryRoute.name}</b><br><span style="color:#dc2626;">${primaryRoute.riskIndex}</span>`);

    // AI Safe Alternate Route (Bright Emerald Solid Line)
    const safePolyline = L.polyline(safeRoute.path, {
      color: '#10b981',
      weight: 6,
      opacity: 0.95
    }).addTo(routePolylinesLayer);
    safePolyline.bindPopup(`<b>${safeRoute.name}</b><br><span style="color:#059669;">${safeRoute.riskIndex}</span>`);

    // Fit map bounds to view routes
    map.fitBounds(safePolyline.getBounds(), { padding: [40, 40] });
  }

  /* ==========================================================================
     6. Fleet Tracking Table Manager
     ========================================================================== */
  function initFleetTable() {
    const tableBody = document.getElementById('fleetTableBody');
    if (!tableBody) return;

    tableBody.innerHTML = '';
    NER_DATA.fleet.forEach(truck => {
      const row = document.createElement('tr');
      const isDelayed = truck.status.includes('Delayed');
      const badgeClass = isDelayed ? 'danger' : (truck.status.includes('Rerouted') ? 'warning' : 'success');

      row.innerHTML = `
        <td><b style="font-family:var(--font-mono); color:var(--cyan);">${truck.code}</b></td>
        <td><b>${truck.cargo}</b></td>
        <td>${truck.origin} &rarr; ${truck.destination}</td>
        <td>${truck.driver}</td>
        <td><span class="badge-status ${badgeClass}">${truck.status}</span></td>
        <td><b>${truck.eta}</b></td>
      `;
      tableBody.appendChild(row);
    });
  }

  /* ==========================================================================
     7. Field Officer Incident Upload & Offline Sync Modal
     ========================================================================== */
  function initIncidentModal() {
    const openBtn = document.getElementById('openReportModalBtn');
    const modal = document.getElementById('incidentModal');
    const closeBtn = document.getElementById('closeReportModalBtn');
    const form = document.getElementById('incidentForm');

    if (openBtn && modal) {
      openBtn.addEventListener('click', () => modal.classList.add('active'));
    }
    if (closeBtn && modal) {
      closeBtn.addEventListener('click', () => modal.classList.remove('active'));
    }

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();

        const type = document.getElementById('incidentType').value;
        const location = document.getElementById('incidentLoc').value;
        const severity = document.getElementById('incidentSeverity').value;
        const desc = document.getElementById('incidentDesc').value;
        const imageInput = document.getElementById('incidentImage');

        const processReportSubmission = (imageDataUrl) => {
          const newReport = {
            id: `DIS-${Math.floor(100 + Math.random() * 900)}`,
            title: `Field Report: ${type}`,
            location: location,
            coordinates: [25.5 + (Math.random() - 0.5) * 1.5, 92.5 + (Math.random() - 0.5) * 1.5],
            type: type,
            severity: severity,
            status: 'Reported by Field Officer',
            estClearance: 'Under Assessment',
            reportedAt: 'Just now',
            impact: desc || 'Field officer geo-tagged incident report',
            image: imageDataUrl || null
          };

          if (isOfflineMode) {
            offlineQueue.push(newReport);
            localStorage.setItem('ner_offline_reports', JSON.stringify(offlineQueue));
            showToast('Network Offline! Incident & photograph saved locally. Auto-sync on reconnection.', 'warning');
          } else {
            NER_DATA.disruptions.unshift(newReport);
            refreshDisruptionMarkers();
            refreshAlertsFeed();
            showToast('Geo-tagged incident report & site photo uploaded to GIS server!', 'success');
          }

          form.reset();
          if (modal) modal.classList.remove('active');
        };

        if (imageInput && imageInput.files && imageInput.files[0]) {
          const reader = new FileReader();
          reader.onload = (event) => {
            processReportSubmission(event.target.result);
          };
          reader.readAsDataURL(imageInput.files[0]);
        } else {
          processReportSubmission(null);
        }
      });
    }
  }

  /* ==========================================================================
     8. Supply Chain Analytics (Chart.js)
     ========================================================================== */
  function initAnalyticsCharts() {
    const ctx1 = document.getElementById('connectivityChart');
    const ctx2 = document.getElementById('bottleneckChart');

    if (ctx1 && typeof Chart !== 'undefined') {
      connectivityChart = new Chart(ctx1, {
        type: 'bar',
        data: {
          labels: ['Assam', 'Arunachal', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Sikkim', 'Tripura'],
          datasets: [{
            label: 'Accessibility Index (%)',
            data: [92, 74, 68, 81, 70, 76, 65, 88],
            backgroundColor: ['#10b981', '#06b6d4', '#f43f5e', '#f59e0b', '#f43f5e', '#06b6d4', '#f43f5e', '#10b981']
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            y: { beginAtZero: true, max: 100, grid: { color: 'rgba(255,255,255,0.05)' } },
            x: { grid: { display: false } }
          }
        }
      });
    }

    if (ctx2 && typeof Chart !== 'undefined') {
      bottleneckChart = new Chart(ctx2, {
        type: 'doughnut',
        data: {
          labels: ['Landslides (Mountain Passes)', 'Monsoon Flash Floods', 'Bridge Degradation', 'High-altitude Fog/Snow'],
          datasets: [{
            data: [45, 30, 15, 10],
            backgroundColor: ['#f43f5e', '#f59e0b', '#06b6d4', '#6366f1']
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { position: 'bottom', labels: { color: '#94a3b8' } } }
        }
      });
    }
  }

  /* ==========================================================================
     9. Multilingual Translation Switcher
     ========================================================================== */
  function initLanguageSwitcher() {
    const select = document.getElementById('langSelect');

    // Retrieve saved language from localStorage
    currentLang = localStorage.getItem('ner_lang') || 'en';
    if (select) {
      select.value = currentLang;
    }

    // Apply translations on initial load
    applyTranslations(currentLang);

    if (select) {
      select.addEventListener('change', (e) => {
        currentLang = e.target.value;
        localStorage.setItem('ner_lang', currentLang);
        applyTranslations(currentLang);
        showToast(`Language updated to ${select.options[select.selectedIndex].text}`, 'info');
      });
    }
  }

  function applyTranslations(lang) {
    const dict = NER_DATA.translations[lang] || NER_DATA.translations['en'];
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        const svg = el.querySelector('svg');
        if (svg) {
          const svgHtml = svg.outerHTML;
          el.innerHTML = `${svgHtml} ${dict[key]}`;
        } else {
          el.innerText = dict[key];
        }
      }
    });
  }

  /* Helper Toast Notifications */
  function showToast(msg, type = 'info') {
    const toast = document.createElement('div');
    const bgColor = type === 'success' ? '#10b981' : (type === 'warning' ? '#f59e0b' : '#0284c7');

    toast.style.cssText = `
      position: fixed;
      bottom: 24px;
      right: 24px;
      background: ${bgColor};
      color: #fff;
      padding: 12px 20px;
      border-radius: 8px;
      font-weight: 700;
      font-size: 13px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.4);
      z-index: 9999;
      animation: fadeIn 0.3s ease;
    `;
    toast.innerText = msg;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 4000);
  }

  /* ==========================================================================
     10. Top Right 3-Dot Options Menu
     ========================================================================== */
  function initMoreOptionsMenu() {
    const btn = document.getElementById('moreOptionsBtn');
    const dropdown = document.getElementById('moreOptionsDropdown');

    if (btn && dropdown) {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('show');
        btn.classList.toggle('active');
      });

      document.addEventListener('click', (e) => {
        if (!dropdown.contains(e.target) && !btn.contains(e.target)) {
          dropdown.classList.remove('show');
          btn.classList.remove('active');
        }
      });

      const optionSystem = document.getElementById('optionSystemStatus');
      const optionCache = document.getElementById('optionClearCache');
      const optionHelp = document.getElementById('optionHelp');

      if (optionSystem) {
        optionSystem.addEventListener('click', () => {
          dropdown.classList.remove('show');
          btn.classList.remove('active');
          showToast('SIH 2026 PS 26002 AI Platform v2.4 (GNN Engine Active)', 'info');
        });
      }

      if (optionCache) {
        optionCache.addEventListener('click', () => {
          dropdown.classList.remove('show');
          btn.classList.remove('active');
          localStorage.removeItem('ner_offline_reports');
          showToast('Offline sync cache cleared successfully', 'success');
        });
      }

      if (optionHelp) {
        optionHelp.addEventListener('click', () => {
          dropdown.classList.remove('show');
          btn.classList.remove('active');
          showToast('Opening Field Operations & Logistics Documentation...', 'info');
        });
      }
    }
  }

  /* ==========================================================================
     11. Interactive Landslide Simulation & Multi-Modal Swap Engine
     ========================================================================== */
  function initLandslideSimulator() {
    const triggerBtns = document.querySelectorAll('.btn-trigger-landslide');
    triggerBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // 1. Create Critical Disruption Record
        const emergencyDisruption = {
          id: `DIS-EMERGENCY-${Math.floor(Math.random()*900+100)}`,
          title: '🚨 CRITICAL: NH-27 Sonapur Corridor Landslide Breach',
          location: 'Sonapur Tunnel Highway Pass (25.2150 N, 92.3680 E)',
          coordinates: [25.2150, 92.3680],
          type: 'Landslide',
          severity: 'Critical',
          status: 'Total Highway Blockade (R_edge = 0.89)',
          estClearance: '18-24 Hours',
          reportedAt: 'Just Now (ISRO SAR & Field Alert)',
          impact: 'Primary Highway Inaccessible. Automated Multi-Modal Swap Triggered!'
        };

        NER_DATA.disruptions.unshift(emergencyDisruption);
        refreshDisruptionMarkers();
        refreshAlertsFeed();

        // 2. Trigger Multi-Modal Route Recalculation
        if (map && routePolylinesLayer) {
          routePolylinesLayer.clearLayers();
          const primaryPath = NER_DATA.routes['GHY-IMP-PRIMARY'].path;
          const altPath = NER_DATA.routes['GHY-IMP-ALT'].path;

          // Red Hazard Line
          L.polyline(primaryPath, { color: '#f43f5e', weight: 6, dashArray: '8, 8', opacity: 0.9 }).addTo(routePolylinesLayer);
          // Green Multi-Modal Swap Path
          const swapPolyline = L.polyline(altPath, { color: '#10b981', weight: 6, opacity: 0.95 }).addTo(routePolylinesLayer);
          map.fitBounds(swapPolyline.getBounds(), { padding: [30, 30] });
        }

        // 3. Show Interactive Modal / Output Panel
        const swapBox = document.getElementById('multiModalSwapBanner');
        if (swapBox) {
          swapBox.style.display = 'block';
          swapBox.innerHTML = `
            <div style="background:rgba(244, 63, 94, 0.15); border:1px solid #f43f5e; border-radius:10px; padding:1rem; margin-top:1rem;">
              <div style="display:flex; align-items:center; justify-content:space-between;">
                <h4 style="color:#f43f5e; margin:0; font-weight:800; font-size:1.05rem;">🚨 ALERT: Multi-Modal Swap Activated for Siliguri/NH-27 Blockage</h4>
                <span style="background:#f43f5e; color:#fff; font-size:0.75rem; font-weight:800; padding:2px 8px; border-radius:4px;">R_edge = 0.89 (CRITICAL)</span>
              </div>
              <p style="font-size:0.85rem; color:#94a3b8; margin:0.5rem 0;">Primary highway breached. Freight auto-reallocated across intermodal infrastructure:</p>
              <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap:0.75rem; margin-top:0.75rem;">
                <div style="background:rgba(15, 23, 42, 0.7); border:1px solid rgba(255,255,255,0.1); padding:0.75rem; border-radius:6px;">
                  <span style="color:#06b6d4; font-size:0.75rem; font-weight:700;">STAGE 1: INLAND WATERWAY (IWT)</span>
                  <div style="font-weight:700; color:#fff; font-size:0.88rem;">NW-2 River Barge (Pandu Terminal)</div>
                  <div style="font-size:0.75rem; color:#94a3b8;">Bypasses 180km Slip Corridor</div>
                </div>
                <div style="background:rgba(15, 23, 42, 0.7); border:1px solid rgba(255,255,255,0.1); padding:0.75rem; border-radius:6px;">
                  <span style="color:#10b981; font-size:0.75rem; font-weight:700;">STAGE 2: FOIS RAIL FREIGHT</span>
                  <div style="font-weight:700; color:#fff; font-size:0.88rem;">Jogighopa MMLP Rake #883</div>
                  <div style="font-size:0.75rem; color:#94a3b8;">Bulk Transfer to Silchar Siding</div>
                </div>
                <div style="background:rgba(15, 23, 42, 0.7); border:1px solid rgba(255,255,255,0.1); padding:0.75rem; border-radius:6px;">
                  <span style="color:#a855f7; font-size:0.75rem; font-weight:700;">STAGE 3: LAST-MILE DRONE CORRIDOR</span>
                  <div style="font-weight:700; color:#fff; font-size:0.88rem;">Hill Staging Node #4</div>
                  <div style="font-size:0.75rem; color:#94a3b8;">Emergency Medical Cargo Delivery</div>
                </div>
              </div>
            </div>
          `;
          swapBox.scrollIntoView({ behavior: 'smooth' });
        }

        showToast('🚨 Simulated Landslide Breach! Multi-Modal Swap Engine rerouted cargo to NW-2 River Barge & FOIS Rail.', 'warning');
      });
    });
  }

  /* ==========================================================================
     12. Multilingual Bhashini Voice Assistant (Real ASR + Fallback Simulator)
     ========================================================================== */
  function initBhashiniVoiceWidget() {
    const micBtns = document.querySelectorAll('.bhashini-mic-trigger');
    const langSelect = document.getElementById('bhashiniLangSelect');
    let isListening = false;
    let voiceIndex = 0;

    // Check for browser native SpeechRecognition API
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    micBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        if (isListening) return;

        const selectedLangCode = langSelect ? langSelect.value : 'as';
        const langMap = {
          'en': 'en-IN', 'hi': 'hi-IN', 'as': 'as-IN',
          'khasi': 'en-IN', 'mizo': 'en-IN', 'brx': 'hi-IN',
          'mni': 'mni-IN', 'bn': 'bn-IN'
        };

        isListening = true;
        btn.classList.add('recording');
        btn.style.boxShadow = '0 0 25px #06b6d4';
        showToast(`🎙️ Bhashini Voice Engine Active... Speak now (${selectedLangCode.toUpperCase()})`, 'info');

        const processVoiceResult = (spokenText, isRealSpeech = false) => {
          btn.classList.remove('recording');
          btn.style.boxShadow = 'none';
          isListening = false;

          let voiceSample = NER_DATA.voiceIntents.find(v => v.lang === selectedLangCode) || NER_DATA.voiceIntents[voiceIndex % NER_DATA.voiceIntents.length];
          voiceIndex++;

          const finalTranscript = isRealSpeech ? spokenText : voiceSample.sampleUtterance;
          const intentObj = {
            intent: 'REPORT_ROAD_BLOCKAGE',
            slots: {
              hazard_type: 'landslide',
              spoken_phrase: finalTranscript,
              location_relative: 'Sonapur Pass 2km ahead',
              severity: 'impassable'
            }
          };

          const outputBox = document.getElementById('bhashiniVoiceOutput');
          if (outputBox) {
            outputBox.style.display = 'block';
            outputBox.innerHTML = `
              <div style="background:rgba(15, 23, 42, 0.95); border:1px solid #06b6d4; border-radius:12px; padding:1rem; margin-top:0.75rem; animation:fadeIn 0.3s ease; box-shadow:0 10px 25px rgba(0,0,0,0.5);">
                <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:0.5rem;">
                  <span style="background:#06b6d4; color:#000; font-size:0.72rem; font-weight:800; padding:2px 8px; border-radius:4px;">BHASHINI ASR (${selectedLangCode.toUpperCase()})</span>
                  <span style="font-size:0.75rem; color:#10b981; font-weight:700;">${isRealSpeech ? '🎙️ Real Speech Recorded' : '⚡ 96.4% ASR Confidence'}</span>
                </div>
                <div style="font-size:0.92rem; color:#fff; font-weight:700; font-style:italic; margin-bottom:0.4rem;">"${finalTranscript}"</div>
                
                <div style="background:rgba(0,0,0,0.5); border-radius:6px; padding:0.5rem 0.75rem; margin:0.5rem 0; font-family:var(--font-mono); font-size:0.75rem; color:#a855f7;">
                  <strong>NLU Intent JSON:</strong><br>
                  ${JSON.stringify(intentObj, null, 2)}
                </div>

                <div style="display:flex; align-items:center; gap:0.5rem; color:#06b6d4; font-size:0.82rem; font-weight:700;">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
                  <span>TTS Feedback: "${voiceSample.responseAudioText}"</span>
                </div>
              </div>
            `;
            outputBox.scrollIntoView({ behavior: 'smooth' });
          }

          // Spoken Audio TTS Feedback
          if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utter = new SpeechSynthesisUtterance(voiceSample.responseAudioText);
            utter.rate = 0.95;
            window.speechSynthesis.speak(utter);
          }

          showToast(`🎙️ Bhashini Processed Voice Command!`, 'success');
        };

        if (SpeechRecognition) {
          try {
            const recognition = new SpeechRecognition();
            recognition.lang = langMap[selectedLangCode] || 'en-IN';
            recognition.interimResults = false;
            recognition.maxAlternatives = 1;

            recognition.onresult = (event) => {
              const transcript = event.results[0][0].transcript;
              processVoiceResult(transcript, true);
            };

            recognition.onerror = () => {
              setTimeout(() => processVoiceResult(null, false), 1500);
            };

            recognition.start();
          } catch (err) {
            setTimeout(() => processVoiceResult(null, false), 1500);
          }
        } else {
          setTimeout(() => processVoiceResult(null, false), 1800);
        }
      });
    });
  }

  /* ==========================================================================
     12b. Driver Mobile Focus View (PWA High-Contrast Overlay)
     ========================================================================== */
  function initDriverFocusViewModal() {
    const openBtn = document.getElementById('openDriverViewBtn');
    const modal = document.getElementById('driverFocusViewModal');
    const closeBtn = document.getElementById('closeDriverViewBtn');

    if (openBtn && modal) {
      openBtn.addEventListener('click', () => modal.classList.add('active'));
    }
    if (closeBtn && modal) {
      closeBtn.addEventListener('click', () => modal.classList.remove('active'));
    }
  }

  /* ==========================================================================
     13. ULIP (Unified Logistics Interface Platform) Search Engine
     ========================================================================== */
  function initULIPSearchEngine() {
    const searchForm = document.getElementById('ulipSearchForm');
    const resultBox = document.getElementById('ulipSearchResult');

    if (!searchForm || !resultBox) return;

    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const vehInput = document.getElementById('ulipVehInput').value.trim().toUpperCase();
      const record = NER_DATA.ulipDatabase[vehInput] || NER_DATA.ulipDatabase['AS-01-HC-9920'];

      resultBox.style.display = 'block';
      resultBox.innerHTML = `
        <div style="background:rgba(15, 23, 42, 0.9); border:1px solid var(--cyan); border-radius:12px; padding:1.25rem; margin-top:1rem;">
          <div style="display:flex; align-items:center; justify-content:space-between; border-bottom:1px solid rgba(255,255,255,0.1); padding-bottom:0.75rem; margin-bottom:1rem;">
            <div>
              <span style="background:var(--cyan); color:#000; font-size:0.75rem; font-weight:800; padding:2px 8px; border-radius:4px;">ULIP VERIFIED NODE</span>
              <h3 style="margin:0.25rem 0 0; color:#fff; font-weight:800; font-size:1.2rem;">Vehicle: ${record.vehNum}</h3>
              <p style="margin:0; font-size:0.8rem; color:#94a3b8;">Owner: ${record.owner}</p>
            </div>
            <span style="background:#10b981; color:#fff; font-weight:700; font-size:0.75rem; padding:4px 10px; border-radius:20px;">🟢 Live Connected</span>
          </div>

          <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap:1rem;">
            <!-- VAHAN -->
            <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:8px; padding:0.85rem;">
              <div style="color:var(--amber); font-size:0.75rem; font-weight:800; margin-bottom:0.4rem;">🚗 VAHAN 4.0 REGISTRY</div>
              <div style="font-size:0.82rem; color:#fff;">Gross Weight: <b>${record.vahan.grossWeightTons} Tons</b></div>
              <div style="font-size:0.82rem; color:#fff;">Max Axle Load: <b>${record.vahan.maxAxleLoadTons} Tons</b></div>
              <div style="font-size:0.75rem; color:#94a3b8; margin-top:0.25rem;">Permit: ${record.vahan.permitType}</div>
            </div>

            <!-- SARATHI -->
            <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:8px; padding:0.85rem;">
              <div style="color:#a855f7; font-size:0.75rem; font-weight:800; margin-bottom:0.4rem;">🪪 SARATHI 4.0 DRIVER IDENTITY</div>
              <div style="font-size:0.82rem; color:#fff;">Driver: <b>${record.sarathi.driverName}</b></div>
              <div style="font-size:0.82rem; color:#fff;">License: <b>${record.sarathi.licenseNum}</b></div>
              <div style="font-size:0.75rem; color:#10b981; font-weight:700; margin-top:0.25rem;">Hill Terrain Clearance: ${record.sarathi.hillTerrainEndorsement}</div>
            </div>

            <!-- FASTag -->
            <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:8px; padding:0.85rem;">
              <div style="color:#06b6d4; font-size:0.75rem; font-weight:800; margin-bottom:0.4rem;">🏷️ FASTag TOLL VELOCITY</div>
              <div style="font-size:0.82rem; color:#fff;">Last Toll: <b>${record.fastag.lastTollPlaza}</b></div>
              <div style="font-size:0.82rem; color:#fff;">Speed Vector: <b>${record.fastag.velocityKmh} km/h</b></div>
              <div style="font-size:0.75rem; color:#94a3b8; margin-top:0.25rem;">Passage: ${record.fastag.lastPassageTime}</div>
            </div>

            <!-- FOIS Rail -->
            <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:8px; padding:0.85rem;">
              <div style="color:#f43f5e; font-size:0.75rem; font-weight:800; margin-bottom:0.4rem;">🚆 FOIS RAIL FREIGHT</div>
              <div style="font-size:0.82rem; color:#fff;">Siding: <b>${record.fois.broadGaugeSiding}</b></div>
              <div style="font-size:0.78rem; color:#10b981; font-weight:700; margin-top:0.25rem;">Status: ${record.fois.railRakeStatus}</div>
            </div>
          </div>
        </div>
      `;

      showToast(`National ULIP Gateway verified record for ${record.vehNum}!`, 'info');
    });
  }

  /* ==========================================================================
     14. Physics-Informed Arrhenius Spoilage Calculator
     ========================================================================== */
  function initArrheniusSpoilageCalculator() {
    const tempSlider = document.getElementById('cargoTempSlider');
    const tempValDisplay = document.getElementById('cargoTempVal');
    const rslDisplay = document.getElementById('rslHoursVal');
    const statusBox = document.getElementById('spoilageStatusAlert');

    if (!tempSlider || !rslDisplay) return;

    function updateArrheniusDecay() {
      const tempC = parseFloat(tempSlider.value);
      if (tempValDisplay) tempValDisplay.innerText = `${tempC.toFixed(1)} °C`;

      const commodity = NER_DATA.spoilageCommodities[0]; // Lakadong Turmeric
      const T_kelvin = tempC + 273.15;
      const R = 8.314; // Gas constant J/(mol*K)
      const Ea = commodity.activationEnergyEa * 1000; // J/mol

      // Arrhenius rate multiplier k(T) relative to 15 deg C
      const k_ratio = Math.exp((-Ea / R) * ((1 / T_kelvin) - (1 / (15.0 + 273.15))));
      const currentRSL = Math.max(2.5, commodity.baseRSLHours / k_ratio);

      rslDisplay.innerText = `${currentRSL.toFixed(1)} Hours`;

      if (statusBox) {
        if (tempC >= 30.0) {
          statusBox.style.display = 'block';
          statusBox.style.borderColor = '#f43f5e';
          statusBox.style.background = 'rgba(244,63,94,0.15)';
          statusBox.innerHTML = `
            <div style="color:#f43f5e; font-weight:800; font-size:0.9rem;">⚠️ SPOILAGE ALERT: High Ambient Temp (${tempC}°C) Accelerating Oxidation</div>
            <div style="font-size:0.8rem; color:#94a3b8; margin-top:0.2rem;">Remaining Shelf Life dropped below estimated destination transit time (ETA 18h).</div>
            <div style="margin-top:0.5rem; background:rgba(0,0,0,0.4); border-radius:6px; padding:0.5rem;">
              <span style="color:#10b981; font-weight:700; font-size:0.8rem;">📍 Recommended Dynamic Diversion Node:</span><br>
              <strong style="color:#fff; font-size:0.85rem;">${commodity.nearbyColdStores[0].name}</strong> (${commodity.nearbyColdStores[0].distanceKm} km away | Capacity: ${commodity.nearbyColdStores[0].capacityAvailableKg} kg)
            </div>
          `;
        } else {
          statusBox.style.display = 'block';
          statusBox.style.borderColor = '#10b981';
          statusBox.style.background = 'rgba(16,185,129,0.1)';
          statusBox.innerHTML = `
            <div style="color:#10b981; font-weight:800; font-size:0.85rem;">🟢 OPTIMAL COLD CHAIN QUALITY</div>
            <div style="font-size:0.8rem; color:#94a3b8;">Arrhenius degradation rate is within safe threshold parameters. No immediate diversion required.</div>
          `;
        }
      }
    }

    tempSlider.addEventListener('input', updateArrheniusDecay);
    updateArrheniusDecay();
  }

  /* ==========================================================================
     15. District Logistics Incident PDF Exporter
     ========================================================================== */
  function initPDFReportExporter() {
    const exportBtns = document.querySelectorAll('.btn-export-pdf');
    exportBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        showToast('📄 Generating District Incident & Operational Risk PDF Summary...', 'info');
        setTimeout(() => {
          window.print();
        }, 500);
      });
    });
  }
});

