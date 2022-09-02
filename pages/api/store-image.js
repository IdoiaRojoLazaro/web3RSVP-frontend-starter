import { Web3Storage, File, getFilesFromPath } from "web3.storage";
const { resolve } = require("path");

export default async function handler(req, res) {
  if (req.method === "POST") {
    return await storeImage(req, res);
  } else {
    return res
      .status(405)
      .json({ message: "Method not allowed", success: false });
  }
}

async function storeImage(req, res) {
  const body = req.body;
  try {
    const fileObj = await makeFileObjects(body);
    const cid = await storeFiles(fileObj);
    return res.status(200).json({ success: true, cid: cid });
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Error creating event", success: false });
  }
}

async function makeFileObjects(file) {
  const ext = file.name.split(".").pop();
  const fileName = `${uuidv4()}.${ext}`;
  const newFile = new File([file], fileName, { type: file.type });
  return newFile;

  // const buffer = Buffer.from(JSON.stringify(body));

  // const imageDirectory = resolve(process.cwd(), `public/images/${body.image}`);
  // const files = await getFilesFromPath(imageDirectory);

  // files.push(new File([buffer], "data.json"));
  // return files;
}

function makeStorageClient() {
  return new Web3Storage({ token: process.env.WEB3STORAGE_TOKEN });
}

async function storeFiles(files) {
  const client = makeStorageClient();
  const cid = await client.put(files);
  return cid;
}
