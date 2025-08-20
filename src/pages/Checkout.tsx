import Header from "@/components/Layout/header";
import Footer from "@/components/Layout/footer";
import CheckoutMain from "@/components/CheckoutPage/CheckoutMain";
import { CheckoutProvider } from "@/components/CheckoutPage/contexts/CheckoutContext";

export default function Checkout() {
  return (
    <CheckoutProvider>
      <Header />
      <CheckoutMain />
      <Footer />
    </CheckoutProvider>
  );
}
