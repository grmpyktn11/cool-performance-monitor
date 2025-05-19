import si from "systeminformation";

(async () => {
    try {
        const bt = await si.usb();
        console.log(JSON.stringify(bt, null, 2));
    } catch (err) {
        console.error("Error fetching Bluetooth devices:", err);
    }
})();