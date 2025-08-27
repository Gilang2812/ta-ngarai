import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImageResize from "filepond-plugin-image-resize";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { ErrorMessage, useFormikContext } from "formik";
import { ComponentProps } from "react";
registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImageResize,
  FilePondPluginImagePreview
);

interface FormValues {
  images?: File[];
  [key: string]: File[] | undefined;
}

type Props = {
  name?: string;
  label?: string;
};

const FilePondComponent = ({
  name = "images",
  label = "Images",
  allowMultiple = true,
  acceptedFileTypes = ["image/*"],
  ...props
}: Props & ComponentProps<typeof FilePond>) => {
  const { setFieldValue, values, setFieldError } =
    useFormikContext<FormValues>();

  return (
    values[name] && (
      <>
        <div className="form-groupsa  ">
          <p>{label}</p>
          <FilePond
            files={values[name] || []}
            acceptedFileTypes={acceptedFileTypes}
            onupdatefiles={(fileItems) => {
              const files = fileItems?.map((fileItem) => fileItem.file);
              setFieldValue(name, files);
            }}
            onaddfile={(error, file) => {
              if (
                acceptedFileTypes[0].startsWith("video/") &&
                !file?.fileType?.startsWith("video/")
              ) {
                file?.setMetadata("error", "Hanya file video yang diizinkan");
                file?.abortProcessing();
                return false; // batalkan
              }
            }}
            allowMultiple={allowMultiple}
            maxFiles={5}
            imageResizeTargetWidth={1024}
            instantUpload={false}
            allowProcess={true}
            forceRevert={true}
            allowRevert={true}
            server={null}
  
            imageResizeMode="contain"
            credits={false}
            imagePreviewTransparencyIndicator="grid"
            name={name}
            labelIdle={`Seret & Lepaskan gambar atau <span class="filepond--label-action">Cari</span>`}
            onerror={(error) => setFieldError(name, error.body)}
            {...props}
          />
        </div>
        <ErrorMessage
          name={name}
          component="p"
          className="text-red-500 font-bold text-sm"
        />
      </>
    )
  );
};
export default FilePondComponent;
