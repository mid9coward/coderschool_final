import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { FC, useCallback, useState } from "react";
import { TbPhotoPlus } from "react-icons/tb";

declare global {
  var cloudinary: any;
}

const uploadPreset = "kx3fv3hy";

// Define a default image URL (replace with your actual default image URL)
const defaultImageUrl = "/images/logo.png"; // Change this to your default image path

type Props = {
  onChange: (value: string) => void;
  value: string;
};

const ImageUpload: FC<Props> = ({ onChange, value }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url);
      setIsLoading(false); // End loading when upload is finished
    },
    [onChange]
  );

  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset={uploadPreset}
      options={{
        maxFiles: 1,
      }}
    >
      {({ open }) => {
        return (
          <div
            onClick={() => {
              setIsLoading(true); // Show loading when upload starts
              open?.();
            }}
            className="relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-20 border-neutral-300 flex flex-col
              justify-center items-center gap-4 text-neutral-600 "
          >
            {isLoading ? (
              <div className="text-xl">Uploading...</div> // Loading state message
            ) : (
              <>
                <TbPhotoPlus size={50} />
                <div className="font-semibold text-lg">Click to upload</div>
              </>
            )}
            {/* Render the uploaded image or the default image */}
            <div className="absolute inset-0 w-full h-full">
              <Image
                fill
                style={{ objectFit: "cover" }}
                src={value || defaultImageUrl} // If no image, use the default image
                alt="Uploaded Image"
              />
            </div>
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;
