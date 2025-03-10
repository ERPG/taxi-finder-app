import { BatteryEmptyIcon, Battery10Icon, Battery25Icon, Battery50Icon, Battery75Icon, BatteryFullIcon } from "@freenow/wave";

export const getBatteryIcon = (fuel: number | null) => {
    if (fuel === null || fuel < 0) return null;
    if (fuel === 0) return <BatteryEmptyIcon size={18} color="red" />;
    if (fuel <= 10) return <Battery10Icon size={18} color="orange" />;
    if (fuel <= 25) return <Battery25Icon size={18} color="yellow" />;
    if (fuel <= 50) return <Battery50Icon size={18} color="green" />;
    if (fuel <= 75) return <Battery75Icon size={18} color="green" />;
    return <BatteryFullIcon size={18} color="darkgreen" />;
};