import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
import Navbar from "../../components/navbar/Navbar";
export const metadata = {
  title: "TPM ecommerce website",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}
