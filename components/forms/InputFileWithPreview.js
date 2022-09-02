import { PencilIcon, UploadIcon } from "@heroicons/react/outline";
import React from "react";
import Button from "../shared/Button";

export const InputFileWithPreview = ({
  uploadFile,
  fileRefInput,
  setSelectedFile,
  setUploadFile,
  extensionsAccepted,
  value,
  ...rest
}) => {
  const [data, setData] = useState(null);
  const [err, setErr] = useState(false);
  const [file, setFile] = useState(null);

  const handleClick = (e) => {
    e.preventDefault();
    fileRefInput.current.click();
  };

  const handleFileChange = (e, file) => {
    file ? setSelectedFile(e.currentTarget?.files[0]) : setSelectedFile(null);

    setUploadFile(file ? URL.createObjectURL(e.target?.files[0]) : null);
    if (!file) {
      fileRefInput.current.value = "";
      fileRefInput.current.click();
    }
  };

  const onDrop = (e) => {
    e.preventDefault();
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
    if (!fileTypes.includes(type)) {
      setErr("File format must be either png or jpg");
      return false;
    }
    // Check file size to ensure it is less than 2MB.
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
    <div
      className="text-center border border-dashed rounded-md border-antiqueBlue-300 group cursor-pointer"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => onDrop(e)}
    >
      <Button
        className={`text-center hover:ring-0 ${uploadFile ? "hidden" : "show"}`}
        onClick={handleClick}
      >
        <UploadIcon className="text-antiqueBlue-700 group-hover:text-antiqueBlue-900 w-10 m-auto" />{" "}
        <p className="text-antiqueBlue-700 group-hover:text-antiqueBlue-900">
          Upload a file
        </p>
      </Button>
      <input
        type="file"
        {...rest}
        autoComplete="off"
        accept={extensionsAccepted}
        onChange={(e) => handleFileChange(e, true)}
        style={{ display: "none" }}
        ref={fileRefInput}
      />
      {err && <p>Unable to upload image</p>}
      {uploadFile && (
        <>
          <div
            className="w-full h-60 group flex"
            style={{
              backgroundImage: `url(${uploadFile})`,
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
            }}
          >
            <Button
              onClick={(e) => handleFileChange(e, false)}
              id="edit-file"
              className="opacity-0 text-antiqueBlue-800 w-10 rounded-full bg-antiqueBlue-200 bg-opacity-70 hover:ring-transparent m-auto group-hover:opacity-100"
            >
              <PencilIcon size={16} />
            </Button>
          </div>
        </>
      )}
    </div>
  );
};
