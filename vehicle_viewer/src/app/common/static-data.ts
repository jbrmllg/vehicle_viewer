import { Colors, Fuels } from "./types";

export const availableColors = [
    {
      text: Colors.red,
      value: Colors.red,
      byDefault: true
    },
    {
      text: Colors.green,
      value: Colors.green,
      byDefault: false
    },
    {
      text: Colors.blue,
      value: Colors.blue,
      byDefault: false
    },
    {
      text: Colors.white,
      value: Colors.white,
      byDefault: false
    },
    {
      text: Colors.yellow,
      value: Colors.yellow,
      byDefault: false
    }
  ];

  export const availableVehicleTypes = [
    {
      text: "Car",
      value: "Car",
      byDefault: true
    },
    {
      text: "Truck",
      value: "Truck",
      byDefault: false
    },

  ]

  export const availableFuelTypes = [
    {
      text: Fuels.diesel,
      value: Fuels.diesel,
      byDefault: false
    },
    {
      text: Fuels.gasoline,
      value: Fuels.gasoline,
      byDefault: false
    },
    {
      text: Fuels.hybrid,
      value: Fuels.hybrid,
      byDefault: false
    },
    {
      text: Fuels.electric,
      value: Fuels.electric,
      byDefault: false
    },
  ]