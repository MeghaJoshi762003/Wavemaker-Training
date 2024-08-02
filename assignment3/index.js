let store;
let doc=document.getElementById("display")
function Store()
{
    store=(Number(doc.value));
    console.log(doc.value)
    // console.log('Store ${store}');
}
function Setzero()
{
    store=0
}
function Recall()
{
    doc.value = store;
}
function Memoryadd()
{
    doc.value =Number(doc.value)+store    
}
function Memorysub()
{
    doc.value =Number(doc.value)-store    
}   
function Appendnumber(num)
{
    doc.value+=num
}
function Clear()
{
    doc.value=null
}
function Removelast()
{
    doc.value=doc.value.slice(0,-1)
}
function Changesign()
{
        doc.value= -doc.value
        
}
function Underroot()
{
    doc.value=Number(doc.value)**(1/2);
    
}
let first
let operation
function Operation(s)
{
    operation=s
    first=Number(doc.value)
    doc.value+=s
}
function Equal()
{
    
    const opIndex = doc.value.indexOf(operation);
    const num= doc.value.substring(opIndex + 1);
    console.log(first);
    console.log(num)
    switch(operation)
    {
        case '+':doc.value=first+Number(num);break;
        case '-':doc.value=first-Number(num);break;
        case '*':doc.value=first*Number(num);break;
        case '/':doc.value=first/Number(num);break;
        case '%':doc.value=first%Number(num);break;
    }
    
}
function Reciprocal(){
    doc.value=1/doc.value;
}