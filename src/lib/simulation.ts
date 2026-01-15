/**
 * Simulation logic for GreenPulse Phase 2
 * Provides heuristic-based models for Diagnostics (XGBoost) and Simulation (S2SLS & LSTM)
 */

export interface SimulationResult {
    roi: number;
    diagnostic: number;
}

/**
 * Calculates a diagnostic score representing "potential for improvement"
 * Mimics an XGBoost model analyzing features like current tree density, 
 * population density, and local heat index.
 */
export function getDiagnosticScore(cbgId: string, baseGreening: number): number {
    // Hash cbgId to get a stable pseudo-random diagnostic base
    const hash = cbgId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const variance = (hash % 40) - 20; // -20 to +20

    // Inverse relationship with base greening (lower greening = higher potential)
    const potential = 100 - baseGreening;

    return Math.max(0, Math.min(100, potential + variance));
}

/**
 * Calculates the Return on Investment (ROI) increment after planting.
 * Mimics S2SLS & LSTM models predicting environmental and economic net benefit.
 */
export function calculateROI(
    plantingIntensity: number,
    speciesDiversity: number,
    maintenanceBudget: number
): number {
    // Heuristic formula: Higher diversity and budget lead to better long-term survival and higher ROI.
    // Excessively high intensity without enough budget might lower ROI due to high failure rates.

    const budgetEfficiency = maintenanceBudget / (plantingIntensity || 1);
    const survivalRate = Math.min(1, budgetEfficiency * 0.8 + speciesDiversity * 0.2 / 100);

    const baseROI = (plantingIntensity * 0.5) + (speciesDiversity * 0.3) + (maintenanceBudget * 0.2);
    const normalizedROI = baseROI * survivalRate;

    return Math.max(0, Math.min(100, normalizedROI));
}

/**
 * Runs simulation for all CBGs
 */
export function runGlobalSimulation(cbgData: any): Record<string, SimulationResult> {
    const results: Record<string, SimulationResult> = {};

    if (!cbgData || !cbgData.features) return results;

    cbgData.features.forEach((feature: any) => {
        const props = feature.properties;
        const cbgId = props.cbgId || props.GEOID;
        const baseGreening = props.Join_Count || props.greeningScore || 0;

        results[cbgId] = {
            diagnostic: getDiagnosticScore(cbgId, baseGreening),
            roi: calculateROI(
                props.plantingIntensity || 50,
                props.speciesDiversity || 50,
                props.maintenanceBudget || 60
            )
        };
    });

    return results;
}
