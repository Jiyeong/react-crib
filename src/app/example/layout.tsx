import { ReactNode } from "react";
import '@/app/ui/example.scss'
// import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap')
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
export default function ExLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <main>
        <div id="wrap" className="wrap">
          <Header />
          <div>
            {children}
          </div>
          <Footer />
        </div>
      </main>
    </>
  );
}