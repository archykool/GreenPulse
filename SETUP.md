# GreenPulse - Setup Guide

## Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Configure Mapbox Token (Optional):**
   - Visit https://account.mapbox.com/access-tokens/ to get a free token
   - Create `.env.local` file in the root directory:
     ```
     NEXT_PUBLIC_MAPBOX_TOKEN=your_token_here
     ```

3. **Start development server:**
```bash
npm run dev
```

4. **Open browser:**
   - Navigate to http://localhost:3000
   - If no Mapbox token is configured, the map will display with watermarks

## Project Structure

```
GreenPulse/
├── 📄 README.md                    # Project overview
├── 📄 SETUP.md                     # Setup guide (this file)
├── 📄 package.json                 # Dependencies and scripts
├── 📄 tsconfig.json                # TypeScript configuration
├── 📄 next.config.js               # Next.js configuration
├── 📄 tailwind.config.ts           # Tailwind CSS configuration
├── 📄 postcss.config.js            # PostCSS configuration
├── 📄 .eslintrc.json               # ESLint rules
├── 📄 .gitignore                   # Git ignore patterns
│
├── 📁 src/                         # Source code (all frontend code)
│   ├── app/                        # Next.js App Router
│   │   ├── layout.tsx              # Root layout
│   │   ├── page.tsx                # Home page
│   │   ├── globals.css             # Global styles
│   │   └── api/                    # API routes
│   │       └── cbg/
│   │           └── route.ts        # CBG data API
│   ├── components/                 # React components
│   │   ├── map/                    # Map components
│   │   │   ├── MapView.tsx
│   │   │   ├── MapInitializer.tsx
│   │   │   ├── CbgTooltip.tsx
│   │   │   ├── MapDebug.tsx
│   │   │   └── SelectionHint.tsx
│   │   ├── controls/               # Control panels
│   │   │   ├── ControlPanel.tsx
│   │   │   ├── SliderControl.tsx
│   │   │   └── UploadZone.tsx
│   │   ├── analytics/              # Analytics components
│   │   │   ├── AnalyticsPanel.tsx
│   │   │   └── AnalyticsChart.tsx
│   │   └── layout/                 # Layout components
│   │       ├── Header.tsx
│   │       └── MainLayout.tsx
│   ├── stores/                     # Zustand state management
│   │   └── useAppStore.ts
│   ├── types/                      # TypeScript type definitions
│   │   └── cbg.ts
│   └── lib/                        # Utility functions
│       ├── api.ts
│       └── utils.ts
│
├── 📁 data/                        # Data files
│   ├── raw/                        # Raw data (CSV, GeoJSON, etc.)
│   ├── processed/                  # Processed data ready for use
│   └── mock/                       # Mock data for development
│       └── mockCbgData.ts          # Mock CBG GeoJSON data
│
├── 📁 models/                      # Model implementations (future)
│   ├── xgboost/                    # XGBoost diagnostic model
│   ├── s2sls/                      # S2SLS causal inference
│   └── lstm/                       # LSTM temporal projection
│
└── 📁 temp/                        # Temporary/test files (gitignored)
```

## Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

### Key Technologies

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Mapbox GL** - Interactive maps
- **Zustand** - State management
- **Recharts** - Data visualization

### Import Paths

The project uses TypeScript path aliases configured in `tsconfig.json`:

- `@/*` maps to `./src/*`

**For frontend code (components, stores, lib, types):**
```typescript
import { useAppStore } from '@/stores/useAppStore'
import MainLayout from '@/components/layout/MainLayout'
import { CBGGeoJSON } from '@/types/cbg'
import { fetchCbgData } from '@/lib/api'
```

**For data files in the root `data/` directory:**

Use relative imports from your file location:

```typescript
// From src/components/map/MapInitializer.tsx
import { mockCbgData } from '../../../data/mock/mockCbgData'

// From src/app/api/cbg/route.ts
import { mockCbgData } from '../../../../data/mock/mockCbgData'
```

## Configuration Files

All configuration files are in the root directory (required by Next.js and tooling):

- `tsconfig.json` - TypeScript compiler options, path alias: `@/*` → `./src/*`
- `next.config.js` - Next.js configuration
- `tailwind.config.ts` - Tailwind CSS theme, scans `./src/**/*.{ts,tsx}`
- `postcss.config.js` - PostCSS plugins
- `.eslintrc.json` - ESLint rules

## Data Integration

### Using Mock Data

Currently, the application uses mock CBG data at `data/mock/mockCbgData.ts`.

### Integrating Real Data

1. **Place raw data in `data/raw/`** (CSV, GeoJSON, etc.)
2. **Process data** and save to `data/processed/`
3. **Update import** in components:
   ```typescript
   import { realCbgData } from '../../../data/processed/cbgData'
   ```

### API Integration

To connect to a backend API:

1. Update `src/lib/api.ts` with your API endpoints
2. Uncomment API fetch code in `MapInitializer.tsx`
3. Configure CORS if needed in `next.config.js`

## Troubleshooting

### Port Already in Use

If port 3000 is already in use:
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or change port
npm run dev -- -p 3001
```

### Module Not Found Errors

1. Ensure all dependencies are installed: `npm install`
2. Check TypeScript path alias in `tsconfig.json`: `@/*` → `./src/*`
3. Clear `.next` folder and restart: `rmdir /s .next && npm run dev`

### Map Not Loading

1. Check Mapbox token in `.env.local`
2. Clear Next.js cache: `rmdir /s .next`
3. Check browser console for errors
4. Verify `data/mock/mockCbgData.ts` exists

### Import Path Errors

Remember:
- Frontend code: use `@/` prefix (e.g., `@/components/...`)
- Data files: use relative paths (e.g., `../../../data/mock/...`)

## Next Steps

1. **Add real CBG data** - Replace mock data with actual GeoJSON
2. **Implement models** - Add XGBoost, S2SLS, and LSTM in `models/`
3. **API development** - Build backend routes in `src/app/api/`
4. **Testing** - Add test files (use `temp/` during development)

## Support

For issues or questions, refer to the main README.md documentation.
