function evalueateMethod(method, baseUrl, options, data) {
    let url = baseUrl;
    let newOptions = options;

    if((method === 'POST') || (method === 'PUT') || (method === 'DELETE')){
        if(method === 'POST'){
            newOptions.data = data;
        }

        if(method === 'DELETE'){
            const id = data;
            url += `/${id}`;
        }
        
        if(method === 'PUT' || method === 'PATCH'){
            const { id, jsonData } = data;
            url += `/${id}`;
            newOptions.data = jsonData;
        }
    }else{
        if(data){
            if(typeof data === 'string'){
                const id = data;
                url += `/${id}`;
            }else {
                const jsonLenght = Object.keys(data).length;
                let jsonData;

                //caso 2: el lenght es 2 (get por paginación)
                if(jsonLenght === 2){
                    const { limit, offset } = data;
                    jsonData = {
                        "limit": limit,
                        "offset": offset,
                    };
                }else{
                    //caso 3: el lenght es 3 (get en base a el valor de un campo de la tabla)
                    if(jsonLenght === 3){
                        const { table, param_name, param_value } = data;
                        jsonData = {
                            "table": table,
                            "param_name": param_name,
                            "param_value": param_value,
                        };
                        url += `/${param_name}/${param_value}`;
                    }
    
                    //caso 4: el length es 4 (es un get que involucra a 2 tablas/JOIN)
                    else{
                        const { endpoint, main_table, secondary_table, id_secondary_table, id } = data;
                        jsonData = {
                            "endpoint": endpoint,
                            "main_table": main_table, 
                            "secondary_table": secondary_table, 
                            "id_secondary_table": id_secondary_table, 
                            "id": id,
                        };
                        url += `/${endpoint}/${id}`
                    }
                }
                
                newOptions.data = jsonData;
            }
        }
    }

    return {
        "newOptions": newOptions,
        "newUrl": url,
    }
}

module.exports = {
    evalueateMethod, 
}