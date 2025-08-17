export default function Loading() {
  return (
    <div className="fixed inset-0 bg-background-end flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-primary-accent border-t-transparent rounded-full animate-spin"></div>
    </div>
  )
}
