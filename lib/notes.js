import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Notes = new SimpleSchema({
    note:{
        type:String,
        label:"Observaciones",
    }
})