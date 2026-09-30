"use client";

import { useEffect } from "react";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import {
  countries,
  getCitiesForState,
  isNigeria,
  nigeriaStates,
} from "@/data/locations";

export interface DeliveryFormValues {
  phone: string;
  address: string;
  country: string;
  state: string;
  city: string;
}

interface DeliveryLocationFieldsProps {
  register: UseFormRegister<DeliveryFormValues>;
  control: Control<DeliveryFormValues>;
  watch: UseFormWatch<DeliveryFormValues>;
  setValue: UseFormSetValue<DeliveryFormValues>;
  errors: FieldErrors<DeliveryFormValues>;
}

export default function DeliveryLocationFields({
  register,
  control,
  watch,
  setValue,
  errors,
}: DeliveryLocationFieldsProps) {
  const country = watch("country");
  const state = watch("state");
  const nigeriaSelected = isNigeria(country);
  const cities = nigeriaSelected && state ? getCitiesForState(state) : [];

  useEffect(() => {
    if (!nigeriaSelected) {
      setValue("state", "");
      setValue("city", "");
    }
  }, [nigeriaSelected, setValue]);

  useEffect(() => {
    setValue("city", "");
  }, [state, setValue]);

  return (
    <div className="space-y-4">
      <div>
        <label className="mb-1.5 block text-sm font-medium">Phone number *</label>
        <input
          type="tel"
          className="input-field"
          placeholder="+234 800 000 0000"
          {...register("phone", {
            required: "Phone number is required",
            minLength: { value: 10, message: "Enter a valid phone number" },
          })}
        />
        {errors.phone && (
          <p className="mt-1 text-xs text-danger">{errors.phone.message}</p>
        )}
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium">Street address *</label>
        <input
          type="text"
          className="input-field"
          placeholder="House number, street, landmark"
          {...register("address", {
            required: "Street address is required",
            minLength: { value: 5, message: "Enter a fuller street address" },
          })}
        />
        {errors.address && (
          <p className="mt-1 text-xs text-danger">{errors.address.message}</p>
        )}
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium">Country *</label>
        <Controller
          name="country"
          control={control}
          rules={{ required: "Select a country" }}
          render={({ field }) => (
            <select {...field} className="input-field">
              <option value="">Select country</option>
              {countries.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.name}
                </option>
              ))}
            </select>
          )}
        />
        {errors.country && (
          <p className="mt-1 text-xs text-danger">{errors.country.message}</p>
        )}
      </div>

      {nigeriaSelected ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium">State *</label>
            <Controller
              name="state"
              control={control}
              rules={{ required: "Select a state" }}
              render={({ field }) => (
                <select {...field} className="input-field">
                  <option value="">Select state</option>
                  {nigeriaStates.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              )}
            />
            {errors.state && (
              <p className="mt-1 text-xs text-danger">{errors.state.message}</p>
            )}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium">City *</label>
            <Controller
              name="city"
              control={control}
              rules={{ required: "Select a city" }}
              render={({ field }) => (
                <select {...field} className="input-field" disabled={!state}>
                  <option value="">
                    {state ? "Select city" : "Select state first"}
                  </option>
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              )}
            />
            {errors.city && (
              <p className="mt-1 text-xs text-danger">{errors.city.message}</p>
            )}
          </div>
        </div>
      ) : country ? (
        <p className="rounded-xl border border-surface-light bg-surface-light/40 px-4 py-3 text-sm text-muted">
          We currently deliver within Nigeria. Please select Nigeria to continue
          checkout, or{" "}
          <a href="/contact" className="text-accent hover:underline">
            contact us
          </a>{" "}
          for other destinations.
        </p>
      ) : null}
    </div>
  );
}
