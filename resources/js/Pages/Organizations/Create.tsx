import { Link, useForm } from '@inertiajs/react';
import Layout from '@/Components/Layout';
import LoadingButton from '@/Components/Button/LoadingButton';
import TextInput from '@/Components/Form/TextInput';
import SelectInput from '@/Components/Form/SelectInput';

const Create = () => {
  const { data, setData, errors, post, processing } = useForm({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    region: '',
    country: '',
    postal_code: ''
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    post(route('organizations.store'));
  }

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">
        <Link
          href={route('organizations')}
          className="text-indigo-600 hover:text-indigo-700"
        >
          Organizations
        </Link>
        <span className="font-medium text-indigo-600"> /</span> Create
      </h1>
      <div className="max-w-3xl overflow-hidden bg-white rounded shadow">
        <form onSubmit={handleSubmit}>
          <div className="grid gap-8 p-8 lg:grid-cols-2">
            <TextInput
              label="Name"
              name="name"
              error={errors.name}
              value={data.name}
              onChange={e => setData('name', e.target.value)}
            />
            <TextInput
              label="Email"
              name="email"
              type="email"
              error={errors.email}
              value={data.email}
              onChange={e => setData('email', e.target.value)}
            />
            <TextInput
              label="Phone"
              name="phone"
              error={errors.phone}
              value={data.phone}
              onChange={e => setData('phone', e.target.value)}
            />
            <TextInput
              label="Address"
              name="address"
              error={errors.address}
              value={data.address}
              onChange={e => setData('address', e.target.value)}
            />
            <TextInput
              label="City"
              name="city"
              error={errors.city}
              value={data.city}
              onChange={e => setData('city', e.target.value)}
            />
            <TextInput
              label="Province/State"
              name="region"
              error={errors.region}
              value={data.region}
              onChange={e => setData('region', e.target.value)}
            />
            <SelectInput
              label="Country"
              name="country"
              error={errors.country}
              value={data.country}
              onChange={e => setData('country', e.target.value)}
              options={[
                {
                  value: '',
                  label: ''
                },
                {
                  value: 'CA',
                  label: 'Canada'
                },
                {
                  value: 'US',
                  label: 'United States'
                }
              ]}
            />
            <TextInput
              label="Postal Code"
              name="postal_code"
              error={errors.postal_code}
              value={data.postal_code}
              onChange={e => setData('postal_code', e.target.value)}
            />
          </div>
          <div className="flex items-center justify-end px-8 py-4 bg-gray-100 border-t border-gray-200">
            <LoadingButton
              loading={processing}
              type="submit"
              className="btn-indigo"
            >
              Create Organization
            </LoadingButton>
          </div>
        </form>
      </div>
    </div>
  );
};

/**
 * Persistent Layout (Inertia.js)
 *
 * [Learn more](https://inertiajs.com/pages#persistent-layouts)
 */
Create.layout = (page: React.ReactNode) => (
  <Layout title="Create Organization" children={page} />
);

export default Create;
