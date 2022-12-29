// pr
export default class Sensors {
    static locations = ["napa", "kastari", "foodoo", "mara", "foobar"];
    static napa = [
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

    static kastari = [
        "A81758FFFE031005",
        "A81758FFFE046337",
        "A81758FFFE030F47",
        "A81758FFFE031051",
        "A81758FFFE03102C",
        "A81758FFFE0463B0",
    ];

    static foodoo = [
        "A81758FFFE030FB5",
        "A81758FFFE03103C",
        "A81758FFFE046576",
        "A81758FFFE030FFD",
        "A81758FFFE046430",
        "A81758FFFE031089",
    ];

    static foobar = [
        "A81758FFFE03102D",
        "A81758FFFE030F70",
        "A81758FFFE030F64",
        "A81758FFFE04652D",
        "A81758FFFE031029",
    ];

    static mara = ["A81758FFFE03107B", "A81758FFFE031048"];

    static get all(): Array<string> {
        return [
            ...this.napa,
            ...this.foobar,
            ...this.foodoo,
            ...this.mara,
            ...this.kastari,
        ];
    }

    static getSensorsForLocation(location: string): Array<string> {
        switch (location) {
            case "napa":
                return this.napa;
            case "kastari":
                return this.kastari;
            case "foodoo":
                return this.foodoo;
            case "foobar":
                return this.foobar;
            case "mara":
                return this.mara;
            default:
                return [];
        }
    }
}
