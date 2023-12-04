interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  return totalPages > 0 ? (
    <div className='flex justify-center items-center space-x-2'>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 text-sm font-medium leading-5 rounded-md ${
          currentPage === 1
            ? 'cursor-not-allowed opacity-50'
            : 'bg-primary text-white'
        }`}
      >
        Anterior
      </button>
      <span>
        Página {currentPage} de {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 text-sm font-medium leading-5 rounded-md ${
          currentPage === totalPages
            ? 'cursor-not-allowed opacity-50'
            : 'bg-primary text-white'
        }`}
      >
        Siguiente
      </button>
    </div>
  ) : (
    <>
      <span>No hay citas pendientes</span>
    </>
  )
}
