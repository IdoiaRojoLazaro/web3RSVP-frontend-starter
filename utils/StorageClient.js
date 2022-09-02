import { Web3Storage } from "web3.storage";
import {
  showMessage,
  showLink,
  jsonFile,
  getSavedToken,
  makeGatewayURL,
} from "./helpers.js";

const namePrefix = "ImageGallery";

export async function storeImage(imageFile, caption) {
  // The name for our upload includes a prefix we can use to identify our files later
  const uploadName = [namePrefix, caption].join("|");

  // We store some metadata about the image alongside the image file.
  // The metadata includes the file path, which we can use to generate
  // a URL to the full image.
  const metadataFile = jsonFile("metadata.json", {
    path: imageFile.name,
    caption,
  });

  // const token = getSavedToken();
  // if (!token) {
  //   console.log(
  //     "> ❗️ no API token found for Web3.Storage. You can add one in the settings page!"
  //   );
  //   showMessage(
  //     "> ❗️ no API token found for Web3.Storage. You can add one in the settings page!"
  //   );
  //   showLink(`${location.protocol}//${location.host}/settings.html`);
  //   return;
  // }
  // const web3storage = new Web3Storage({ token });
  console.log(process.env.NEXT_PUBLIC_WEB3STORAGE_TOKEN);
  const web3storage = new Web3Storage({
    token: process.env.NEXT_PUBLIC_WEB3STORAGE_TOKEN,
  });
  showMessage(`> 🤖 calculating content ID for ${imageFile.name}`);
  console.log(`> 🤖 calculating content ID for ${imageFile.name}`);
  const cid = await web3storage.put([imageFile, metadataFile], {
    // the name is viewable at https://web3.storage/files and is included in the status and list API responses
    name: uploadName,

    // onRootCidReady will be called as soon as we've calculated the Content ID locally, before uploading
    onRootCidReady: (localCid) => {
      showMessage(`> 🔑 locally calculated Content ID: ${localCid} `);
      showMessage("> 📡 sending files to web3.storage ");
    },

    // onStoredChunk is called after each chunk of data is uploaded
    onStoredChunk: (bytes) =>
      showMessage(`> 🛰 sent ${bytes.toLocaleString()} bytes to web3.storage`),
  });

  const metadataGatewayURL = makeGatewayURL(cid, "metadata.json");
  const imageGatewayURL = makeGatewayURL(cid, imageFile.name);
  const imageURI = `ipfs://${cid}/${imageFile.name}`;
  const metadataURI = `ipfs://${cid}/metadata.json`;
  return { cid, metadataGatewayURL, imageGatewayURL, imageURI, metadataURI };
}
