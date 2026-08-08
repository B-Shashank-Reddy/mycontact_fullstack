const Contact=require("../models/contactModel");
const asyncHandler=require("express-async-handler");
const {constants}=require("../constants");

const getContacts=asyncHandler(async (req,res)=>{
   const contacts=await Contact.find({user_id: req.user.id});
   res.status(200).json(contacts);
});
const getContact=asyncHandler(async (req,res)=>{
   const contact=await Contact.findById(req.params.id);
   if(!contact){
      const error=new Error("No contact Found");
      error.statusCode=constants.NOT_FOUND;
      throw error;
   }
   if(contact.user_id.toString() !== req.user.id){
      const error = new Error("User does not have permission to view this contact");
      error.statusCode = constants.UNAUTHORIZED;
      throw error;
   }
   res.status(200).json(contact); 
});
const createContact=asyncHandler(async(req,res,next)=>{
    const {name,email,phone}=req.body;
    if(!name||!email||!phone){
        const error=new Error("All fields are mandatory");
        error.statusCode=constants.VALIDATION_ERROR;
        throw error;
    }
   console.log(req.user.id);
    const contact= await(Contact.create({
      name,
      email,
      phone,
      user_id:req.user.id,
    }));
   res.status(200).json(contact);
});
const updateContact=asyncHandler(async (req,res)=>{
   const contact=await Contact.findById(req.params.id);
   if(!contact){
      const error=new Error("No contact Found");
      error.statusCode=constants.NOT_FOUND;
      throw error;
   }
   if(contact.user_id.toString()!==req.user.id){
      const error=new Error("User does not have permission to update this contact");
      error.statusCode=constants.UNAUTHORIZED;
      throw error;
   }
   const updatedContact= await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      {new:true}
   );
   res.status(200).json(updatedContact); 
});
const deleteContact=asyncHandler(async (req,res)=>{
   const contact=await Contact.findById(req.params.id);
   if(!contact){
      const error=new Error("No contact Found");
      error.statusCode=constants.NOT_FOUND;
      throw error;
   }
   if(contact.user_id.toString()!==req.user.id){
      const error=new Error("User does not have permission to delete this contact");
      error.statusCode=constants.UNAUTHORIZED;
      throw error;
   }
   await Contact.findByIdAndDelete(req.params.id);
   res.status(200).json(contact); 
});
module.exports={
   getContacts,
   getContact,
   createContact,
   updateContact,
   deleteContact
};