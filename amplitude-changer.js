const template = document.createElement("template");
template.innerHTML = `
            <style>
                .row {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-evenly;
                    align-items: baseline;
                }
                .row label{
                    font-size: x-large;
                    font-family: "Comic Sans MS", serif;
                }
                .row input{
                    transform: scale(2);
                }
                #input{
                    font-size: x-large;
                    font-family: "Comic Sans MS", serif;
                    margin: 0 10px;

                }
                .wrapper{
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-content: center;
                    border-radius: 20px;
                    background-color: #cdf388;
                }
                #sliderShower{
                    position: absolute;
                    width: 30px;
                    height: 30px;
                    background-color: #0d6efd;
                    color: white;
                    border-radius: 10px;
                    font-family: "Comic Sans MS", serif;
                    top: 5px;
                    text-align: center;
                    pointer-events: none;
                    cursor: not-allowed;
                    opacity: 1;
                    margin: 0;
                    padding: 2px 0 0 0;
                }
                .sliderWrapper{
                    position: relative;
                    padding: 10px;
                }
                #slider::-webkit-slider-thumb{
                    opacity: 0;
                }
                .sliderWrapper > input{
                    width: 100%;
                    
                }
                h1{
                    font-family: "Comic Sans MS", serif;
                    text-align: center;
                    
                }

              </style>

            <div class="wrapper">
                <h1>Zmena amplitúdy</h1>
                <div class="row">
                <label for="checkBoxForTextInput">Textový vstup</label>
                <input type="checkbox" id="checkBoxForTextInput" class="graphCheckbox">
                </div>

                <input type="number" min="1" max="20" id="input" value="6">
                <div class="row">
                    <label for="checkBoxForSlider">Slider</label>
                    <input type="checkbox" id="checkBoxForSlider" class="graphCheckbox">
                </div>

                 <div class="sliderWrapper">
                    <input type="range" value="6" min="1" max="21" id="slider">
                    <label for="slider"> </label>
                    <div id="sliderShower" </div>
                 </div>

            </div>
            `


class AmplitudeChanger extends HTMLElement{
    constructor() {
        super();

        this.attachShadow({mode: 'open'});
        const shadowRoot = this.shadowRoot;
        shadowRoot.appendChild(template.content.cloneNode(true));
        const slider = shadowRoot.querySelector("#slider");
        const sliderShower = shadowRoot.querySelector("#sliderShower");
        sliderShower.innerHTML = slider.value;
        let full = slider.offsetWidth;
        sliderShower.style.left = (slider.value-1)*(full/21)+10+"px";

        slider.oninput = function (){
            if(slider.value>20){
                slider.value = 20;
            }
            sliderShower.innerHTML = slider.value;
            full = slider.offsetWidth;
            sliderShower.style.left = (slider.value-1)*(full/21)+10+"px";
        }

        shadowRoot.querySelector(".sliderWrapper").style.visibility = "hidden";
        shadowRoot.querySelector("#input").style.visibility = "hidden";
        shadowRoot.querySelector("#checkBoxForSlider").onchange = function () {
            if(this.checked){
                shadowRoot.querySelector(".sliderWrapper").style.visibility = "visible";
            }
            else{
                shadowRoot.querySelector(".sliderWrapper").style.visibility = "hidden";
            }

        }
        shadowRoot.querySelector("#checkBoxForTextInput").onchange = function () {
            if(this.checked){
                shadowRoot.querySelector("#input").style.visibility = "visible";
            }else{
                shadowRoot.querySelector("#input").style.visibility = "hidden";
            }
        }
        shadowRoot.querySelector("#input").onchange = function (){
            shadowRoot.querySelector("#slider").value = this.value;
            constant = this.value;
            full = slider.offsetWidth;
            sliderShower.style.left = (slider.value-1)*(full/21)+"px";
            shadowRoot.querySelector("#sliderShower").innerHTML = this.value;
        }
        shadowRoot.querySelector("#slider").onchange = function (){
            constant = this.value;
            shadowRoot.querySelector("#input").value = this.value;
        }

    }
}