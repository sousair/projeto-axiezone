module.exports = app => {
    function exists (value, msg) {
        if(!value) throw msg
        if(Array.isArray(value) && value.length === 0) throw msg
        if(typeof value === 'string' && !value.trim) throw msg
    }

    function notExists (value, msg) {
        try {
            exists(value, msg)
        } catch (msg) {
            return
        }
        throw msg
    }

    function isEqual (valueA, valueB, msg) {
        if(valueA !== valueB) throw msg
    }

    return { exists, notExists, isEqual }
}