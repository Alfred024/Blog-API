function mapJsonDataToFields(jsonData) {
    const keys = Object.keys(jsonData);
    const values = Object.values(jsonData); 

    let fields = `(${keys.join(', ')})`;
    let valuesFields = convertValuesToString(values);

    return {
        "tableFields": fields, //Retorna un String con el nombre de los campos 
        "valuesFields": valuesFields, //Retorna un String con los valores de los campos,
    }
}

function convertValuesToString(valuesArray) {
    let valuesFields = '(';

    valuesArray.forEach(value => {
        if(typeof value === 'string'){
            valuesFields += `'${value}',`
        }else{
            valuesFields += `${value},`
        }
    });
    
    valuesFields = valuesFields.slice(0, -1);
    valuesFields += ')'
    return valuesFields;
}

module.exports = {
    mapJsonDataToFields,
}