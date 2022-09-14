import React from 'react'

export const LoadingEvents = () => {
  return (
    <div className="grid gap-8 grid-cols-1 md:grid-cols-4 animate-appear">
      {[...Array(8)].map((_, index) => (
        <div className="rounded col-span-1 w-full h-52 animate-pulse bg-antiqueBlue-200" key={index} />
      ))}
    </div>
  )
}
