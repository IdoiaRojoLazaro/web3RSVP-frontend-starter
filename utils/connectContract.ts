import abiJSON from "./Web3RSVP.json";
import { ethers } from "ethers";

function connectContract() {
  const contractAddress = "0x6141aed1Cb002cfD27E726d9cFc4673462AD4CaC";
  const contractABI = abiJSON.abi;
  let rsvpContract;
  try {
    const { ethereum } = window;

    if (ethereum.chainId === "0x13881") {
      //checking for eth object in the window, see if they have wallet connected to Mumbai network
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      rsvpContract = new ethers.Contract(contractAddress, contractABI, signer); // instantiating new connection to the contract
    } else {
      throw new Error("Please connect to the Polygon Mumbai network.");
    }
  } catch (error) {
    console.log("ERROR:", error);
  }
  return rsvpContract;
}

export default connectContract;
