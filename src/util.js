export function setDeepProp(obj, value, fields) {
    if (fields.length === 1) {
        obj[fields[0]] = value;
        return;
    }
    const prop = fields.shift();
    if (!obj[prop]) {
        if (parseInt(prop, 10) >= 0){
            obj[prop] = [];
        } else {
            obj[prop] = {};
        }
    }
    return setDeepProp(obj[prop], value, fields);
}

export const getSafe = (obj, def = "") => obj !== null && obj !== undefined ? obj : def;

function getPropRecurse(obj, props) {
    if (props.length === 1) {
        return obj[props[0]];
    }
    const prop = props.shift();
    return getPropRecurse(getSafe(obj[prop], {}), props);
}

export function getProp(obj, prop) {
    const props = prop.split(".");
    return getPropRecurse(getSafe(obj, {}), props);
}