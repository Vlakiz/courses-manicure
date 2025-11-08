import { Commissioner, Ephesis } from "next/font/google";

const сommissioner = Commissioner({
  variable: "--font-сommissioner",
  subsets: ["cyrillic"],
});

const ephesis = Ephesis({
  variable: "--font-ephesis",
  subsets: ["latin"],
  weight: "400",
});

export { сommissioner, ephesis };