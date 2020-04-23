import React, { useState } from 'react';
import { useSelector } from '../redux/store';
import { useDispatch } from 'react-redux';
import { newDisplayName, deleteUser } from '../redux/actions/gameActions';
import Button from '../components/Button';
import { ProfileLogo } from '../components/ProfileLogo';
import { FieldInput } from '../components/FieldInput';
import { Redirect } from 'react-router-dom';

export default function Profile() {
  const displayNameFirebase = useSelector((state) => state.displayName);
  const [displayName, setDisplayName] = useState(displayNameFirebase);

  const logged = useSelector((state) => state.logged);

  const dispatch = useDispatch();

  const onUpdateProfile = () => {
    dispatch(newDisplayName(displayName));
  };
  const onDeleteProfile = () => {
    dispatch(deleteUser());
  };

  if (!logged) {
    return <Redirect to="/home" />;
  }

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="bg-white text-gray-800 shadow-md rounded p-4">
        <div className="flex justify-center mb-4">
          <ProfileLogo />
        </div>
        <form>
          <FieldInput id="displayName" label="Display name" value={displayName} onChange={(value) => setDisplayName(value)} />
          <div className="flex justify-between mt-8">
            <Button onClick={() => onUpdateProfile()}>Update profile</Button>
            <Button type="ERROR" className="bg-red-500" onClick={() => onDeleteProfile()}>
              Delete profile
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
