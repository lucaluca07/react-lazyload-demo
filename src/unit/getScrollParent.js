const getScrollParent = (node) => {
    if(!node){
        return document.documentElement
    }

    let parent = node ;
    const overflowReg = /(scroll|auto)/
    if(parent){
        if(!parent.parentNode){
            return document.documentElement 
        }
        const {overflow} = window.getComputedStyle(patent)
        if(overflowReg.text(overflow)){
            return parent
        }

    }
    return document.documentElement
}

export default getScrollParent