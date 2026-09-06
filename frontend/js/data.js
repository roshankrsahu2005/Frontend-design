/**
 * AI-Based Smart Logistics & Accessibility Intelligence Platform (NER)
 * Data Layer: Geography, Highways, Disruption Nodes, Fleets & Translations
 */

const NER_DATA = {
  // Key Logistics Hubs & Coordinates in North Eastern Region
  hubs: [
    { id: 'GHY', name: 'Guwahati', state: 'Assam', lat: 26.1445, lng: 91.7362, status: 'Operational', type: 'Primary Supply Hub' },
    { id: 'SHL', name: 'Shillong', state: 'Meghalaya', lat: 25.5788, lng: 91.8933, status: 'Operational', type: 'Regional Transit Hub' },
    { id: 'SIL', name: 'Silchar', state: 'Assam', lat: 24.8333, lng: 92.7789, status: 'Alert - High Bottleneck', type: 'Valley Junction' },
    { id: 'IMP', name: 'Imphal', state: 'Manipur', lat: 24.8170, lng: 93.9368, status: 'Restricted Access', type: 'Capital Logistics Node' },
    { id: 'AGT', name: 'Agartala', state: 'Tripura', lat: 23.8315, lng: 91.2868, status: 'Operational', type: 'Border Logistics Hub' },
    { id: 'AIZ', name: 'Aizawl', state: 'Mizoram', lat: 23.7271, lng: 92.7176, status: 'Alert - Weather Risk', type: 'Hilly District Node' },
    { id: 'KOH', name: 'Kohima', state: 'Nagaland', lat: 25.6751, lng: 94.1086, status: 'Operational', type: 'Transit Hub' },
    { id: 'DIM', name: 'Dimapur', state: 'Nagaland', lat: 25.9060, lng: 93.7270, status: 'Operational', type: 'Railhead Logistics Terminal' },
    { id: 'ITA', name: 'Itanagar', state: 'Arunachal Pradesh', lat: 27.0844, lng: 93.6053, status: 'Operational', type: 'Northern Gateway Node' },
    { id: 'GTK', name: 'Gangtok', state: 'Sikkim', lat: 27.3389, lng: 88.6065, status: 'Alert - Highway Subsidence', type: 'High Altitude Hub' }
  ],

  // Real-time Road & Bridge Disruption Incidents
  disruptions: [
    {
      id: 'DIS-101',
      title: 'Major Landslide on NH-27',
      location: 'Sonapur Tunnel Section, Meghalaya',
      coordinates: [25.2150, 92.3680],
      type: 'Landslide',
      severity: 'Critical',
      status: 'Road Blocked',
      estClearance: '14 Hours',
      reportedAt: '10 Mins ago',
      impact: 'Blocks Guwahati to Silchar primary arterial route'
    },
    {
      id: 'DIS-102',
      title: 'Monsoon Flash Flood & Bridge Damage',
      location: 'Barak River Crossing, NH-37 (Silchar-Jiribam)',
      coordinates: [24.8020, 93.1100],
      type: 'Flood & Bridge Subsidence',
      severity: 'Critical',
      status: 'Heavy Vehicles Restricted',
      estClearance: '28 Hours',
      reportedAt: '25 Mins ago',
      impact: 'Forces Manipur freight onto AI Southern Detour'
    },
    {
      id: 'DIS-103',
      title: 'Highway Subsidence & Debris Siltation',
      location: 'NH-10 Sevoke Corridor, Sikkim Highway',
      coordinates: [26.8920, 88.4720],
      type: 'Road Damage',
      severity: 'Warning',
      status: 'One Lane Operational',
      estClearance: '6 Hours',
      reportedAt: '1 Hour ago',
      impact: 'Estimated travel delay: +2.5 Hours'
    },
    {
      id: 'DIS-104',
      title: 'High-Risk Debris Corridor & Fog Hazard',
      location: 'NH-54 Aizawl-Lunglei Pass',
      coordinates: [23.4500, 92.7500],
      type: 'Weather Hazard',
      severity: 'Warning',
      status: 'Caution Advisory Active',
      estClearance: 'Continuous Monitoring',
      reportedAt: '2 Hours ago',
      impact: 'Speed limit capped at 25 km/h for heavy cargo'
    }
  ],

  // Live GPS Fleet Vehicles
  fleet: [
    {
      id: 'TRK-NER-901',
      code: 'NER-MED-VACCINE',
      cargo: 'Essential Medical & Vaccines',
      origin: 'Guwahati Hub',
      destination: 'Imphal Capital Hospital',
      driver: 'Rajesh Sharma',
      speed: '42 km/h',
      coordinates: [25.5788, 91.8933],
      status: 'Rerouted by AI',
      eta: '8 hrs 15 mins (AI Safe Route)',
      riskLevel: 'Low (Bypassed NH-27 Block)'
    },
    {
      id: 'TRK-NER-408',
      code: 'NER-GRAIN-FOOD',
      cargo: 'PDS Rice & Essential Grains',
      origin: 'Dimapur Terminal',
      destination: 'Aizawl Food Depot',
      driver: 'Biren Gogoi',
      speed: '31 km/h',
      coordinates: [24.6000, 93.2000],
      status: 'In Transit',
      eta: '5 hrs 40 mins',
      riskLevel: 'Moderate'
    },
    {
      id: 'TRK-NER-205',
      code: 'NER-INFRA-CEMENT',
      cargo: 'Bridge Repair Steel & Cement',
      origin: 'Guwahati Central Depot',
      destination: 'Silchar Flood Damage Site',
      driver: 'Kipgen Thang',
      speed: '0 km/h (Stopped)',
      coordinates: [25.2150, 92.3680],
      status: 'Delayed by Landslide',
      eta: '+12 hrs Delay',
      riskLevel: 'High'
    },
    {
      id: 'TRK-NER-777',
      code: 'NER-EMERGENCY-O2',
      cargo: 'Medical Oxygen Cylinders',
      origin: 'Tezpur Supply Base',
      destination: 'Itanagar District Hospital',
      driver: 'Lobsang Dorjee',
      speed: '58 km/h',
      coordinates: [26.8500, 93.2000],
      status: 'Express Escort',
      eta: '2 hrs 10 mins',
      riskLevel: 'Low'
    }
  ],

  // Pre-calculated AI Highways & Routes (Coordinates)
  routes: {
    'GHY-IMP-PRIMARY': {
      name: 'Primary Route (via NH-27 & NH-37)',
      distanceKm: 485,
      standardHours: 12.5,
      predictedDelayHours: 14.0,
      riskIndex: '88% High Risk (Landslide Block at Sonapur)',
      path: [
        [26.1445, 91.7362], // Guwahati
        [25.5788, 91.8933], // Shillong
        [25.2150, 92.3680], // Sonapur (Landslide)
        [24.8333, 92.7789], // Silchar
        [24.8020, 93.1100], // Jiribam
        [24.8170, 93.9368]  // Imphal
      ]
    },
    'GHY-IMP-ALT': {
      name: 'AI Recommended Safe Route (via Tezpur & Dimapur Bypass)',
      distanceKm: 520,
      standardHours: 13.8,
      predictedDelayHours: 0.5,
      riskIndex: '12% Low Risk (Safe Alternate)',
      path: [
        [26.1445, 91.7362], // Guwahati
        [26.6528, 92.7926], // Tezpur
        [25.9060, 93.7270], // Dimapur
        [25.6751, 94.1086], // Kohima
        [24.8170, 93.9368]  // Imphal
      ]
    }
  },

  // Multilingual UI Translations
  translations: {
    en: {
      appTitle: 'AI Smart Logistics & Accessibility Platform',
      appSubtitle: 'North Eastern Region (NER) Connectivity Intelligence',
      navDashboard: 'Executive Dashboard',
      navMap: 'GIS Map Intelligence',
      navRouter: 'AI Route Optimizer',
      navFleet: 'Live Fleet Tracker',
      navReport: 'Field Officer Incident Upload',
      navAnalytics: 'Supply Chain Analytics',
      activeAlerts: 'Active Disruption Alerts',
      connectivityScore: 'NER Regional Accessibility Index',
      btnCalculate: 'Calculate AI Optimal Route',
      btnReport: 'Submit Incident Report',
      offlineStatusText: 'Network Connection: Online',
      offlineModeActive: 'Network Connection: Offline (Local Sync Queue Active)'
    },
    hi: {
      appTitle: 'एआई स्मार्ट लॉजिस्टिक्स एवं सुगम्यता इंटेलिजेंस प्लेटफॉर्म',
      appSubtitle: 'उत्तर-पूर्वी क्षेत्र (NER) कनेक्टिविटी इंटेलिजेंस',
      navDashboard: 'मुख्य डैशबोर्ड',
      navMap: 'जीआईएस मानचित्र इंटेलिजेंस',
      navRouter: 'एआई मार्ग अनुकूलक',
      navFleet: 'लाइव वाहन ट्रैकिंग',
      navReport: 'फील्ड अधिकारी घटना रिपोर्ट',
      navAnalytics: 'आपूर्ति श्रृंखला विश्लेषण',
      activeAlerts: 'सक्रिय मार्ग व्यवधान अलर्ट',
      connectivityScore: 'एनईआर क्षेत्रीय सुगम्यता सूचकांक',
      btnCalculate: 'एआई अनुकूलित मार्ग की गणना करें',
      btnReport: 'घटना रिपोर्ट जमा करें',
      offlineStatusText: 'नेटवर्क कनेक्शन: ऑनलाइन',
      offlineModeActive: 'नेटवर्क कनेक्शन: ऑफ़लाइन (स्थानीय सिंक कतार सक्रिय)'
    },
    as: {
      appTitle: 'AI চালিত স্মাৰ্ট লজিষ্টিক আৰু সুগমতা ইণ্টেলিজেন্স প্লেটফৰ্ম',
      appSubtitle: 'উ উত্তৰ-পূৰ্বাঞ্চল (NER) সংযোগ ইণ্টেলিজেন্স',
      navDashboard: 'মুখ্য ড্যাশবৰ্ড',
      navMap: 'GIS মেপ ইণ্টেলিজেন্স',
      navRouter: 'AI পথ অপ্টিমাইজাৰ',
      navFleet: 'লাইভ বাহন ট্ৰ্যাকিং',
      navReport: 'ক্ষেত্ৰ বিষয়াৰ ঘটনা ৰিপ’ৰ্ট',
      navAnalytics: 'যোগান শৃংখলা বিশ্লেষণ',
      activeAlerts: 'সক্ৰিয় পথ বাধা এলাৰ্ট',
      connectivityScore: 'NER আঞ্চলিক সুগমতা সূচক',
      btnCalculate: 'AI অনুকূলিত পথ নিৰ্ণয় কৰক',
      btnReport: 'ঘটনা ৰিপ’ৰ্ট দাখিল কৰক',
      offlineStatusText: 'নেটৱৰ্ক সংযোগ: অনলাইন',
      offlineModeActive: 'নেটৱৰ্ক সংযোগ: অফলাইন (স্থানীয় সংৰক্ষণ সক্ৰিয়)'
    },
    mni: {
      appTitle: 'AI ꯁ꯭ꯃꯥꯔ꯭ꯠ ꯂꯣꯖꯤꯁ꯭ꯇꯤꯛꯁ & ꯑꯦꯛꯁꯦꯁꯤꯕꯤꯂꯤꯇꯤ ꯄ꯭ꯂꯦꯠꯐꯣꯔ꯭ꯝ',
      appSubtitle: 'ꯅꯣꯡꯄꯣꯛ ꯆꯤꯡꯈꯦꯜ ꯂꯃꯗꯝ (NER) ꯀꯅꯦꯛꯇꯤꯕꯤꯇꯤ',
      navDashboard: 'ꯃꯀꯣꯛ ꯗꯦꯁꯕꯣꯔꯗ',
      navMap: 'GIS ꯃꯦꯞ ꯏꯟꯇꯦꯂꯤꯖꯦꯟꯁ',
      navRouter: 'AI ꯂꯝꯕꯤ ꯑꯣꯞꯇꯤꯃꯥꯏꯖꯔ',
      navFleet: 'ꯂꯥꯏꯕ ꯒꯥꯔꯤ ꯇ꯭ꯔꯦꯀꯤꯡ',
      navReport: 'ꯐꯤꯜꯗ ꯑꯣꯐꯤꯁꯔ ꯔꯤꯄꯣꯔ꯭ꯠ',
      navAnalytics: 'ꯁꯞꯂꯥꯏ ꯆꯦꯟ ꯑꯦꯅꯥꯂꯤꯇꯤꯛꯁ',
      activeAlerts: 'ꯑꯦꯛꯇꯤꯕ ꯂꯝꯕꯤ ꯑꯀꯥꯌꯕ ꯑꯂꯥꯔ꯭ꯠ',
      connectivityScore: 'NER ꯑꯦꯛꯁꯦꯁꯤꯕꯤꯂꯤꯇꯤ ꯏꯟꯗꯦꯛꯁ',
      btnCalculate: 'AI ꯑꯐꯕ ꯂꯝꯕꯤ ꯊꯤꯕ',
      btnReport: 'ꯔꯤꯄꯣꯔ꯭ꯠ ꯁꯕꯃꯤꯠ ꯇꯧꯕ',
      offlineStatusText: 'ꯅꯦꯠꯋꯥꯔꯛ ꯀꯅꯦꯛꯁꯟ: ꯑꯣꯅꯂꯥꯏꯟ',
      offlineModeActive: 'ꯅꯦꯠꯋꯥꯔꯛ ꯀꯅꯦꯛꯁꯟ: ꯑꯣꯐꯂꯥꯏꯟ (ꯂꯣꯀꯦꯜ ꯁꯤꯡꯛ ꯑꯦꯛꯇꯤꯕ)'
    },
    bn: {
      appTitle: 'AI স্মার্ট লজিস্টিকস ও সুগমতা ইন্টেলিজেন্স প্ল্যাটফর্ম',
      appSubtitle: 'উত্তর-পূর্বাঞ্চল (NER) কানেক্টিভিটি ইন্টেলিজেন্স',
      navDashboard: 'প্রধান ড্যাশবোর্ড',
      navMap: 'GIS মানচিত্র ইন্টেলিজেন্স',
      navRouter: 'AI রুট অপটিমাইজার',
      navFleet: 'লাইভ যানবাহন ট্র্যাকিং',
      navReport: 'ফিল্ড অফিসার রিপোর্ট আপলোড',
      navAnalytics: 'সাপ্লাই চেইন অ্যানালিটিক্স',
      activeAlerts: 'সক্রিয় পথ বাধা অ্যালার্ট',
      connectivityScore: 'NER আঞ্চলিক সুগমতা সূচক',
      btnCalculate: 'AI নিখুঁত রুট গণনা করুন',
      btnReport: 'ঘটনা রিপোর্ট জমা দিন',
      offlineStatusText: 'নেটওয়ার্ক সংযোগ: অনলাইন',
      offlineModeActive: 'নেটওয়ার্ক সংযোগ: অফলাইন (স্থানীয় সিঙ্ক সারি সক্রিয়)'
    },
    lus: {
      appTitle: 'AI Smart Logistics leh Access Intelligence Platform',
      appSubtitle: 'Chhim-Chhak Tlangram (NER) Connectivity Intelligence',
      navDashboard: 'Executive Dashboard',
      navMap: 'GIS Lim Map Intelligence',
      navRouter: 'AI Kawng Optimizor',
      navFleet: 'Mawtawr Live Tracking',
      navReport: 'Field Officer Report Upload',
      navAnalytics: 'Supply Chain Analytics',
      activeAlerts: 'Kawng Buaina Thleng Mep',
      connectivityScore: 'NER Connectivity Index',
      btnCalculate: 'AI Kawng Thlannuam',
      btnReport: 'Report Thehluhna',
      offlineStatusText: 'Network Connection: Online',
      offlineModeActive: 'Network Connection: Offline (Local Sync Queue Active)'
    },
    brx: {
      appTitle: 'AI स्मार्ट लजिस्टिक्स आरो हाबथाग्रा बिजिरनाय प्लेटफार्म',
      appSubtitle: 'सा-सानजा बाहागो (NER) अनलाइनेबिलिटी',
      navDashboard: 'गाहै डैसबोर्ड',
      navMap: 'GIS मानसिनाय मेप',
      navRouter: 'AI लामा सेलेकसन',
      navFleet: 'लाइभ गाडिफोर ट्रेकिं',
      navReport: 'फिल्ड अफिसार रिपोर्ट',
      navAnalytics: 'सप्लाय चेन आनलाइसिस',
      activeAlerts: 'लामा हेंथा आलार्ट',
      connectivityScore: 'NER कनेक्टिभिटि स्कोर',
      btnCalculate: 'AI लामा दिन्थिनाय',
      btnReport: 'रिपोर्ट हरनाय',
      offlineStatusText: 'नेथवर्क: अनलाइन',
      offlineModeActive: 'नेथवर्क: अफलाइन'
    },
    trb: {
      appTitle: 'AI Smart Logistics tei Accessibility Intelligence Platform',
      appSubtitle: 'North Eastern Region (NER) Connectivity Intelligence',
      navDashboard: 'Executive Dashboard',
      navMap: 'GIS Map Intelligence',
      navRouter: 'AI Lama Optimizer',
      navFleet: 'Live Gari Tracking',
      navReport: 'Field Officer Report Submit',
      navAnalytics: 'Supply Chain Analytics',
      activeAlerts: 'Lama Kiri Alerts',
      connectivityScore: 'NER Connectivity Index',
      btnCalculate: 'AI Lama Swngna',
      btnReport: 'Report Khlai Di',
      offlineStatusText: 'Network: Online',
      offlineModeActive: 'Network: Offline (Sync Queue Active)'
    },
    nag: {
      appTitle: 'AI Smart Logistics te Accessibility Intelligence Platform',
      appSubtitle: 'North Eastern Region (NER) Connectivity Intelligence',
      navDashboard: 'Main Dashboard',
      navMap: 'GIS Map Intelligence',
      navRouter: 'AI Rasta Optimizer',
      navFleet: 'Live Gaadi Tracker',
      navReport: 'Field Officer Incident Report',
      navAnalytics: 'Supply Chain Analytics',
      activeAlerts: 'Rasta Disruption Alerts',
      connectivityScore: 'NER Accessibility Index',
      btnCalculate: 'AI Route Calculate Korobi',
      btnReport: 'Report Submit Korobi',
      offlineStatusText: 'Network Connection: Online',
      offlineModeActive: 'Network Connection: Offline (Local Sync Active)'
    },
    ujn: {
      appTitle: 'AI Smart Logistics chi Accessibility Intelligence Platform',
      appSubtitle: 'North Eastern Region (NER) Connectivity Intelligence',
      navDashboard: 'Executive Dashboard',
      navMap: 'GIS Map Intelligence',
      navRouter: 'AI Route Optimizer',
      navFleet: 'Live Fleet Tracker',
      navReport: 'Field Officer Incident Upload',
      navAnalytics: 'Supply Chain Analytics',
      activeAlerts: 'Active Disruption Alerts',
      connectivityScore: 'NER Regional Accessibility Index',
      btnCalculate: 'Calculate AI Optimal Route',
      btnReport: 'Submit Incident Report',
      offlineStatusText: 'Network: Online',
      offlineModeActive: 'Network: Offline'
    }
  },

  // Mock ULIP (Unified Logistics Interface Platform) National Database Sandbox
  ulipDatabase: {
    'AS-01-HC-9920': {
      vehNum: 'AS-01-HC-9920',
      owner: 'North East Cold Freight Services Ltd',
      vahan: { grossWeightTons: 18.5, maxAxleLoadTons: 21.0, fitnessValidTill: '2028-11-30', permitType: 'National Goods Permit (All NER States)' },
      sarathi: { driverName: 'Rajesh Sharma', licenseNum: 'AS-0120180992', validTill: '2031-04-15', hillTerrainEndorsement: 'VERIFIED' },
      fastag: { tagId: '34161FA89021', lastTollPlaza: 'Sonapur Toll Plaza (NH-27)', lastPassageTime: '18 mins ago', velocityKmh: 42.5 },
      fois: { railRakeStatus: 'Rake #FOIS-GHY-883 Allocated at Jogighopa MMLP', broadGaugeSiding: 'Jogighopa Goods Shed' }
    },
    'ML-05-AB-1234': {
      vehNum: 'ML-05-AB-1234',
      owner: 'Shillong Organic Agro Transporters',
      vahan: { grossWeightTons: 12.0, maxAxleLoadTons: 15.0, fitnessValidTill: '2027-08-20', permitType: 'Inter-State NER Permit' },
      sarathi: { driverName: 'Kipgen Thang', licenseNum: 'ML-0520194411', validTill: '2030-01-10', hillTerrainEndorsement: 'VERIFIED' },
      fastag: { tagId: '88219BC41109', lastTollPlaza: 'Nongpoh Plaza (NH-6)', lastPassageTime: '45 mins ago', velocityKmh: 28.0 },
      fois: { railRakeStatus: 'Pending Transfer to Pandu IWT Terminal Barge', broadGaugeSiding: 'Guwahati Goods Shed' }
    },
    'MN-01-C-8877': {
      vehNum: 'MN-01-C-8877',
      owner: 'Imphal Valley Express Logistics',
      vahan: { grossWeightTons: 24.0, maxAxleLoadTons: 25.0, fitnessValidTill: '2026-12-31', permitType: 'National Goods Permit' },
      sarathi: { driverName: 'Lobsang Dorjee', licenseNum: 'MN-0120158832', validTill: '2029-06-25', hillTerrainEndorsement: 'VERIFIED' },
      fastag: { tagId: '90124AA77102', lastTollPlaza: 'Jiribam Checkpost (NH-37)', lastPassageTime: '2 hrs ago', velocityKmh: 0.0 },
      fois: { railRakeStatus: 'Silchar Broad-Gauge Rake #FOIS-SIL-109 Standby', broadGaugeSiding: 'Silchar Goods Yard' }
    }
  },

  // Physics-Informed Arrhenius Spoilage Kinetics & Cold Chain Storage Nodes
  spoilageCommodities: [
    {
      id: 'COMM-TURMERIC',
      name: 'GI Lakadong Turmeric (High Curcumin)',
      hsnCode: '0910.30',
      activationEnergyEa: 68.4, // kJ/mol
      refTempC: 15.0,
      baseRSLHours: 72,
      currentTempC: 34.2,
      humidityPercent: 82,
      spoilageRisk: 'CRITICAL - Rapid Thermal Oxidation',
      nearbyColdStores: [
        { name: 'Jowai Mini Solar Cold Store (SIH Node 1)', capacityAvailableKg: 4500, distanceKm: 18, status: 'AVAILABLE' },
        { name: 'Guwahati APMC Mandi Cold Vault', capacityAvailableKg: 12000, distanceKm: 65, status: 'AVAILABLE' }
      ]
    },
    {
      id: 'COMM-PINEAPPLE',
      name: 'Queen Pineapple (Tripura Organic)',
      hsnCode: '0804.30',
      activationEnergyEa: 82.1,
      refTempC: 12.0,
      baseRSLHours: 48,
      currentTempC: 31.0,
      humidityPercent: 78,
      spoilageRisk: 'HIGH - Enzymatic Decay Active',
      nearbyColdStores: [
        { name: 'Agartala Mega Food Park Storage', capacityAvailableKg: 8500, distanceKm: 12, status: 'AVAILABLE' }
      ]
    }
  ],

  // Bhashini Multilingual Speech Recognition & Intent Parser Data
  voiceIntents: [
    {
      lang: 'en',
      langName: 'English',
      sampleUtterance: 'Landslide blocked NH-27 near Sonapur tunnel. Requesting multi-modal bypass route.',
      transcription: 'Landslide blocked NH-27 near Sonapur tunnel. Requesting multi-modal bypass route.',
      intent: 'REPORT_ROAD_BLOCKAGE',
      slots: { hazard_type: 'landslide', location_relative: 'NH-27 Sonapur 2km ahead', severity: 'impassable' },
      responseAudioText: 'Thank you! NH-27 Landslide logged in GIS Map. Multi-modal route via Brahmaputra NW-2 river barge and FOIS rail activated.'
    },
    {
      lang: 'hi',
      langName: 'Hindi (हिन्दी)',
      sampleUtterance: 'आगे सोनापुर टनल के पास भूस्खलन से सड़क पूरी तरह से बंद हो गई है।',
      transcription: 'आगे सोनापुर टनल के पास भूस्खलन से सड़क पूरी तरह से बंद हो गई है।',
      intent: 'REPORT_ROAD_BLOCKAGE',
      slots: { hazard_type: 'landslide', location_relative: 'Sonapur Tunnel 2km ahead', severity: 'impassable' },
      responseAudioText: 'धन्यवाद! सोनापुर भूस्खलन की सूचना जीआईएस नक्शे में दर्ज कर ली गई है। ब्रह्मपुत्र एनडब्ल्यू-2 जलमार्ग बाईपास लागू कर दिया गया है।'
    },
    {
      lang: 'as',
      langName: 'Assamese (অসমীয়া)',
      sampleUtterance: 'আগফালে সোণাপুৰ সুৰঙ্গৰ ওচৰত পাহাৰৰ মাটি খহি ৰাস্তা বন্ধ হৈছে।',
      transcription: 'আগফালে সোণাপুৰ সুৰঙ্গৰ ওচৰত পাহাৰৰ মাটি খহি ৰাস্তা বন্ধ হৈছে।',
      intent: 'REPORT_ROAD_BLOCKAGE',
      slots: { hazard_type: 'landslide', location_relative: 'Sonapur Tunnel 2km ahead', severity: 'impassable' },
      responseAudioText: 'ধন্যবাদ! সোণাপুৰ ভূমিস্খলনৰ তথ্য GIS মেপত আপডেট কৰা হ’ল। ব্ৰহ্মপুত্ৰ NW-2 ফেৰী বাইপাছ ফৰৱাৰ্ড কৰা হৈছে।'
    },
    {
      lang: 'khasi',
      langName: 'Khasi (Meghalaya)',
      sampleUtterance: 'Ka surok ha Sonapur ka la kylla hap ki maw bad khyndew, um lah iaid kali.',
      transcription: 'Ka surok ha Sonapur ka la kylla hap ki maw bad khyndew, um lah iaid kali.',
      intent: 'REPORT_ROAD_BLOCKAGE',
      slots: { hazard_type: 'landslide', location_relative: 'Sonapur Pass', severity: 'critical' },
      responseAudioText: 'Khublei! Ya ka khubor ba la hap khyndew la pynithuh ha ka map GIS.'
    },
    {
      lang: 'mizo',
      langName: 'Mizo (Mizoram)',
      sampleUtterance: 'Kawtthlerah min a tla a, kawng a ping tlat mai.',
      transcription: 'Kawtthlerah min a tla a, kawng a ping tlat mai.',
      intent: 'REPORT_ROAD_BLOCKAGE',
      slots: { hazard_type: 'landslide', location_relative: 'Mountain Arterial Pass', severity: 'critical' },
      responseAudioText: 'Ka lawm e! Kawng ping hi system ah chhinchhiah a ni e.'
    },
    {
      lang: 'brx',
      langName: 'Bodo (बोडो)',
      sampleUtterance: 'सिगाङाव सोनापुर थुनेल खाथियाव हा दाग्लानानै लामाया बन्द जाबाय।',
      transcription: 'सिगाङाव सोनापुर थुनेल खाथियाव हा दाग्लानानै लामाया बन्द जाबाय।',
      intent: 'REPORT_ROAD_BLOCKAGE',
      slots: { hazard_type: 'landslide', location_relative: 'Sonapur Pass', severity: 'critical' },
      responseAudioText: 'साबायखर! सोनापुर हा दाग्लानाय रादाबखौ GIS मेपाव सोदेरबाय।'
    },
    {
      lang: 'mni',
      langName: 'Manipuri (ꯃꯅꯤꯄꯨꯔꯤ)',
      sampleUtterance: 'ꯃꯃꯥꯡꯗ ꯁꯣꯅꯥꯄꯨꯔ ꯇꯅꯦꯜ ꯃꯅꯥꯛꯇ ꯆꯤꯡ ꯁꯨꯈ꯭ꯔꯕꯅ ꯂꯝꯕꯤ ꯊꯤꯡꯖꯤꯅꯈ꯭ꯔꯦ꯫',
      transcription: 'ꯃꯃꯥꯡꯗ ꯁꯣꯅꯥꯄꯨꯔ ꯇꯅꯦꯜ ꯃꯅꯥꯛꯇ ꯆꯤꯡ ꯁꯨꯈ꯭ꯔꯕꯅ ꯂꯝꯕꯤ ꯊꯤꯡꯖꯤꯅꯈ꯭ꯔꯦ꯫',
      intent: 'REPORT_ROAD_BLOCKAGE',
      slots: { hazard_type: 'landslide', location_relative: 'Sonapur Pass', severity: 'critical' },
      responseAudioText: 'ꯊꯥꯒꯠꯆꯔꯤ! ꯁꯣꯅꯥꯄꯨꯔ ꯆꯤꯡ ꯁꯨꯈ꯭ꯔꯕꯒꯤ ꯄꯥꯎ GIS ꯃꯦꯞꯇ ꯑꯄꯗꯦꯠ ꯇꯧꯈ꯭ꯔꯦ꯫'
    },
    {
      lang: 'bn',
      langName: 'Bengali (বাংলা)',
      sampleUtterance: 'সামনে সোনাপুর টানেলের কাছে পাহাড়ের ধস নেমে রাস্তা সম্পূর্ণ বন্ধ হয়ে গেছে।',
      transcription: 'সামনে সোনাপুর টানেলের কাছে পাহাড়ের ধস নেমে রাস্তা সম্পূর্ণ বন্ধ হয়ে গেছে।',
      intent: 'REPORT_ROAD_BLOCKAGE',
      slots: { hazard_type: 'landslide', location_relative: 'Sonapur Tunnel 2km ahead', severity: 'impassable' },
      responseAudioText: 'ধন্যবাদ! সোনাপুর ধসের তথ্য GIS ম্যাপে আপডেট করা হয়েছে। ব্রহ্মপুত্র NW-2 রিভার বার্জ বাইপাস চালু করা হয়েছে।'
    }
  ]
};


