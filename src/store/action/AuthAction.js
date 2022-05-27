import { auth } from "../../config/Firebase";
import { signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"



export const doLogin = (userData, setLoginLoading) => async (dispatch) => {
    try {
        setLoginLoading(true)
        const res = await signInWithEmailAndPassword(auth, userData.userName, userData.password)
        console.log(res.user)
        alert("Login successfully ")

        if (res) {
            dispatch({
                type: "LOGIN",
                payload: res.user
            })
        }

    }

    catch (error) {
        alert(error)
    }
    finally {
        setLoginLoading(false)
    }

}
export const DoLogout = (setIsLogOutLoading) => async (dispatch) => {
    try {
        setIsLogOutLoading(true)
        const res = await signOut(auth)
        alert("Logout successfully ")

        dispatch({
            type: "LOGOUT",
        })


    }

    catch (error) {
        alert(error)
    }
    finally {
        setIsLogOutLoading(false)
    }

}
export const DoSignup = (signupUser, setSingupLoading) => async (dispatch) => {
    try {
        setSingupLoading(true)
        const res = await createUserWithEmailAndPassword(auth, signupUser.userName, signupUser.password)
        alert("Signup successfully ")

        dispatch({
            type: "LOGIN",
            payload: res.user
        })


    }

    catch (error) {
        alert(error)

    }
    finally {
        setSingupLoading(false)
    }

}
export const CheckLoginUser = (setCurentUser) => async (dispatch) => {
    try {
        setCurentUser(true)
        onAuthStateChanged(auth, (user) => {
            if (user) {
                dispatch({
                    type: "LOGIN",
                    payload: user
                })
            } else {
                dispatch({
                    type: "LOGOUT",
                })


            }
        })
    }

    catch (error) {
        alert(error)

    }
    finally {
        setCurentUser(false)
    }

}