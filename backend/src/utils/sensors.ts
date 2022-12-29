export default class Sensors {
    static locations = ["napa", "kastari", "foodoo"];
    static napa: Array<string> = [
        "A81758FFFE030F8B",
        "A81758FFFE03101F",
        "A81758FFFE030F5A",
        "A81758FFFE031055",
        "A81758FFFE031073",
        "A81758FFFE046581",
        "A81758FFFE030F79",
        "A81758FFFE031004",
        "A81758FFFE031034",
        "A81758FFFE030D50",
        "A81758FFFE03100C",
        "A81758FFFE030F7B",
        "A81758FFFE046580",
        "A81758FFFE0464FB",
        "A81758FFFE0464FD",
    ];

    static getSensorsForLocation(location: string): Array<string> {
        switch (location) {
            case "napa":
                return this.napa;
            case "kastari":
            case "foodoo":
            default:
                return [];
        }
    }
}
