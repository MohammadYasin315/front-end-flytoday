import Header from '@/components/Layout/header'
import Footer from '@/components/Layout/footer'
import MainRooms from '@/components/HotelRoom/MainRoom'

export default function rooms() {
  return (
    <><Header />
      <link rel="icon" href="/favicon.ico" />
      <MainRooms/>
    <Footer /></>
  )
}