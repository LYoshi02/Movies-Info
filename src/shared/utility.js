export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    }
}

export const getLongDate = (originalDate = new Date()) => {
    const dateOptions = { year: "numeric", month: "long", day: "numeric" };
    const formatedDate = new Date(originalDate).toLocaleDateString("es-ES", dateOptions);
    
    return formatedDate;
}