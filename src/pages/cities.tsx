import Header from "@/components/Layout/header";
import Footer from "@/components/Layout/footer";
import MainResults from "@/components/hotelResults/MainResults";
import RecentSearchItem from "@/components/hotelResults/RecentSearchItem";

export default function Cities() {
  const handleModifySearch = () => {
    console.log("Modify search clicked!");
    // Add your search modification logic here
  };

  return(
    <>
      <Header />
      <RecentSearchItem
        location="رزرو هتل‌های تهران"
        dateRange="20 تیر - 24 تیر"
        guestInfo="1 مسافر، 1 اتاق"
        onModifySearch={handleModifySearch}
      />
      <link rel="icon" href="/favicon.ico" />
      <MainResults />
      <Footer />
    </>
  );
}