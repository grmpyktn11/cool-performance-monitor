const cpuTempDisplay = document.getElementById('cpu-temp');
const cpuUsageDisplay = document.getElementById("cpu-usage")
const cpuBar = document.getElementById("cpu-bar")
const ramDisplay = document.getElementById("ram-usage")
const ramBar = document.getElementById("ram-bar")
const wifiDisplay = document.getElementById("wifi-display")
const programmingFacts = [
  "The first computer bug was an actual moth stuck in a relay (1947).",
  "The term 'debugging' comes from removing that moth from Harvard's Mark II computer.",
  "The original name for Python was going to be 'Monty’s Flying Circus' (after Monty Python).",
  "JavaScript was created in just 10 days by Brendan Eich in 1995.",
  "The first computer programmer was Ada Lovelace (1815–1852), who wrote algorithms for Charles Babbage's Analytical Engine.",
  "The 'Hello, World!' program tradition started with Kernighan & Ritchie’s 1978 C book.",
  "There are over 700 programming languages, but only about 20 are widely used.",
  "The longest function name in Windows API is `GetOpenFileNameExW` (26 characters).",
  "The QWERTY keyboard layout slows down coding—Dvorak is theoretically faster for programming.",
  "The first video game was created by a physicist (William Higinbotham, 1958).",
  "A programmer accidentally deleted $300M by missing a `-` sign in code (1990, AT&T).",
  "The most expensive software bug ever cost $1.2B (Ariane 5 rocket explosion, 1996).",
  "The first computer virus was called 'Creeper' (1971) and displayed 'I’M THE CREEPER: CATCH ME IF YOU CAN.'",
  "The first webcam was invented to monitor a coffee pot at Cambridge University (1991).",
  "The world's first computer password was likely '12345' (1960s, MIT).",
  "The longest-standing unresolved bug in Linux lasted 15 years (2001–2016).",
  "The first version of Photoshop was called 'Display' (1987).",
  "The shortest possible URL is `http://a.com` (but it doesn’t lead anywhere).",
  "The `sudo` command stands for 'SuperUser DO' (not 'Super User Doom').",
  "The original Apple logo featured Isaac Newton under a tree (1976).",
  "The first computer mouse was made of wood (1964, Doug Engelbart).",
  "The first-ever domain name was `symbolics.com` (registered in 1985).",
  "The longest function name in Linux kernel is `security_secid_to_secctx()` (28 chars).",
  "The most common password is still '123456' (despite decades of warnings).",
  "The first ransomware attack happened in 1989 (via floppy disks!)."
];
const factoid = document.getElementById('fact-display')

const makeBar = (percentage) =>{
    let hashNum = Math.floor(percentage / 4);
    let dashNum = 25 - hashNum;

    return `<${'#'.repeat(hashNum)}${'-'.repeat(dashNum)}> `
}

const updateCpuTemp = async () => {
    try {
        // Call the function to get the promise

        const cpuTemp = await window.versions.cpuTemp();
        // Check what properties are available
        console.log(`${JSON.stringify(cpuTemp)}`);
        if (cpuTemp === undefined) {
            cpuTempDisplay.innerText = "CPU temp data is undefined";
       
        } if(Math.round(cpuTemp.main) == 0){
            cpuTempDisplay.innerText = "Your system does not suppoer cpu temp monitoring. Did you enable admin perms?"
        }  else {
            cpuTempDisplay.innerText = `CPUTemp data: ${Math.round(cpuTemp.main)}`;
            
        }
    }
    catch(error) {
        console.error("Error fetching CPU temp:", error);
        cpuTempDisplay.innerText = "FAILED TO GET CPU TEMP";
    }
}

const updateCPUUsage = async () => {
    try{
        const cpuUsage = await window.versions.cpuUsage();
        if(cpuUsage === undefined){
            cpuUsageDisplay.innerText = "FAILED TO GET CPU USAGE"
        }
        else{
            cpuUsageDisplay.innerText = `CPU usage data: ${Math.round(cpuUsage)}%`;
            cpuBar.innerText = makeBar(cpuUsage);
        }
    }
    catch(error){
        console.error("Error finding cpu usage");
        cpuUsageDisplay.innerText = "Cannot find cpu usage"
    }
}

const updateRamUsage = async () => {
    try{
        const ramUse = await window.versions.ramUsage();
        if(ramUse === undefined){
            ramUsage.innerText = "FAILED TO GET RAM USAGE"
        }
        else{
            ramDisplay.innerText = `Ram usage data: ${Math.round(ramUse)}%`;
            ramBar.innerText = makeBar(ramUse);
        }
    }
    catch(error){
        console.error("error finding ram usage")
        ramDisplay.innerText = "cannot get ram usage"
    }
}
const updateWifi =async () => {
    try{
        const wifi = await window.versions.wifiSignal()
        console.log(`wifi in renderer: ${wifi}`)
        switch(wifi){
            case 1:
                wifiDisplay.innerText = "Wifi Signal: Great";
                wifiDisplay.style.color = "green"
                break;
            case 2: 
            wifiDisplay.innerText = "Wifi Signal: Okay";
            wifiDisplay.style.color = "yellow"
            break;
            case 3:
            wifiDisplay.innerText = "Wifi Signal: Bad";
            wifiDisplay.style.color = "red"
            break;
            default:
                wifiDisplay.innerText = "error";
        } 
    }
    catch (error){
        wifiDisplay.innerText = "error"
    }
}
const updateFact = () => {
    const randomIndex = Math.floor(Math.random() * programmingFacts.length);
    factoid.innerText = programmingFacts[randomIndex];
}


const updateStats = () =>{
    updateCpuTemp();
    updateCPUUsage();
    updateRamUsage();
    updateWifi();
}

updateStats(); // Initial update
updateFact();
setInterval(updateStats, 5000); // Update every 5 seconds
setInterval(updateFact, 15000);