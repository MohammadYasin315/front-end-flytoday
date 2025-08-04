import { useState, useEffect } from "react"
import clsx from "clsx"
import styles from "./City-Preview.module.css"

interface CityData {
  id: string
  name: string
  image: string
  link: string
}

const cityData: CityData[] = [
  {
    id: "mashhad",
    name: "هتل مشهد",
    image:
      "https://cdn-a.cdnfl2.ir/upload/flytoday/upload/ticket/96374eb7-4484-4215-983a-1e534cc9070f-%D9%85%D8%B4%D9%87%D8%AF2.jpg?width=600",
    link: "https://www.flytoday.ir/hotel/%D9%87%D8%AA%D9%84-%D9%87%D8%A7%DB%8C-%D9%85%D8%B4%D9%87%D8%AF",
  },
  {
    id: "kish",
    name: "هتل کیش",
    image:
      "https://cdn-a.cdnfl2.ir/upload/flytoday/upload/ticket/d1568e06-84b4-4e35-82f7-6b13dbfcccc0-kish3.jpg?width=600",
    link: "https://www.flytoday.ir/hotel/%D9%87%D8%AA%D9%84-%D9%87%D8%A7%DB%8C-%DA%A9%DB%8C%D8%B4",
  },
  {
    id: "tehran",
    name: "هتل تهران",
    image:
      "https://cdn-a.cdnfl2.ir/upload/flytoday/upload/ticket/a07f1215-d05c-4675-90b9-21c3238c0ef7-%D8%AA%D9%87%D8%B1%D8%A7%D9%862.jpg?width=600",
    link: "https://www.flytoday.ir/hotel/%D9%87%D8%AA%D9%84-%D9%87%D8%A7%DB%8C-%D8%AA%D9%87%D8%B1%D8%A7%D9%86",
  },
  {
    id: "shiraz",
    name: "هتل شیراز",
    image:
      "https://cdn-a.cdnfl2.ir/upload/flytoday/upload/ticket/abcb69fc-2631-41bc-9532-502ce41561bb-%D8%B4%DB%8C%D8%B1%D8%A7%D8%B2.jpg?width=600",
    link: "https://www.flytoday.ir/hotel/%D9%87%D8%AA%D9%84-%D9%87%D8%A7%DB%8C-%D8%B4%DB%8C%D8%B1%D8%A7%D8%B2",
  },
  {
    id: "isfahan",
    name: "هتل اصفهان",
    image:
      "https://cdn-a.cdnfl2.ir/upload/flytoday/upload/ticket/a8a4a0af-48ef-4d83-8ea9-7998bbb02a83-%D8%A7%D8%B5%D9%81%D9%87%D8%A7%D9%86.jpg?width=600",
    link: "https://www.flytoday.ir/hotel/%D9%87%D8%AA%D9%84-%D9%87%D8%A7%DB%8C-%D8%A7%D8%B5%D9%81%D9%87%D8%A7%D9%86",
  },
  {
    id: "qeshm",
    name: "هتل قشم",
    image:
      "https://cdn-a.cdnfl2.ir/upload/flytoday/upload/ticket/4600b84d-a9b3-414c-b600-88a47abb8a22-qeshm2.jpg?width=600",
    link: "https://www.flytoday.ir/hotel/%D9%87%D8%AA%D9%84-%D9%87%D8%A7%DB%8C-%D9%82%D8%B4%D9%85",
  },
  {
    id: "tabriz",
    name: "هتل تبریز",
    image:
      "https://cdn-a.cdnfl2.ir/upload/flytoday/upload/ticket/ec5e2847-b309-4c00-aef3-6ef186fae112-%D8%AA%D8%A8%D8%B1%DB%8C%D8%B2.jpg?width=600",
    link: "https://www.flytoday.ir/hotel/%D9%87%D8%AA%D9%84-%D9%87%D8%A7%DB%8C-%D8%AA%D8%A8%D8%B1%DB%8C%D8%B2",
  },
  {
    id: "ramsar",
    name: "هتل رامسر",
    image:
      "https://cdn-a.cdnfl2.ir/upload/flytoday/upload/ticket/09279a4d-fb3c-44cf-8fc5-bd1f7238165d-%D8%B1%D8%A7%D9%85%D8%B3%D8%B11.jpg?width=600",
    link: "https://www.flytoday.ir/hotel/%D9%87%D8%AA%D9%84-%D9%87%D8%A7%DB%8C-%D8%B1%D8%A7%D9%85%D8%B3%D8%B1",
  },
  {
    id: "rasht",
    name: "هتل رشت",
    image:
      "https://cdn-a.cdnfl2.ir/upload/flytoday/upload/ticket/5356ca27-2727-4a82-8b72-cbbac191fd19-%D8%B1%D8%B4%D8%AA.jpg?width=600",
    link: "https://www.flytoday.ir/hotel/%D9%87%D8%AA%D9%84-%D9%87%D8%A7%DB%8C-%D8%B1%D8%B4%D8%AA",
  },
  {
    id: "yazd",
    name: "هتل یزد",
    image:
      "https://cdn-a.cdnfl2.ir/upload/flytoday/upload/ticket/2fd60615-1241-43b3-8af7-e5c00e604102-yazd4.jpg?width=600",
    link: "https://www.flytoday.ir/hotel/%D9%87%D8%AA%D9%84-%D9%87%D8%A7%DB%8C-%DB%8C%D8%B2%D8%AF",
  },
]

