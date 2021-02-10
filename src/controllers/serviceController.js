const ServModel = require('../models/serviceModel');

//Funcion que se encarga de gestionar el proceso de insertar un nuevo servicio
const insertService = async (req, res) => {
   try {
      const {code, name, um, quantity, price} = req.body; //Seleccionar los parametros por desctructuracion
      const newService = new ServModel({ code,name, um, quantity, price, total: quantity*price}) //Inicializar el objeto model
      const servSave = await newService.save(); //Insertar el servicio en la base de datos
      res.json(servSave); //Mostrar el servicio insertado
   } catch (error) {
      res.status(500).json({
         message: error
      })
   }    
}
//Funcion que se encarga de buscar y retornar todos los servicios que se encuentran almacenados en mongoDB
const getServices = async (req, res) => {
    try {
       const allService = await ServModel.find(); //Se buscan todos los servicios de la collections
       console.log(allService);
       res.json(allService); //Se emiten los servicios
    } catch (error) {
       res.status(500).json({
          message: error
       })
    }  
 }
//Funcion que se encarga de buscar un servicio por id
 const getServiceById = async (req, res) => {
        try {
           const oneService = await ServModel.findById(req.params.id); //Se busca el servicio por un id especificado
           res.json(oneService); //Se emite el servicio
        } catch (error) {
           res.status(500).json({
              message: error
           })        }
 }
//Funcion que gestiona el proceso de busqueda de un servicio por code
 const getServiceByCode = async (req, res) => {
   try {
      const codeService = await ServModel.find({code: req.params.code}); //Se buscan los servicios que coincidan con code
      res.json(codeService); //Se emiten los servicios coincidentes, deberia de ser solo uno si se aplica la regla de code sea unique
   } catch (error) {
      res.status(500).json({
         message: error
      })        }
}
//Funcion que gestiona el proceso de busqueda de un servicio por name
const getServiceByName = async (req, res) => {
   try { 
      const req_name = decodeURI(req.params.name);
      const nameService = await ServModel.find({name: req_name}); //Se buscan los servicios que coincidan con name
      res.json(nameService); //Se emiten los servicios coincidentes
   } catch (error) {
      res.status(500).json({
         message: error
      })        }
}
//Funcion que gestiona el proceso de busqueda de un servicio por total
const getServiceByTotal = async (req, res) => {
   try {
      const totalService = await ServModel.find({total: req.params.total}); //Se buscan los servivios que coincidan con el total
      res.json(totalService); //Se emiten los servicios coincidentes
   } catch (error) {
      res.status(500).json({
         message: error
      })        }
}
//Funcion que se encarga del proceso de eliminar un servicio en la base de datos mongoDB
 const deleteServiceByID =  async (req, res) => {
    try {
        await ServModel.findByIdAndDelete(req.params.id);
        res.json({
           message: `Task ${req.params.id} have been delete successfully`
        })
    } catch (error) {
       res.status(500).json({
          message: error
       })
    }   
 }
//Funcion que se encarga del proceso de actualizar un servicio a partir de un id
 const updateServiceById = async (req, res) => {
    try {
       await ServModel.findByIdAndUpdate(req.params.id, req.body);
       res.json({
          message: "Service was updated successfully"
       })
    } catch (error) {
       res.status(500).json({
          message: error
       })
    }    
 }

module.exports = {
                  insertService, 
                  getServices, 
                  getServiceById, 
                  deleteServiceByID, 
                  updateServiceById,
                  getServiceByCode,
                  getServiceByName,
                  getServiceByTotal
               };