import Image from "next/image"
import { Star, ShoppingCart } from "lucide-react"

interface ProductCardProps {
  image: string
  title: string
  price: string
  seller: string
  rating?: number
  buttonType: "add-to-cart" | "read-more" | "buy-product"
}

export function ProductCard({ image, title, price, seller, rating = 0, buttonType }: ProductCardProps) {
  const renderButton = () => {
    switch (buttonType) {
      case "add-to-cart":
        return (
          <button className="w-full bg-[#d35a5a] text-white font-bold py-2.5 px-4 rounded-md hover:bg-[#c04a4a] transition-colors flex items-center justify-center gap-2 text-sm">
            <ShoppingCart className="w-4 h-4" />
            ADD TO CART
          </button>
        )
      case "read-more":
        return (
          <button className="w-full bg-[#d35a5a] text-white font-bold py-2.5 px-4 rounded-md hover:bg-[#c04a4a] transition-colors text-sm">
            READ MORE
          </button>
        )
      case "buy-product":
        return (
          <button className="w-full bg-[#d35a5a] text-white font-bold py-2.5 px-4 rounded-md hover:bg-[#c04a4a] transition-colors text-sm">
            BUY PRODUCT
          </button>
        )
    }
  }

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md h-full flex flex-col group transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="relative aspect-square w-full">
        <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
        <div className="absolute top-2 right-2 w-7 h-7 rounded-full bg-yellow-400/80 flex items-center justify-center shadow-lg">
          <span className="text-yellow-900 text-xs font-bold drop-shadow-sm">R</span>
        </div>
      </div>
      <div className="p-4 text-center flex-grow flex flex-col justify-between text-gray-800">
        <div>
          <h3 className="font-bold text-base leading-tight mb-2 text-gray-900">{title}</h3>
          <div className="flex justify-center items-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-4 h-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
            ))}
          </div>
          <p className="text-sm text-gray-600 mb-1">{price}</p>
          <p className="text-xs text-gray-500 mb-4">
            Sold by <span className="font-semibold text-primary-accent">{seller}</span>
          </p>
        </div>
        <div className="mt-auto">{renderButton()}</div>
      </div>
    </div>
  )
}