// Cache for failed images to prevent re-requests
const failedImages = new Set<string>()
// console.log("🔍 failedImages now:", Array.from(failedImages))

interface CityCardProps {
  city: CityData
  priority?: boolean
}

function CityCard({ city, priority = false }: CityCardProps) {
  // console.log("🏙️ New CityCard mount:", city.id, "priority?", priority)

  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [imageSrc, setImageSrc] = useState("")
  const [loadingTimeout, setLoadingTimeout] = useState<NodeJS.Timeout | null>(null)
//   console.log("  ↪️ initial states:", {
//   imageLoaded,
//   imageError,
//   imageSrc,
//   loadingTimeout
// })

  // Reset states when component mounts or city changes
  useEffect(() => {
    // console.log("🔄 useEffect city.image fired with", city.image)
    // Check if this image has failed before
    if (failedImages.has(city.image)) {
      console.log("⚠️ image in failedImages, use fallback immediately.")
      setImageError(true)
      setImageLoaded(true)
      setImageSrc("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-f4N8YrtxjOQkGh3COWqXCFTNR1A3hx.png")
      return
    }

    setImageLoaded(false)
    setImageError(false)
    // Add timestamp to prevent caching issues only for first load
    const timestamp = new Date().getTime()
    const separator = city.image.includes("?") ? "&" : "?"
    setImageSrc(`${city.image}${separator}t=${timestamp}`)
    console.log("→ final imageSrc computed:", timestamp)

    // Set timeout for loading (10 seconds)
    const timeout = setTimeout(() => {
      console.log("⏱️ timeout triggered for", city.id)
      if (!imageLoaded && !imageError) {
        handleImageError()
      }
    }, 20000)
    setLoadingTimeout(timeout)

    return () => {
      if (timeout) {
        console.log("🧹 cleaning up useEffect for", city.id)
        clearTimeout(timeout)
      }
    }
  }, [city.image])

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (loadingTimeout) {
        clearTimeout(loadingTimeout)
      }
    }
  }, [loadingTimeout])

  const handleImageLoad = () => {
    if (loadingTimeout) {
      clearTimeout(loadingTimeout)
      setLoadingTimeout(null)
    }
    setImageLoaded(true)
    setImageError(false)
  }

  const handleImageError = () => {
    if (loadingTimeout) {
      clearTimeout(loadingTimeout)
      setLoadingTimeout(null)
    }
    // Add to failed images cache
    failedImages.add(city.image)
    setImageError(true)
    setImageLoaded(true)
    // Set the fallback image directly
    setImageSrc("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-f4N8YrtxjOQkGh3COWqXCFTNR1A3hx.png")
  }

  // Check network connectivity
  useEffect(() => {
    const handleOffline = () => {
      // When offline, if currently loading, show fallback image
      if (!imageLoaded && !imageError) {
        handleImageError()
      }
    }

    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("offline", handleOffline)
    }
  }, [imageLoaded, imageError])

  const handleCardClick = () => {
    window.open(city.link, "_blank", "noopener,noreferrer")
  }

  return (
    <div className={styles.cityCard} onClick={handleCardClick}>
      {!imageLoaded && (
        <div className={clsx(styles.cityImage, styles.imageLoading)}>
          <div className={styles.loadingDots}>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
          </div>
        </div>
      )}
      <img
        key={`${city.id}-${imageSrc}`}
        alt={city.name}
        src={imageSrc || "/placeholder.svg"}
        className={styles.cityImage}
        onLoad={handleImageLoad}
        onError={handleImageError}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        style={{
          display: imageLoaded ? "block" : "none",
        }}
      />
      <div className={styles.overlay}>
        <span className={styles.cityLink}>{city.name}</span>
      </div>
    </div>
  )
}

export default function CityPreview() {
  const [refreshKey, setRefreshKey] = useState(0)

  // Force refresh on component mount
  useEffect(() => {
    setRefreshKey(Date.now())
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.citySection}>
        <div className={styles.grid}>
          {cityData.map((city, index) => (
            <CityCard key={`${city.id}-${refreshKey}`} city={city} priority={index < 10} />
          ))}
        </div>

        <button className={styles.showMoreButton} type="button">
          <span>نمایش بیشتر</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            className={styles.arrowIcon}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
    </div>
  )
}
