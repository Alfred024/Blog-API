function evalueateMethod(method, baseUrl, options, data) {

    //Este URL ya trae el nombre de una tabla
    let url = baseUrl;

    if((method === 'POST') || (method === 'PUT') || (method === 'DELETE')){
        if(method !== 'DELETE'){
            options.data = data;
        }

        if((method === 'PUT') || (method === 'DELETE')){
            const { id } = data;
            baseUrl += `/${id}`;
        }   
    }else{
        if(data){
            const jsonLenght = Object.keys(data).length;
            //caso 1: el lenght es 0 (get by id)
            if(jsonLenght === 0){
                const { id } = data;
                baseUrl += `/${id}`;
            }
            else {
                //caso 2: el lenght es 2 (get en base a el valor de un campo de la tabla)
                if(jsonLenght === 2){
                    const { param_name, param_value } = data;
                    const data = {
                        "param_name": param_name,
                        "param_value": param_value,
                    };
                }

                //caso 3: el length es 4 (es un get que involucra a 2 tablas/JOIN)
                else{
                    const { table_main, table_secondary, id_table_secondary, id } = data;
                    const data = {
                        "table_main": table_main, 
                        "table_secondary": table_secondary, 
                        "id_table_secondary": id_table_secondary, 
                        "id": id,
                    };
                }

                options.data = data;
            }
        }
    }

    return {
        "data": options.data,
        "url": url,
    }
}
