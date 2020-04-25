import React, { useState, useContext, useEffect } from 'react';
import { useSelector } from '../redux/store';
import { useDispatch } from 'react-redux';
import { newDisplayName, deleteUser } from '../redux/actions/gameActions';
import Button from '../components/Button';
import { ProfileLogo } from '../components/ProfileLogo';
import { FieldInputText, FieldInputSelect } from '../components/FieldInput';
import { Redirect } from 'react-router-dom';
import { FirebaseContext } from '../FirebaseContext';
import Paper from '../components/Paper';
import { useTranslation } from 'react-i18next';

export default function Profile() {
  const firebase = useContext(FirebaseContext);
  const displayNameFirebase = useSelector((state) => state.displayName);
  const [displayName, setDisplayName] = useState(displayNameFirebase);
  const [email, setEmail] = useState(firebase?.auth.currentUser?.email || '');

  const [availableLanguages, setAvailableLanguages] = useState<string[]>([]);
  const [currentLanguage, setCurrentLanguage] = useState('');

  const { t, i18n } = useTranslation();

  useEffect(() => {
    setAvailableLanguages(i18n.languages);
    setCurrentLanguage(i18n.language);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logged = useSelector((state) => state.logged);

  const dispatch = useDispatch();

  useEffect(() => {
    setEmail(firebase?.auth.currentUser?.email || '');
  }, [firebase]);

  const onUpdateProfile = () => {
    dispatch(newDisplayName(displayName));
    i18n.changeLanguage(currentLanguage);
  };
  const onDeleteProfile = () => {
    dispatch(deleteUser());
  };

  if (!logged) {
    return <Redirect to="/home" />;
  }

  return (
    <div className="w-full max-w-sm mx-auto">
      <Paper>
        <>
          <div className="flex justify-center mb-4">
            <ProfileLogo />
          </div>
          <form>
            <FieldInputText id="displayName" label="Display name" value={displayName} onChange={(value) => setDisplayName(value)} />
            <FieldInputText id="email" label="Email" value={email} readonly />
            <FieldInputSelect
              id="language"
              label="Language"
              value={currentLanguage}
              values={availableLanguages}
              onChange={(l) => setCurrentLanguage(l)}
            />
            <div className="flex justify-between mt-8">
              <Button onClick={() => onUpdateProfile()}>{t('Update profile')}</Button>
              <Button type="ERROR" className="bg-red-500" onClick={() => onDeleteProfile()}>
                Delete profile
              </Button>
            </div>
          </form>
        </>
      </Paper>
    </div>
  );
}
