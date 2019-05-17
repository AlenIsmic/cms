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

const hasOwnProperty = Object.prototype.hasOwnProperty;

export function isEmpty(obj){

    // null and undefined are "empty"
    if (obj == null) return true;

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length > 0)    return false;
    if (obj.length === 0)  return true;

    // If it isn't an object at this point
    // it is empty, but it can't be anything *but* empty
    // Is it empty?  Depends on your application.
    if (typeof obj !== "object") return true;

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }

    return true;
}

export const routes = {
    "home":"/",
    "login":"/login",
    "news":"/news",
};