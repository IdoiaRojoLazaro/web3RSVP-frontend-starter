import React from 'react'

export const Error = ({ message }: { message?: string }) => {
  return (
    <div className="text-center">
      <svg className="m-auto" xmlns="http://www.w3.org/2000/svg" width="192" height="192" fill="#292929" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><path d="M208,152a80,80,0,0,1-160,0C48,88,96,24,128,24S208,88,208,152Z" fill="none" stroke="#292929" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12"></path><polyline points="151.4 150 158.6 112.9 129.8 101.7 172.7 53.9" fill="none" stroke="#292929" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12"></polyline></svg>
      <p>An error has occurred! Please contact the administrator</p>
      {message &&
        <p>Error message: {message}</p>
      }
    </div>
  )
}
