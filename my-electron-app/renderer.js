const cpuTempDisplay = document.getElementById('cpu-temp');
const cpuUsageDisplay = document.getElementById("cpu-usage")
const cpuBar = document.getElementById("cpu-bar")

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
            cpuUsageDisplay.innerText = `CPU Usage data: ${Math.round(cpuUsage)}%`;
            cpuBar.innerText = makeBar(cpuUsage);
        }
    }
    catch(error){
        console.error("Error finding cpu usage");
        cpuUsageDisplay.innerText = "Cannot find cpu usage"
    }
}

const updateStats = () =>{
    updateCpuTemp();
    updateCPUUsage();
}

updateStats(); // Initial update
setInterval(updateStats, 5000); // Update every 5 seconds