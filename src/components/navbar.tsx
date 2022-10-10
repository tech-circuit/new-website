import React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { env } from '../env/client.mjs';
import { signIn, signOut, useSession } from 'next-auth/react';
import ActiveLink from './active-link';

const Navbar = () => {
  const router = useRouter();
  const session = useSession();
  const [isHamOpen, setHamOpen] = useState(false);
  // const [pfpUrl, setpfpUrl] = useState('');

  // useEffect(() => {
  //   if (localStorage.getItem('authToken') !== null) {
  //     fetch(
  //       `${BASE_API_URL}/user/pfp?access_token=${localStorage.getItem(
  //         'authToken'
  //       )}`
  //     )
  //       .then(res => {
  //         if (res.status !== 404) {
  //           setLoggedIn(true);
  //         }
  //       })
  //       .catch(err => console.log(err));
  //     setpfpUrl(
  //       `${BASE_API_URL}/user/pfp?access_token=${localStorage.getItem(
  //         'authToken'
  //       )}`
  //     );
  //   }
  // }, [location]);

  // const onSuccess = res => {
  //   const { email, familyName, givenName, googleId, imageUrl, name } =
  //     res.profileObj;
  //   const authToken = res.tokenObj.access_token;
  //   localStorage.removeItem('authToken');
  //   localStorage.removeItem('pfp');
  //   localStorage.setItem('pfp', imageUrl);
  //   localStorage.setItem('authToken', authToken);
  //   fetch(`${BASE_API_URL}/user/gauth`, {
  //     method: 'POST',
  //     body: JSON.stringify({
  //       email,
  //       familyName,
  //       givenName,
  //       googleId,
  //       imageUrl,
  //       name,
  //       access_token: authToken,
  //     }),
  //     headers: {
  //       'Content-type': 'application/json; charset=UTF-8',
  //     },
  //   })
  //     .then(response => {
  //       setLoggedIn(true);
  //       setpfpUrl(`${BASE_API_URL}/user/pfp?access_token=${authToken}`);
  //       window.location.reload();
  //     })
  //     .catch(error => console.log(error));
  // };

  // const onFailure = res => {
  //   // console.log("Login failed: res:", res);
  // };

  return (
    <nav className="container nav">
      <div className="nav-left">
        <Link className="nav-logo-holder" href="/">
          <img src="/assets/fulllogo.png" alt="alt" className="logo" />
        </Link>
        <Link
          href="/"
          // onClick={e => setActivePage('/')}
          className="nav-logo-holder"
          id="short-nav-logo"
        >
          <img src="/assets/short.svg" alt="alt" className="logo" />
        </Link>
        <div className={isHamOpen ? 'nav-links nav-links-active' : 'nav-links'}>
          <ActiveLink
            href="/about"
            activeClassName="nav-link-active"
            className="nav-link"
          >
            About
          </ActiveLink>
          <ActiveLink
            href="/forum"
            activeClassName="nav-link-active"
            className="nav-link"
          >
            Forum
          </ActiveLink>
          <ActiveLink
            href="/resources"
            activeClassName="nav-link-active"
            className="nav-link"
          >
            Resources
          </ActiveLink>
          <a
            href="https://dsc.gg/techcircuit"
            className="disc-btn"
            target="_blank"
            rel="noreferrer"
          >
            Discord
          </a>
        </div>
      </div>
      <div className="nav-right">
        {session.status === 'authenticated' ? (
          <>
            <img
              // src={pfpUrl}
              className={isHamOpen ? 'pfp pfp-active' : 'pfp'}
              alt="pfp"
            ></img>
            <button
              className={isHamOpen ? 'logout logout-active' : 'logout'}
              onClick={() => signOut()}
            >
              <img src="/assets/logout.png" alt="logout" />
            </button>
          </>
        ) : (
          <button
            className={isHamOpen ? 'login-btn login-btn-active' : 'login-btn'}
            onClick={() => signIn('google')}
          >
            Login
          </button>
        )}
        <div
          className={isHamOpen ? 'ham ham-active' : 'ham'}
          onClick={() => setHamOpen(!isHamOpen)}
        >
          <div className="line"></div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
