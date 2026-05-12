const degToRad = (deg) => (deg * Math.PI) / 180;

export const Mercury = {
    name: "Mercury",
    a: 8,
    e: 0.2056,
    size: 0.25,
    color: "#b1b1b1",
    speed: 47,
    i: degToRad(7.0),
    Ω: degToRad(48.3),
    ω: degToRad(29.1),
};

export const Venus = {
    name: "Venus",
    a: 15,
    e: 0.0067,
    size: 0.45,
    color: "#e3c16f",
    speed: 35,
    i: degToRad(3.4),
    Ω: degToRad(76.7),
    ω: degToRad(54.9),
};

export const Earth = {
    name: "Earth",
    a: 20,
    e: 0.0167,
    size: 0.5,
    color: "#4fa3e0",
    speed: 29,
    i: 0,
    Ω: 0,
    ω: degToRad(102.9),
};

export const Mars = {
    name: "Mars",
    a: 30,
    e: 0.0934,
    size: 0.38,
    color: "#c1440e",
    speed: 24,
    i: degToRad(1.85),
    Ω: degToRad(49.6),
    ω: degToRad(286.5),
};

export const Jupiter = {
    name: "Jupiter",
    a: 52,
    e: 0.0489,
    size: 1.2,
    color: "#d9b38c",
    speed: 13,
    i: degToRad(1.3),
    Ω: degToRad(100.5),
    ω: degToRad(273.9),
};

export const Saturn = {
    name: "Saturn",
    a: 95,
    e: 0.0565,
    size: 1.0,
    color: "#e5d1a8",
    speed: 9,
    i: degToRad(2.5),
    Ω: degToRad(113.7),
    ω: degToRad(339.4),
};

export const Uranus = {
    name: "Uranus",
    a: 192,
    e: 0.0463,
    size: 0.8,
    color: "#7ad0e6",
    speed: 6,
    i: degToRad(0.77),
    Ω: degToRad(74.0),
    ω: degToRad(96.6),
};

export const Neptune = {
    name: "Neptune",
    a: 300,
    e: 0.0097,
    size: 0.8,
    color: "#3f54ba",
    speed: 5,
    i: degToRad(1.77),
    Ω: degToRad(131.8),
    ω: degToRad(273.2),
};

export const planets = [Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune];
