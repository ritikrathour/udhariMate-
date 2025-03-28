import React, { useCallback, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Loader from "../components/Loader";
import AxiosInstance from "../utils/AxiosInstance";
import EmailValidate from "../helper/EmailValidate";
const SignUp = () => {
    const Navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [select, setSelect] = useState("customer");
    const formRef = useRef({});
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        userName: "",
        email: "",
        password: "",
        shopId: "",
        shopName: ""
    });
    // handle change 
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }))
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        authentication({ ...formData, role: select });
    }
    // signup authentication     
    const authentication = useCallback(async (formData) => {
        try {
            const validEmail = EmailValidate(formData.email); 
            if (!validEmail) {
                toast.error("Invalid Email!", {
                    iconTheme: {
                        primary: "#f44336",
                        secondary: "#000"
                    }
                });
                return
            }
            if (formRef.current.password?.value && formRef.current.password?.value.length < 6) {
                toast.error("Password Length Should Be More than 6",{
                    iconTheme:{
                           primary:"#f44336",
                           secondary:"#000" 
                    }
               });
                return
            }
            setLoading(true)
            await AxiosInstance.post(`/signup`, formData);
            toast.success("User Sign Up Successfully!");
            setLoading(false);
            setTimeout(() => {
                Navigate("/")
                window.location.reload()
            }, 500);
        } catch (error) {
            setLoading(false)
            console.log(error);
            toast.error(error?.response?.data?.message,{
                iconTheme:{
                       primary:"#f44336",
                       secondary:"#fff" 
                }
           });
        }
    }, [])
    return (
        <>
            <section className="flex justify-center items-center h-[80vh]">
                <form onSubmit={(e) => handleSubmit(e)} className="w-[400px] rounded-tl-2xl rounded-br-2xl shadow-md shadow-slate-300 drop-shadow-md text-center p-3 flex flex-col gap-2">
                    <h2 className="text-[25px] font-medium">Join Us Today</h2>
                    <Input type="text" placeholder="UserName" style="capitalize" value={formData?.userName} name="userName" icon="fas fa-user" id="userName" func={handleChange} />
                    <Input type="email" placeholder="UserName@gmail.com" value={formData?.email} name="email" id="email" icon="fas fa-envelope" func={handleChange} />
                    <div className="relative">
                        <Input type={showPassword ? "text" : "password"} placeholder="Enter Password" value={formData?.password} name="password" id="password" icon="fas fa-key" func={handleChange} />
                        <div className="cursor-pointer absolute top-[50%] translate-y-[-50%] right-2" onClick={() => setShowPassword(prev => !prev)}>
                            <i className={`fas ${!showPassword ? "fa-eye-slash" : "fa-eye"} text-sm`}></i>
                        </div>
                    </div>
                    <div className="h-[40px] rounded-lg bg-zinc-100 flex justify-between mb-2 py-1 items-center px-2 gap-2">
                        <label htmlFor="role" className="text-sm font-medium">
                            User Type
                        </label>
                        <select name="role" className="h-full rounded-md text-sm font-normal p-1" id="role" onChange={(e) => setSelect(e.target.value)} value={select}>
                            <option value="customer" className="text-sm font-normal">Customer</option>
                            <option value="shopkeeper" className="text-sm font-normal">ShopKeeper</option>
                        </select>
                    </div>
                    <div>
                        <div className="h-[40px] rounded-lg bg-zinc-100 flex justify-between mb-2 py-1 items-center px-2 gap-4 border ">
                            {
                                select === "customer" ? (
                                    <>
                                        <label htmlFor="shopId" className="text-sm font-medium text-nowrap">
                                            ShopID
                                        </label>
                                        <div className="sm:w-[270px] w-full">
                                            <Input type="text" placeholder="Shop ID" value={formData?.shopId} name="shopId" id="shopId" func={handleChange} />
                                        </div>
                                    </>) : (
                                    <>
                                        <label htmlFor="shopName" className="text-sm font-medium text-nowrap">
                                            Shop Name
                                        </label>
                                        <Input style="capitalize" type="text" placeholder="Shop Name" value={formData?.shopName} name="shopName" id="shopName" func={handleChange} />
                                    </>)
                            }
                        </div>
                       { select === "customer" && <p className="text-[12px]">Please take shop ID from your Shopkeeper!</p>}
                    </div>
                    <button disabled={loading} type="submit"
                        className={`${loading ? "bg[#469bbfc2] cursor-not-allowed" : ""} flex justify-center bg-[#469bbf] py-[6px] rounded-full w-[300px] m-auto text-white`} >
                        {loading ? <Loader style="border-2 border-white" /> : "Sign Up"}
                    </button>
                    <p className="form_change">
                        Already have an account?
                        <Link to="/signin" className="text-blue-700 hover:underline text-[14px] cursor-pointer"> Sign In</Link>
                    </p>
                </form>
            </section>
        </>
    )
}
export default SignUp;