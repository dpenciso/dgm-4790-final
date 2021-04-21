import React, { useState, createContext} from 'react'

export const SignContext = createContext ({
    signedUp: false,
    login: () => { },
})

const SignContextProvider = (props) => {
    const [isSignedUp, setIsSignedUp] = useState(false)

    const loginHandler = () => {
        setIsSignedUp(true)
    }
    
    return (
        <SignContext.Provider value={{
            login: loginHandler,
            signedUp: isSignedUp,
        }}
        >
            {props.children}
        </SignContext.Provider>
    )
}

export default SignContextProvider