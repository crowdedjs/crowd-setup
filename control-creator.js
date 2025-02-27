class ControlCreator {
  PLAY_STATE_STOP = 0;
  PLAY_STATE_PLAY_FORWARD = 1;
  PLAY_STATE_PLAY_BACKWARD = -1;

  playState = this.PLAY_STATE_PLAY_FORWARD;
  playSpeed = 100;

  constructor(secondsOfSimulation, millisecondsPerFrame, simulations, elementParent, buttonClass = "") {
    let self = this;
    this.simulations = simulations;
    this.secondsOfSimulation = secondsOfSimulation;
    this.millisecondsPerFrame = millisecondsPerFrame;
    
    this.simulationStopTime; //The wall clock time when we stopped simulating because we got to the end





    let canvas = document.createElement("canvas");
    canvas.id = "canv";
    elementParent.appendChild(canvas);

    let divRange = document.createElement("div");
    elementParent.appendChild(divRange)
    divRange.style.position = "fixed"
    divRange.style.top = "20px";
    divRange.style.left = "50%";
    divRange.id = "divRange";
    divRange.style.visibility = "hidden"

    let divChild = document.createElement("div");
    divChild.style.position = "relative";
    divChild.style.left = "-50%";
    divRange.appendChild(divChild);

    let divTop = document.createElement("div");
    let divBottom = document.createElement("div");
    divChild.appendChild(divTop);
    divChild.appendChild(divBottom);

    let inputRange = document.createElement("input");
    inputRange.type = "range"
    inputRange.min = 0;
    inputRange.max = secondsOfSimulation * 1_000 / this.millisecondsPerFrame - 1;
    inputRange.value = 0;
    inputRange.class = "slider";
    inputRange.id = "myRange";
    divTop.appendChild(inputRange);

    let buttonElementName = "button"


    let buttonRev = document.createElement(buttonElementName);
    buttonRev.innerText = "◄"
    if (buttonClass)
      buttonRev.classList.add(buttonClass)
    buttonRev.addEventListener('click', () => self.clickPlayButton(self.PLAY_STATE_PLAY_BACKWARD))
    divBottom.appendChild(buttonRev);

    let buttonStop = document.createElement(buttonElementName);
    if (buttonClass)
      buttonStop.classList.add(buttonClass)
    buttonStop.innerText = "█"
    buttonStop.addEventListener('click', () => self.clickPlayButton(self.PLAY_STATE_STOP))
    divBottom.appendChild(buttonStop);

    let buttonPlay = document.createElement(buttonElementName);
    if (buttonClass)
      buttonPlay.classList.add(buttonClass)
    buttonPlay.innerText = "►"
    buttonPlay.addEventListener('click', () => self.clickPlayButton(self.PLAY_STATE_PLAY_FORWARD))
    divBottom.appendChild(buttonPlay);

    let x1Speed = document.createElement(buttonElementName);
    if (buttonClass)
      x1Speed.classList.add(buttonClass)
    x1Speed.innerText = "x1"
    x1Speed.addEventListener('click', () => self.clickPlaySpeed(1))
    divBottom.appendChild(x1Speed);

    let x5Speed = document.createElement(buttonElementName);
    if (buttonClass)
      x5Speed.classList.add(buttonClass)
    x5Speed.innerText = "x5"
    x5Speed.addEventListener('click', () => self.clickPlaySpeed(5))
    divBottom.appendChild(x5Speed);

    let x10Speed = document.createElement(buttonElementName);
    if (buttonClass)
      x10Speed.classList.add(buttonClass)
    x10Speed.innerText = "x10"
    x10Speed.addEventListener('click', () => self.clickPlaySpeed(10))
    divBottom.appendChild(x10Speed);

    let x100Speed = document.createElement(buttonElementName);
    if (buttonClass)
      x100Speed.classList.add(buttonClass)
    x100Speed.innerText = "x100"
    x100Speed.addEventListener('click', () => self.clickPlaySpeed(100))
    divBottom.appendChild(x100Speed);

    document.body.appendChild(divRange);

    let divCounterParent = document.createElement("div");
    divCounterParent.style.position = "fixed";
    divCounterParent.style.top = "20px";
    divCounterParent.style.right = "20px";

    let divCounter = document.createElement("div");
    divCounter.id = "counter";
    divCounter.style.backgroundColor = "lightgray"
    divCounter.style.textShadow = "1px 1px white"
    divCounterParent.appendChild(divCounter);

    document.body.appendChild(divCounterParent);

    let divLoading = document.createElement("div");
    divLoading.style.position = "absolute";
    divLoading.style.left = "50%";
    divLoading.style.top = "50%";
    divLoading.id = "loading";
    document.body.appendChild(divLoading);

    let divLoadingChild = document.createElement("div");
    divLoadingChild.style.position = "relative";
    divLoadingChild.style.left = "-50%";
    divLoadingChild.style.top = "-50%";
    divLoadingChild.style.padding = "1rem"
    divLoadingChild.innerText = "Loading the Simulation";
    divLoadingChild.style.backgroundColor = "white";
    divLoading.appendChild(divLoadingChild);

    let divOptions = document.createElement("div");
    divOptions.style.position = "absolute";
    divOptions.style.left = "20px";
    divOptions.style.bottom = "20px";
    document.body.appendChild(divOptions);
  }
  boot() {
    document.getElementById("loading").style.visibility = "hidden";
    document.getElementById("divRange").style.visibility = "visible";

  }
  clickPlayButton(state) {
    this.playState = state;
  }

  clickPlaySpeed(speed) {
    this.playSpeed = speed;
  }

  asTime(ticks) {
    let milliseconds = ticks * this.millisecondsPerFrame;

    let hours = Math.floor(milliseconds/(60*60*1000))
    let remainder = milliseconds - hours * (60*60*1000);
    let minutes = Math.floor(remainder / (60*1000));
    remainder = remainder - minutes * (60*1000);
    let seconds = Math.floor(remainder / 1000);
    remainder -= seconds * 1000;
    remainder = Math.floor(remainder);
    return ("" + hours).padStart(2,"0") + ":" + ("" + minutes).padStart(2, "0") + ":" + ("" + seconds).padStart(2, "0") + ":" + ("" + remainder).padStart(3, "0");
    //return milliseconds;
  }

  optionsButtonClick() {
    let div = document.getElementById("divDialog");
    if (div.style.visibility == "hidden") {
      div.innerHTML = '';
      for (let i = 0; i < this.simulations.length; i++) {
        let divLink = document.createElement("div");
        div.appendChild(divLink);

        let simulation = this.simulations[i];

        let a = document.createElement("a");
        console.log(window.pathname);
        let pathname = window.pathname;
        if (!pathname || pathname == "undefined" || pathname == "NaN")
          pathname = '';
        a.href = `?obj=${simulation.objPath}&arrival=${simulation.arrivalPath}&seconds=${simulation.secondsOfSimulation}&location=${simulation.locationsPath}`;
        //a.href="#"
        a.innerText = simulation.title;
        //a.addEventListener('click', ()=>window.search = `objPath=${simulation.objPath}&arrivalPath=${simulation.arrivalPath}&secondsOfSimulation=${simulation.secondsOfSimulation}&locationsPath=${simulation.locationsPath}`)
        divLink.appendChild(a);
      }
      div.style.visibility = "visible";
    }
    else
      div.style.visibility = "hidden";
  }
  getPlayState() {
    return this.playState;
  }
  getPlaySpeed() {
    return this.playSpeed;
  }
  update(allSimulations, firstTicks) {
    let state = this.getPlayState();
    let speed = this.getPlaySpeed();
    let advance = state * speed;
    let currentIndex = this.getCurrentTick();
    let newIndex = currentIndex + advance;

    if (newIndex < 0) {
      newIndex = 0;
    }

    let isSimulating = this.secondsOfSimulation >= allSimulations[0].length
    if(isSimulating){
      this.simulationStopTime = null
    }
    else{
      if(this.simulationStopTime == null){
        this.simulationStopTime = new Date()
        console.log(this.simulationStopTime)
      }
    }

    if (newIndex >= Math.max(...allSimulations.map(i => i.length)))
      newIndex = Math.max(...allSimulations.map(i => i.length)) - 1;
    this.setTick(newIndex);
    //let elpasedTime = new Date() - this.start;
    //let vel = Math.max(...allSimulations.map(i=>i.length) )/(elpasedTime/1000);
    let vels = [];
    for (let i = 0; i < allSimulations.length; i++) {
      if(isSimulating)
        vels.push(allSimulations[i].length / ((new Date() - firstTicks[i]) / 1000));
      else{
        vels.push(allSimulations[i].length / ((this.simulationStopTime - firstTicks[i]) / 1000));
      }
    }
    let value = "" 
      + this.asTime(document.getElementById("myRange").value) + " slider time"
      + "<br>" + this.millisecondsPerFrame/1_000 + " second per tick"
      + "<br>" + allSimulations.map(i => "" + this.asTime(i.length-1) + " in-simulation time").join(",") //Where in the simulation the slider is
      + "<br>" + this.asTime(this.secondsOfSimulation * 1_000 / this.millisecondsPerFrame) + " in-simulation end time" // Simulation time when the simulation will stop
      + "<br>" + allSimulations.map(i => "" + (i.length-1) + " frames calculated").join(",") //Where in the simulation we are simulating
      + "<br>" + vels.map(i => (this.secondsOfSimulation) + "  frames to calculate").join(",") // Total number of frames we are going to calculate
      + "<br>" + vels.map(i => i.toFixed(2) + " fps").join(",") // The number of frames we are calcuating (calculated) per second
      // + "<br>" + vels.map(i => (this.asTime(i.length) / this.secondsOfSimulation) + " fps").join(",")
      if(isSimulating){
        value +=  "<br>" + this.asTime((this.secondsOfSimulation  - allSimulations[0].length )/vels[0]) +  " time until done" // Time until the simulation will be done
        value +=  "<br>" + this.asTime((new Date  - firstTicks[0] )/1_000) +  " time spent" // Time until the simulation will be done
      }
      else
          value += "<br> Done Simulating in " + this.asTime((this.simulationStopTime - firstTicks[0])/1_000)

    document.getElementById("counter").innerHTML = value;
  }
  getCurrentTick() {
    let rangeElement = document.getElementById("myRange");
    return +rangeElement.value
  }
  setTick(tick) {
    let rangeElement = document.getElementById("myRange");
    rangeElement.value = tick;
  }
}

export default ControlCreator;