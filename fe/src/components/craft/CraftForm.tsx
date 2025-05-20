import { useState } from 'react';  
import { useRouter } from 'next/navigation';
import { Craft, CraftVariant } from '@/type/schema/CraftSchema';
import GalleryUpload from './GalleryUpload';

interface CraftFormProps {
  initialCraft?: Craft;
  initialVariants?: CraftVariant[];
}

export default function CraftForm({ initialCraft, initialVariants = [] }: CraftFormProps) {
  const router = useRouter();
  const [craft, setCraft] = useState<Omit<Craft, 'id'>>({
    id_souvenir_place: initialCraft?.id_souvenir_place || '',
    name: initialCraft?.name || '',
  });
  
  const [variants, setVariants] = useState<Array<Omit<CraftVariant, 'id'>>>([
    ...initialVariants.map(v => ({
      id_craft: v.id_craft,
      name: v.name,
      price: v.price,
      stock: v.stock,
      modal: v.modal,
      description: v.description
    })),
    ...(initialVariants.length === 0 ? [{
      id_craft: '',
      name: '',
      price: 0,
      stock: 0,
      modal: 0,
      description: ''
    }] : [])
  ]);
  
  const [images, setImages] = useState<File[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

 

  const handleAddVariant = () => {
    setVariants([
      ...variants,
      {
        id_craft: '',
        name: '',
        price: 0,
        stock: 0,
        modal: 0,
        description: ''
      }
    ]);
  };

  const handleRemoveVariant = (index: number) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

  const handleVariantChange = (index: number, field: keyof Omit<CraftVariant, 'id'>, value: any) => {
    const newVariants = [...variants];
    newVariants[index] = {
      ...newVariants[index],
      [field]: field === 'price' || field === 'stock' || field === 'modal' ? Number(value) : value
    };
    setVariants(newVariants);
  };

  const handleSubmit = async (e: React.FormEvent) => {
   };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 divide-y divide-gray-200">
      <div className="space-y-8 divide-y divide-gray-200">
        <div>
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">Craft Information</h3>
            <p className="mt-1 text-sm text-gray-500">
              Add basic information about the craft.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="id_souvenir_place" className="block text-sm font-medium text-gray-700">
                Souvenir Place ID
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="id_souvenir_place"
                  id="id_souvenir_place"
                  value={craft.id_souvenir_place}
                  onChange={(e) => setCraft({ ...craft, id_souvenir_place: e.target.value })}
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
                {errors.id_souvenir_place && (
                  <p className="mt-2 text-sm text-red-600">{errors.id_souvenir_place}</p>
                )}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Craft Name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={craft.name}
                  onChange={(e) => setCraft({ ...craft, name: e.target.value })}
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
                {errors.name && (
                  <p className="mt-2 text-sm text-red-600">{errors.name}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">Variants</h3>
            <p className="mt-1 text-sm text-gray-500">
              Add variants of the craft.
            </p>
          </div>
          
          {variants.map((variant, index) => (
            <div key={index} className="mt-6 border border-gray-200 rounded-md p-4">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-md font-medium text-gray-700">Variant {index + 1}</h4>
                {variants.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveVariant(index)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Remove
                  </button>
                )}
              </div>
              
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label htmlFor={`variant-${index}-name`} className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id={`variant-${index}-name`}
                      value={variant.name}
                      onChange={(e) => handleVariantChange(index, 'name', e.target.value)}
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                    {errors[`variant_${index}_name`] && (
                      <p className="mt-2 text-sm text-red-600">{errors[`variant_${index}_name`]}</p>
                    )}
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor={`variant-${index}-price`} className="block text-sm font-medium text-gray-700">
                    Price
                  </label>
                  <div className="mt-1">
                    <input
                      type="number"
                      id={`variant-${index}-price`}
                      value={variant.price}
                      onChange={(e) => handleVariantChange(index, 'price', e.target.value)}
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                    {errors[`variant_${index}_price`] && (
                      <p className="mt-2 text-sm text-red-600">{errors[`variant_${index}_price`]}</p>
                    )}
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor={`variant-${index}-stock`} className="block text-sm font-medium text-gray-700">
                    Stock
                  </label>
                  <div className="mt-1">
                    <input
                      type="number"
                      id={`variant-${index}-stock`}
                      value={variant.stock}
                      onChange={(e) => handleVariantChange(index, 'stock', e.target.value)}
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor={`variant-${index}-modal`} className="block text-sm font-medium text-gray-700">
                    Modal
                  </label>
                  <div className="mt-1">
                    <input
                      type="number"
                      id={`variant-${index}-modal`}
                      value={variant.modal}
                      onChange={(e) => handleVariantChange(index, 'modal', e.target.value)}
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <label htmlFor={`variant-${index}-description`} className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <div className="mt-1">
                    <textarea
                      id={`variant-${index}-description`}
                      rows={3}
                      value={variant.description}
                      onChange={(e) => handleVariantChange(index, 'description', e.target.value)}
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          <div className="mt-4">
            <button
              type="button"
              onClick={handleAddVariant}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Add Another Variant
            </button>
          </div>
        </div>

        <div className="pt-8">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">Gallery Images</h3>
            <p className="mt-1 text-sm text-gray-500">
              Upload images for the craft variants.
            </p>
          </div>
          
          <div className="mt-6">
            <GalleryUpload images={images} setImages={setImages} />
          </div>
        </div>
      </div>

      <div className="pt-5">
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => router.back()}
            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
}