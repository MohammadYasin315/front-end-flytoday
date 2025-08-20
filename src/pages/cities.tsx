import { useState } from "react";
import Header from "@/components/Layout/header";
import Footer from "@/components/Layout/footer";
import MainResults from "@/components/hotelResults/MainResults";
import RecentSearchItem from "@/components/hotelResults/RecentSearchItem";
import SearchBar from "@/components/HomePage/SearchBar/SearchPanel/SearchBar"; // مسیر صحیح به کامپوننت SearchBar
import { useRouter } from "next/router";

export default function Cities() {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const router = useRouter();

  const handleModifySearch = () => {
    setShowSearchBar(true);
  };

  const handleSearch = (searchData: any) => {
    setShowSearchBar(false);
  };

  return (
    <>
      <Header />
      {showSearchBar ? (
        <SearchBar onSearch={handleSearch} />
      ) : (
        <RecentSearchItem onModifySearch={handleModifySearch} />
      )}
      <link rel="icon" href="/favicon.ico" />
      <MainResults />
      <Footer />
    </>
  );
}
