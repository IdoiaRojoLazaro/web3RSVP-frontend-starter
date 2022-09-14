import React from 'react'
import { useState } from 'react';
import { switchNetwork } from '@wagmi/core';
import { useAccount, useConnect, useNetwork, } from 'wagmi';
import { MAIN_CHAIN } from '../constants';
// import useNetwork from '@hooks/useNetwork'
import { useWalletCxt } from '../providers/WagmiProvider'
import Button from './shared/Button'

export const NetworkBanner = () => {
  const [loading, setLoading] = useState(false);

  const handleChangeNetwork = async () => {
    setLoading(true);
    try {
      await switchNetwork({ chainId: MAIN_CHAIN.id })
      //setChangingNetwork(false)
    } catch (e) {
      //setChangingNetwork(false)
      console.error(e)
      //@ts-ignore
      // toast().create({
      //   type: 'error',
      //   title: `Something went wrong and your network couldn't be switched. Please try again.`,
      // })
    }
    setLoading(false);
  }

  return (
    <div className="flex fixed z-40 gap-8 justify-center items-center py-3 px-4 w-full bg-mauveTaupe-500 border border-b border-mauveTaupe-500 shadow-lg sm:items-center dark:border-gray-700 lg:py-4 dark:bg-gray-800">
      <p className="text-sm font-light text-white dark:text-gray-400">Please connect to <span className="font-extrabold border-b-2">Polygon Mumbai network</span> to interact with the platform.</p>
      {/* <p>{network.chain?.id}</p> */}
      <Button type="button" className="bg-antiqueBlue-50" onClick={() => handleChangeNetwork()} disabled={loading}>Switch network</Button>
    </div>
  )
}
