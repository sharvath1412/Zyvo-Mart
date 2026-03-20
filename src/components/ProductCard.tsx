'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Product } from '@/types'
import { useCart } from '@/context/CartContext'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()

  const imageSrc =
    product?.image && product.image.startsWith('http')
      ? product.image
      : '/placeholder.png'

  return (
    <div className="group relative overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-lg">
      
      {/* Image Section */}
      <Link href={`/products/${product._id}`}>
  <div className="relative aspect-[4/3] overflow-hidden">
    <Image
      src={
        product?.image && product.image.startsWith('http')
          ? product.image
          : '/placeholder.png'
      }
      alt={product?.name ?? 'Product'}
      fill
      sizes="(max-width: 768px) 100vw,
             (max-width: 1200px) 50vw,
             25vw"
      className="object-cover transition-transform group-hover:scale-105"
    />

    <span className="absolute left-2 top-2 rounded-full bg-primary px-2 py-1 text-xs font-medium text-white">
      {product?.category || 'Category'}
    </span>
  </div>
</Link>


      {/* Content Section */}
      <div className="p-4">
        <Link href={`/products/${product._id}`}>
          <h3 className="line-clamp-2 text-lg font-semibold text-gray-900 hover:text-secondary">
            {product?.name || 'Product Name'}
          </h3>
        </Link>

        <p className="mt-1 text-sm text-gray-500">
          {product?.stock > 0 ? 'In Stock' : 'Out of Stock'}
        </p>

        <div className="mt-2 flex items-center justify-between">
          <span className="text-xl font-bold text-secondary">
            ${Number(product?.price || 0).toFixed(2)}
          </span>
        </div>

        <button
          onClick={() => addItem(product)}
          disabled={!product?.stock || product.stock === 0}
          className="mt-3 w-full rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
}