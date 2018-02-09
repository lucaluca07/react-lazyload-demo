const getScrollParent = (node) => {
    if(!node){
        return document.documentElement
    }

    let parent = node ;
    let i = 0 ;
    const overflowReg = /(scroll|auto)/
    while(parent){
        //console.log("parent:::",parent)
        i = i+1
        if(!parent.parentNode){
            console.log(33333333)
            return document.documentElement 
        }
        const {overflow} = window.getComputedStyle(parent)
        console.log(i,parent,overflow)
        if(overflowReg.test(overflow)){
            console.log(111111111,parent)
            return parent
        }
        parent = parent.parentNode
    }
    return document.documentElement
}

export default getScrollParent