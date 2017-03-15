import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Notes } from './notes';
import  { check } from 'meteor/check';
import { Meteor} from 'meteor/meteor';

//this.Images = new FilesCollection({collectionName: 'Images'});

Usuario = new Mongo.Collection("Usuario");
Usuario.attachSchema(new SimpleSchema({
  Nombre: {
    type: String,
    label: "Nombre",
    unique: true,
    max: 200
  },
    ApellidoP: {
    type: String,
    label: "Apellido paterno",
    max: 200
  },
    ApellidoM: {
    type: String,
    label: "Apellido materno",
    max: 200
  },
  genero: {
        type: String,
        allowedValues: ['Masculino', 'Femenino'],
        unique: true,
        optional: true
        
  },
   "borrowedBy.$.email": {
        type: String,
        unique: true,
        regEx: SimpleSchema.RegEx.Email
    },
    password:{
    type: String,
    optional: true,
    min: 5
  },
  username: {
  type: String,
  unique: true,
  regEx: /^[a-z0-9A-Z_]{3,15}$/,
  custom: function () {
    if (Meteor.isClient && this.isSet) {
      Meteor.call("accountsIsUsernameAvailable", this.value, function (error, result) {
        if (!result) {
          Meteor.users.simpleSchema().namedContext("createUserForm").addInvalidKeys([{name: "Username", type: "notUnique"}]);
        }
      });
    }
  }
},
  Telefono: {
    type: String,
    unique: true,
    
  },
  rol: {
        type: String,
        unique: true,
        allowedValues: ['administrador', 'secretario'],
        optional: true
  },
}, { tracker: Tracker }));
Usuario.allow({
    insert: function(userId, doc)
    {
        return doc.owner === userId;
    }
})

Meteor.methods({
    'Usuario.remove'(UsuarioId){
        check(UsuarioId, String);
        Projects.remove(UsuariotId);
    }
});

Facultad = new Mongo.Collection("Facultad");
Facultad.attachSchema(new SimpleSchema({
  Facultad: {
    type: String,
    label: "Facultad",
    unique: true,
    max: 200
  },

}, { tracker: Tracker }));


Carrera = new Mongo.Collection("Carrera");

Carrera.attachSchema(new SimpleSchema({
  Carrera: {
    type: String,
    label: "Carrera",
    unique: true,
    max: 200
  },

}, { tracker: Tracker }));

UnidadM = new Mongo.Collection("UnidadM");
UnidadM.attachSchema(new SimpleSchema({
  UnidadM: {
    type: String,
    label: "Unidad Mayor",
    unique: true,
    max: 200
  },
}, { tracker: Tracker }));

UnidadD = new Mongo.Collection("UnidadD");
UnidadD.attachSchema(new SimpleSchema({
  UnidadD: {
    type: String,
    label: "Unidad Dependiente",
    unique: true,
    max: 200
  },
}, { tracker: Tracker }));

var Images = new FilesCollection({
  collectionName: 'Images',
  allowClientCode: false, // Disallow remove files from Client
  onBeforeUpload: function (file) {
    // Allow upload files under 10MB, and only in png/jpg/jpeg formats
    if (file.size <= 10485760 && /png|jpg|jpeg/i.test(file.extension)) {
      return true;
    } else {
      return 'Please upload image, with size equal or less than 10MB';
    }
  }
});

if (Meteor.isClient) {
  Meteor.subscribe('files.images.all');
}

if (Meteor.isServer) {
  Meteor.publish('files.images.all', function () {
    return Images.find().cursor;
  });
}



Schemas = {};
Posts   = new Meteor.Collection('posts');
Schemas.Posts = new SimpleSchema({
  title: {
    type: String,
    max: 60
  },
  picture: {
    type: String,
    autoform: {
      afFieldInput: {
        type: 'fileUpload',
        collection: 'Images',
        uploadTemplate: 'uploadField' // <- Optional
        
      }
    }
  }
});

Posts.attachSchema(Schemas.Posts);


// pruebas
Dig = new Mongo.Collection("Dig");
Dig.attachSchema(new SimpleSchema({
  title: {
    type: String,
    label: "Dia",
    max: 200
  },
  lastCheckedOut: {
    type: Date,
    label: "Fecha",
    optional: true
  },

      observaciones: {
        optional: true,
        type:[Notes]
    }

}, { tracker: Tracker }));

//imagenes

