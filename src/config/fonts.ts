import { Poppins } from "next/font/google";

export const poppins = Poppins({
  subsets: ["latin"], // Choose subsets as per your requirement
  weight: ["400", "500", "700"], // Add the font weights you need
  style: ["normal", "italic"], // Add styles (e.g., normal, italic)
  display: "swap", // Control font loading behavior
});
