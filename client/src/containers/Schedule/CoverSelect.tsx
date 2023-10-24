import { useFormikContext } from "formik";
import { ChangeEvent, useRef } from "react";
import { Typography, Image } from "../../components";

const CoverSelect = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { values, setFieldValue } = useFormikContext<any>();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleSelectImage = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target;

    if (target.files && target.files.length > 0) {
      const selectedFile = target.files[0];
      setFieldValue("cover", selectedFile);
    }
  };

  return (
    <section>
      <Typography as="h5" className="my-4 border-b border-gray-300 pb-2">
        Cover
      </Typography>

      <div
        className="cursor-pointer w-full h-[150px] border-2 border-dashed  rounded-[5px] mb-4 flex justify-center items-center"
        onClick={() => inputRef.current?.click()}>
        {values?.cover ? (
          <Image
            className="w-full h-full object-cover"
            src={URL.createObjectURL(values?.cover)}
          />
        ) : (
          <Typography as="h6">Please Select a Cover Page</Typography>
        )}
        <input
          ref={inputRef}
          type="file"
          className="w-full h-full hidden"
          onChange={handleSelectImage}
        />
      </div>
    </section>
  );
};

export default CoverSelect;
