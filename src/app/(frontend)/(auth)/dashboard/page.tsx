import { getUser } from '../actions/getUser';
import type { Author } from '@/payload-types';
import { ResetPasswordButton } from '../components/ResetPasswordButton';
import { Authors } from '@/collections/Authors/index';
import UpdateForm from '../components/UpdateForm';

export default async function Page() {
  const user = (await getUser()) as Author;

  return (
    <main className="w-full mx-auto sm:max-w-sm my-8">
      <div className="my-8">
        <h1>
          Hello,{' '}
          {user.firstName || user.lastName
            ? `${user.firstName || ''} ${user.lastName || ''}`.trim()
            : user.email}
        </h1>
        <div className="mt-2 text-gray-600">
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          {user.firstName && (
            <p>
              <strong>First Name:</strong> {user.firstName}
            </p>
          )}
          {user.lastName && (
            <p>
              <strong>Last Name:</strong> {user.lastName}
            </p>
          )}
        </div>
      </div>
      <UpdateForm user={user} />
      <div className="flex justify-start items-center gap-4">
        <ResetPasswordButton email={user.email} />
      </div>
    </main>
  );
}
