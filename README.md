# NE-AURA: AI-Driven Smart Logistics & Accessibility Intelligence Platform

> **Smart India Hackathon (SIH 2026) — Problem Statement SIH26002**  
> *Enterprise-Grade Dynamic Terrain-Resilient Routing, Multi-Modal Freight Switching, Physics-Informed Perishable Logistics, and Inclusive Offline Voice Accessibility for India's North Eastern Region (NER).*

---

[![SIH 2026](https://img.shields.io/badge/SIH-2026-blue.svg)](https://sih.gov.in/)
[![Problem Statement](https://img.shields.io/badge/SIH%20PS-SIH26002-orange.svg)](#-problem-statement--vision)
[![Architecture](https://img.shields.io/badge/Architecture-Microservices%20%2B%20Kafka-green.svg)](#-system-architecture)
[![ML Engines](https://img.shields.io/badge/ML-ST--GCN%20%7C%20YOLOv8%20%7C%20Bhashini-purple.svg)](#-machine-learning-pipeline)
[![Offline-First](https://img.shields.io/badge/Sync-Delta--CRDT%20%2B%20SpatiaLite-teal.svg)](#-offline-first--accessibility-infrastructure)
[![ULIP Integrated](https://img.shields.io/badge/Integration-ULIP%20(VAHAN%2C%20FASTag%2C%20FOIS)-red.svg)](#-national-digital-infrastructure-ulip-integration)

---

## 📌 Problem Statement & Regional Challenges (SIH26002)

The **North Eastern Region (NER)** of India—encompassing Assam, Meghalaya, Mizoram, Manipur, Nagaland, Arunachal Pradesh, Tripura, and Sikkim—faces critical logistical vulnerabilities:

1. **Physical Isolation & Choke-Point Single Dependencies**: The narrow **Siliguri Corridor ("Chicken's Neck")** serves as the sole land bridge connecting NER to mainland India. Any obstruction here or along key hill arteries (NH-27, NH-2) halts regional supply lines.
2. **Terrain & Weather Disruptions**: Extreme monsoonal rainfall, high seismic instability, steep topographical gradients, and rapid landslide formation frequently render mountain roads impassable without advance warning.
3. **Severe Post-Harvest Agricultural Losses**: High-value local produce (e.g., GI-tagged Lakadong Turmeric, spices, fresh horticultural goods) spoils rapidly during transit delays due to unmonitored thermal decay and lack of dynamic cold-chain rerouting.
4. **Connectivity Dead Zones & Operational Barriers**: Deep river valleys and mountain passes suffer total loss of cellular signal. Furthermore, non-literate drivers and operators speaking diverse regional dialects (Assamese, Khasi, Mizo, Bodo, Manipuri) struggle with text-heavy UI navigation.
5. **Data Fragmentation**: Government logistics data (FASTag, VAHAN, FOIS, SARATHI) operates in silos from real-time field observations and disaster early-warning streams.

---

## 💡 The NE-AURA Solution

**NE-AURA (North East Accessibility & Urban-Rural Logistics Assistant)** is an enterprise-grade AI-driven platform that provides end-to-end supply chain resilience, dynamic multi-modal switching, and inclusive accessibility.

### Problem vs. Solution Mapping Matrix

| Key Regional Challenge | Traditional Limitation | NE-AURA Innovative Solution |
| :--- | :--- | :--- |
| **Highway Landslides & Blockages** | Static GPS rerouting over equally unsafe mountain roads | **Predictive ST-GCN AI Hazard Engine**: Evaluates orbital ISRO SAR radar & soil moisture to predict landslides ($R_{edge}$) 72h ahead. |
| **Choke Point Failures (Siliguri)** | Total stoppage of land freight movement | **Multi-Modal Swap Engine**: Shifts cargo seamlessly between overland trucks, broad-gauge rail sidings, and river barges along **NW-2 (Brahmaputra)** and **NW-16 (Barak)** anchored at **Jogighopa MMLP**. |
| **Perishable Cargo Spoilage** | Fixed destinations resulting in total produce loss | **Physics-Informed Arrhenius Spoilage Engine**: Calculates real-time Remaining Shelf Life (RSL) from IoT temp sensors and dynamically diverts trucks to nearest **Mini Cold Stores** or **APMC Mandis**. |
| **Cellular Dead Zones** | App crashes and data loss in mountain passes | **Offline-First Delta-CRDT Engine**: Local **SpatiaLite** database stores transaction logs and performs lock-free state synchronization once connectivity is restored. |
| **Driver Accessibility & Language** | Text-heavy UIs unsuited for non-literate/dialect drivers | **Multilingual Voice-First Assistant**: Fine-tuned **Bhashini & IndicWhisper** ASR/TTS processing 16kHz cabin audio in regional languages (Assamese, Khasi, Mizo, Bodo, Manipuri). |
| **Logistics Data Silos** | Manual verifications & isolated toll telemetry | **ULIP Middleware Integration**: Direct integration with **VAHAN 4.0, SARATHI 4.0, FASTag, FOIS**, and **E-Way Bill** for automated toll, rake, and weight compliance. |

---

## 🏗️ System Architecture

NE-AURA operates on an **event-driven microservices architecture** decoupled by an Apache Kafka streaming bus, with PostGIS/TimescaleDB at the core and an offline-first mobile client at the edge.

```
                                  [ Incoming Ingestion Feeds ]
                                               |
            +----------------------------------+----------------------------------+
            |                                  |                                  |
            v                                  v                                  v
    [ Edge Telemetry & Audio ]       [ Geospatial & Weather ]             [ National APIs ]
    (Driver App, Crowdsourcing)      (ISRO SAR, AWS Rain)                 (ULIP: FASTag, VAHAN)
            |                                  |                                  |
            +----------------------------------+----------------------------------+
                                               |
                                               v
                             [ Apache Kafka Event Streaming Bus ]
                                               |
                                               v
                             [ Microservices Execution Core ]
                            (ST-GCN, RADR, Arrhenius Models)
                                               |
            +----------------------------------+----------------------------------+
            |                                                                     |
            v                                                                     v
    [ Driver Mobile App ]                                              [ Administrative Command ]
    (Delta-CRDT Sync, Bhashini Voice)                                  (MapLibre GIS, Reroute Sim)
```

---

## 🔥 Key Technical Innovations

### 1. 🛣️ Dynamic Terrain-Resilient Routing Engine (RADR)
- **ST-GCN + GRU Architecture**: Evaluates dynamic road network graphs $G(V, E, W)$ where dynamic segment traversal costs account for slope variance, rainfall, fog, traffic, and landslide risk scores ($R_{edge}$).
- **Continuous Edge Weight Equation**:
  $$C_{edge}(e_i, t) = \alpha \cdot d(e_i) + \beta \cdot S(e_i) + \gamma \cdot R_{edge}(e_i, t) + \delta \cdot W(e_i, t) + \epsilon \cdot T_d(e_i, t)$$

### 2. 🚢 Multi-Modal Predictive Swap Engine
When road hazard scores breach safety thresholds ($R_{edge} \ge 0.75$) or primary land bridges like the Siliguri Corridor undergo collapse, NE-AURA dynamically recalculates and reallocates cargo across alternative modalities:
- **Inland Waterway Transport (IWT)**: National Waterway 2 (Brahmaputra) & NW-16 (Barak River) terminals at Pandu & Dhubri.
- **Freight Rail**: Goods sidings and rakes via FOIS integration (e.g., Jogighopa MMLP, Silchar Goods Shed).
- **Heavy-Lift Drone Corridors**: Last-mile high-altitude delivery to isolated hill settlements.

#### Automated Modal Swap Matrix

| Primary Blockage Trigger | Commodity Category | Modal Swap Sequence | Target Intermodal Nodes |
| :--- | :--- | :--- | :--- |
| **Siliguri Corridor ($R_{edge} \ge 0.80$)** | Bulk / Non-Perishable | Highway $\rightarrow$ Broad-Gauge Rail $\rightarrow$ Highway | Jogighopa MMLP Rail Siding |
| **NH-27 Landslide ($R_{edge} \ge 0.75$)** | Perishable Agri Produce | Highway $\rightarrow$ IWT River Barge $\rightarrow$ Feeder Road | Dhubri / Pandu IWT Terminals (NW-2) |
| **Deep Valley Cutoff (Road Collapse)** | Emergency Medical / Relief | Highway $\rightarrow$ IWT Terminal $\rightarrow$ Heavy-Lift Drone | Jogighopa IWT Terminal $\rightarrow$ Hill Staging |
| **Hill Arterial Degradation** | Standard Cargo | Highway $\rightarrow$ High-Capacity Rail Shift | Silchar Rail Goods Shed / Guwahati |

### 3. 🧪 Physics-Informed Arrhenius Perishable Spoilage Engine
Integrates chemical degradation kinetics directly into loss functions to track **Remaining Shelf Life (RSL)** of perishables under varying temperatures ($T$ in Kelvin):
$$k(T) = k_A \cdot \exp\left(-\frac{E_a}{R \cdot T}\right)$$
$$RSL(t) = RSL_0 - \int_{0}^{t} \frac{k(T(\tau))}{k_{ref}} \, d\tau$$
*If $RSL(t) < ETA_{destination}$, NE-AURA automatically reroutes cargo to the nearest APMC Mandi or Solar Mini Cold Storage hub.*

### 4. 📴 Offline-First Delta-CRDT Synchronization
- **Zero-Data Loss Dead Zones**: Mobile devices operate using embedded **SpatiaLite** database instances.
- **Delta-State CRDTs**: Vector clock-stamped state mutations queue locally and perform lock-free eventual consistency state merges upon cellular recovery or peer vehicle Wi-Fi Direct mesh contact.

### 5. 🎙️ Multilingual Voice-First Accessibility
- Fine-tuned **Bhashini** and **IndicWhisper** 8-bit quantized ONNX engines.
- Supports **Assamese, Khasi, Mizo, Bodo, Manipuri**, and **Bengali** speech-to-text (ASR) and text-to-speech (TTS).
- Hands-free navigation and voice-driven hazard reporting for drivers operating under tough conditions.

### 6. 🌐 National ULIP Infrastructure Integration
Unified API connector middleware synchronizes with India's National Logistics Portal:
- **VAHAN 4.0**: Axle load limits, vehicle fitness, and bridge weight compliance.
- **SARATHI 4.0**: Driver license verification for hazardous/mountainous terrain.
- **FASTag**: Real-time highway speed metrics and toll passage anomaly detection.
- **FOIS**: Live freight rail rake availability and siding schedules.
- **E-Way Bill**: Commodity HSN codes and value prioritization during rerouting.

---

## 🤖 Machine Learning Models Specification

| Model Module | Architecture | Input Features | Output Metric | Target Latency |
| :--- | :--- | :--- | :--- | :--- |
| **Landslide Risk Predictor** | ST-GCN + GRU | SAR Interferometry, 72h Rain, Soil Moisture | Risk Score ($R_{edge} \in [0,1]$) | $< 250\text{ ms}$ |
| **Dynamic Routing** | RADR + Heuristic A* | Graph $G(V,E,W)$, Live Risk Tensor | Optimal Multi-Modal Path | $< 100\text{ ms}$ |
| **Hazard Photo Classifier** | Edge YOLOv8 / ViT | Geo-tagged WebP Driver Upload | Class + Severity Score | $< 1.2\text{ s}$ |
| **Perishable Spoilage** | Arrhenius PINN | Temp Logs, Transit Duration, HSN $E_a$ | Remaining Shelf Life (RSL) | $< 50\text{ ms}$ |
| **Driver Speech ASR** | Quantized IndicWhisper | 16kHz Cabin Audio Stream | Intent JSON + Slot Extraction | $< 600\text{ ms}$ |

---

## 💻 Tech Stack

- **Frontend & Visualization**: HTML5, Vanilla CSS3 (High-Contrast Theme), JavaScript, MapLibre GL, D3.js
- **Mobile Edge App**: Flutter / C++ Native Extensions, SpatiaLite, Delta-CRDT Vector Engine
- **Backend & Services**: Python / Node.js Microservices, Kong API Gateway, REST APIs
- **Database & Storage**: PostgreSQL 15 + PostGIS (Spatial Graph), TimescaleDB (Telemetry Hypertables), Redis (Hot Cache)
- **Streaming & Messaging**: Apache Kafka, MQTT (Mobile Edge Broker)
- **AI / ML Frameworks**: PyTorch, ONNX Runtime, YOLOv8, Vision Transformer (ViT), HuggingFace Transformers

---

## 📂 Repository Structure

```
SIH 2026/
├── README.MD                        # Enterprise System Architecture & Documentation
├── work.txt                         # Detailed Blueprint & SIH Problem Statement Document
└── frontend/                        # Web Dashboards & Driver Interfaces
    ├── index.html                   # Platform Landing Page & System Portal Overview
    ├── Gis_map.html                 # Interactive GIS Spatial Hazard & Network Map
    ├── Ai_route.html                # RADR Dynamic Pathfinding & Multi-Modal Simulator
    ├── Live_Fleet_tracker.html      # Real-Time Telemetry & ULIP FASTag Tracking
    ├── Exceutive_dasboard.html      # Command & Control Executive Overview Dashboard
    ├── Supply_chain.html            # Arrhenius Spoilage & Cold-Chain Management
    ├── about_us.html                # Project Vision, SIH Problem Statement & Team Details
    ├── profile.html                 # User & Transporter Profile Management
    ├── resource.html                # Intermodal Terminal Infrastructure Resources
    ├── service.html                 # Platform Services & ULIP API Directory
    ├── setting.html                 # System Configuration & Localization Settings
    ├── css/                         # Custom CSS Stylesheets
    └── js/                          # Application Scripts & GIS Integrations
```

---

## 🚦 Getting Started

### Prerequisites
- **Node.js**: `v18.x` or higher
- **Python**: `3.10+` with PyTorch & ONNX Runtime
- **PostgreSQL**: `v15+` with PostGIS extension enabled
- **Apache Kafka**: `v3.x`

### Running the Frontend Dashboard Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/your-org/NE-AURA.git
   cd "SIH 2026"
   ```

2. Open the frontend portal directly in your browser or run a simple local web server:
   ```bash
   # Using Python simple HTTP server
   python -m http.server 8000 --directory frontend
   ```

3. Navigate to `http://localhost:8000` in your web browser:
   - **Executive Dashboard**: `http://localhost:8000/Exceutive_dasboard.html`
   - **GIS Spatial Hazard Map**: `http://localhost:8000/Gis_map.html`
   - **AI Routing Simulator**: `http://localhost:8000/Ai_route.html`
   - **Supply Chain & Spoilage**: `http://localhost:8000/Supply_chain.html`

---

## 📊 Database Schema Highlights

```sql
-- Network Nodes (Terminals, Mandis, Cold Stores, Rail Sidings)
CREATE TABLE nodes (
    node_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(128) NOT NULL,
    node_type VARCHAR(32) CHECK (node_type IN ('intersection', 'mandi', 'cold_store', 'iwt_terminal', 'rail_siding', 'drone_hub')),
    location GEOMETRY(Point, 4326) NOT NULL,
    operational_status VARCHAR(16) DEFAULT 'active'
);

-- Transport Network Edges (Roads, Waterways, Rail, Drone Corridors)
CREATE TABLE edges (
    edge_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source_node UUID REFERENCES nodes(node_id),
    target_node UUID REFERENCES nodes(node_id),
    transport_mode VARCHAR(16) CHECK (transport_mode IN ('road', 'rail', 'waterway', 'drone')),
    geometry GEOMETRY(LineString, 4326) NOT NULL,
    base_distance_km NUMERIC(8,3) NOT NULL,
    base_speed_kmh INT NOT NULL
);
```

---

## 🗓️ Implementation Roadmap

```
[Phase 1: Months 1–4]  ==> PostgreSQL/PostGIS, Apache Kafka, ULIP Middleware (VAHAN, FASTag, FOIS)
[Phase 2: Months 5–8]  ==> ST-GCN Risk Model, Multi-Modal Swap Engine, Arrhenius Spoilage Service
[Phase 3: Months 9–12] ==> Bhashini Voice Pipeline, Offline Delta-CRDT App, Command Dashboard Rollout
```

---

## 📜 License & Acknowledgments

- Built for **Smart India Hackathon 2026** (Problem Statement `SIH26002`).
- Special thanks to **ISRO**, **Ministry of Ports, Shipping and Waterways (IWAI)**, **Indian Railways (FOIS)**, and the **ULIP Team** for digital public infrastructure integrations.
