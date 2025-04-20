import React, { useRef, ChangeEvent } from "react";

interface FileUploadProps {
  label: string;
  id: string;
  name: string;
  accept?: string;
  error?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  multiple?: boolean;
  helperText?: string;
  className?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  label,
  id,
  name,
  accept = "image/*",
  error,
  onChange,
  required = false,
  multiple = false,
  helperText,
  className,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = React.useState<string>("");

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFileName(multiple ? `${files.length} files selected` : files[0].name);
    } else {
      setFileName("");
    }
    onChange(e);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`mb-4 ${className}`}>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div className="relative">
        <input
          ref={fileInputRef}
          type="file"
          id={id}
          name={name}
          accept={accept}
          onChange={handleFileChange}
          className="sr-only"
          required={required}
          multiple={multiple}
        />

        <div
          onClick={handleClick}
          className={`flex items-center justify-between px-4 py-2 border ${
            error ? "border-red-500" : "border-gray-300"
          } rounded-md cursor-pointer hover:bg-gray-50 transition-colors`}
        >
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-gray-500 text-sm truncate">
              {fileName || `Choose ${multiple ? "files" : "a file"}`}
            </span>
          </div>
          <button
            type="button"
            className="px-4 py-1 ml-2 text-xs font-medium text-[var(--strong-gray-color)] bg-[var(--main-border)]  rounded hover:bg-indigo-100 transition-colors"
            onClick={handleClick}
          >
            Browse
          </button>
        </div>
      </div>

      {helperText && !error && (
        <p className="mt-1 text-xs text-gray-500">{helperText}</p>
      )}

      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default FileUpload;
