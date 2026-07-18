import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["pl", "ua", "ru"],
  defaultLocale: "ru",
});

export type Locale = (typeof routing.locales)[number];
