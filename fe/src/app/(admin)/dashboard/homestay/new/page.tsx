import { NextPage } from 'next'

interface Props {}

const NewHomestay: NextPage<Props> = ({}) => {
  return (
    <main className="p-4">
      <form
        action="/submit-homestay"
        method="POST"
        className="grid grid-cols-1 gap-6 md:grid-cols-2"
        aria-label="New Homestay Form"
      >
        {/* Homestay Details Section */}
        <section className="p-4 bg-white rounded-md shadow-md">
          <h2 className="mb-4 text-lg font-semibold text-center">New Homestay</h2>

          <div className="mb-4">
            <label htmlFor="geojson" className="block text-sm text-black">
              GeoJSON
            </label>
            <input
              type="text"
              id="geojson"
              name="geojson"
              placeholder="GeoJSON"
              className="block w-full px-2 py-1 mt-1 border border-black rounded shadow-sm"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="homestay-name" className="block text-sm text-black">
              Homestay Name
            </label>
            <input
              type="text"
              id="homestay-name"
              name="homestay-name"
              placeholder="Homestay Name"
              className="block w-full px-2 py-1 mt-1 border border-black rounded shadow-sm"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="address" className="block text-sm text-black">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              placeholder="Address"
              className="block w-full px-2 py-1 mt-1 border border-black rounded shadow-sm"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="contact-person" className="block text-sm text-black">
              Contact Person
            </label>
            <input
              type="text"
              id="contact-person"
              name="contact-person"
              placeholder="Contact Person"
              className="block w-full px-2 py-1 mt-1 border border-black rounded shadow-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="open" className="block text-sm text-black">
                Open
              </label>
              <input
                type="time"
                id="open"
                name="open"
                className="block w-full px-2 py-1 mt-1 border border-black rounded shadow-sm"
              />
            </div>
            <div>
              <label htmlFor="close" className="block text-sm text-black">
                Close
              </label>
              <input
                type="time"
                id="close"
                name="close"
                className="block w-full px-2 py-1 mt-1 border border-black rounded shadow-sm"
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-sm text-black">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Description"
              className="block w-full px-2 py-1 mt-1 border border-black rounded shadow-sm"
            ></textarea>
          </div>

          <div className="mb-4">
            <label htmlFor="gallery" className="block text-sm text-black">
              Gallery
            </label>
            <input
              type="file"
              id="gallery"
              name="gallery"
              className="block w-full px-2 py-1 mt-1 border border-black rounded shadow-sm"
              multiple
            />
          </div>

          <div className="flex space-x-4 font-normal">
            <button
              type="reset"
              className="px-4 py-2 text-gray-800 bg-gray-200 rounded-md shadow-md hover:bg-gray-300"
            >
              Reset
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white rounded-md shadow-md bg-customBlue hover:bg-customBg"
            >
              Save & Add Facility
            </button>
          </div>
        </section>

        {/* Google Maps Section */}
        <section className="p-4 bg-white rounded-md shadow-md">
          <h2 className="mb-4 text-lg font-semibold">Google Maps</h2>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="latitude" className="block text-sm text-black">
                Latitude
              </label>
              <input
                type="text"
                id="latitude"
                name="latitude"
                placeholder="eg. -0.52435750"
                className="block w-full px-2 py-1 mt-1 border border-black rounded shadow-sm"
              />
            </div>
            <div>
              <label htmlFor="longitude" className="block text-sm text-black">
                Longitude
              </label>
              <input
                type="text"
                id="longitude"
                name="longitude"
                placeholder="eg. 100.49234850"
                className="block w-full px-2 py-1 mt-1 border border-black rounded shadow-sm"
              />
            </div>
          </div>

          {/* Map Section */}
          <div
            className="flex items-center justify-center w-full h-64 text-black bg-gray-200"
            role="img"
            aria-label="Google Maps Placeholder"
          >
            Google Maps Placeholder
          </div>
        </section>
      </form>
    </main>
  );
};

export default NewHomestay;
