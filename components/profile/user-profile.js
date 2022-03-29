import ProfileForm from './profile-form';
import classes from './user-profile.module.css';
import { getSession } from 'next-auth/client';
import { useState } from 'react';
import { useEffect } from 'react';

function UserProfile() {
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   getSession().then((session) => {
  //     if (!session) window.location.href = '/auth';
  //     else setIsLoading(false);
  //   });
  // }, []);

  // if (isLoading) {
  //   return <p className={classes.profile}>Loading...</p>;
  // }

  function changePasswordHandler(passData) {
    fetch('/api/user/change-password', {
      method: 'PATCH',
      body: JSON.stringify(passData),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm onChangePassword={changePasswordHandler} />
    </section>
  );
}

export default UserProfile;
