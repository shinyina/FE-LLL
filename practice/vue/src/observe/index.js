class Observer {
    constructor(data) {
        this.walk(data)
    }
    walk(data) {
        Object.keys(data).forEach(key => defineRactive(data, key, data[key]))
    }
}

function defineRactive(data, key, value) {
    observe(value)
    Object.defineProperty(data, key, {
        get() {
            return value
        },
        set(newValue) {
            value = newValue
        }
    })
}

export function observe(data) {
    if (typeof data !== 'object' || data === null) {
        return
    }
    return new Observer(data);
}
