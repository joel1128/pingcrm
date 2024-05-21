import React from 'react';
import { Head } from '@inertiajs/react';
import { Link, usePage, useForm, router } from '@inertiajs/react';
import Layout from '@/__components__/Layout';
import DeleteButton from '@/__components__/Button/DeleteButton';
import LoadingButton from '@/__components__/Button/LoadingButton';
import TextInput from '@/__components__/Form/TextInput';
import SelectInput from '@/__components__/Form/SelectInput';
import TrashedMessage from '@/__components__/Messages/TrashedMessage';
import { Contact, Organization } from '@/types';

const Edit = () => {
  const { contact, organizations } = usePage<{
    contact: Contact;
    organizations: Organization[];
  }>().props;

  const { data, setData, errors, put, processing } = useForm({
    first_name: contact.first_name || '',
    last_name: contact.last_name || '',
    organization_id: contact.organization_id || '',
    email: contact.email || '',
    phone: contact.phone || '',
    address: contact.address || '',
    city: contact.city || '',
    region: contact.region || '',
    country: contact.country || '',
    postal_code: contact.postal_code || ''
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    put(route('contacts.update', contact.id));
  }

  function destroy() {
    if (confirm('Are you sure you want to delete this contact?')) {
      router.delete(route('contacts.destroy', contact.id));
    }
  }

  function restore() {
    if (confirm('Are you sure you want to restore this contact?')) {
      router.put(route('contacts.restore', contact.id));
    }
  }

  return (
    <div>
      <Head title={`${data.first_name} ${data.last_name}`} />
      <h1 className="mb-8 text-3xl font-bold">
        <Link
          href={route('contacts')}
          className="text-indigo-600 hover:text-indigo-700"
        >
          Contacts
        </Link>
        <span className="mx-2 font-medium text-indigo-600">/</span>
        {data.first_name} {data.last_name}
      </h1>
      {contact.deleted_at && (
        <TrashedMessage onRestore={restore}>
          This contact has been deleted.
        </TrashedMessage>
      )}
      <div className="max-w-3xl overflow-hidden bg-white rounded shadow">
        <form onSubmit={handleSubmit}>
          <div className="grid gap-8 p-8 lg:grid-cols-2">
            <TextInput
              label="First Name"
              name="first_name"
              error={errors.first_name}
              value={data.first_name}
              onChange={e => setData('first_name', e.target.value)}
            />
            <TextInput
              label="Last Name"
              name="last_name"
              error={errors.last_name}
              value={data.last_name}
              onChange={e => setData('last_name', e.target.value)}
            />
            <SelectInput
              label="Organization"
              name="organization_id"
              error={errors.organization_id}
              value={data.organization_id}
              onChange={e => setData('organization_id', e.target.value)}
              options={[
                {
                  value: '',
                  label: ''
                },
                ...organizations.map(org => ({
                  value: String(org.id),
                  label: org.name
                }))
              ]}
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
              type="text"
              error={errors.phone}
              value={data.phone}
              onChange={e => setData('phone', e.target.value)}
            />
            <TextInput
              label="Address"
              name="address"
              type="text"
              error={errors.address}
              value={data.address}
              onChange={e => setData('address', e.target.value)}
            />
            <TextInput
              label="City"
              name="city"
              type="text"
              error={errors.city}
              value={data.city}
              onChange={e => setData('city', e.target.value)}
            />
            <TextInput
              label="Province/State"
              name="region"
              type="text"
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
              type="text"
              error={errors.postal_code}
              value={data.postal_code}
              onChange={e => setData('postal_code', e.target.value)}
            />
          </div>
          <div className="flex items-center px-8 py-4 bg-gray-100 border-t border-gray-200">
            {!contact.deleted_at && (
              <DeleteButton onDelete={destroy}>Delete Contact</DeleteButton>
            )}
            <LoadingButton
              loading={processing}
              type="submit"
              className="ml-auto btn-indigo"
            >
              Update Contact
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
Edit.layout = (page: React.ReactNode) => <Layout children={page} />;

export default Edit;
