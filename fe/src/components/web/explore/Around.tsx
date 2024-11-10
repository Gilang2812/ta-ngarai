import { useState } from 'react';

type ObjectAroundProps = {
  lakeSingkarak: boolean;
  rumahGadang: boolean;
  homestay: boolean;
  culinaryPlace: boolean;
  souvenirPlace: boolean;
  worshipPlace: boolean;
}

export const Around = () => {
  const [selectedOptions, setSelectedOptions] = useState<ObjectAroundProps>({
    lakeSingkarak: false,
    rumahGadang: false,
    homestay: false,
    culinaryPlace: false,
    souvenirPlace: false,
    worshipPlace: false,
  });
  const [radius, setRadius] = useState(0);

  const toggleOption = (option: keyof ObjectAroundProps) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [option]: !prev[option],
    }));
  };

  return (
    <div className=" ">
      <h2 className="text-xl font-semibold text-center mb-4">Object Around</h2>

      <div className="space-y-2 grid grid-cols-2">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={selectedOptions.lakeSingkarak}
            onChange={() => toggleOption('lakeSingkarak')}
            className="text-blue-500 mr-2"
          />
          <label>Lake Singkarak</label>
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={selectedOptions.rumahGadang}
            onChange={() => toggleOption('rumahGadang')}
            className="text-blue-500 mr-2"
          />
          <label>Rumah Gadang</label>
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={selectedOptions.homestay}
            onChange={() => toggleOption('homestay')}
            className="text-blue-500 mr-2"
          />
          <label>Homestay</label>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            checked={selectedOptions.culinaryPlace}
            onChange={() => toggleOption('culinaryPlace')}
            className="text-blue-500 mr-2"
          />
          <label>Culinary Place</label>
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={selectedOptions.souvenirPlace}
            onChange={() => toggleOption('souvenirPlace')}
            className="text-blue-500 mr-2"
          />
          <label>Souvenir Place</label>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            checked={selectedOptions.worshipPlace}
            onChange={() => toggleOption('worshipPlace')}
            className="text-blue-500 mr-2"
          />
          <label>Worship Place</label>
        </div>
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium">Radius: {radius} m</label>
        <input
          type="range"
          min="0"
          max="5000"
          value={radius}
          onChange={(e) => setRadius(Number(e.target.value))}
          className="w-full mt-2"
        />
      </div>
    </div>
  );
};
