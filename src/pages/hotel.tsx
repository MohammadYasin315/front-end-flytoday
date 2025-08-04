import Header from '@/components/Layout/header'
import Footer from '@/components/Layout/footer'
import AppDownload from '@/components/HomePage/AppDownload'
import HeroSection from '@/components/HomePage/HeroSection'
import CityPreview from '@/components/HomePage/CityPreview'
import FaqAccordion from '@/components/HomePage/FaqAccordion'
import HotelBookingIntro from '@/components/HomePage/HotelBookingIntro'
import HotelSearchBar from '@/components/HomePage/SearchBar/HotelSearchBar'

export default function Home() {
  return (
    <><Header />
      <link rel="icon" href="/favicon.ico" />
      <HotelSearchBar/>
      <HeroSection/>
      <CityPreview/>
      <HotelBookingIntro />
      <AppDownload />
      <FaqAccordion />
    <Footer /></>
  )
}