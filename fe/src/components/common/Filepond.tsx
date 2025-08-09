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
  ...props
}: Props & ComponentProps<typeof FilePond>) => {
  console.log(name);
  const { setFieldValue, values, setFieldError } =
    useFormikContext<FormValues>();
  return (
    <>
      <div className="form-groupsa  ">
        <p>{label}</p>
        <FilePond
          files={values[name] || []}
          acceptedFileTypes={["image/*"]}
          onupdatefiles={(fileItems) => {
            const files = fileItems.map((fileItem) => fileItem.file);
            setFieldValue(name, files);
          }}
          allowMultiple={allowMultiple}
          maxFiles={5}
          imageResizeTargetWidth={1024}
          instantUpload={false}
          allowProcess={true}
          forceRevert={true}
          allowRevert={true}
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
  );
};
export default FilePondComponent;
