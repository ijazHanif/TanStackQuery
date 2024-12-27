import React from 'react'
import { github , google , IconButton } from '../components/shared/CommonImports'
const GoogleAuth = () => {

  const handleGoogleSignIn = ()=>{
    window.location.href = 'http://localhost:3000/auth/google';
  };
  const handleGithubSignIn = ()=>{
    window.location.href = 'http://localhost:3000/auth/github'
  }

  return (
    <div>
        <div className="flex gap-4">
              <IconButton onClick={handleGoogleSignIn}>
                <img src={github} alt="Github" className="w-10 lg:w-14" />
              </IconButton>
              <IconButton onClick={handleGithubSignIn}>
                <img src={google} alt="Google" className="w-10 lg:w-14 border" />
              </IconButton>
            </div>
    </div>
  )
}

export default GoogleAuth
