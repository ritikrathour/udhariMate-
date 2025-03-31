const PatmentAndCreditButtons = ({ payment, credit }) => {
    return (
        <>
            <div className="flex justify-center items-center gap-1 sm:gap-4 w-full">
                <button onClick={payment} type="button" className="py-1 text-center hover:opacity-70 transition-all w-1/2 md:w-[230px]  rounded-full text-[12px] sm:text-[14px] border-2 text-green-500 border-green-500 font-semibold"><i className="fas fa-arrow-up"></i> Payment</button>
                <button onClick={credit} type="button" className="py-1 text-center hover:opacity-70 transition-all w-1/2 md:w-[230px] rounded-full text-[12px] sm:text-[14px] border-2 text-red-500 border-red-500 font-semibold"><i className="fas fa-arrow-down"></i> Credit</button>
            </div>
        </>
    )
}
export default PatmentAndCreditButtons;