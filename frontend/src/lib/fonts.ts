import { Commissioner, Ephesis, Manrope } from "next/font/google";

const commissioner = Commissioner({
  variable: "--font-сommissioner",
  subsets: ["cyrillic", "latin", "latin-ext"],
});

const ephesis = Ephesis({
  variable: "--font-ephesis",
  subsets: ["latin"],
  weight: "400",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["cyrillic", "latin", "latin-ext"],
});

export { commissioner, ephesis, manrope };
