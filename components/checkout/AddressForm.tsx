"use client";

import { useEffect, useState } from "react";
import Input from "@/components/ui/Input";
import locationsData from "@/data/locations.json";
import type { Address } from "@/types";

interface AddressFormProps {
  value: Address;
  onChange: (address: Address) => void;
}

export default function AddressForm({ value, onChange }: AddressFormProps) {
  const [showStateSelect, setShowStateSelect] = useState(value.country === "NG");

  useEffect(() => {
    setShowStateSelect(value.country === "NG");
  }, [value.country]);

  function handleField(field: keyof Address, fieldValue: string) {
    const updated = { ...value, [field]: fieldValue };
    // Reset state when country changes
    if (field === "country") updated.state = "";
    onChange(updated);
  }

  return (
    <div className="space-y-4">
      <Input
        label="Full Name"
        placeholder="Your full name"
        value={value.fullName}
        onChange={(e) => handleField("fullName", e.target.value)}
        required
      />

      <Input
        label="Street Address"
        placeholder="Street, apartment, etc."
        value={value.street}
        onChange={(e) => handleField("street", e.target.value)}
        required
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="City"
          placeholder="City"
          value={value.city}
          onChange={(e) => handleField("city", e.target.value)}
          required
        />
        <Input
          label="Postal Code"
          placeholder="Postal code"
          value={value.postalCode}
          onChange={(e) => handleField("postalCode", e.target.value)}
        />
      </div>

      {/* Country selector */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium tracking-widest uppercase text-stone-500">
          Country
        </label>
        <select
          value={value.country}
          onChange={(e) => handleField("country", e.target.value)}
          className="w-full border border-stone-200 bg-white px-4 py-3 text-sm text-stone-900 focus:border-stone-900 focus:outline-none transition-colors"
          required
        >
          <option value="">Select country</option>
          {locationsData.countries.map((c) => (
            <option key={c.code} value={c.code}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* State selector — shown only for Nigeria */}
      {showStateSelect ? (
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium tracking-widest uppercase text-stone-500">
            State
          </label>
          <select
            value={value.state}
            onChange={(e) => handleField("state", e.target.value)}
            className="w-full border border-stone-200 bg-white px-4 py-3 text-sm text-stone-900 focus:border-stone-900 focus:outline-none transition-colors"
            required
          >
            <option value="">Select state</option>
            {locationsData.nigeriaStates.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <Input
          label="State / Region"
          placeholder="State or region"
          value={value.state}
          onChange={(e) => handleField("state", e.target.value)}
        />
      )}
    </div>
  );
}
