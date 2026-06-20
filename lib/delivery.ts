import type { DeliveryEstimate } from "@/types";

// Nigerian states considered "major cities" for 1–2 day delivery
const NIGERIA_MAJOR_CITIES = new Set(["Lagos", "FCT – Abuja", "Kano", "Rivers"]);

// West African countries (excluding Nigeria) — 5–7 days
const WEST_AFRICA_CODES = new Set(["GH", "SN", "CI", "BN", "TG", "CM"]);

// Other African countries — 7–10 days
const REST_OF_AFRICA_CODES = new Set(["KE", "ZA", "ET", "EG"]);

/**
 * Calculates a delivery estimate based on the customer's country and state.
 * This is a pure function with no UI imports — it exists solely in lib/ so it
 * can be tested independently and reused across checkout and order confirmation.
 *
 * Rules:
 *   Nigeria, major cities (Lagos / Abuja / Kano / Rivers): 1–2 business days
 *   Nigeria, all other states:                              3–5 business days
 *   West Africa (GH, SN, CI, BN, TG, CM):                 5–7 days
 *   Rest of Africa (KE, ZA, ET, EG):                       7–10 days
 *   International (Europe / US / CA / everywhere else):     10–18 days
 */
export function getDeliveryEstimate(
  countryCode: string,
  stateOrRegion: string
): DeliveryEstimate {
  if (countryCode === "NG") {
    if (NIGERIA_MAJOR_CITIES.has(stateOrRegion)) {
      return {
        minDays: 1,
        maxDays: 2,
        label: "1–2 business days",
        zone: "Nigeria – Major City",
      };
    }
    return {
      minDays: 3,
      maxDays: 5,
      label: "3–5 business days",
      zone: "Nigeria – Standard",
    };
  }

  if (WEST_AFRICA_CODES.has(countryCode)) {
    return {
      minDays: 5,
      maxDays: 7,
      label: "5–7 days",
      zone: "West Africa",
    };
  }

  if (REST_OF_AFRICA_CODES.has(countryCode)) {
    return {
      minDays: 7,
      maxDays: 10,
      label: "7–10 days",
      zone: "Africa",
    };
  }

  return {
    minDays: 10,
    maxDays: 18,
    label: "10–18 days",
    zone: "International",
  };
}

/** Returns an estimated delivery date string given a start date and estimate. */
export function getEstimatedDeliveryDate(estimate: DeliveryEstimate): string {
  const date = new Date();
  // Add business days (approximate: skip weekends)
  let daysAdded = 0;
  while (daysAdded < estimate.maxDays) {
    date.setDate(date.getDate() + 1);
    const day = date.getDay();
    if (day !== 0 && day !== 6) daysAdded++;
  }
  return date.toISOString().split("T")[0];
}
