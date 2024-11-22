let data=null
let exampleDiv=tag("example")
async function init(){
    console.log("at init")
    const response = await fetch(`example.yaml`)
    const text = await response.text()
    data=jsyaml.load(text)

    tag("area1").addEventListener("click",mapClick) 
    tag("area2").addEventListener("click",mapClick) 
}

function mapClick(evt){
    evt.preventDefault()

    if(tag("formula-"+evt.target.id)){
        tag("formula-"+evt.target.id).remove()
        return
    }


    console.log(tag("one").getBoundingClientRect().y)
    console.log("offsetTop",tag("one").offsetTop)
    const imgTop = window.scrollY + document.querySelector('#one').getBoundingClientRect().top
    const imgLeft = window.scrollY + document.querySelector('#one').getBoundingClientRect().left

    console.log("id",evt.target.id)
    const coords = evt.target.coords.split(",")

    console.log("coords",coords, coords[0]+imgLeft )
    var d = document.createElement('div');   
    d.style.position = "absolute";
    d.className = "formula"
    d.id="formula-"+evt.target.id
    d.style.left = parseFloat(coords[2])+imgLeft + 'px';
    d.style.top = parseFloat(coords[1])+imgTop + 'px'; 
    d.addEventListener("click",function(e){
        console.log(e.target)
        e.target.remove()
    })
    
    d.innerHTML=evt.target.dataset.formula
    tag("one").appendChild(d);    
    
}

function tag(id){
    return document.getElementById(id)
}

function nav(evt){
    const exampleContainer=getExampleContainer(evt.target)
    console.log("exampleContainer",exampleContainer)
    const maxStep=parseInt(exampleContainer.dataset.maxstep)
    const currentStep=parseInt(exampleContainer.dataset.showing)
    if(evt.target.dataset.direction==="next"){
        if(currentStep<maxStep){
            displayStep(exampleContainer,currentStep+1)
        }
    }else if(evt.target.dataset.direction==="prior"){
        if(currentStep>1){
            displayStep(exampleContainer,currentStep-1)
        }
    }else{
        displayStep(exampleContainer, parseInt(evt.target.innerHTML))      
    }
}

function displayStep(exampleContainer, stepNumber){
    console.log(stepNumber, typeof stepNumber)
    for(const stepContainer of exampleContainer.querySelectorAll(".step-container")){
        if(parseInt(stepContainer.dataset.step)===stepNumber){
            stepContainer.style.display="block"
            exampleContainer.dataset.showing=stepNumber
            exampleContainer.querySelector(".s-" + stepContainer.dataset.step).style.backgroundColor="skyblue"
        } else {
            console.log("hiding",stepContainer.dataset.step, exampleContainer.querySelector(".s-" + stepNumber))
            stepContainer.style.display="none"
            exampleContainer.querySelector(".s-" + stepContainer.dataset.step).style.backgroundColor="#ddd"
        }
      }    
}

function showStep(evt){
  displayStep(getExampleContainer(evt.target), parseInt(evt.target.innerHTML))
}

function getExampleContainer(elem){
    let exampleContainer=elem
    while(exampleContainer.className!=="example-container"){
      exampleContainer=exampleContainer.parentNode
    }  
    return exampleContainer
}