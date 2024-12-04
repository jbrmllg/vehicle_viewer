export type Nullable<T> = T | null ;
export type Nullish<T> = T | null | undefined;
export type ID = string | number;

export enum Roles {
    admin = "Admin",
    user = "User"
}

// Represents the available colors.
// This may be retrieved from backend.
export enum Colors {
    red = "red",
    blue = "blue",
    green = "green",
    yellow = "yellow",
    white = "white"
}

// Represents the available fuels.
// This may be retrieved from backend.
export enum Fuels {
    diesel = "Diesel",
    gasoline = "Gasoline",
    hybrid = "Hybrid",
    electric = "Electric",
}