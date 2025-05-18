const information = document.getElementById('info')

const updateCpuTemp = async () => {
    try{
        const data = await window.versions.cpuTemp;
        information.innerText = `CPUTemp: ${data.main}`;
    }
    catch(error){
        information.innerText = "FAILED TO GET CPU TEMP"
    }
}