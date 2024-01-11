function mapJsonDataToFields_Insert(jsonData) {
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
        valuesFields += evaluateTypeOfData(value)+',';
    });
    
    valuesFields = valuesFields.slice(0, -1);
    valuesFields += ')'
    return valuesFields;
}

function evaluateTypeOfData(value) {
    if(typeof value === 'string'){
        return `'${value}'`
    }else{
        return `${value}`
    }
}

function mapJsonDataToFields_Update(jsonData, index) {
    const fieldName = Object.keys(jsonData)[index];
    const fieldNewValue = Object.values(jsonData)[index];

    return {
        "fieldName": fieldName, //Retorna el nombre del campo a modificar
        "fieldNewValue": fieldNewValue, //Retorna el nuevo valor del campo 
    }
}

module.exports = {
    mapJsonDataToFields_Insert,
    mapJsonDataToFields_Update,
}