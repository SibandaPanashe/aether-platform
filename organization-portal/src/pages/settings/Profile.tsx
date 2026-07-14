import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { useForm } from 'react-hook-form';

interface ProfileForm {
  orgName: string;
  orgCode: string;
  email: string;
  phone: string;
  address: string;
}

export const Profile = () => {
  const { register, handleSubmit } = useForm<ProfileForm>({
    defaultValues: {
      orgName: 'CBZ Bank Zimbabwe',
      orgCode: 'ORG-CBZ-001',
      email: 'admin@cbz.co.zw',
      phone: '+263 24 2748050',
      address: 'Union House, 60 Kwame Nkrumah Ave, Harare',
    }
  });

  const onSubmit = (data: ProfileForm) => {
    console.log('Profile updated', data);
    // TODO: Connect to API
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-primary">Organization Profile</h2>
        <p className="text-textDark/60 mt-1">Manage your institution's contact and billing details.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Institution Details</CardTitle>
          <CardDescription>This information is visible on digital receipts issued to citizens upon verification.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Organization Name"
                {...register('orgName')}
              />
              <Input
                label="Organization Code (Read Only)"
                {...register('orgCode')}
                disabled
                className="bg-background cursor-not-allowed"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Primary Contact Email"
                type="email"
                {...register('email')}
              />
              <Input
                label="Contact Phone Number"
                {...register('phone')}
              />
            </div>
            
            <Input
              label="Headquarters Address"
              {...register('address')}
            />
          </CardContent>
          <CardFooter className="justify-end space-x-4">
            <Button type="button" variant="outline">Cancel</Button>
            <Button type="submit" variant="primary">Save Changes</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};
