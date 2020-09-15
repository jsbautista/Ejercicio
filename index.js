const fs = require("fs");
const axios = require("axios");
const url = require('url');
const http = require("http");

const url1 = 
  "https://gist.githubusercontent.com/josejbocanegra/d3b26f97573a823a9d0df4ec68fef45f/raw/66440575649e007a9770bcd480badcbbc6a41ba7/proveedores.json";
const url2 =
  "https://gist.githubusercontent.com/josejbocanegra/986182ce2dd3e6246adcf960f9cda061/raw/f013c156f37c34117c0d4ba9779b15d427fb8dcd/clientes.json";
  let opcion="";
  let tablaHtml="";
let createTableCliente=function (datos)
{
    
for(let x in datos){
    console.log(datos[x]);
tablaHtml+="<tr><th scope='row'>"+datos[x].idCliente+"</th><td>"+datos[x].NombreCompania+"</td><td>"+datos[x].NombreContacto+"</td></tr>";
}
}
let createTableProveedor=function (datos)
{
    
for(let x in datos){
    console.log(datos[x]);
tablaHtml+="<tr><th scope='row'>"+datos[x].idproveedor+"</th><td>"+datos[x].nombrecompania+"</td><td>"+datos[x].nombrecontacto+"</td></tr>";
}
}


let modificarHtml= (callback)=>{


  fs.readFile("index.html", (err, data) => {    //Operacion
    let pageContent = data.toString();
    pageContent = pageContent.replace("{{replaceText}}", "<h1 class='text-center'>Listado de "+opcion+"</h1>");    
    pageContent = pageContent.replace("{{replaceTable}}", tablaHtml);
    callback(pageContent);
  });
};
http
  .createServer((req, res) => {
    
        var peticion = url.parse(req.url);
        var ruta=peticion.pathname;
        

        if(ruta=="/api/proveedores"){
        axios.get(url1).then((response)=>createTableProveedor(response.data));
            opcion="provedores ";
        }
        if(ruta=="/api/clientes"){
         axios.get(url2).then((response)=>createTableCliente(response.data));
         opcion="clientes ";
        }
  
        
    modificarHtml((data)=>{
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data.toString());
    
  });
})
  .listen(8081);
