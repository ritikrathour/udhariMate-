const EmailValidate = (email)=>{
    const emailRegex = /^[a-zA-Z]{3}[a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email)
}
export default EmailValidate;