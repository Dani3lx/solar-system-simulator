const degToRad = (deg) => (deg * Math.PI) / 180;

export const Sun = {
    name: "Sun",
    size: 5,
    surfaceColor: "#FFD27A",
    emissiveColor: "#FFE8AA",
    lightColor: "#FFF0C2",
    rotationPeriod: 609.6, // hours (25.4 days, equatorial)
    T: 89.4, // same reference scale as Earth's orbit
    axialTilt: degToRad(7.25),
};
