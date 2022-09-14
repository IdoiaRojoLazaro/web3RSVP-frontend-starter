import { MAIN_CHAIN } from '../constants';

export function checkNetwork(currentChain: number) {
  return currentChain === MAIN_CHAIN.id
}