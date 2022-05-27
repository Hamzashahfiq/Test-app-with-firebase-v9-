import React, { useState, useEffect } from 'react'
import { db, storage } from '../config/Firebase'
import { collection, addDoc, getDocs, doc, deleteDoc,updateDoc } from 'firebase/firestore'
import { DoLogout } from '../store/action/AuthAction'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { ref, uploadBytesResumable ,getDownloadURL  } from "firebase/storage"

const userData = {firstName: "", lastName: "" }
export default function Home() {
    const [users, setUsers] = useState([])
    const [user, setUser] = useState(userData)
    const [subLoading, setSubLoading] = useState(false)
    const [fatchLoading, setFatchLoading] = useState(false)
    const [deleteLoading, setDeleteLoading] = useState(false)
    const [isUpdate, setIsUpdate] = useState(false)
    const [updateLoading, setUpdateLoading] = useState(false)
    const [deletedId, setDeletedId] = useState("")
    const [updateId, setUpdateid] = useState("")
    const [isLogOutLoading, setIsLogOutLoading] = useState(false)
    const dispatch = useDispatch()
    const userRef = collection(db, "users")
    const [fileUrl, setFileUrl] = useState("")

    const inputHandler = (e) => {

        setUser({ ...user, [e.target.name]: e.target.value })
    }
    const imageHandler = (e) => {

        setFileUrl(e.target.files[0])
    }

    const addUsers = async (e) => {
        if (!user.firstName || !user.lastName || !fileUrl) {
            alert("Please enter all data first.")
            return;
        }
        try {
            setSubLoading(true)

                let fileRef = ref(storage,`/files/${fileUrl.name}`)
                let uploadFile = await  uploadBytesResumable(fileRef, fileUrl)
                 let url =  await getDownloadURL (fileRef)
                 setFileUrl(url)
console.log(url)

            const docRef = await addDoc(userRef, {...user, userImageUrl :url })
            let docId = docRef.id
            alert("User add successfully")
            setUsers([...users, {...user, id:docId, userImageUrl :url}])
            setUser(userData)
            
        }

        catch (error) {
            console.log(error)
            alert(error.massage)
        }
        finally {
            setSubLoading(false)
        }
    }

    useEffect(() => {
        const fatchData = async () => {
            // console.log("run fatch")
            try {
                setFatchLoading(true)
                const userData = await getDocs(userRef)

                setUsers(userData.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
            }

            catch (error) {
                console.log(error)
                alert(error.massage)
            }
            finally {
                setFatchLoading(false)
            }
        }
        fatchData();
    }, [])

  

    const deleteHandler = (userDetail) => {
        setUser(userData)
        setDeletedId(userDetail.id)
        const deleteData = async () => {
            try {
                setDeleteLoading(true)
                const userData = await deleteDoc(doc(db, "users", userDetail.id))
                let newUsers = users.filter((item) => item.id !== userDetail.id)
                alert("Data hasbeen Deleted")
                setUsers(newUsers)
            }

            catch (error) {
                console.log(error)
                alert(error.massage)
            }
            finally {
                setDeleteLoading(false)
            }
        }
        deleteData()

    }

    const updateDataGet = (userDetail) => {
        setUser({firstName:userDetail.firstName,lastName:userDetail.lastName})
        setUpdateid(userDetail.id)
        setIsUpdate(true)

    }

    const updateHandler = async() => {
        setUpdateLoading(true)
       let updatedUser = {
            firstName : user.firstName,
            lastName : user.lastName
        }
        try {
            const userData = await updateDoc(doc(db, "users",updateId),{...updatedUser})
            alert("Data has been successfully updated")
            let newUsers = users.map((item) => {
                if(item.id === updateId){
                    return {...updatedUser,id:updateId }
                }else {
                    return item
                }
            })
            setUsers(newUsers)
        }

        catch (error) {
            console.log(error)
            alert(error.massage)
        }
        finally {
            setUpdateLoading(false)
            setUser(userData)
            setIsUpdate(false)
        }
    }
    const logoutHandler = () => {
        dispatch(DoLogout(setIsLogOutLoading))
    }

    // const uploadFile = async(e) => {

    //    try{
    //     let file = e.target.files[0]
    //     let fileRef = ref(storage,`/files/${file.name}`)
    //     let uploadFile = await  uploadBytesResumable(fileRef, file)
    //      let url =  await getDownloadURL (fileRef)
    //      setFileUrl(url)
    //     alert("File uploaded successfully")
    //    }catch (error){
    //        alert(error)
    //    }
        

    // }


    return (
        <div >
            
                <input type="text" name="firstName" placeholder='First Name' value={user.firstName} onChange={(e) => inputHandler(e)} />
                <input type="text" name="lastName" placeholder='Last Name' value={user.lastName} onChange={(e) => inputHandler(e)} />
                <input type="file" name="url"   onChange={(e) => imageHandler(e)}/> 
                
                {isUpdate ? updateLoading ? <button >Loading....</button> :
                    <button onClick={updateHandler}  >Update</button> :
                    subLoading ? <button >Loading....</button> :
                        <button onClick={addUsers}  >Submit</button>}
                     {isLogOutLoading?<button >Loading....</button> :<Link to="/Logout"> <button onClick= { logoutHandler}>Logout</button></Link>}
    

            {fatchLoading ?
                <h5>Data Faching.....</h5> :
                <table>
                    <tbody>
                        {users.map((userDetail, index) => {
                            return (

                                <tr key={index}>
                                    <td>{userDetail.firstName}</td>
                                    <td>{userDetail.lastName}</td>
                                    <td><img src={userDetail.userImageUrl} height='100px' /> </td>
                                    <td><button onClick={() => updateDataGet(userDetail)}>Update</button></td>
                                    <td>{deleteLoading && userDetail.id === deletedId ? <button>Deleting...</button> : <button onClick={() => deleteHandler(userDetail)}>Delete</button>}</td>

                                </tr>

                            )
                        })}
                    </tbody>
                </table>
            }
            <br />
            <br />
            <br />
        </div>
    )
}
