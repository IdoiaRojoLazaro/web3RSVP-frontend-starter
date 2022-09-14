import { useWagmi } from '../useWagmiStore'

export function useNetwork() {
  const { networkData } = useWagmi()
  return {
    networkData,
  }
}

export default useNetwork