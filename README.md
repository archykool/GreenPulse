# GreenPulse Twin: Digital Twin for Urban Greening Analytics

[![Project Status: Active](https://img.shields.io/badge/Project%20Status-Active-green.svg)](https://github.com/archykool/GreenPulse)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

**GreenPulse Twin** is a high-fidelity Digital Twin and policy simulation platform designed for urban planners and decision-makers (specifically tailored for the NYC OMB). It enables the quantification of long-term economic, environmental, and social impacts of street tree planting at the Census Block Group (CBG) level.

---

## 🚀 Project Overview

GreenPulse leverages advanced econometric modeling (S2SLS) and machine learning (XGBoost, LSTM) to provide a predictive decision-support system.

- **Spatial Granularity**: Analysis at the **Census Block Group (CBG)** level—the standard unit for fiscal budget allocation in NYC.
- **Decision Engine**: Quantifies the relationship between urban forestry and property values, public health, and municipal ROI.
- **Core Indicators**: ROI Increment, Cooling Benefits, Stormwater Mitigation, Fiscal Cost, and Equity Scores (SVI-linked).

---

## 🛠️ Technology Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Mapping**: [Mapbox GL JS](https://www.mapbox.com/mapbox-gl-js) & [react-map-gl](https://visgl.github.io/react-map-gl/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Visualization**: [Recharts](https://recharts.org/)

---

## 🗺️ Interactive Layers

1. **Baseline Greening**: Modern visualization of the 2025 Tree Census data.
2. **XGBoost Diagnostic**: Explains "Why property values are as they are" using SHAP-derived feature importance for each block.
3. **Scenario Simulation**: Real-time counterfactual simulation powered by S2SLS and LSTM models. Adjust planting intensity, diversity, and budget to see projected ROI.

---

## 📊 Getting Started

### Prerequisites

- Node.js 18.x or higher
- A Mapbox Access Token ([Get one here](https://account.mapbox.com/))

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/archykool/GreenPulse.git
   cd GreenPulse
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_access_token_here
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 📈 Development Roadmap

- [x] **Phase 1: Foundation**: Core UI, Mapbox integration, and CBG boundary rendering.
- [x] **Phase 2: Scenarios**: Interactive sliders, multi-layer switching, and simulation logic.
- [ ] **Phase 3: Deep Analytics**: LSTM-driven temporal projection charts and official policy brief generation.

---

## 💻 Prototype

<img width="1919" height="908" alt="GreenPulse_demo1" src="https://github.com/user-attachments/assets/e2f6e9ab-4ef8-4193-9ced-748d8dd8c1fa" />
<img width="1919" height="907" alt="GreenPulse_demo2" src="https://github.com/user-attachments/assets/1c0975e5-0fc7-436f-8fcf-1285723627c9" />
<img width="1919" height="908" alt="GreenPulse_demo3" src="https://github.com/user-attachments/assets/9577f5bb-c00a-455e-9d18-f0b2433f7c1b" />
---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---





**Developed for the NYC Urban Forestry Initiative.**
*Last Updated: January 14, 2026*
