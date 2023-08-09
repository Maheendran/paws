import mongoose, { Document, Schema } from "mongoose";

export interface DoctorInterface extends Document {
clinicId:string,
name:string,
specialized:string,
qualification:string,
experience:string,
document:string,
verified:string
docVerified:boolean
}

const doctorSchema: Schema = new Schema({
    profileImage:{
        type:String,
    },
    clinicId:{
        type:mongoose.Types.ObjectId,
        ref:'Clinic',
        required:true
    },
    name:{
        type:String,
        required:true
    },
    specialized:{
        type:String,
        required:true
    },
    qualification:{
        type:String,
        required:true
    },
    experience:{
        type:String,
        required:true
    },
    document:{
        type:String, 
    },
    verified:{
        type:String,
        default:"pending"
    }

});

export default mongoose.model<DoctorInterface>("Doctor", doctorSchema);
