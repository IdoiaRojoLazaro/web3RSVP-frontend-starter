import React from 'react'

export const WarningSvg = () => {
  const color = "#BF8D9A";
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="192" fill={color} height="192" viewBox="0 0 256 256" className="m-auto">
      <rect width="256" height="256" fill="none"></rect>
      <line x1="128" y1="104" x2="128" y2="144" fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="12"></line>
      <path d="M114.2,40l-88,152A16,16,0,0,0,40,216H216a16,16,0,0,0,13.8-24l-88-152A15.9,15.9,0,0,0,114.2,40Z" fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="12"></path>
      <circle cx="128" cy="180" r="10"></circle>
    </svg>
  )
}
