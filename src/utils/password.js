const bcrypt=require("bcrypt");

 const SALT_ROUNDS=12;
const hashPassword=async(password)=>{
  if(
      typeof password!=="string"||password.length<12||Buffer.byteLength(password,"utf8")>72
  )
     {
       throw new Error("Password does not meet length requirements");
}
  return bcrypt.hash(password,SALT_ROUNDS);
};

  const comparePassword=async(password,passwordHash)=>{
   if( 
     typeof password!=="string"||typeof passwordHash!=="string"||Buffer.byteLength(password,"utf8")>72
  )
   {
    return false;
  }

  return bcrypt.compare(password, passwordHash);

};

 module.exports={
   hashPassword,
  comparePassword,
   };