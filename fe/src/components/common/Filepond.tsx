import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImageResize from "filepond-plugin-image-resize";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { ErrorMessage, useFormikContext } from "formik";
registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImageResize,
  FilePondPluginImagePreview
);

interface FormValues {
  images?: File[];
}

const FilePondComponent = () => {
  const { setFieldValue, values, setFieldError } =
    useFormikContext<FormValues>();
  return (
    <>
      <div className="form-groupsa  ">
        <p>Gambar</p>
        <FilePond
          files={values.images || []}
          onupdatefiles={(fileItems) => {
            const files = fileItems.map((fileItem) => fileItem.file);
            setFieldValue("images", files);
          }}
          allowMultiple={true}
          maxFiles={5}
          imageResizeTargetWidth={1024}
          instantUpload={false}
          allowProcess={true}
          forceRevert={true}
          allowRevert={true}
          imageResizeMode="contain"
          credits={false}
          imagePreviewTransparencyIndicator="grid"
          name="images"
          labelIdle='Seret & Lepaskan gambar atau <span class="filepond--label-action">Cari</span>'
          onerror={(error) => setFieldError("images", error.body)}
        />
      </div>
      <ErrorMessage
        name="images"
        component="p"
        className="text-red-500 font-bold text-sm"
      />
    </>
  );
};
export default FilePondComponent;
