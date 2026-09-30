/** Ship-to countries shown in checkout. Nigeria is the primary market. */
export const countries = [
  { code: "NG", name: "Nigeria" },
  { code: "GH", name: "Ghana" },
  { code: "KE", name: "Kenya" },
  { code: "ZA", name: "South Africa" },
  { code: "US", name: "United States" },
  { code: "GB", name: "United Kingdom" },
  { code: "CA", name: "Canada" },
] as const;

export type CountryCode = (typeof countries)[number]["code"];

/** Major cities / delivery hubs per Nigerian state (incl. FCT). */
export const nigeriaStatesAndCities: Record<string, string[]> = {
  Abia: ["Aba", "Arochukwu", "Ohafia", "Umuahia", "Other"],
  Adamawa: ["Jimeta", "Mubi", "Numan", "Yola", "Other"],
  "Akwa Ibom": ["Eket", "Ikot Ekpene", "Oron", "Uyo", "Other"],
  Anambra: ["Awka", "Ekwulobia", "Nnewi", "Onitsha", "Other"],
  Bauchi: ["Azare", "Bauchi", "Jama'are", "Misau", "Other"],
  Bayelsa: ["Brass", "Nembe", "Ogbia", "Yenagoa", "Other"],
  Benue: ["Gboko", "Makurdi", "Otukpo", "Vandeikya", "Other"],
  Borno: ["Biu", "Maiduguri", "Monguno", "Other"],
  "Cross River": ["Calabar", "Ikom", "Ogoja", "Other"],
  Delta: ["Asaba", "Sapele", "Ughelli", "Warri", "Other"],
  Ebonyi: ["Abakaliki", "Afikpo", "Onueke", "Other"],
  Edo: ["Auchi", "Benin City", "Ekpoma", "Other"],
  Ekiti: ["Ado-Ekiti", "Ikere-Ekiti", "Oye", "Other"],
  Enugu: ["Enugu", "Nsukka", "Oji River", "Other"],
  FCT: ["Abuja", "Gwagwalada", "Kuje", "Kwali", "Other"],
  Gombe: ["Billiri", "Gombe", "Kaltungo", "Other"],
  Imo: ["Owerri", "Okigwe", "Orlu", "Other"],
  Jigawa: ["Dutse", "Gumel", "Hadejia", "Other"],
  Kaduna: ["Kaduna", "Kafanchan", "Zaria", "Other"],
  Kano: ["Kano", "Wudil", "Other"],
  Katsina: ["Daura", "Funtua", "Katsina", "Other"],
  Kebbi: ["Argungu", "Birnin Kebbi", "Yauri", "Other"],
  Kogi: ["Anyigba", "Idah", "Lokoja", "Okene", "Other"],
  Kwara: ["Ilorin", "Offa", "Other"],
  Lagos: [
    "Agege",
    "Ajah",
    "Alimosho",
    "Apapa",
    "Badagry",
    "Epe",
    "Festac",
    "Ikeja",
    "Ikorodu",
    "Lagos Island",
    "Lekki",
    "Mushin",
    "Surulere",
    "Victoria Island",
    "Yaba",
    "Other",
  ],
  Nasarawa: ["Keffi", "Lafia", "Nasarawa", "Other"],
  Niger: ["Bida", "Minna", "Suleja", "Other"],
  Ogun: ["Abeokuta", "Ijebu Ode", "Sagamu", "Sango Ota", "Other"],
  Ondo: ["Akure", "Ondo", "Owo", "Other"],
  Osun: ["Ile-Ife", "Ilesa", "Osogbo", "Other"],
  Oyo: ["Ibadan", "Ogbomosho", "Oyo", "Other"],
  Plateau: ["Jos", "Pankshin", "Other"],
  Rivers: ["Bonny", "Eleme", "Port Harcourt", "Other"],
  Sokoto: ["Sokoto", "Tambuwal", "Other"],
  Taraba: ["Jalingo", "Wukari", "Other"],
  Yobe: ["Damaturu", "Potiskum", "Other"],
  Zamfara: ["Gusau", "Kaura Namoda", "Other"],
};

export const nigeriaStates = Object.keys(nigeriaStatesAndCities).sort((a, b) =>
  a.localeCompare(b)
);

export function getCitiesForState(state: string): string[] {
  return nigeriaStatesAndCities[state] ?? [];
}

export function isNigeria(countryCode: string): boolean {
  return countryCode === "NG";
}
