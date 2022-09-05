import React, { useRef } from "react";
import { useState } from "react";
import { TrashIcon } from "@heroicons/react/outline";

const DragAndDropComp = ({ setFile }) => {
  const [dragOver, setDragOver] = useState(false);
  const [data, setData] = useState<any>(null);
  const [err, setErr] = useState<string | false>(false);
  const fileRefInput = useRef<HTMLInputElement>();

  const handleDrag = (e, over) => {
    e.preventDefault();
    setDragOver(over ? true : false);
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    fileRefInput.current.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.currentTarget?.files[0]);
    setData(URL.createObjectURL(e.target?.files[0]));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const {
      dataTransfer: { files },
    } = e;
    const { length } = files;
    const reader = new FileReader();
    if (length === 0) {
      return false;
    }
    const fileTypes = ["image/jpeg", "image/jpg", "image/png"];
    const { size, type } = files[0];
    setData(null);
    // Limit to either image/jpeg, image/jpg or image/png file
    console.log(type);
    console.log(fileTypes);
    if (!fileTypes.includes(type)) {
      setErr("File format must be either png or jpg");
      return false;
    }
    // Check file size to ensure it is less than 2MB.
    console.log(size);
    if (size / 1024 / 1024 > 2) {
      setErr("File size exceeded the limit of 2MB");
      return false;
    }
    setErr(false);

    reader.readAsDataURL(files[0]);
    setFile(files[0]);
    reader.onload = (loadEvt) => {
      setData(loadEvt.target?.result);
    };
  };

  return (
    <>
      <div
        onDragOver={(e) => handleDrag(e, true)}
        onDragLeave={(e) => handleDrag(e, false)}
        onDrop={handleDrop}
        className={`relative group text-center 
        border border-dashed rounded-md border-antiqueBlue-300 
        group cursor-pointer min-h-full flex items-center justify-center
        focus:outline-none focus:shadow-outline
        
        ${dragOver ? "border-antiqueBlue-500 bg-antiqueBlue-100" : ""}
        `}
      >
        <input type="file" hidden />
        <input
          type="file"
          autoComplete="off"
          accept=".jpg, .jpeg, .png, .gif"
          onChange={handleFileChange}
          // style={{ display: "none" }}
          hidden
          ref={fileRefInput}
        />
        {data !== null && (
          <>
            <img
              className="w-auto min-h-full h-auto group flex"
              src={data?.toString()}
              alt="image"
            />
            <button
              className="absolute 
              opacity-0 w-8 p-1 text-antiqueBlue-100 rounded-full bg-antiqueBlue-800 bg-opacity-70 hover:ring-transparent m-auto group-hover:opacity-100
              transition-all"
              onClick={() => setData(null)}
            >
              <TrashIcon fontSize={14} />
            </button>
          </>
        )}
        {data === null && (
          <>
            <div
              className="flex flex-col items-center justify-center space-x-2 h-20"
              onClick={(e) => handleClick(e)}
            >
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <p className="ml-2 font-medium text-gray-600">
                  Drop files to Attach, or{" "}
                  <span className="text-blue-600 underline">browse</span>
                </p>
              </div>
              <span className="block text-xs">Jpg, jpeg, png, gif max 2mb</span>
            </div>
          </>
        )}
        {data !== null && (
          <div>
            {/* <button className="" onClick={() => uploadImage()}>
              Upload Image
            </button> */}
          </div>
        )}
      </div>
      {err && <p>Unable to upload image. {err || ""}</p>}
    </>
  );
};

export default DragAndDropComp;
