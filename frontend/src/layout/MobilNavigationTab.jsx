import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import MobileNavSkeleton from "../components/MobileNavSkeleton";

const MobilNavigationTab = () => {
    const { user, loading } = useSelector(state => state.user);
    const location = useLocation();
    if (loading) {
        return <MobileNavSkeleton />
    }
    return (
        <>
            <ul className="w-full h-[60px] backdrop-blur-lg border-t border-gray-300 border-2 fixed z-40 px-2.5 sm:hidden bottom-0 left-0 flex justify-around gap-5 items-center ">
                <Link className={` ${location.pathname === "/" ? "bg-[white] border-b-4 border-black" : ""} w-1/3  rounded-md`} to="/">
                    <li className="text-center backdrop-blur-xl backdrop-brightness-90">
                        <i className="fas fa-home w-[30px] inline-block h-[30px] rounded-full shadow-xl shadow-zinc-400  text-black text-center leading-[30px] text-[16px]"></i>
                        <i className="fas fa-home w-[30px] h-[30px] rounded-full shadow-xl shadow-zinc-400 inline-block  text-black text-center leading-[30px] text-[16px]"></i>

                        <p className="text-[10px] font-bold">Home</p>
                    </li>
                </Link>
                {
                    user === null ? (
                        <Link className={` ${location.pathname === "/signup" ? "bg-[white] border-b-4 border-black" : ""} w-1/3  rounded-md`} to="/signup">
                            <li className="text-center backdrop-blur-xl backdrop-brightness-90">
                                <i className="fas fa-user w-[30px] inline-block h-[30px] rounded-full shadow-xl shadow-zinc-400  text-black text-center leading-[30px] text-[16px]"></i>
                                <i className="fas fa-user w-[30px] h-[30px] rounded-full shadow-xl shadow-zinc-400 inline-block  text-black text-center leading-[30px] text-[16px]"></i>
                                <p className="text-[10px] font-bold">Sign Up</p>
                            </li>
                        </Link>
                    )
                        : (
                            user?.role === "shopkeeper" ? (
                                <Link className={` ${location.pathname === "/ladger" ? "bg-[white] border-b-4 border-black" : ""} w-1/3  rounded-md`} to="/ladger">
                                    <li className="text-center cursor-pointer rounded-md backdrop-blur-xl backdrop-brightness-90">
                                        <i className="fas fa-users w-[30px] inline-block h-[30px] rounded-full shadow-xl shadow-zinc-400  text-black text-center leading-[30px] text-[14px]"></i>
                                        <i className="fas fa-users w-[30px] h-[30px] rounded-full shadow-xl shadow-zinc-400 inline-block  text-black text-center leading-[30px] text-[14px]"></i>

                                        <p className="text-[10px] font-bold">Ladger</p>
                                    </li>
                                </Link>
                            ) : (
                                <Link className={` ${location.pathname === "/transacation-area/" + user?.shopId ? "bg-[white] border-b-4 border-black" : ""} w-1/3  rounded-md`} to={`/transacation-area/${user?.shopId}`}>
                                    <li className="text-center cursor-pointer rounded-md backdrop-blur-xl backdrop-brightness-90">
                                        <i className="fas fa-exchange-alt w-[30px] inline-block h-[30px] rounded-full shadow-xl shadow-zinc-400  text-black text-center leading-[30px] text-[16px]"></i>
                                        <i className="fas fa-exchange-alt w-[30px] h-[30px] rounded-full shadow-xl shadow-zinc-400 inline-block  text-black text-center leading-[30px] text-[16px]"></i>

                                        <p className="text-[10px] font-bold">Transactions</p>
                                    </li>
                                </Link>
                            ))
                }
                {
                    user === null ? (
                        <Link className={` ${location.pathname === "/signin" ? "bg-[white] border-b-4 border-black" : ""} w-1/3  rounded-md`} to="/signin">
                            <li className="text-center backdrop-blur-xl backdrop-brightness-90">
                                <i className="fas fa-envelope w-[30px] inline-block h-[30px] rounded-full shadow-xl shadow-zinc-400  text-black text-center leading-[30px] text-[16px]"></i>
                                <i className="fas fa-envelope w-[30px] h-[30px] rounded-full shadow-xl shadow-zinc-400 inline-block  text-black text-center leading-[30px] text-[16px]"></i>

                                <p className="text-[10px] font-bold">Sign In</p>
                            </li>
                        </Link>
                    ) : (
                        <Link className={` ${location.pathname === "/profile/" + user?._id ? "bg-[white] border-b-4 border-black" : ""} w-1/3  rounded-md`} to={`/profile/${user?._id}`}>
                            <li className="text-center cursor-pointer rounded-md backdrop-blur-xl backdrop-brightness-90">
                                <i className="fas fa-eye w-[30px] inline-block h-[30px] rounded-full shadow-xl shadow-zinc-400  text-black text-center leading-[30px] text-[16px]"></i>
                                <i className="fas fa-eye w-[30px] h-[30px] rounded-full shadow-xl shadow-zinc-400 inline-block  text-black text-center leading-[30px] text-[16px]"></i>

                                <p className="text-[10px] font-bold">Profile</p>
                            </li>
                        </Link>
                    )
                }
            </ul>
        </>
    )
}
export default MobilNavigationTab;