const data = {
	"email": "pamayin@gmail.com",
	"password": "Abc34$",
	"role": "NORMAL"
}

function mapJsonDataToFields(jsonData) {
    const keys = Object.keys(jsonData);
    const values = Object.values(jsonData); 

    let fields = `(${keys.join(', ')})`;
    let fieldsValues = convertValuesToString(values);

    return {
        "tableFields": fields, //Retorna un String con el nombre de los campos 
        "fieldsValues": fieldsValues, //Retorna un String con los valores de los campos,
        "numOfField": values.length //Retorna la cantidad de parámetros que debe de declarar
    }
}

function convertValuesToString(valuesArray) {
    let fieldsValues = '(';

    valuesArray.forEach(value => {
        if(typeof value === 'string'){
            fieldsValues += `'${value}',`
        }else{
            fieldsValues += `${value},`
        }
    });
    
    fieldsValues = fieldsValues.slice(0, -1);
    fieldsValues += ')'
    return fieldsValues;
}

module.exports = {
    mapJsonDataToFields,
}