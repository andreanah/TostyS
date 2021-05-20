// This is used to determine if a user is authenticated and
// if they are allowed to visit the page they navigated to.

// If they are: they proceed to the page
// If not: they are redirected to the login page.
import React, { useEffect, useState } from 'react'
import { GetRole } from './api/UserAPI'
import { Redirect, Route } from 'react-router-dom'

const PrivateRoute = ({ component: Component, requiredAdmin = false, ...rest }) => {

  // Add your own authentication on the below line.
  const [resultBool,setResult] =useState(true);

  useEffect(() => {

    const fetchBool = async () => {
      if (!requiredAdmin) {
        var res = await GetRole();
        if (res.isAxiosError) {
          setResult(false);
          return;
        }
        setResult(true)
      } else {
        var res = await GetRole();
        if (res?.isAxiosError) {
          setResult(false)
          return;
        }
        if (res == "Admin") {
          setResult(true)
          return;
        }
        setResult(false)
      }
    }

    fetchBool();
  }, []);

  return (
    <Route
      {...rest}
      render={props =>

        resultBool ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        )
      }
    />
  )
}

export default PrivateRoute